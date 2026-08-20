@echo off
title PDS Sentinel AI Launcher
echo ========================================================
echo       PDS SENTINEL AI - Decision Support System
echo       AI SDG Global Hackathon 2026 - Pragati 2.0
echo ========================================================
echo.

echo Starting FastAPI Decision Engine on http://localhost:8000 ...
start "PDS Sentinel Backend" cmd /k "cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo Starting Vite React Frontend on http://localhost:5173 ...
start "PDS Sentinel Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo All servers launched!
echo - Government Officer Command Center: http://localhost:5173
echo - FastAPI Backend Documentation:     http://localhost:8000/docs
echo ========================================================
pause

# Sync step: 367

# Sync step: 367
