import React from 'react';
import { 
  ShieldCheck, 
  User, 
  Sun, 
  Moon, 
  LogOut, 
  Languages, 
  Sparkles,
  Phone
} from 'lucide-react';

export default function CitizenHeader({ 
  currentUser, 
  onLogout, 
  theme, 
  onToggleTheme,
  currentLang,
  onChangeLang
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-[#0b0f17]/95 backdrop-blur-md transition-colors">
      
      {/* Top Banner Strip */}
      <div className="border-b border-slate-200 dark:border-slate-800/60 bg-emerald-900 text-emerald-100 dark:bg-[#08170f] px-4 sm:px-6 py-1 text-[11px]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>NATIONAL FOOD SECURITY ACT (NFSA) • MAHARASHTRA CITIZEN PORTAL</span>
          </div>
          <div className="flex items-center space-x-3 text-[10px] font-mono">
            <span className="hidden sm:inline flex items-center space-x-1">
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>TOLL FREE: 1967</span>
            </span>
            <span>PORTABILITY: <b className="text-white">ONORC ENABLED</b></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                  Maha<span className="text-emerald-600 dark:text-emerald-400">PDS</span> Citizen Portal
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                  BENEFICIARY
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Department of Food, Civil Supplies & Consumer Protection
              </p>
            </div>
          </div>

          {/* Right Action Center */}
          <div className="flex items-center space-x-2">
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-[#111726] p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium">
              <button
                type="button"
                onClick={() => onChangeLang('en')}
                className={`px-2.5 py-1 rounded transition-colors ${currentLang === 'en' ? 'bg-white dark:bg-emerald-700 text-slate-900 dark:text-white font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('hi')}
                className={`px-2.5 py-1 rounded transition-colors ${currentLang === 'hi' ? 'bg-white dark:bg-emerald-700 text-slate-900 dark:text-white font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('mr')}
                className={`px-2.5 py-1 rounded transition-colors ${currentLang === 'mr' ? 'bg-white dark:bg-emerald-700 text-slate-900 dark:text-white font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                मराठी
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title="Toggle Theme"
              className="p-2 rounded-lg bg-white dark:bg-[#111726] border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* User Details Pill */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
              <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-slate-900 dark:text-emerald-100">{currentUser?.name || 'Beneficiary'}</span>
            </div>

            {/* Switch to Official Portal Button */}
            <button
              onClick={() => onLogout()}
              title="Switch to Government Official Portal"
              className="px-2.5 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors shadow-2xs flex items-center space-x-1.5 text-xs font-semibold"
            >
              <span>🏛️ Official Portal</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              title="Log Out"
              className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors shadow-2xs flex items-center space-x-1 text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
