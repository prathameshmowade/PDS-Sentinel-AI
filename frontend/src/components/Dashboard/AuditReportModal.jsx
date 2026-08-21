import React from 'react';

import { 

  X, 

  Download, 

  Printer, 

  FileText, 

  ShieldCheck, 

  Scale, 

  AlertTriangle, 

  CheckCircle2, 

  Building

} from 'lucide-react';



export default function AuditReportModal({ isOpen, onClose, stats, fpsList, alerts, trucks }) {

  if (!isOpen) return null;



  const printReport = () => {

    window.print();

  };



  const currentDate = new Date().toLocaleDateString('en-IN', {

    day: '2-digit',

    month: 'long',

    year: 'numeric'

  });



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">

      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0f1422] border border-slate-300 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

        

        {/* Modal Controls Header */}

        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0d17]">

          <div className="flex items-center space-x-2">

            <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />

            <h3 className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wide">

              Official Food Security Surveillance Audit Report

            </h3>

          </div>



          <div className="flex items-center space-x-2">

            <button

              onClick={printReport}

              className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center space-x-1 transition-colors"

            >

              <Printer className="w-3.5 h-3.5" />

              <span>Print / PDF</span>

            </button>



            <button

              onClick={onClose}

              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"

            >

              <X className="w-4 h-4" />

            </button>

          </div>

        </div>



        {/* Report Document Content */}

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-800 dark:text-slate-200 font-sans bg-white dark:bg-[#0f1422]" id="printable-audit-report">

          

          {/* Official Letterhead */}

          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 text-center space-y-1">

            <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-600 dark:text-slate-400">

              Government of Maharashtra • Department of Food, Civil Supplies & Consumer Protection

            </div>

            <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-slate-900 dark:text-white">

              Public Distribution System (PDS) Vigilance & Intelligence Audit Dossier

            </h2>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">

              Pilot Jurisdiction: Nagpur Urban & Rural Division (Hub-04) • Date: {currentDate}

            </div>

          </div>



          {/* Executive Summary Metrics */}

          <div>

            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">

              1. Executive Quantitative Summary

            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-[#080b12] p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono">

              <div>

                <div className="text-[10px] text-slate-500 uppercase">Grain Protected</div>

                <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">{stats?.impact_metrics?.grain_saved_tons || 148.5} MT</div>

              </div>

              <div>

                <div className="text-[10px] text-slate-500 uppercase">Public Funds Saved</div>

                <div className="text-base font-bold text-slate-900 dark:text-white">₹{((stats?.impact_metrics?.public_funds_protected_inr || 5940000)/100000).toFixed(2)} Lakhs</div>

              </div>

              <div>

                <div className="text-[10px] text-slate-500 uppercase">Shops Monitored</div>

                <div className="text-base font-bold text-slate-900 dark:text-white">{fpsList.length} Units</div>

              </div>

              <div>

                <div className="text-[10px] text-slate-500 uppercase">Critical Anomalies</div>

                <div className="text-base font-bold text-rose-600 dark:text-rose-400">{alerts.filter(a => a.severity === 'CRITICAL').length} Open</div>

              </div>

            </div>

          </div>



          {/* Active Forensic Case Dossiers */}

          <div>

            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">

              2. Open Forensic Anomaly Dossiers (Multi-Source Trust Engine)

            </h4>

            <div className="space-y-3">

              {alerts.map(alert => (

                <div key={alert.id} className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#080b12] space-y-2">

                  <div className="flex items-center justify-between text-[11px] font-mono">

                    <span className="font-bold text-slate-900 dark:text-white">Case #{alert.id}: {alert.fps_name}</span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${alert.severity === 'CRITICAL' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400' : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'}`}>

                      {alert.severity} • Trust: {alert.mste_trust_score}/100

                    </span>

                  </div>

                  <p className="text-[11px] text-slate-700 dark:text-slate-300">{alert.title}</p>

                  

                  <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0f1422] p-2 rounded border border-slate-200 dark:border-slate-800 space-y-1">

                    <div><b>At-Risk Grain:</b> {alert.estimated_leakage_mt} MT | <b>Estimated Loss:</b> ₹{alert.estimated_fraud_value_inr?.toLocaleString()}</div>

                    <div><b>AI Recommended Enforcement:</b> {alert.ai_recommended_action}</div>

                    <div><b>Status:</b> {alert.status.replace(/_/g, ' ')}</div>

                  </div>

                </div>

              ))}

            </div>

          </div>



          {/* Fair Price Shop Compliance Summary Table */}

          <div>

            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">

              3. Fair Price Shop (FPS) Registry Status

            </h4>

            <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">

              <table className="w-full text-left text-[11px]">

                <thead className="bg-slate-100 dark:bg-[#080b12] font-mono uppercase text-[10px] text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">

                  <tr>

                    <th className="py-2 px-3">FPS ID</th>

                    <th className="py-2 px-3">Name & Dealer</th>

                    <th className="py-2 px-3">MSTE Trust</th>

                    <th className="py-2 px-3">Stock Balance</th>

                    <th className="py-2 px-3">Status</th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">

                  {fpsList.map(fps => (

                    <tr key={fps.id}>

                      <td className="py-2 px-3 font-bold text-sky-700 dark:text-sky-400">{fps.id}</td>

                      <td className="py-2 px-3 font-sans font-medium text-slate-900 dark:text-slate-200">{fps.name} ({fps.dealer_name})</td>

                      <td className="py-2 px-3">{fps.trust_score}/100</td>

                      <td className="py-2 px-3">Rice {fps.current_stock_mt?.rice} MT</td>

                      <td className="py-2 px-3 uppercase text-[10px]">{fps.inspection_status?.replace(/_/g, ' ')}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>



          {/* Official Sign-off block */}

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end text-[11px] font-mono text-slate-600 dark:text-slate-400">

            <div>

              <div>System: PDS Sentinel Decision Engine v2.4</div>

              <div>Digital Certificate: SHA256-AUTHENTICATED</div>

            </div>

            <div className="text-right">

              <div className="h-10 border-b border-slate-400 w-44 mb-1"></div>

              <div>District Supply Officer (DSO)</div>

              <div>Nagpur Division</div>

            </div>

          </div>



        </div>



      </div>

    </div>

  );

}291329
