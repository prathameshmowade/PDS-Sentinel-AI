# PDS Sentinel AI Launcher Script (PowerShell)
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "      PDS SENTINEL AI - Decision Support System" -ForegroundColor Yellow
Write-Host "      AI SDG Global Hackathon 2026 - Pragati 2.0" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan

# Start Backend in new process
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

# Start Frontend in new process
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`nServers launched successfully!" -ForegroundColor Green
Write-Host "-> Dashboard & Citizen Portal: http://localhost:5173" -ForegroundColor White
Write-Host "-> FastAPI Interactive Swagger: http://localhost:8000/docs" -ForegroundColor White

# Sync step: 368
