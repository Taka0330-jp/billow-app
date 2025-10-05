// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import extractRouter from "./routes/extract.js";

dotenv.config();

const app = express();

// --- CORS: allow Vite dev and production origin -----------------------------
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

// --- Body parsers ------------------------------------------------------------
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// --- Health check ------------------------------------------------------------
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "billow-api", env: process.env.NODE_ENV || "dev" });
});

// --- Routes ------------------------------------------------------------------
app.use("/api/extract", extractRouter);

// --- 404 handler -------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Route not found", path: req.originalUrl });
});

// --- Error handler -----------------------------------------------------------
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, error: "Internal Server Error" });
});

// --- Start server ------------------------------------------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API server listening on http://localhost:${PORT}`);
});
