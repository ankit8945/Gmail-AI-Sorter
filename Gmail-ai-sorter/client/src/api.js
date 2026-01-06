import axios from "axios";

const API_BASE_URL =
  "https://gmail-ai-sorter-backend.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function getMe() {
  const res = await api.get("/api/me");
  return res.data;
}

export async function analyzeEmails(count) {
  const res = await api.post("/api/analyze", { count });
  return res.data;
}
