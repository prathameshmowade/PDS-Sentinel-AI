import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Scale, 
  Eye, 
  Download, 
  Smartphone,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function FPSDirectory({ fpsList = [], onSelectFPS }) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const filtered = fpsList.filter(fps => {
    const matchesSearch = 
      fps.name.toLowerCase().includes(search.toLowerCase()) ||
      fps.dealer_name.toLowerCase().includes(search.toLowerCase()) ||
      fps.id.toLowerCase().includes(search.toLowerCase()) ||
      fps.address.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || fps.risk_level === riskFilter;

    return matchesSearch && matchesRisk;
  });

  const handleExportCSV = () => {
    const headers = "FPS_ID,Name,Dealer,District,Trust_Score,Risk_Level,Stock_Rice_MT,Stock_Wheat_MT,Status\n";
    const rows = filtered.map(f => `"${f.id}","${f.name}","${f.dealer_name}","${f.district}",${f.trust_score},"${f.risk_level}",${f.current_stock_mt?.rice || 0},${f.current_stock_mt?.wheat || 0},"${f.inspection_status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PDS_Sentinel_FPS_Registry_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <div className="theme-card rounded-xl p-4 sm:p-5 shadow-sm mt-5">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <Scale className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Fair Price Shop (FPS) Trust & Compliance Registry</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Continuous multi-stream surveillance evaluating {fpsList.length} registered distribution centers in Nagpur District.
          </p>
        </div>

        {/* Search, Filter & Export */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search dealer, shop ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 text-xs rounded-lg pl-8 pr-3 py-1.5 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 w-44 sm:w-56"
            />
          </div>

          <select
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            className="bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Risk Tiers</option>
            <option value="LOW">Low Risk (Safe)</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Anomaly</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Dense Table */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono uppercase text-[10px] tracking-wider bg-slate-50 dark:bg-[#0d121c]">
              <th className="py-2.5 px-3">FPS Identifier & Dealer</th>
              <th className="py-2.5 px-3">MSTE Trust Score</th>
              <th className="py-2.5 px-3">Risk Tier</th>
              <th className="py-2.5 px-3">Current Stock</th>
              <th className="py-2.5 px-3">Scale / Hardware</th>
              <th className="py-2.5 px-3">Enforcement Status</th>
              <th className="py-2.5 px-3 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
            {filtered.map(fps => {
              const isCrit = fps.risk_level === 'CRITICAL';
              const isHigh = fps.risk_level === 'HIGH';
              const isLow = fps.risk_level === 'LOW';

              let scoreBg = 'bg-emerald-500';
              if (isCrit) scoreBg = 'bg-rose-500';
              else if (isHigh || fps.risk_level === 'MEDIUM') scoreBg = 'bg-amber-500';

              return (
                <tr key={fps.id} className="theme-table-row">
                  
                  {/* Shop & Dealer */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{fps.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center space-x-1.5 mt-0.5">
                      <span className="font-mono text-sky-600 dark:text-sky-400 font-medium">{fps.id}</span>
                      <span>•</span>
                      <span>Dealer: {fps.dealer_name}</span>
                    </div>
                    <div className="text-slate-400 text-[10px] truncate max-w-xs">{fps.address}</div>
                  </td>

                  {/* Trust Score */}
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-14 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${scoreBg}`}
                          style={{ width: `${Math.min(100, Math.max(5, fps.trust_score))}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">{fps.trust_score}</span>
                    </div>
                  </td>

                  {/* Risk Badge */}
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                        isCrit
                          ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30'
                          : isHigh || fps.risk_level === 'MEDIUM'
                          ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                          : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                      }`}
                    >
                      {fps.risk_level}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-3 font-mono text-[11px]">
                    <div className="text-slate-800 dark:text-slate-200">Rice: <b>{fps.current_stock_mt?.rice}</b> MT</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[10px]">Wheat: {fps.current_stock_mt?.wheat} MT</div>
                  </td>

                  {/* Hardware */}
                  <td className="py-3 px-3">
                    <div className="text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                      <Smartphone className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[130px]">{fps.weighing_scale_type}</span>
                    </div>
                    <div className="text-slate-400 font-mono text-[10px]">{fps.pos_device_id}</div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-mono font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0b0e17] px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                      {fps.inspection_status?.replace(/_/g, ' ') || 'Operational'}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onSelectFPS(fps.id)}
                      className="px-2.5 py-1 rounded bg-sky-50 dark:bg-[#161f32] hover:bg-sky-100 dark:hover:bg-[#1e293b] text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 font-medium text-xs flex items-center space-x-1 ml-auto transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Audit</span>
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// Sync step: 292

// Sync step: 330
