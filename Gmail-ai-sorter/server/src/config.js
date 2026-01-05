import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const SESSION_SECRET = process.env.SESSION_SECRET || "dev-secret";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

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
