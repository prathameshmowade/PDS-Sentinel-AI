from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.data_store import BENEFICIARIES, COMPLAINTS, FPS_SHOPS
from app.nlp_classifier import GrievanceNLPClassifier

router = APIRouter(prefix="/api/citizen", tags=["Citizen Portal & Grievance Redressal"])

class ComplaintSubmission(BaseModel):
    citizen_name: str
    card_no: str
    fps_id: str
    language: Optional[str] = "auto"
    complaint_text: str

class ComplaintAssignment(BaseModel):
    assigned_squad: str
    officer_notes: Optional[str] = ""
    assignment_type: Optional[str] = "MANUAL" # "AUTO_AI" or "MANUAL"

class ComplaintStatusUpdate(BaseModel):
    status: str
    resolution_notes: Optional[str] = ""

@router.get("/ration-card/{card_no}")
def get_ration_card_entitlement(card_no: str):
    card = BENEFICIARIES.get(card_no)
    if not card:
        # Generate dynamic realistic fallback if user searches an unseeded card number
        return {
            "card_no": card_no,
            "card_type": "NFSA Priority Household (PHH)",
            "head_of_family": "Beneficiary Holder",
            "family_members": 4,
            "assigned_fps_id": "FPS-4101",
            "district": "Nagpur Urban",
            "aadhaar_linked": True,
            "monthly_quota": {
                "rice_kg": 15.0,
                "wheat_kg": 10.0,
                "sugar_kg": 1.0,
                "subsidized_price_total_inr": 58
            },
            "current_month_status": {
                "month": "August 2026",
                "rice_lifted_kg": 0.0,
                "wheat_lifted_kg": 0.0,
                "sugar_lifted_kg": 0.0,
                "status": "PENDING_LIFTING",
                "warning": None
            },
            "distribution_history": [
                {
                    "month": "July 2026",
                    "date": "2026-07-08",
                    "rice_kg": 15.0,
                    "wheat_kg": 10.0,
                    "sugar_kg": 1.0,
                    "amount_paid_inr": 58,
                    "auth_mode": "Biometric (Aadhaar e-KYC)",
                    "status": "SUCCESSFUL"
                },
                {
                    "month": "June 2026",
                    "date": "2026-06-05",
                    "rice_kg": 15.0,
                    "wheat_kg": 10.0,
                    "sugar_kg": 1.0,
                    "amount_paid_inr": 58,
                    "auth_mode": "Biometric (Aadhaar e-KYC)",
                    "status": "SUCCESSFUL"
                }
            ],
            "assigned_fps": next((f for f in FPS_SHOPS if f["id"] == "FPS-4101"), None)
        }
    
    assigned_fps = next((f for f in FPS_SHOPS if f["id"] == card["assigned_fps_id"]), None)
    
    # Default distribution history if not present
    distribution_history = card.get("distribution_history", [
        {
            "month": "July 2026",
            "date": "2026-07-06",
            "rice_kg": card["monthly_quota"]["rice_kg"],
            "wheat_kg": card["monthly_quota"]["wheat_kg"],
            "sugar_kg": card["monthly_quota"]["sugar_kg"],
            "amount_paid_inr": card["monthly_quota"]["subsidized_price_total_inr"],
            "auth_mode": "Biometric (Iris / Fingerprint)",
            "status": "SUCCESSFUL"
        },
        {
            "month": "June 2026",
            "date": "2026-06-04",
            "rice_kg": card["monthly_quota"]["rice_kg"],
            "wheat_kg": card["monthly_quota"]["wheat_kg"],
            "sugar_kg": card["monthly_quota"]["sugar_kg"],
            "amount_paid_inr": card["monthly_quota"]["subsidized_price_total_inr"],
            "auth_mode": "Biometric (Iris / Fingerprint)",
            "status": "SUCCESSFUL"
        }
    ])
    
    return {
        **card,
        "aadhaar_linked": True,
        "distribution_history": distribution_history,
        "assigned_fps": assigned_fps
    }

