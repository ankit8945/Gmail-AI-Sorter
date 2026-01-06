import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const CLIENT_URL = https://gmail-ai-sorter-bpd7.vercel.app
export const SESSION_SECRET = any-random-long-string-123456;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = https://gmail-ai-sorter-backend.onrender.com/auth/google/callback;

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const GEMINI_MODEL_NAME =
  process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash";

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  console.warn(
    "Google OAuth environment variables are not fully set. Authentication will fail."
  );
}

if (!GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set. AI classification will fail.");
}

