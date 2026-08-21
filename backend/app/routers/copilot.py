from fastapi import APIRouter

from pydantic import BaseModel

from typing import List, Optional

from app.data_store import DATA_STORE

router = APIRouter(prefix="/api/copilot", tags=["AI Copilot"])

class CopilotRequest(BaseModel):

    query: str

    user_role: Optional[str] = "District Supply Officer"

class CopilotResponse(BaseModel):

    reply: str

    action_type: Optional[str] = None

    action_payload: Optional[dict] = None

    suggested_chips: List[str] = []

@router.post("/chat", response_model=CopilotResponse)

def chat_with_copilot(req: CopilotRequest):

    q = req.query.strip().lower()

    

    fps_list = DATA_STORE["fps"]

    trucks = DATA_STORE["trucks"]

    alerts = DATA_STORE["alerts"]

    stats = DATA_STORE["stats"]

    

    # 1. GREETINGS & CASUAL CONVERSATION

    if q in ["hi", "hello", "hey", "namaste", "good morning", "good evening", "who are you"]:

        flagged_count = len([f for f in fps_list if f.get("trust_score", 100) < 50])

        critical_alerts = len([a for a in alerts if a.get("severity") == "CRITICAL" and a.get("status") != "RESOLVED"])

        

        reply = f"""👋 **Namaste Officer {req.user_role}**. 

I am your **PDS Sentinel Decision Copilot** connected to the live Nagpur Food Security Surveillance Node.

### 📊 Real-Time Operations Summary:

- **Active Fair Price Shops**: {len(fps_list)} units ({flagged_count} flagged for investigation)

- **Logistics Consignments in Transit**: {len(trucks)} GPS-tracked trucks

- **High-Priority Incidents**: **{critical_alerts} Critical Breach(es)** requiring immediate officer attention

- **Total Grain Safeguarded**: **{stats.get('impact_metrics', {}).get('grain_saved_tons', 148.5)} MT**

How would you like to proceed with enforcement?"""

        

        return CopilotResponse(

            reply=reply,

            suggested_chips=[

                "Summarize active diversion threats in Nagpur",

                "Draft show-cause notice for flagged dealer",

                "Reallocate quota from FPS-4102 to verified backup",

                "Inspect weighbridge calibration drift"

            ]

        )

    # 2. DIVERSION & THREAT AUDIT

    if any(k in q for k in ["diversion", "threat", "anomaly", "breach", "leakage", "flagged", "alert"]):

        flagged_shops = [f for f in fps_list if f.get("trust_score", 100) < 60]

        breached_trucks = [t for t in trucks if t.get("geofence_breach")]

        

        reply = f"""### 🚨 Active Diversion & Threat Dossier (Nagpur District):

1. **FPS-4102 (Itwari Cotton Market - Dealer S. Chawla)**:

   - **MSTE Trust Score**: **24.2 / 100** (CRITICAL SEVERITY).

   - **Logistics Breach**: Truck **MH-31-8820** registered an unauthorized **135-minute halt** at *Pardi Commercial Flour Mill*.

   - **Weighbridge Discrepancy**: Electronic weigh slip shows **4.2 MT food grain deficit** (-35% shortfall).

   - **Biometric Exploit**: 46 transactions executed within 12 minutes during non-operating hours.

2. **FPS-4106 (Hingna Rural Jan Suvidha)**:

   - **MSTE Trust Score**: **38.5 / 100** (HIGH SEVERITY).

   - **Flag**: Rapid midnight POS swipe burst with 94% biometric bypass override.

3. **Fleet Surveillance**:

   - **{len(breached_trucks)} vehicle(s)** currently in corridor geofence violation."""

        

        return CopilotResponse(

            reply=reply,

            action_type="DEPLOY_FLYING_SQUAD",

            action_payload={"fps_id": "FPS-4102", "alert_id": "ALT-2026-0891"},

            suggested_chips=[

                "Deploy Vigilance Flying Squad to FPS-4102",

                "Freeze POS Device POS-NGP-4102",

                "Reallocate quota to Pragati Mahila Kendra (FPS-4103)",

                "Draft Formal Police FIR & Show-Cause Notice"

            ]

        )

    # 3. QUOTA REALLOCATION

    if any(k in q for k in ["reallocate", "quota", "backup", "transfer", "alternative"]):

        reply = """### 🔄 Automated Beneficiary Quota Reallocation Plan:

- **Withdrawn Volume**: **12.0 MT** food grains currently pending dispatch to **FPS-4102** (Under Vigilance Suspension).

- **Designated Backup Center**: **Pragati Mahila PDS Kendra (FPS-4103)**

  - **MSTE Trust Score**: **98.2 / 100** (Certified Clean).

  - **Proximity**: 1.4 km from flagged Itwari cluster.

  - **Buffer Capacity**: 45.0 MT storage with 2 active biometric POS terminals.

- **Beneficiary Advisory**: 2,150 registered cardholders queued for automated SMS advisory in Marathi & Hindi."""

        

        return CopilotResponse(

            reply=reply,

            action_type="REALLOCATE_QUOTA",

            action_payload={"source_fps": "FPS-4102", "target_fps": "FPS-4103", "volume_mt": 12.0},

            suggested_chips=[

                "Execute Quota Reallocation to FPS-4103",

                "Broadcast Marathi/Hindi SMS to Beneficiaries",

                "Inspect FPS-4103 Stock Capacity"

            ]

        )

    # 4. LEGAL & SHOW-CAUSE NOTICE DRAFTING

    if any(k in q for k in ["draft", "notice", "show-cause", "show cause", "fir", "legal", "order"]):

        reply = """### 📜 Formatted Show-Cause Notice (NFSA 2013 / EC Act 1955)

**OFFICE OF THE DISTRICT SUPPLY OFFICER, NAGPUR**  

**Order Ref No: DSO/NGP/ENF/2026/0891**  

**Date:** Current Shift  

**To:**  

Shri S. Chawla, Authorized Fair Price Shop Licensee (FPS-4102)  

Itwari Cotton Market Ward, Nagpur - 440002  

**SUBJECT: SHOW-CAUSE NOTICE FOR UNLAWFUL FOOD GRAIN DIVERSION & POS MANIPULATION**  

1. **WHEREAS**, automated telemetry from Multi-Source Trust Engine (MSTE v2.4) logged an unauthorized detour of Consignment Truck MH-31-8820 at a private flour mill on the Kamptee corridor;

2. **AND WHEREAS**, electronic weighbridge inspection registered a 4.2 MT grain deficit against the FCI release order;

3. **NOW THEREFORE**, you are hereby directed to show cause in person within **48 hours** why your PDS license shall not be cancelled and criminal proceedings initiated under Section 3/7 of the Essential Commodities Act, 1955.

*Issued under the Digital Seal of District Supply Officer, Nagpur.*"""

        

        return CopilotResponse(

            reply=reply,

            action_type="DOWNLOAD_SHOW_CAUSE",

            suggested_chips=[

                "Deploy Vigilance Squad to Serve Notice",

                "Freeze POS Device POS-NGP-4102",

                "Lock Dealer Stock Registry"

            ]

        )

    # 5. WEIGHBRIDGE & SCALE CALIBRATION

    if any(k in q for k in ["weigh", "scale", "tare", "calibration", "drift", "gram"]):

        reply = """### ⚖️ Electronic Weighbridge & IoT Scale Telemetry Audit:

- **Central Weighbridge (Ajni FCI Hub)**: Calibration delta **+0.02%** (Within Standard Tolerance).

- **East Zone Scale (Itwari / Pardi Sector)**: 

  - Scale Serial `WB-NGP-09` shows **-350 grams tare offset drift**.

  - **Diagnosis**: Physical load cell bypass or tare potentiometer tamper detected.

- **Recommended Action**: Remote tare lock & dispatch Weights & Measures Inspector."""

        

        return CopilotResponse(

            reply=reply,

            action_type="LOCK_SCALE_TARE",

            action_payload={"scale_id": "WB-NGP-09"},

            suggested_chips=[

                "Lock Weighbridge Tare Calibration Remotely",

                "Dispatch Weights & Measures Inspector",

                "View Live In-Transit Scale Slips"

            ]

        )

    # 6. FLEET & TRUCKS TELEMETRY

    if any(k in q for k in ["truck", "fleet", "vehicle", "gps", "route", "driver"]):

        truck_lines = []

        for t in trucks:

            status_text = "🚨 GEOFENCE BREACH (HALTED AT MILL)" if t.get("geofence_breach") else "✅ On Route"

            truck_lines.append(f"- **{t['id']}** ({t.get('driver')}): {t.get('cargo_type')} {t.get('load_tons')} MT -> {t.get('destination')} [{status_text}]")

        

        truck_summary = "\n".join(truck_lines)

        reply = f"""### 🚚 Live Logistics Fleet Status (Nagpur Division):

{truck_summary}

- **Active Moving**: {len([t for t in trucks if not t.get('geofence_breach')])} consignments

- **Halted / Flagged**: {len([t for t in trucks if t.get('geofence_breach')])} consignment(s)"""

        

        return CopilotResponse(

            reply=reply,

            suggested_chips=[

                "Inspect Truck MH-31-8820 Breadcrumbs",

                "Deploy Squad to Intercept MH-31-8820",

                "Generate Fleet Transit Log"

            ]

        )

    # 7. AUDIT & SUMMARY REPORT

    if any(k in q for k in ["audit", "summary", "report", "stats", "kpi", "performance"]):

        reply = f"""### 📋 Official District PDS Performance Audit:

- **Period**: Current Fiscal Pilot

- **Protected Grain Volume**: **{stats.get('impact_metrics', {}).get('grain_saved_tons', 148.5)} Metric Tons**

- **Public Funds Saved**: **₹{stats.get('impact_metrics', {}).get('public_funds_protected_inr', 5940000):,}**

- **MSTE Engine Precision**: **{stats.get('system_health', {}).get('model_precision_percent', 98.4)}%** (Zero False Alarms)

- **Resolved Triage Cases**: **{stats.get('impact_metrics', {}).get('diversion_cases_stopped', 19)} cases** stopped before reaching black market."""

        

        return CopilotResponse(

            reply=reply,

            action_type="OPEN_AUDIT_REPORT",

            suggested_chips=[

                "Download Official Audit PDF Dossier",

                "Review High-Risk FPS Table",

                "Run Supply Chain Digital Twin Simulation"

            ]

        )

    # 8. GENERAL INTELLIGENT FALLBACK WITH REAL DATA

    clean_shops = [f['name'] for f in fps_list if f.get('trust_score', 0) >= 80][:3]

    reply = f"""I have cross-analyzed your query against our **5-stream MSTE telemetry** (GPS, Weighbridge IoT, Biometric POS, Stock Ledgers, and Citizen Grievances).

- **Current District Trust Average**: **76.4 / 100**

- **Top Compliant Centers**: {', '.join(clean_shops)}

- **Flagged Incidents**: **FPS-4102** (Diversion suspected), **FPS-4106** (Ghost card transactions).

Please select an action below or specify an FPS ID / Truck number to investigate:"""

    return CopilotResponse(

        reply=reply,

        suggested_chips=[

            "Summarize active diversion threats in Nagpur",

            "Draft show-cause notice for flagged dealer",

            "Reallocate quota from FPS-4102 to verified backup",

            "Generate District Audit Summary"

        ]

    )
