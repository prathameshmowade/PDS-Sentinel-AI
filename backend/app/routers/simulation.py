from fastapi import APIRouter
from pydantic import BaseModel
from app.simulation_engine import DigitalTwinSimulator

router = APIRouter(prefix="/api/simulation", tags=["Digital Twin Simulation"])

class SimulationRequest(BaseModel):
    scenario_type: str # DIVERSION_FLOUR_MILL, GHOST_CARD_SWEEP, MONSOON_ROUTE_BLOCK, RESET_NORMAL

@router.post("/run")
def run_simulation_scenario(payload: SimulationRequest):
    result = DigitalTwinSimulator.run_scenario(payload.scenario_type)
    return result
