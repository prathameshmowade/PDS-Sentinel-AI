"""

PDS Sentinel AI - Master FastAPI Application

AI-Driven Predictive Prevention, Decision Copilot, and Multi-Source Trust Engine

for Indian Public Distribution System (PDS)

"""

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.routers import stats, fps, trucks, alerts, citizen, simulation, copilot

app = FastAPI(

    title="PDS Sentinel AI Decision Engine",

    description="Predictive Prevention, Multi-Source Trust Engine, Explainable AI, and Digital Twin for Public Distribution Systems.",

    version="2.0.0"

)

# Enable CORS for Frontend

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)

# Include Routers

app.include_router(stats.router)

app.include_router(fps.router)

app.include_router(trucks.router)

app.include_router(alerts.router)

app.include_router(citizen.router)

app.include_router(simulation.router)

app.include_router(copilot.router)

@app.get("/")

def root_info():

    return {

        "platform": "PDS Sentinel AI",

        "team": "Pragati 2.0",

        "status": "ONLINE",

        "description": "AI-Powered PDS Governance, Anomaly Prevention, and Decision Support Engine",

        "endpoints": {

            "stats": "/api/stats",

            "fps_list": "/api/fps",

            "trucks": "/api/trucks",

            "alerts": "/api/alerts",

            "citizen_portal": "/api/citizen",

            "simulation": "/api/simulation",

            "copilot": "/api/copilot/chat"

        }

    }

if __name__ == "__main__":

    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
