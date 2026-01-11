const API_URL = "http://localhost:3000/api/reports";

let allReports = [];
let currentFilter = "ALL";

async function fetchReports() {
  const res = await fetch(API_URL);
  allReports = await res.json();
  updateDashboard();
  document.getElementById("lastUpdated").innerText =
    "Last updated: " + new Date().toLocaleTimeString();
}

function updateDashboard() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  let high = 0, medium = 0, low = 0;
  const table = document.getElementById("reportTable");
  table.innerHTML = "";

  allReports.forEach(report => {
    if (report.severity === "HIGH") high++;
    if (report.severity === "MEDIUM") medium++;
    if (report.severity === "LOW") low++;

    if (currentFilter !== "ALL" && report.severity !== currentFilter) return;
    if (!report.ip.toLowerCase().includes(search)) return;

    const row = document.createElement("tr");

    let sevClass =
      report.severity === "HIGH" ? "sev-high" :
      report.severity === "MEDIUM" ? "sev-medium" : "sev-low";

    row.innerHTML = `
      <td>${report.ip}</td>
      <td>${report.failedAttempts}</td>
      <td>${report.attackType}</td>
      <td class="${sevClass}">${report.severity}</td>
      <td>${report.prevention}</td>
      <td>${new Date(report.timestamp).toLocaleString()}</td>
    `;

    table.appendChild(row);
  });

  document.getElementById("highCount").innerText = high;
  document.getElementById("mediumCount").innerText = medium;
  document.getElementById("lowCount").innerText = low;
}

function setFilter(filter) {
  currentFilter = filter;
  updateDashboard();
}

document.getElementById("searchInput").addEventListener("input", updateDashboard);

// 🔁 AUTO REFRESH every 15 seconds
fetchReports();
setInterval(fetchReports, 15000);