@router.get("/grievances")
def list_grievances(fps_id: Optional[str] = None, status: Optional[str] = None):
    results = COMPLAINTS
    if fps_id:
        results = [c for c in results if c["fps_id"] == fps_id]
    if status and status != "ALL":
        results = [c for c in results if c.get("status") == status]
    return results

@router.get("/grievances/track/{ticket_id}")
def track_grievance(ticket_id: str):
    complaint = next((c for c in COMPLAINTS if c["id"] == ticket_id), None)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint Ticket ID not found")
    return complaint

@router.post("/grievances")
def submit_grievance(payload: ComplaintSubmission):
    fps = next((f for f in FPS_SHOPS if f["id"] == payload.fps_id), None)
    fps_name = fps["name"] if fps else "Designated PDS Center"
    
    # Run Multilingual NLP Classifier
    nlp_res = GrievanceNLPClassifier.classify(payload.complaint_text, payload.language)
    
    new_id = f"GRV-2026-{len(COMPLAINTS) + 1053}"
    complaint_entry = {
        "id": new_id,
        "fps_id": payload.fps_id,
        "fps_name": fps_name,
        "citizen_name": payload.citizen_name,
        "card_no": payload.card_no,
        "language": nlp_res["detected_language"],
        "original_text": payload.complaint_text,
        "translated_text": payload.complaint_text,
        "category": nlp_res["category"],
        "sentiment": nlp_res["sentiment"],
        "urgency": nlp_res["urgency"],
        "created_at": datetime.now().isoformat(),
        "status": "PENDING_REVIEW", # PENDING_REVIEW -> ASSIGNED -> RESOLVED
        "assigned_squad": None,
        "assigned_type": None,
        "verified_with_mste": nlp_res["requires_mste_cross_verification"],
        "nlp_confidence": nlp_res["confidence_score"],
        "timeline": [
            {
                "status": "Submitted",
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "detail": "Grievance received via Citizen Portal"
            },
            {
                "status": "AI Triaged",
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "detail": f"Categorized as [{nlp_res['category']}] with {nlp_res['urgency']} priority"
            }
        ]
    }
    
    COMPLAINTS.insert(0, complaint_entry)
    
    return {
        "status": "SUCCESS",
        "tracking_token": new_id,
        "message": "Your grievance has been registered and triaged by PDS Sentinel AI.",
        "ai_triage_result": nlp_res,
        "complaint": complaint_entry
    }

@router.post("/grievances/{ticket_id}/assign")
def assign_grievance(ticket_id: str, payload: ComplaintAssignment):
    complaint = next((c for c in COMPLAINTS if c["id"] == ticket_id), None)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint Ticket ID not found")
    
    complaint["assigned_squad"] = payload.assigned_squad
    complaint["assigned_type"] = payload.assignment_type
    complaint["status"] = "ASSIGNED"
    
    if "timeline" not in complaint:
        complaint["timeline"] = []
        
    complaint["timeline"].append({
        "status": "Assigned",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "detail": f"Assigned to {payload.assigned_squad} ({payload.assignment_type}). {payload.officer_notes}".strip()
    })
    
    return {
        "status": "SUCCESS",
        "message": f"Complaint {ticket_id} assigned to {payload.assigned_squad}",
        "complaint": complaint
    }

@router.post("/grievances/{ticket_id}/status")
def update_grievance_status(ticket_id: str, payload: ComplaintStatusUpdate):
    complaint = next((c for c in COMPLAINTS if c["id"] == ticket_id), None)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint Ticket ID not found")
    
    complaint["status"] = payload.status
    complaint["resolution_notes"] = payload.resolution_notes
    
    if "timeline" not in complaint:
        complaint["timeline"] = []
        
    complaint["timeline"].append({
        "status": payload.status,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "detail": payload.resolution_notes or f"Status updated to {payload.status}"
    })
    
    return {
        "status": "SUCCESS",
        "message": f"Complaint {ticket_id} updated to {payload.status}",
        "complaint": complaint
    }
