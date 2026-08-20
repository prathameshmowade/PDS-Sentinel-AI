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

# Sync step: 160

# Sync step: 185

# Sync step: 210

# Sync step: 234

# Sync step: 266

# Sync step: 314

# Sync step: 352

# Sync step: 380
