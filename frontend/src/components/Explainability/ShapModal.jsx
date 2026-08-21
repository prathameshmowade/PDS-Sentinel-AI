import React from 'react';

import { 

  X, 

  Brain, 

  ShieldAlert, 

  Zap, 

  CheckCircle2, 

  FileText

} from 'lucide-react';

export default function ShapModal({ alert, onClose, onExecuteAction }) {

  if (!alert) return null;

  const shapData = alert.shap_breakdown || {

    weight_discrepancy: 38.5,

    gps_route_deviation: 27.2,

    night_pos_transactions: 19.1,

    citizen_complaint_surge: 15.2

  };

  const handleActionClick = (actionType) => {

    onExecuteAction(alert.id, actionType);

    onClose();

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        

        {/* Modal Header */}

        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0d17]">

          <div className="flex items-center space-x-3">

            <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">

              <ShieldAlert className="w-5 h-5" />

            </div>

            <div>

              <div className="flex items-center space-x-2 text-[10px] font-mono font-semibold uppercase text-slate-500 dark:text-slate-400">

                <span className="text-rose-600 dark:text-rose-400 font-bold">{alert.severity} ANOMALY</span>

                <span>•</span>

                <span>CASE ID: {alert.id}</span>

              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">{alert.title}</h3>

            </div>

          </div>

          <button

            onClick={onClose}

            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"

          >

            <X className="w-4 h-4" />

          </button>

        </div>

        {/* Content Body */}

        <div className="p-5 space-y-4 overflow-y-auto text-xs font-sans">

          

          {/* Target Shop Summary */}

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#080b12] border border-slate-200 dark:border-slate-800 flex items-center justify-between">

            <div>

              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono font-medium">Target Fair Price Shop</span>

              <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{alert.fps_name} ({alert.fps_id})</div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400">Dealer: Suresh Chawla • Ward 24, Itwari Cotton Market</div>

            </div>

            <div className="text-right font-mono">

              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-medium">MSTE Trust Index</span>

              <div className="text-base font-bold text-rose-600 dark:text-rose-400">{alert.mste_trust_score || 24.2} / 100</div>

              <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">Critical Diversion Tier</div>

            </div>

          </div>

          {/* Explainable AI (SHAP) Feature Attribution */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 flex items-center space-x-1.5 font-mono">

                <Zap className="w-3.5 h-3.5 text-amber-500" />

                <span>Explainable AI (SHAP) Feature Attribution Breakdown</span>

              </h4>

              <span className="text-[10px] text-slate-400 font-mono">Total Impact: 100%</span>

            </div>

            <div className="space-y-2.5 bg-slate-50 dark:bg-[#080b12] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800">

              {Object.entries(shapData).map(([featureKey, percentage]) => {

                const cleanName = featureKey

                  .replace(/_/g, ' ')

                  .replace(/\b\w/g, l => l.toUpperCase());

                return (

                  <div key={featureKey}>

                    <div className="flex justify-between text-[11px] mb-1 font-mono">

                      <span className="text-slate-700 dark:text-slate-300 font-sans">{cleanName}</span>

                      <span className="font-bold text-sky-700 dark:text-sky-400">+{percentage}%</span>

                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">

                      <div

                        className="bg-gradient-to-r from-sky-500 to-rose-500 h-full rounded-full transition-all"

                        style={{ width: `${percentage}%` }}

                      />

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

          {/* Multi-Source Evidence Chain */}

          <div>

            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-2 flex items-center space-x-1.5 font-mono">

              <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />

              <span>Multi-Source Evidentiary Audit Trail</span>

            </h4>

            <div className="space-y-1.5">

              {alert.evidence_chain?.map((item, idx) => (

                <div key={idx} className="flex items-start space-x-2.5 p-2.5 rounded bg-slate-50 dark:bg-[#080b12] border border-slate-200 dark:border-slate-800 text-[11px]">

                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 flex-shrink-0" />

                  <div>

                    <span className="font-bold text-sky-700 dark:text-sky-300 font-mono text-[10px] uppercase">[{item.source}]: </span>

                    <span className="text-slate-800 dark:text-slate-200">{item.detail}</span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Recommended Enforcement Action */}

          <div className="p-3.5 rounded-lg bg-sky-50 dark:bg-[#0c1424] border border-sky-200 dark:border-sky-500/20">

            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 font-mono flex items-center space-x-1">

              <Brain className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />

              <span>Decision Copilot Recommended Enforcement</span>

            </span>

            <p className="text-[11px] text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">

              {alert.ai_recommended_action}

            </p>

          </div>

        </div>

        {/* Action Footer */}

        <div className="px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0d17] flex flex-wrap items-center justify-between gap-2">

          <div className="flex items-center space-x-2">

            <button

              onClick={() => handleActionClick('FREEZE_QUOTA')}

              className="px-3 py-1.5 text-xs font-semibold rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs"

            >

              Freeze Quota

            </button>

            <button

              onClick={() => handleActionClick('ORDER_SURPRISE_AUDIT')}

              className="px-3 py-1.5 text-xs font-semibold rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs"

            >

              Order Surprise Audit

            </button>

          </div>

          <button

            onClick={() => handleActionClick('DISPATCH_FLYING_SQUAD')}

            className="px-4 py-1.5 text-xs font-bold rounded bg-rose-700 hover:bg-rose-600 text-white transition-all flex items-center space-x-1.5 shadow-xs"

          >

            <ShieldAlert className="w-3.5 h-3.5" />

            <span>Deploy Flying Squad</span>

          </button>

        </div>

      </div>

    </div>

  );

}
