// server/routes/extract.js
// Route: POST /api/extract
// Purpose: Extract structured fields from subscription/invoice text using Gemini.
// Behavior: Uses Gemini when GEMINI_API_KEY exists, otherwise returns a mock response.
// All comments are in English.

import { Router } from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = Router();

// --- Initialize Gemini model (if API key is present) ------------------------
const hasKey = !!process.env.GEMINI_API_KEY;
console.log("🔑 Gemini API key detected:", hasKey);

let model = null;
if (hasKey) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// --- Helper: Build strict JSON-only prompt ----------------------------------
function buildPrompt(text, note) {
  return `
You are an information extraction assistant for subscription invoices.
Return ONLY a single-line MINIFIED JSON object with these exact keys:
vendor, amount, currency, billing_cycle, period, summary, recommended_actions

Rules:
- Output must be valid JSON only (no markdown, no code fences, no extra text).
- "amount" must be a number if possible (e.g., 79.99). If unknown, use null.
- "currency" should be a 3-letter code (e.g., USD, CAD) if identifiable, else null.
- "billing_cycle" must be one of: "monthly", "yearly", "weekly", "daily", or null.
- "period" can be a human-readable period like "Sep 2025" or "2025-09", else null.
- "recommended_actions" must be an array of strings (can be empty).

Text: """${text}"""
Note: """${note}"""
`.trim();
}

// --- Helper: Validate minimal shape of AI JSON -------------------------------
function validateExtract(obj) {
  const required = [
    "vendor",
    "amount",
    "currency",
    "billing_cycle",
    "period",
    "summary",
    "recommended_actions",
  ];

  const okKeys = required.every((k) => Object.prototype.hasOwnProperty.call(obj, k));
  const arrOk =
    Array.isArray(obj.recommended_actions) &&
    obj.recommended_actions.every((x) => typeof x === "string");

  return okKeys && arrOk;
}

// --- POST /api/extract -------------------------------------------------------
router.post("/", async (req, res) => {
  const { text = "", note = "" } = req.body ?? {};

  if (typeof text !== "string" || typeof note !== "string") {
    return res.status(400).json({
      ok: false,
      error: "Invalid payload. Expected JSON with string fields: text, note.",
      example: { text: "Invoice text here", note: "Optional note" },
    });
  }

  console.log("🤖 Using:", hasKey ? "Gemini" : "Mock");

  // --- Use Gemini when API key is available ---------------------------------
  if (hasKey && model) {
    try {
      const prompt = buildPrompt(text, note);
      const result = await model.generateContent([{ text: prompt }]);
      const output = result.response.text(); // Expecting minified JSON string

      // Parse and minimally validate the AI output
      let data;
      try {
        data = JSON.parse(output);
      } catch {
        return res.status(422).json({
          ok: false,
          error: "AI did not return valid JSON.",
          raw: output,
        });
      }

      if (!validateExtract(data)) {
        return res.status(422).json({
          ok: false,
          error: "AI JSON schema invalid. Missing required keys or wrong types.",
          raw: data,
        });
      }

      return res.json({ ok: true, from: "gemini", data });
    } catch (err) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({
        ok: false,
        error: "Gemini request failed",
        detail: err?.message ?? String(err),
      });
    }
  }

  // --- Fallback: mock response when API key is missing -----------------------
  const mockData = {
    vendor: "(unknown)",
    amount: null,
    currency: null,
    billing_cycle: null,
    period: null,
    summary: text
      ? `Summary: ${text.slice(0, 60)}${text.length > 60 ? "..." : ""}`
      : "Summary: (no text provided)",
    recommended_actions: [
      "Review unused subscriptions this month",
      "Export the latest invoice CSV",
      "Assign owners to each subscription",
    ],
  };

  return res.json({ ok: true, from: "mock", data: mockData, received: { text, note } });
});

export default router;
