const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Schikte64@gmail.com",
    pass: "qrln akif hkkq olvx"
  }
});

async function sendAlertEmail(report) {
  const mailOptions = {
    from: "Schikte64@gmail.com",
    to: "Schikte64@gmail.com",
    subject: "🚨 HIGH Severity Security Alert",
    text: `
Security Alert Detected!

IP Address: ${report.ip}
Attack Type: ${report.attackType}
Severity: ${report.severity}
Failed Attempts: ${report.failedAttempts}
Prevention: ${report.prevention}
Time: ${new Date(report.timestamp).toLocaleString()}
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendAlertEmail;
