const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  ip: String,
  failedAttempts: Number,
  attackType: String,
  severity: String,
  prevention: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", ReportSchema);
