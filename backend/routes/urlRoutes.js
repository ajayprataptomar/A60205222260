const express = require("express");
const router = express.Router();
const generateCode = require("../utils/generateCode");
const urlDB = require("../models/urlStore");
const log = require("../middleware/logger");

const isValidURL = url => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


router.post("/shorten", async (req, res) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length > 5) {
    await log("backend", "error", "handler", "Invalid request body or too many URLs");
    return res.status(400).json({ error: "Send up to 5 valid URLs Only." });
  }

  const results = [];

  for (const entry of urls) {
    const { originalUrl, validity, shortcode } = entry;

    if (!originalUrl || !isValidURL(originalUrl)) {
      await log("backend", "error", "handler", "Invalid URL");
      continue;
    }

    const code = shortcode || generateCode();
    const now = new Date();
    const expiryDate = validity
      ? new Date(now.getTime() + parseInt(validity) * 60000)
      : null;

    const record = {
      originalUrl,
      code,
      createdAt: now.toISOString(),
      expiresAt: expiryDate ? expiryDate.toISOString() : null,
      clicks: [],
    };

    urlDB.push(record);
    results.push(record);
  }

  return res.status(200).json({ shortUrls: results });
});


router.get("/r/:code", async (req, res) => {
  const { code } = req.params;
  const match = urlDB.find(entry => entry.code === code);

  if (!match) {
    await log("backend", "warn", "handler", `Shortcode not found: ${code}`);
    return res.status(404).send("Short URL not found.");
  }

  const now = new Date();
  if (match.expiresAt && new Date(match.expiresAt) < now) {
    await log("backend", "info", "handler", `Expired URL access attempt: ${code}`);
    return res.status(410).send("This short link expired.");
  }

  match.clicks.push({
    time: now.toISOString(),
    referrer: req.get("Referrer") || "Direct",
  });

  res.redirect(match.originalUrl);
});

// GET /stats
router.get("/stats", (req, res) => {
  const stats = urlDB.map(entry => ({
    code: entry.code,
    originalUrl: entry.originalUrl,
    createdAt: entry.createdAt,
    expiresAt: entry.expiresAt,
    totalClicks: entry.clicks.length,
    clickDetails: entry.clicks,
  }));

  res.status(200).json({ stats });
});

module.exports = router;
