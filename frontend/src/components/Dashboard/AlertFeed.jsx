import React from 'react';
import { 
  AlertCircle, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Flame
} from 'lucide-react';

export default function AlertFeed({ alerts = [], onSelectAlert, onInspectShap, onQuickAction }) {
  const activeAlerts = alerts.filter(a => a.status !== 'RESOLVED');

  return (
    <div className="theme-card rounded-xl p-4 shadow-sm flex flex-col h-[520px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Active Incident Triage</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Multi-Source Trust Engine Surveillance Queue</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 text-[11px] font-mono font-bold">
          {activeAlerts.length} OPEN
        </span>
      </div>

      {/* Feed list */}
      <div className="flex-1 overflow-y-auto pt-3 space-y-2.5 pr-0.5">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2 opacity-80" />
            <span>Zero open anomalies. Pilot jurisdiction fully compliant.</span>
          </div>
        ) : (
          alerts.map(alert => {
            const isCritical = alert.severity === 'CRITICAL';
            const isResolved = alert.status === 'RESOLVED' || alert.status === 'FLYING_SQUAD_DEPLOYED';

            let priorityLabel = 'P0 - CRITICAL';
            let priorityBadge = 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40';
            if (alert.severity === 'HIGH') {
              priorityLabel = 'P1 - HIGH';
              priorityBadge = 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/40';
            } else if (alert.severity === 'MEDIUM') {
              priorityLabel = 'P2 - MEDIUM';
              priorityBadge = 'bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/40';
            }

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  isCritical
                    ? 'bg-rose-50/40 dark:bg-[#181014] border-rose-200 dark:border-rose-900/60 hover:border-rose-300 dark:hover:border-rose-700/80'
                    : 'bg-slate-50/50 dark:bg-[#0f1422] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Meta Row */}
                <div className="flex items-center justify-between text-[10px] mb-1.5 font-mono">
                  <div className="flex items-center space-x-1.5">
                    <span className={`px-1.5 py-0.2 rounded font-bold border ${priorityBadge}`}>
                      {priorityLabel}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">{alert.id}</span>
                  </div>
                  <span className="text-slate-400">
                    {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live'}
                  </span>
                </div>

                {/* Title & Subject */}
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">{alert.title}</h4>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 flex items-center space-x-1">
                  <span className="text-sky-700 dark:text-sky-400 font-semibold">{alert.fps_name}</span>
                  <span className="text-slate-400 font-mono">({alert.fps_id})</span>
                </div>

                {/* Quantitative Impact Box */}
                <div className="mt-2 bg-white dark:bg-[#0b0e17] rounded p-2 border border-slate-200 dark:border-slate-800/80 text-[10px] font-mono shadow-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pb-1 border-b border-slate-100 dark:border-slate-800/60">
                    <span>At-Risk: <b className="text-rose-600 dark:text-rose-400">{alert.estimated_leakage_mt} MT</b></span>
                    <span>Loss: <b className="text-amber-600 dark:text-amber-400">₹{alert.estimated_fraud_value_inr?.toLocaleString()}</b></span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 pt-1 line-clamp-2 font-sans text-[11px]">
                    {alert.evidence_chain?.[0]?.detail || alert.ai_recommended_action}
                  </div>
                </div>

                {/* Action Row */}
                <div className="mt-2.5 flex items-center justify-between pt-1">
                  <button
                    onClick={() => onInspectShap(alert)}
                    className="flex items-center space-x-1 text-[11px] font-medium text-sky-700 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Explain AI (SHAP)</span>
                  </button>

                  <div>
                    {alert.status === 'ACTION_REQUIRED' ? (
                      <button
                        onClick={() => onQuickAction(alert.id, 'DISPATCH_FLYING_SQUAD')}
                        className="px-2.5 py-1 text-[11px] font-bold rounded bg-rose-700 hover:bg-rose-600 text-white transition-all flex items-center space-x-1 shadow-xs"
                      >
                        <span>Dispatch Squad</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{alert.status.replace(/_/g, ' ')}</span>
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

// Sync step: 246

// Sync step: 278

// Sync step: 328

// Sync step: 246

// Sync step: 278

// Sync step: 328
