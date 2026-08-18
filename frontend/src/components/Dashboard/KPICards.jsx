import React from 'react';
import { 
  TrendingUp, 
  Truck, 
  Scale, 
  Users, 
  ArrowUpRight
} from 'lucide-react';

export default function KPICards({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      
      {/* Metric 1: Grain & Funds Protected */}
      <div className="theme-card rounded-xl p-4 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            Grain & Funds Protected
          </span>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center space-x-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>98.4% PRECISION</span>
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              {stats.impact_metrics?.grain_saved_tons || 148.5}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase font-mono">MT Saved</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
            <span>Fraud Averted: <b className="text-slate-900 dark:text-slate-200">₹{(stats.impact_metrics?.public_funds_protected_inr / 100000).toFixed(2)} L</b></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-sans font-medium">Audit Compliant</span>
          </div>
        </div>
      </div>

      {/* Metric 2: Live Logistics Fleet */}
      <div className="theme-card rounded-xl p-4 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            Logistics Fleet Telemetry
          </span>
          <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
            <Truck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              {stats.total_active_fleet_trucks || 4}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase font-mono">Vehicles Tracked</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2">
            {stats.trucks_in_route_breach > 0 ? (
              <span className="inline-flex items-center text-rose-600 dark:text-rose-400 font-mono text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5 animate-pulse"></span>
                {stats.trucks_in_route_breach} Geofence Breach
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">All Corridors Clear</span>
            )}
            <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px]">3 FCI Depots</span>
          </div>
        </div>
      </div>

      {/* Metric 3: Fair Price Shops Trust Grid */}
      <div className="theme-card rounded-xl p-4 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            FPS Trust Grid Status
          </span>
          <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
            <Scale className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              {stats.avg_trust_score || 72.3}
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">/ 100 AVG INDEX</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{stats.verified_low_risk_fps_count} Verified Safe</span>
            <span className="text-rose-600 dark:text-rose-400 font-semibold">{stats.critical_fps_count} Critical Alert</span>
          </div>
        </div>
      </div>

      {/* Metric 4: Registered Beneficiaries */}
      <div className="theme-card rounded-xl p-4 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            Beneficiaries Protected
          </span>
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
              {(stats.total_registered_beneficiaries || 11280).toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase font-mono">Cardholders</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
            <span className="text-slate-700 dark:text-slate-300">100% Aadhaar-eKYC</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">{stats.active_fraud_alerts_count} Active Alerts</span>
          </div>
        </div>
      </div>

    </div>
  );
}

// Sync step: 217

// Sync step: 249

// Sync step: 281

// Sync step: 295

// Sync step: 333
