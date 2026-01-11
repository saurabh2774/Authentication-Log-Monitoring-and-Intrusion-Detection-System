const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const sendAlertEmail = require("../utils/email");

function classifyAttack(count) {
  if (count > 20) return "Brute Force";
  if (count > 10) return "Suspicious Activity";
  return "Normal";
}

function severityLevel(count) {
  if (count > 20) return "HIGH";
  if (count > 10) return "MEDIUM";
  return "LOW";
}

function prevention(type) {
  if (type === "Brute Force")
    return "Enable Fail2Ban and SSH key authentication";
  if (type === "Suspicious Activity")
    return "Monitor IP and apply rate limiting";
  return "No action required";
}

// POST: ingest security event
router.post("/ingest", async (req, res) => {
  const { ip, failedAttempts } = req.body;

  const attackType = classifyAttack(failedAttempts);
  const severity = severityLevel(failedAttempts);
  const preventionStep = prevention(attackType);

  const report = new Report({
    ip,
    failedAttempts,
    attackType,
    severity,
    prevention: preventionStep
  });

  await report.save();

  // send email only for HIGH severity
  if (severity === "HIGH") {
    await sendAlertEmail(report);
  }

  res.json({ message: "Report saved", severity });
});

// GET: fetch all reports
router.get("/reports", async (req, res) => {
  const reports = await Report.find().sort({ timestamp: -1 });
  res.json(reports);
});

module.exports = router;
