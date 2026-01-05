import { google } from "googleapis";

export async function fetchEmails(user, maxResults) {
  if (!user?.accessToken) {
    throw new Error("Missing Gmail access token");
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken // 🔥 IMPORTANT
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  // Step 1: list messages
  const listResponse = await gmail.users.messages.list({
    userId: "me",
    maxResults
  });

  const messages = listResponse.data.messages || [];
  if (!messages.length) return [];

  // Step 2: fetch metadata in parallel (FASTER & SAFE)
  const emailPromises = messages.map(async (msg) => {
    const full = await gmail.users.messages.get({
      userId: "me",
      id: msg.id,
      format: "metadata",
      metadataHeaders: ["Subject", "Date"]
    });

    const payload = full.data.payload || {};
    const headers = payload.headers || [];

    const subjectHeader = headers.find(h => h.name === "Subject");
    const dateHeader = headers.find(h => h.name === "Date");

    return {
      id: full.data.id,
      threadId: full.data.threadId,
      subject: subjectHeader?.value || "(No subject)",
      snippet: full.data.snippet || "",
      date: dateHeader?.value || null
    };
  });

  return await Promise.all(emailPromises);
}

export function buildGmailLink(messageId) {
  return `https://mail.google.com/mail/#all/${messageId}`;
}

