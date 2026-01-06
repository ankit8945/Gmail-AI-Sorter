import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ==========================
   HELPERS
========================== */

function normalize(cat) {
  return cat
    .trim()
    .replace(/[^a-zA-Z0-9 &]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 30);
}

function safeParseCategory(text) {
  const match = text.match(/"category"\s*:\s*"([^"]+)"/i);
  return match ? normalize(match[1]) : null;
}

/* ==========================
   FALLBACK (UNCHANGED LOGIC)
========================== */
function hardFallback(email) {
  const text = `${email.subject} ${email.snippet}`.toLowerCase();

  if (text.match(/otp|verification|login|security|alert/))
    return "OTP & Alerts";
  if (text.match(/exam|result|admit|college|university|scholarship/))
    return "Education";
  if (text.match(/job|internship|interview|hiring|recruiter/))
    return "Jobs";
  if (text.match(/bank|payment|invoice|refund|upi|loan/))
    return "Finance";
  if (text.match(/order|delivery|amazon|flipkart|myntra/))
    return "Shopping";
  if (text.match(/flight|train|ticket|hotel|travel/))
    return "Travel";
  if (text.match(/doctor|hospital|medical|appointment/))
    return "Health";
  if (text.match(/linkedin|instagram|facebook|twitter/))
    return "Social";
  if (text.match(/movie|music|concert|netflix|spotify/))
    return "Entertainment";
  if (text.match(/newsletter|digest|weekly|monthly/))
    return "Newsletter";
  if (text.match(/offer|sale|discount|promo/))
    return "Promotions";

  return "Updates";
}

/* ==========================
   MAIN CLASSIFIER (IMPROVED)
========================== */
export async function classifyEmails(
  emails,
  userCategoryMap = {},
  aiCategoryMap = {}
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const results = [];

  for (const email of emails) {
    const text = `${email.subject} ${email.snippet}`.toLowerCase();

    // 1️⃣ User-defined categories
    for (const key in userCategoryMap) {
      if (text.includes(key)) {
        results.push({ ...email, category: userCategoryMap[key] });
        continue;
      }
    }

    // 2️⃣ Existing AI categories
    for (const key in aiCategoryMap) {
      if (text.includes(key)) {
        results.push({ ...email, category: aiCategoryMap[key] });
        continue;
      }
    }

    // 3️⃣ Gemini
    const prompt = `
Classify this email into ONE short category (1–2 words).
Avoid "Updates" unless truly generic.

Subject: "${email.subject}"
Snippet: "${email.snippet}"

Return JSON only:
{ "category": "CategoryName" }
`;

    try {
      const response = await model.generateContent(prompt);
      const raw = response.response.text();
      const category =
        safeParseCategory(raw) || hardFallback(email);

      results.push({
        ...email,
        category
      });
    } catch {
      results.push({
        ...email,
        category: hardFallback(email)
      });
    }
  }

  return results;
}
