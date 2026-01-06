import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ==========================
   USER KEYWORD MATCH
   (HIGHEST PRIORITY)
========================== */
function matchUserCategory(email, userCategoryMap) {
  const text = `${email.subject} ${email.snippet}`.toLowerCase();

  for (const keyword in userCategoryMap) {
    if (text.includes(keyword)) {
      return userCategoryMap[keyword];
    }
  }
  return null;
}

/* ==========================
   AI CATEGORY MATCH
   (SECOND PRIORITY)
========================== */
function matchAICategory(email, aiCategoryMap) {
  const text = `${email.subject} ${email.snippet}`.toLowerCase();

  for (const key in aiCategoryMap) {
    if (text.includes(key)) {
      return aiCategoryMap[key];
    }
  }
  return null;
}

/* ==========================
   HARD FALLBACK
========================== */
function hardFallback(email) {
  const text = `${email.subject} ${email.snippet}`.toLowerCase();

  if (text.match(/otp|verification|login|security|alert/))
    return "OTP & Alerts";

  if (text.match(/exam|result|admit|college|university|semester|scholarship/))
    return "Education";

  if (text.match(/job|internship|interview|hiring|offer|recruiter/))
    return "Jobs";

  if (text.match(/bank|payment|salary|invoice|refund|upi|transaction|loan/))
    return "Finance";

  if (text.match(/order|delivery|shipped|amazon|flipkart|myntra/))
    return "Shopping";

  if (text.match(/flight|train|ticket|booking|hotel|travel/))
    return "Travel";

  if (text.match(/doctor|hospital|appointment|medical|report/))
    return "Health";

  if (text.match(/linkedin|instagram|facebook|twitter|follow|invite/))
    return "Social";

  if (text.match(/movie|music|concert|netflix|spotify|show/))
    return "Entertainment";

  if (text.match(/meeting|zoom|google meet|conference|calendar/))
    return "Meetings";

  if (
    text.match(
      /\b(aadhaar|pan|passport|income tax|gst|gov\.?|government|ministry|nsdl|uidai)\b/
    )
  ) {
    return "Government";
  }

  if (text.match(/newsletter|news|bulletin|digest/))
    return "News & Media";

  if (text.match(/newsletter|digest|weekly|monthly/))
    return "Newsletter";

  if (text.match(/update|release|version|feature|changelog/))
    return "Product Updates";

  if (text.match(/offer|sale|discount|deal|promo/))
    return "Promotions";

  if (text.match(/community|forum|member|participant|contributor/))
    return "Community";

  if (text.match(/account|settings|privacy|terms|policy/))
    return "Account & System";

  return "Updates";
}

/* ==========================
   MAIN CLASSIFIER
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
    // 1️⃣ USER CATEGORY
    const userCat = matchUserCategory(email, userCategoryMap);
    if (userCat) {
      results.push({ ...email, category: userCat, source: "user" });
      continue;
    }

    // 2️⃣ EXISTING AI CATEGORY
    const aiCat = matchAICategory(email, aiCategoryMap);
    if (aiCat) {
      results.push({ ...email, category: aiCat, source: "ai" });
      continue;
    }

    // 3️⃣ GEMINI
    const prompt = `
You are an intelligent email classifier.

CRITICAL RULES:
- NEVER use "Updates" unless the email is completely generic.
- If unsure, CREATE a new meaningful category instead of Updates.
- Event / conference / community emails are NOT Government.

Create a SHORT category name (1–2 words).

Email Subject:
"${email.subject}"

Email Snippet:
"${email.snippet}"

Respond ONLY in JSON:
{
  "category": "CategoryName"
}
`;

    try {
      const response = await model.generateContent(prompt);
      const text = response.response.text();

      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }

      let category = parsed?.category
        ? parsed.category.trim()
        : null;

      if (!category || category === "Updates") {
        category = hardFallback(email);
      }

      results.push({
        ...email,
        category,
        source: "ai-new"
      });
    } catch (err) {
      results.push({
        ...email,
        category: hardFallback(email),
        source: "fallback"
      });
    }
  }

  return results;
}
