

# 🔐 Authentication Log Monitoring and Intrusion Detection System

## 📖 Project Overview

This project is a **log-based intrusion detection system** that monitors Linux authentication logs to identify suspicious login attempts such as repeated failed logins.

The goal of this project is to understand **how monitoring and detection systems work internally**, starting from raw system logs and building automation, backend processing, and alerting on top of it.

This is a **learning-focused project**, not a production-grade IDS.

---

## 🎯 Motivation

While studying Linux and system administration, I observed that authentication logs (`auth.log`) contain a lot of useful security-related information but are usually analyzed manually using commands like `grep` and `awk`.

This project automates that process and adds:

* structured detection logic
* severity classification
* backend storage
* alerting
* a simple monitoring dashboard

---

## 🛠️ Technologies Used

* **C++** – Log parsing and automation agent
* **Linux Authentication Logs** (`/var/log/auth.log`)
* **Node.js & Express** – Backend REST API
* **MongoDB** – Storage for detected events
* **HTML, CSS, JavaScript** – Web dashboard
* **SMTP Email** – Alert notifications

---

## 🧠 System Architecture

```
Linux auth.log
     ↓
C++ Log Monitoring Agent
     ↓
Node.js Backend (REST API)
     ↓
MongoDB Database
     ↓
Dashboard + Email Alerts
```

---

## ⚙️ Key Features

### 🔍 Authentication Log Monitoring

* Scans Linux authentication logs
* Detects failed login attempts
* Extracts source IP addresses

### 🚨 Intrusion Detection (Rule-Based)

* Uses simple rules to detect suspicious behavior
* Focuses on repeated failed login attempts
* Designed to be transparent and easy to understand

### 📊 Severity Classification

Detected events are classified into:

* **LOW** – Normal or low-risk activity
* **MEDIUM** – Suspicious behavior
* **HIGH** – Possible brute-force attack

Severity is based on the number of failed login attempts.

---

### 📬 Email Alerts

* Email alerts are triggered only for **HIGH severity** events
* Helps avoid unnecessary alert noise

---

### 🗄️ Event Storage

* All detected events are stored in MongoDB
* Maintains history for analysis and debugging

---

### 🖥️ Web Dashboard

* Auto-refreshing dashboard
* Severity summary cards (High / Medium / Low)
* Color-coded alerts
* Filter by severity
* Search events by IP address

---

## 🧪 Detection Logic (Simplified)

```
Failed Attempts > 20  → HIGH severity
Failed Attempts > 10  → MEDIUM severity
Else                → LOW severity
```

The logic is intentionally rule-based to keep the system explainable and easy to modify.

---

## 🚀 How to Run the Project

### 1️⃣ Start MongoDB

```bash
mongod
```

---

### 2️⃣ Run Backend Server

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:3000
```

---

### 3️⃣ Compile and Run C++ Agent

```bash
g++ agent.cpp -o agent
./agent
```

The agent periodically scans authentication logs and sends data to the backend.

---

### 4️⃣ Open Dashboard

Open `frontend/index.html` in a browser

---

## 🧩 Example Workflow

1. Multiple failed login attempts occur on the system
2. The C++ agent detects the pattern
3. Data is sent to the backend API
4. Event is classified and stored
5. High-severity alerts trigger an email
6. Event appears on the dashboard

---

## ⚠️ Limitations

* Rule-based detection only (no machine learning)
* Polling-based monitoring (near real-time)
* Designed for learning and demonstration
* Not intended for production use

---

## 🧠 Challenges Faced

* Parsing inconsistent log formats
* Avoiding duplicate alerts for the same IP
* Deciding practical severity thresholds
* Debugging API and database connectivity issues

These challenges helped improve understanding of real-world monitoring systems.

---

## 📚 Learning Outcomes

* Linux authentication logs and system monitoring
* C++ automation for system-level tasks
* Backend API design and data storage
* Alerting mechanisms
* Monitoring dashboard design
* Understanding trade-offs between simplicity and accuracy

---

## 🏁 Conclusion

This project helped me understand how **log-based monitoring and intrusion detection systems** work at a practical level. It focuses on clarity, automation, and explainability rather than advanced or enterprise-level features.

