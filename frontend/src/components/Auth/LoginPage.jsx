import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Building2, 
  Users, 
  CheckCircle2, 
  Smartphone,
  Fingerprint
} from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    role: "District Supply Officer (DSO)",
    email: "dso.nagpur@pds.gov.in",
    password: "sentinel2026",
    name: "Prathamesh Mowade",
    designation: "District Supply Officer, Nagpur Hub-04",
    userType: "officer",
    defaultTab: "dashboard",
    badgeColor: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-300 dark:border-sky-500/30"
  },
  {
    role: "Vigilance Flying Squad Lead",
    email: "squad.lead@pds.gov.in",
    password: "sentinel2026",
    name: "Yash Kapse",
    designation: "Flying Squad Unit #2 (East Zone)",
    userType: "officer",
    defaultTab: "gis_map",
    badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-500/30"
  },
  {
    role: "Citizen / Beneficiary",
    email: "RC-MH-2710-8849",
    password: "otp-verified",
    name: "Sunil Vitthal Kamble",
    designation: "PHH Ration Cardholder (Ward 24)",
    userType: "citizen",
    defaultTab: "citizen_portal",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30"
  }
];

export default function LoginPage({ onLogin, theme }) {
  const [authMode, setAuthMode] = useState('officer'); // 'officer' | 'citizen'
  const [email, setEmail] = useState('dso.nagpur@pds.gov.in');
  const [password, setPassword] = useState('sentinel2026');
  const [rationCardNo, setRationCardNo] = useState('RC-MH-2710-8849');
  const [otp, setOtp] = useState('4921');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (authMode === 'officer') {
        const found = DEMO_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase());
        if (found) {
          onLogin(found);
        } else {
          onLogin({
            role: "Government Officer",
            email: email,
            name: email.split('@')[0].toUpperCase(),
            designation: "Food & Civil Supplies Enforcement Officer",
            userType: "officer",
            defaultTab: "dashboard"
          });
        }
      } else {
        onLogin({
          role: "Citizen Beneficiary",
          email: rationCardNo,
          name: "Sunil Vitthal Kamble",
          designation: `Ration Card: ${rationCardNo}`,
          userType: "citizen",
          defaultTab: "citizen_portal"
        });
      }
    }, 500);
  };

  const handleQuickDemoSelect = (account) => {
    if (account.userType === 'officer') {
      setAuthMode('officer');
      setEmail(account.email);
      setPassword(account.password);
    } else {
      setAuthMode('citizen');
      setRationCardNo(account.email);
    }
  };

  return (
    <div className="min-h-screen relative z-10 flex flex-col justify-center items-center px-4 sm:px-6 py-10">
      
      {/* Central Login Card */}
      <div className="w-full max-w-md theme-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Header Insignia */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-sky-600 text-white shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
              PDS<span className="text-sky-600 dark:text-sky-400">SENTINEL</span>
            </h1>
            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-0.5">
              Food Security Vigilance & Intelligence Core
            </p>
          </div>
        </div>

        {/* Portal Role Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-[#0b0e17] rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setAuthMode('officer')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'officer'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Govt Official</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('citizen')}
            className={`py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'citizen'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Citizen Portal</span>
          </button>
        </div>

        {/* Auth Form with Perfect Spacing & Clean Input Inset */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authMode === 'officer' ? (
            <>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300">
                  Official Gov Email / Officer ID
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="officer@pds.gov.in"
                    required
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300">
                  Security Passkey
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono transition-colors"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300">
                  Ration Card Number (12 Digits)
                </label>
                <div className="relative flex items-center">
                  <Fingerprint className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={rationCardNo}
                    onChange={e => setRationCardNo(e.target.value)}
                    placeholder="RC-MH-2710-8849"
                    required
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300">
                  Aadhaar OTP (Auto-Generated)
                </label>
                <div className="relative flex items-center">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="4921"
                    required
                    className="w-full h-11 pl-10 pr-3.5 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <span>{loading ? 'Authenticating with NIC/NFSA...' : 'Authorize & Enter Command Center'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Demo Fast-Login Presets */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <span className="block text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 text-center">
            One-Click Demo Authentication Presets
          </span>

          <div className="space-y-1.5">
            {DEMO_ACCOUNTS.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickDemoSelect(acc)}
                className="w-full p-2 rounded-lg bg-slate-50 dark:bg-[#0b0e17] hover:bg-slate-100 dark:hover:bg-[#161f32] border border-slate-200 dark:border-slate-800 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-[11px] text-slate-900 dark:text-white">{acc.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{acc.role}</div>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${acc.badgeColor}`}>
                  {acc.userType.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="pt-2 text-center text-[10px] font-mono text-slate-400 flex items-center justify-center space-x-3">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>256-Bit Encrypted</span>
          </span>
          <span>•</span>
          <span>NFSA 2013 Compliant</span>
        </div>

      </div>

    </div>
  );
}

// Sync step: 244

// Sync step: 276

// Sync step: 324

// Sync step: 390

// Sync step: 244

// Sync step: 276

// Sync step: 324
