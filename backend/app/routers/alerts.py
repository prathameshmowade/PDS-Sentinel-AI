from fastapi import APIRouter, HTTPException

from pydantic import BaseModel

from typing import Optional

from datetime import datetime

from app.data_store import ALERTS, FPS_SHOPS

router = APIRouter(prefix="/api/alerts", tags=["AI Fraud Alerts & Decision Copilot"])

class AlertActionRequest(BaseModel):

    action_type: str # DISPATCH_FLYING_SQUAD, FREEZE_QUOTA, SUSPEND_DEALER, REALLOCATE_STOCK, ORDER_SURPRISE_AUDIT, DISMISS

    officer_notes: Optional[str] = "Executed via Sentinel AI Decision Copilot"

    assigned_squad_unit: Optional[str] = "Zone Vigilance Flying Squad #2"

@router.get("")

def list_alerts(severity: Optional[str] = None, status: Optional[str] = None):

    results = []

    for a in ALERTS:

        if severity and a["severity"].upper() != severity.upper():

            continue

        if status and a["status"].upper() != status.upper():

            continue

        results.append(a)

    return results

@router.get("/{alert_id}")

def get_alert_detail(alert_id: str):

    alert = next((a for a in ALERTS if a["id"] == alert_id), None)

    if not alert:

        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")

    return alert

@router.post("/{alert_id}/action")

def execute_copilot_action(alert_id: str, payload: AlertActionRequest):

    alert = next((a for a in ALERTS if a["id"] == alert_id), None)

    if not alert:

        raise HTTPException(status_code=404, detail=f"Alert {alert_id} not found")

    

    action_timestamp = datetime.now().isoformat()

    alert["action_history"].append({

        "timestamp": action_timestamp,

        "action": payload.action_type,

        "officer_notes": payload.officer_notes,

        "assigned_squad": payload.assigned_squad_unit

    })

    

    fps = next((f for f in FPS_SHOPS if f["id"] == alert["fps_id"]), None)

    if payload.action_type == "DISPATCH_FLYING_SQUAD":

        alert["status"] = "FLYING_SQUAD_DEPLOYED"

        alert["assigned_squad"] = payload.assigned_squad_unit

        if fps:

            fps["inspection_status"] = "FLYING_SQUAD_DEPLOYED"

    elif payload.action_type == "FREEZE_QUOTA":

        alert["status"] = "QUOTA_FROZEN"

        if fps:

            fps["tags"].append("Quota Frozen")

            fps["inspection_status"] = "QUOTA_LOCKED"

    elif payload.action_type == "SUSPEND_DEALER":

        alert["status"] = "LICENSE_SUSPENDED"

        if fps:

            fps["inspection_status"] = "LICENSE_SUSPENDED"

            fps["risk_level"] = "SUSPENDED"

    elif payload.action_type == "REALLOCATE_STOCK":

        alert["status"] = "STOCK_REALLOCATED"

        if fps:

            fps["inspection_status"] = "STOCK_DIVERTED_TO_BACKUP"

    elif payload.action_type == "ORDER_SURPRISE_AUDIT":

        alert["status"] = "AUDIT_UNDERWAY"

        if fps:

            fps["inspection_status"] = "SURPRISE_AUDIT_ORDERED"

    elif payload.action_type == "DISMISS":

        alert["status"] = "RESOLVED"

    return {

        "status": "SUCCESS",

        "message": f"Action '{payload.action_type}' successfully applied to alert {alert_id}.",

        "updated_alert": alert

    }156181206230262310348376
