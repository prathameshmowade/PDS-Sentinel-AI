import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  CheckCircle, 
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/api';

const SCENARIOS = [
  {
    id: "DIVERSION_FLOUR_MILL",
    title: "Black Market Commercial Flour Mill Diversion",
    category: "Logistics Diversion & GPS Breach",
    description: "Delivery truck MH-31-8820 halts for 135 mins at a private commercial flour mill in Pardi. Suspected 4.2 MT offloading before reaching Fair Price Shop.",
    badgeBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30"
  },
  {
    id: "GHOST_CARD_SWEEP",
    title: "Midnight Ghost Card Transaction Burst",
    category: "POS Hardware & Biometric Exploit",
    description: "Dealer executes 65 rapid biometric-bypass transactions between 02:00 AM - 04:00 AM using cloned ration card barcodes.",
    badgeBg: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30"
  },
  {
    id: "MONSOON_ROUTE_BLOCK",
    title: "Monsoon Flood Choke Point & Dynamic Re-Routing",
    category: "Supply Chain Resilience",
    description: "NH-53 Eastern Bridge flooded; primary route from Kamptee Silo blocked. AI calculates dynamic green corridor to avoid rural stockout.",
    badgeBg: "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-500/30"
  }
];

export default function Simulator({ onSimulationComplete }) {
  const [selectedScenario, setSelectedScenario] = useState("DIVERSION_FLOUR_MILL");
  const [isRunning, setIsRunning] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleRunSimulation = async (scenarioId = null) => {
    const sc = scenarioId || selectedScenario;
    setIsRunning(true);
    const res = await api.runSimulation(sc);
    setIsRunning(false);
    setSimulationResult(res);

    if (onSimulationComplete) onSimulationComplete();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-12 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="theme-card rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
              <span>Digital Twin Engine • Supply Chain Disruption Workbench</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-sans">
              Supply Chain Resilience & Crisis Sandbox
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl">
              Inject synthetic fraud vectors, corridor bottlenecks, and ghost transactions to evaluate automated PDS Sentinel countermeasures in real time.
            </p>
          </div>

          <button
            onClick={() => handleRunSimulation("RESET_NORMAL")}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors self-start shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Scenario Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          {SCENARIOS.map(sc => {
            const isSelected = selectedScenario === sc.id;
            return (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-sky-50/50 dark:bg-[#121929] border-sky-500 dark:border-sky-500 shadow-sm'
                    : 'bg-slate-50/60 dark:bg-[#0b0e17] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${sc.badgeBg}`}>
                    {sc.category}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full border ${isSelected ? 'bg-sky-600 border-white' : 'border-slate-400 dark:border-slate-600'}`} />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-xs mt-2">{sc.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">{sc.description}</p>
              </div>
            );
          })}
        </div>

        {/* Launch Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => handleRunSimulation()}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center space-x-2"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Injecting Disruption Scenario...' : 'Execute Digital Twin Simulation'}</span>
          </button>
        </div>

      </div>

      {/* Simulation Results Matrix */}
      {simulationResult && simulationResult.disruption_impact && (
        <div className="theme-card rounded-xl p-5 sm:p-6 shadow-sm space-y-4 animate-fadeIn">
          
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-sky-600 dark:text-sky-400">Simulation Run Telemetry</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{simulationResult.title}</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-500/20">
              MITIGATION ACTIVE
            </span>
          </div>

          {/* Side-by-Side Impact Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Legacy PDS Without Sentinel AI */}
            <div className="p-4 rounded-lg bg-rose-50/50 dark:bg-[#201014] border border-rose-200 dark:border-rose-900/60 space-y-2.5">
              <div className="flex items-center space-x-1.5 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Legacy PDS (Reactive Monitoring)</span>
              </div>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-rose-100 dark:border-rose-900/40">
                  <span className="text-slate-500 dark:text-slate-400">Detection Latency:</span>
                  <span className="font-mono font-bold text-rose-700 dark:text-rose-300">14-21 Days (Post Audit)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100 dark:border-rose-900/40">
                  <span className="text-slate-500 dark:text-slate-400">Food Grain Lost:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{simulationResult.disruption_impact.grain_at_risk_mt} MT Diverted</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100 dark:border-rose-900/40">
                  <span className="text-slate-500 dark:text-slate-400">Public Funds Lost:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">₹{simulationResult.disruption_impact.fraud_value_inr?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Citizen Welfare:</span>
                  <span className="font-semibold text-rose-700 dark:text-rose-300">{simulationResult.disruption_impact.affected_beneficiaries} Families Denied</span>
                </div>
              </div>
            </div>

            {/* With PDS Sentinel AI */}
            <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-[#0e1d17] border border-emerald-200 dark:border-emerald-900/60 space-y-2.5">
              <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PDS Sentinel AI (Autonomous Decision Engine)</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-slate-500 dark:text-slate-400">Detection Speed:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{simulationResult.sentinel_ai_response.detection_latency}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-slate-500 dark:text-slate-400">Grain Protected:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{simulationResult.sentinel_ai_response.grain_saved_mt} MT Saved (100%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-slate-500 dark:text-slate-400">Funds Protected:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹{simulationResult.disruption_impact.fraud_value_inr?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">Citizen Impact:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">{simulationResult.sentinel_ai_response.citizen_impact_mitigated}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Autonomous Actions Timeline */}
          <div>
            <h4 className="text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Automated Autonomous Countermeasures Executed</span>
            </h4>

            <div className="space-y-1.5">
              {simulationResult.sentinel_ai_response.automated_actions_taken.map((action, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 p-2.5 rounded bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200">{action}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

// Sync step: 296

// Sync step: 334
