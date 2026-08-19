import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Radio, 
  Users, 
  Cpu, 
  Bell, 
  RefreshCw, 
  Layers, 
  Terminal, 
  Sun, 
  Moon,
  LogOut
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  unreadAlertsCount, 
  onRefresh, 
  isRefreshing, 
  onOpenCopilot,
  theme,
  onToggleTheme,
  currentUser,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md transition-colors">
      
      {/* Top Telemetry & Pilot Status Strip */}
      <div className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-900 text-slate-300 dark:bg-[#080b11] px-4 sm:px-6 py-1 text-[11px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-100">MSTE ENGINE ACTIVE</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center space-x-1 text-slate-300">
              <span>PILOT JURISDICTION:</span>
              <b className="text-white font-mono">MAHARASHTRA / NAGPUR DISTRICT (HUB-04)</b>
            </span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[10px] text-slate-300">
            <span className="hidden md:inline">LATENCY: <b className="text-emerald-400">24ms</b></span>
            <span className="hidden md:inline">NFSA FEED: <b className="text-white">SYNCED</b></span>
            <span>LOGGED AS: <b className="text-sky-300 uppercase">{currentUser?.name || 'P. MOWADE (DSO)'}</b></span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 py-2">
          
          {/* Brand & Govt Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white font-sans">
                  PDS<span className="text-sky-600 dark:text-sky-400">SENTINEL</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-normal font-sans">
                Department of Food & Civil Supplies • Vigilance Intelligence
              </p>
            </div>
          </div>

          {/* Clean Segmented Navigation Control with Distinct Borders */}
          <nav className="hidden lg:flex items-center space-x-1.5 p-1.5 bg-slate-100/90 dark:bg-[#111726]/90 rounded-xl border border-slate-300 dark:border-slate-700/80 text-xs shadow-2xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                activeTab === 'dashboard'
                  ? 'bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-400 border-sky-400 dark:border-sky-500 shadow-xs ring-1 ring-sky-500/20'
                  : 'bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Command Center</span>
            </button>

            <button
              onClick={() => setActiveTab('gis_map')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                activeTab === 'gis_map'
                  ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border-emerald-400 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-500/20'
                  : 'bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Fleet GIS</span>
            </button>

            <button
              onClick={() => setActiveTab('fps_directory')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                activeTab === 'fps_directory'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-400 dark:border-slate-500 shadow-xs ring-1 ring-slate-400/20'
                  : 'bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>FPS Trust Grid</span>
            </button>

            <button
              onClick={() => setActiveTab('citizen_portal')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                activeTab === 'citizen_portal'
                  ? 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 border-amber-400 dark:border-amber-500 shadow-xs ring-1 ring-amber-500/20'
                  : 'bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Citizen Redressal</span>
            </button>

            <button
              onClick={() => setActiveTab('digital_twin')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                activeTab === 'digital_twin'
                  ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 border-indigo-400 dark:border-indigo-500 shadow-xs ring-1 ring-indigo-500/20'
                  : 'bg-white/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Digital Twin Sandbox</span>
            </button>
          </nav>

          {/* Action Center with User Badge & Logout */}
          <div className="flex items-center space-x-2">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
              className="p-2 rounded-lg bg-white dark:bg-[#111726] border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* AI Copilot Action */}
            <button
              onClick={onOpenCopilot}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 dark:bg-[#161f32] hover:bg-sky-100 dark:hover:bg-[#1e293b] text-sky-700 dark:text-sky-200 border border-sky-300 dark:border-sky-500/30 shadow-2xs transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>AI Copilot</span>
              <span className="text-[10px] font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hidden sm:inline">
                ⌘K
              </span>
            </button>

            <button
              onClick={onRefresh}
              title="Sync Latest Telemetry"
              className="p-2 rounded-lg bg-white dark:bg-[#111726] border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-600 dark:text-sky-400' : ''}`} />
            </button>

            <div className="relative">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="p-2 rounded-lg bg-white dark:bg-[#111726] border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative shadow-2xs"
              >
                <Bell className="w-3.5 h-3.5" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-mono font-bold text-white">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                title="Log Out of PDS Sentinel"
                className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors ml-1 shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Mobile Tabs with Distinct Borders */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d121c] p-2 text-xs gap-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-all ${
            activeTab === 'dashboard'
              ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border-sky-400 dark:border-sky-500 shadow-xs'
              : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('gis_map')}
          className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-all ${
            activeTab === 'gis_map'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-emerald-400 dark:border-emerald-500 shadow-xs'
              : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          Fleet GIS
        </button>
        <button
          onClick={() => setActiveTab('fps_directory')}
          className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-all ${
            activeTab === 'fps_directory'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-400 dark:border-slate-500 shadow-xs'
              : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          FPS Grid
        </button>
        <button
          onClick={() => setActiveTab('citizen_portal')}
          className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-all ${
            activeTab === 'citizen_portal'
              ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border-amber-400 dark:border-amber-500 shadow-xs'
              : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          Citizen
        </button>
        <button
          onClick={() => setActiveTab('digital_twin')}
          className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-all ${
            activeTab === 'digital_twin'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-400 dark:border-indigo-500 shadow-xs'
              : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          Digital Twin
        </button>
      </div>

    </header>
  );
}

// Sync step: 216

// Sync step: 248

// Sync step: 280

// Sync step: 294

// Sync step: 332

// Sync step: 216

// Sync step: 248

// Sync step: 280

// Sync step: 294
