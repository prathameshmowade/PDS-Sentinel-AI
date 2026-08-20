# 🛡️ PDS Sentinel AI

> **AI-Powered Predictive Governance, Multi-Source Trust Engine, and Decision Support Platform for India's Public Distribution System (PDS)**  
> *Developed for the AI SDG Global Hackathon 2026 by Team Pragati 2.0*  
> *S. B. Jain Institute of Technology, Management & Research, Nagpur*

---

## 🎯 Problem Statement
- **Stock Diversion**: Food grains rerouted to private commercial mills and black markets before reaching beneficiaries.
- **Artificial Shortages**: Fair Price Shop (FPS) dealers falsely reporting stock-outs to cover up discrepancies.
- **Ghost Cards & Identity Fraud**: Duplicate ration cards, inflated beneficiary claims, and offline POS sweeps draining public welfare funds.
- **Reactive Legacy Systems**: Existing state PDS tools only report losses weeks after fraud occurs.

**PDS Sentinel AI shifts governance from *Reactive Monitoring* to *Predictive Prevention, Multi-Source Cross-Verification, and Automated Decision Support*.**

---

## 🚀 Key Innovations & Architecture

```
                                  +-------------------------------------------------------+
                                  |                 PDS SENTINEL AI                      |
                                  |              Full-Stack Architecture                 |
                                  +-------------------------------------------------------+
                                                              |
            +-------------------------------------------------+-------------------------------------------------+
            |                                                                                                   |
+---------------------------+                                                                       +---------------------------+
|      BACKEND (FastAPI)    |                                                                       |     FRONTEND (React+Vite) |
+---------------------------+                                                                       +---------------------------+
| - Multi-Source Trust      |                                                                       | - Executive Command       |
|   Engine (MSTE)           |                                                                       |   Dashboard               |
| - Isolation Forest &      |  <======== REST APIs & Live Telemetry Websocket / Polling ========>  | - Interactive Leaflet GIS |
|   Anomaly Detection Core  |                                                                       |   Fleet & FPS Map         |
| - SHAP Explainability API |                                                                       | - AI Decision Copilot &   |
| - NLP Grievance Triage    |                                                                       |   Alert Action Workflow   |
| - Digital Twin Simulator  |                                                                       | - Citizen Mobile Portal   |
| - Seed PDS Data Store     |                                                                       | - Digital Twin Sandbox    |
+---------------------------+                                                                       +---------------------------+
```

### 1. 🧠 Multi-Source Trust Engine (MSTE)
Cross-references 5 independent data streams to compute dynamic Trust Scores (0–100) for every Fair Price Shop:
- **Electronic Weighbridge Integrations** (30% weight) — Discrepancies between depot dispatch vs truck in-transit / receiving weight.
- **GPS Logistics Telemetry** (25% weight) — Unscheduled route deviations and unauthorized halts at commercial flour mills.
- **POS Device & Transaction Velocity** (20% weight) — Midnight sweeps, rapid OTP swipes, biometric bypass anomalies.
- **Stock Balance Ledger Reconciliation** (15% weight) — Theory vs physical stock audits.
- **Citizen Grievances & Sentiment Density** (10% weight) — Localized reports of stock denial.

### 2. ⚡ Explainable AI (SHAP-Inspired Feature Attribution)
Every fraud alert is accompanied by visual feature attribution percentages (e.g. `+38.5% Weight Discrepancy`, `+27.2% GPS Route Deviation`, `+19.1% Midnight Transactions`, `+15.2% Citizen Complaint Surge`), enabling transparent, legally defensible enforcement actions.

### 3. 🚨 AI Decision Copilot
Provides 1-click execution for food commissioners and enforcement officers:
- **Dispatch Vigilance Flying Squad**
- **Lock POS Quota Allocation**
- **Reallocate Stock to Nearest Verified Alternative Shop**
- **Order Surprise Electronic Scale Re-calibration**

### 4. 🗺️ Interactive GIS Heatmap & Fleet Tracking (Leaflet.js)
Live interactive geospatial command center showing FCI Depots, delivery trucks with animated coordinates and route corridor breach warnings, and Fair Price Shops color-coded by trust score.

### 5. 👥 Citizen Welfare & Multilingual Redressal Portal
- **Multilingual Support**: English, Hindi (हिंदी), and Marathi (मराठी).
- **Ration Entitlement Lookup**: Check monthly quota balance, subsidized rates, and Aadhaar linkage.
- **Verified Alternate FPS Finder**: Real-time locator for nearest trusted shops when assigned shop is closed.
- **AI Grievance Redressal**: Instant Natural Language Processing (NLP) triage.

### 6. 🌐 Supply Chain Digital Twin Simulator
Interactive sandbox to simulate disruptions (e.g., *Black Market Flour Mill Diversion*, *Midnight Ghost Card Burst*, *Monsoon Route Flooding*) and test Sentinel AI's autonomous countermeasures.

---

## ⚡ Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1-Click Launch (Windows)
Double-click `run.bat` or run in PowerShell:
```powershell
.\start.ps1
```

### Manual Launch

#### 1. Start Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs (Swagger UI): `http://localhost:8000/docs`

#### 2. Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 👥 Team Pragati 2.0
- **Team Leader**: Prathamesh Mowade (CSE - AIML)
- **Team Member 2**: Yash Kapse (CSE - AIML)
- **Team Member 3**: Dhanshree Bhorkar (CSE - AIML)
- **Team Member 4**: Neha Musale (CSE - AIML)
- **Institution**: S. B. Jain Institute of Technology, Management & Research, Nagpur

<!-- Sync step: 370 -->
