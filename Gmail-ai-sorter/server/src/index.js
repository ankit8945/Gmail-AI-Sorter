import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT, CLIENT_URL, SESSION_SECRET } from "./config.js";
import passport from "./auth.js";
import { authRequired } from "./middleware/authRequired.js";
import { fetchEmails, buildGmailLink } from "./gmail.js";
import { classifyEmails } from "./gemini.js";

const app = express();

/* =======================
   GLOBAL STATE (DEMO)
======================= */
let aiCategoryMap = {};
let userCategoryMap = {};
let liveStats = { total: 0, categories: {} };
let feedbackStore = [];

/* =======================
   MIDDLEWARE
======================= */

// 🔑 CORS – MUST be exact
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

// 🔑 SESSION – THIS WAS THE REAL BREAKER
app.use(
  session({
    name: "gmail-ai-sorter.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true, // IMPORTANT for Render
    cookie: {
      secure: true,        // HTTPS only
      sameSite: "none",    // Cross-site (Vercel ↔ Render)
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  })
);

// 🔑 PASSPORT (ORDER MATTERS)
app.use(passport.initialize());
app.use(passport.session());

/* =======================
   BASIC ROUTES
======================= */

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =======================
   AUTH ROUTES
======================= */

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "email",
      "profile",
      "https://www.googleapis.com/auth/gmail.readonly"
    ],
    accessType: "offline",
    prompt: "consent"
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: CLIENT_URL,
    session: true
  }),
  (req, res) => {
    // ✅ SESSION IS NOW SET
    res.redirect(`${CLIENT_URL}/dashboard`);
  }
);

app.get("/auth/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("gmail-ai-sorter.sid");
      res.json({ success: true });
    });
  });
});

/* =======================
   USER INFO (CRITICAL)
======================= */

app.get("/api/me", (req, res) => {
  // 🔍 HARD DEBUG (REMOVE LATER)
  console.log("AUTH CHECK:", req.isAuthenticated(), req.user);

  if (!req.isAuthenticated()) {
    return res.json({ authenticated: false });
  }

  res.json({
    authenticated: true,
    user: {
      id: req.user.id,
      name: req.user.displayName,
      email: req.user.emails?.[0]?.value || null,
      photo: req.user.photos?.[0]?.value || null,
      feedbackGiven: !!req.session.feedbackGiven
    }
  });
});

/* =======================
   USER CATEGORIES
======================= */

app.post("/api/add-keyword", authRequired, (req, res) => {
  const { keyword } = req.body;
  if (!keyword || !keyword.trim()) {
    return res.json({ success: false });
  }

  const clean = keyword.toLowerCase().trim();
  const category = clean.charAt(0).toUpperCase() + clean.slice(1);

  userCategoryMap[clean] = category;

  res.json({
    success: true,
    userCategories: userCategoryMap
  });
});

app.post("/api/delete-category", authRequired, (req, res) => {
  const { category } = req.body;
  if (!category) return res.json({ success: false });

  Object.keys(userCategoryMap).forEach(k => {
    if (userCategoryMap[k] === category) {
      delete userCategoryMap[k];
    }
  });

  res.json({
    success: true,
    userCategories: userCategoryMap
  });
});

/* =======================
   FEEDBACK
======================= */

app.post("/api/feedback", authRequired, (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false });
  }

  feedbackStore.push({
    rating,
    comment: comment || "",
    user: req.user.email,
    time: new Date().toISOString()
  });

  req.session.feedbackGiven = true;

  res.json({ success: true });
});

/* =======================
   ANALYZE EMAILS
======================= */

app.post("/api/analyze", authRequired, async (req, res) => {
  try {
    const { count } = req.body;
    const maxResults = [10, 20, 50, 100, 500].includes(count)
      ? count
      : 20;

    const emails = await fetchEmails(req.user, maxResults);

    if (!emails.length) {
      return res.json({ emails: [], stats: liveStats });
    }

    const classified = await classifyEmails(
      emails,
      userCategoryMap,
      aiCategoryMap
    );

    classified.forEach(mail => {
      const cat = mail.category;
      if (
        !Object.values(userCategoryMap).includes(cat) &&
        !Object.values(aiCategoryMap).includes(cat)
      ) {
        aiCategoryMap[cat.toLowerCase()] = cat;
      }
    });

    const withLinks = classified.map(e => ({
      ...e,
      gmailLink: buildGmailLink(e.id)
    }));

    liveStats = { total: 0, categories: {} };

    withLinks.forEach(mail => {
      liveStats.total += 1;
      liveStats.categories[mail.category] =
        (liveStats.categories[mail.category] || 0) + 1;
    });

    res.json({
      emails: withLinks,
      stats: liveStats
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

/* =======================
   START SERVER
======================= */

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
