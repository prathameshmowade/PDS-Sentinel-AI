import math

from fastapi import APIRouter, HTTPException, Query

from typing import Optional, List

from app.data_store import FPS_SHOPS, TRUCKS, COMPLAINTS, DEPOTS

from app.mste_engine import MultiSourceTrustEngine

from app.ml_anomaly import ml_engine

router = APIRouter(prefix="/api/fps", tags=["Fair Price Shops"])

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:

    # returns distance in km

    R = 6371.0

    dlat = math.radians(lat2 - lat1)

    dlon = math.radians(lon2 - lon1)

    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return round(R * c, 2)

@router.get("")

def list_fair_price_shops(risk_filter: Optional[str] = None, search: Optional[str] = None):

    results = []

    for fps in FPS_SHOPS:

        if risk_filter and fps["risk_level"].upper() != risk_filter.upper():

            continue

        if search:

            q = search.lower()

            if not (q in fps["name"].lower() or q in fps["dealer_name"].lower() or q in fps["address"].lower() or q in fps["id"].lower()):

                continue

        results.append(fps)

    return results

@router.get("/{fps_id}")

def get_fps_details(fps_id: str):

    fps = next((f for f in FPS_SHOPS if f["id"] == fps_id), None)

    if not fps:

        raise HTTPException(status_code=404, detail=f"FPS with ID {fps_id} not found")

    

    # Run MSTE evaluation

    mste_result = MultiSourceTrustEngine.evaluate_fps(fps, TRUCKS, COMPLAINTS)

    

    # Run ML Anomaly & SHAP breakdown

    fps_complaints = [c for c in COMPLAINTS if c["fps_id"] == fps_id]

    features = {

        "weight_discrepancy_kg": 4200.0 if fps["risk_level"] == "CRITICAL" else (900.0 if fps["risk_level"] == "MEDIUM" else 15.0),

        "gps_route_deviation_minutes": 135.0 if fps["risk_level"] == "CRITICAL" else 0.0,

        "night_pos_transactions": 46.0 if fps["risk_level"] == "CRITICAL" else 0.0,

        "pos_velocity_speedup": 6.0 if fps["risk_level"] == "CRITICAL" else 85.0,

        "complaint_surge_count": float(len(fps_complaints)),

        "stock_depletion_variance": 4.2 if fps["risk_level"] == "CRITICAL" else 1.0

    }

    ml_result = ml_engine.predict_fps_risk(features)

    

    return {

        "details": fps,

        "mste_evaluation": mste_result,

        "ml_anomaly_prediction": ml_result,

        "complaints": fps_complaints,

        "assigned_depot_info": next((d for d in DEPOTS if d["id"] == fps.get("assigned_depot")), None)

    }

@router.get("/nearby/search")

def find_nearby_fps(lat: float = Query(...), lng: float = Query(...), radius_km: float = Query(15.0), verified_only: bool = Query(False)):

    """

    Used by the Citizen Portal to find nearby verified alternative Fair Price Shops

    with real-time stock availability when assigned shop is closed/anomalous.

    """

    nearby = []

    for fps in FPS_SHOPS:

        dist = haversine_distance(lat, lng, fps["lat"], fps["lng"])

        if dist <= radius_km:

            if verified_only and fps["risk_level"] in ["HIGH", "CRITICAL"]:

                continue

            nearby.append({

                **fps,

                "distance_km": dist,

                "is_recommended": fps["trust_score"] >= 85.0,

                "stock_available_summary": f"Rice: {fps['current_stock_mt']['rice']} MT | Wheat: {fps['current_stock_mt']['wheat']} MT"

            })

    

    nearby.sort(key=lambda x: (not x["is_recommended"], x["distance_km"]))

    return nearby159184209233265313351379
