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
  Fingerprint,
  ArrowLeft,
  Activity,
  Radio,
  Layers,
  Cpu,
  Sparkles,
  MapPin,
  FileText,
  Phone,
  HelpCircle
} from 'lucide-react';

const OFFICER_PRESETS = [
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
  }
];

const CITIZEN_PRESETS = [
  {
    role: "Citizen (Flagged Shop Case)",
    email: "RC-MH-2710-8849",
    password: "otp-verified",
    name: "Sunil Vitthal Kamble",
    designation: "PHH Card (Ward 24, Itwari)",
    userType: "citizen",
    defaultTab: "citizen_portal",
    badgeColor: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-500/30"
  },
  {
    role: "Citizen (Biometric Denial Case)",
    email: "RC-MH-2710-3321",
    password: "otp-verified",
    name: "Amina Bano Sheikh",
    designation: "PHH Card (Ward 24, Itwari)",
    userType: "citizen",
    defaultTab: "citizen_portal",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-500/30"
  },
  {
    role: "Citizen (Under-Weighing Case)",
    email: "RC-MH-2710-9912",
    password: "otp-verified",
    name: "Rajendra Prasad Sharma",
    designation: "PHH Card (Kalamna East)",
    userType: "citizen",
    defaultTab: "citizen_portal",
    badgeColor: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-300 dark:border-sky-500/30"
  },
  {
    role: "Citizen (Verified Clean Shop)",
    email: "RC-MH-2710-4410",
    password: "otp-verified",
    name: "Pooja Suresh Meshram",
    designation: "AAY Card (Sitabuldi)",
    userType: "citizen",
    defaultTab: "citizen_portal",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30"
  }
];

export default function LoginPage({ onLogin, theme }) {
  // Navigation State: 'selection' | 'officer_login' | 'citizen_login'
  const [viewState, setViewState] = useState('selection');

  // Officer Form
  const [officerEmail, setOfficerEmail] = useState('dso.nagpur@pds.gov.in');
  const [officerPassword, setOfficerPassword] = useState('sentinel2026');

  // Citizen Form
  const [citizenCardNo, setCitizenCardNo] = useState('RC-MH-2710-8849');
  const [citizenOtp, setCitizenOtp] = useState('4921');
  const [citizenLang, setCitizenLang] = useState('en');

  const [loading, setLoading] = useState(false);

  const handleOfficerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = OFFICER_PRESETS.find(a => a.email.toLowerCase() === officerEmail.toLowerCase());
      if (found) {
        onLogin(found);
      } else {
        onLogin({
          role: "Government Officer",
          email: officerEmail,
          name: officerEmail.split('@')[0].toUpperCase(),
          designation: "Food & Civil Supplies Enforcement Officer",
          userType: "officer",
          defaultTab: "dashboard"
        });
      }
    }, 300);
  };

  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = CITIZEN_PRESETS.find(a => a.email.toLowerCase() === citizenCardNo.toLowerCase());
      if (found) {
        onLogin(found);
      } else {
        onLogin({
          role: "Citizen Beneficiary",
          email: citizenCardNo,
          name: "Beneficiary Cardholder",
          designation: `Ration Card: ${citizenCardNo}`,
          userType: "citizen",
          defaultTab: "citizen_portal"
        });
      }
    }, 300);
  };

  const handleQuickLogin = (account) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(account);
    }, 200);
  };

  return (
    <div className="min-h-screen relative z-10 flex flex-col justify-center items-center px-4 sm:px-6 py-10 font-sans">
      
      {/* ========================================================================= */}
      {/* 1. PORTAL SELECTION SCREEN (FIRST LANDING PAGE) */}
      {/* ========================================================================= */}
      {viewState === 'selection' && (
        <div className="w-full max-w-4xl space-y-6 animate-fadeIn">
          
          {/* Main Hero Branding */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-sky-600 text-white shadow-lg ring-4 ring-sky-500/20">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-2">
                <span>Government of Maharashtra • Food Security Mission</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                PDS<span className="text-sky-600 dark:text-sky-400">SENTINEL</span> AI
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl mx-auto font-sans">
                Predictive Governance, Multi-Source Trust Intelligence & Beneficiary Welfare Platform
              </p>
            </div>

            {/* Portal Selection Prompt */}
            <div className="pt-2">
              <span className="inline-block px-4 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-xs font-mono font-bold text-sky-700 dark:text-sky-300">
                « CHOOSE YOUR PORTAL • आपले पोर्टल निवडा »
              </span>
            </div>
          </div>

          {/* 2 Distinct Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            
            {/* PORTAL 1: GOVERNMENT OFFICIAL PORTAL */}
            <div className="theme-card rounded-2xl p-6 sm:p-7 shadow-xl border-2 border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 transition-all flex flex-col justify-between space-y-6 group">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 text-[10px] font-mono font-bold">
                    RESTRICTED GOVT ACCESS
                  </span>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Government Official Portal
                  </h2>
                  <p className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold mt-0.5">
                    Monitor • Detect • Investigate • Act
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Designed for District Supply Officers, Food Commissioners, and Vigilance Flying Squads to monitor real-time grain logistics, weighbridges, and fraud anomalies.
                  </p>
                </div>

                {/* Features Included in Official Portal */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>Executive Command Center & Loss Prevention KPIs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Radio className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Geospatial Fleet Tracking & Geofence Corridor Alerts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Layers className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Multi-Source Trust Engine (MSTE) & SHAP Explainability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Citizen Grievances Management & Flying Squad Dispatch</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Supply Chain Digital Twin Crisis Simulator</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewState('officer_login')}
                  className="w-full h-11 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Government Official Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 1-Click Fast Presets */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="block text-[10px] font-mono uppercase font-bold text-slate-400 mb-1.5">
                    Fast Demo Access:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {OFFICER_PRESETS.map((acc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickLogin(acc)}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-[#0b0e17] hover:bg-sky-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition-colors"
                      >
                        <div className="font-bold text-[11px] text-slate-900 dark:text-white truncate">{acc.name}</div>
                        <div className="text-[9px] text-sky-600 dark:text-sky-400 font-mono truncate">{acc.role}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* PORTAL 2: CITIZEN WELFARE PORTAL */}
            <div className="theme-card rounded-2xl p-6 sm:p-7 shadow-xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between space-y-6 group">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-mono font-bold">
                    PUBLIC BENEFICIARY ACCESS
                  </span>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Citizen Welfare Portal
                  </h2>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    Verify • Report • Track
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Accessible, multilingual welfare portal for ration cardholders to check monthly subsidized grain entitlement, locate verified alternate shops, and voice complaints.
                  </p>
                </div>

                {/* Features Included in Citizen Portal */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Fingerprint className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ration Card Details & Monthly Entitlement Quota</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Entitled vs Received Quantity Comparison</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Smart FPS Locator & Verified Alternate Shops (ONORC)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>AI Voice & Text Grievance (English, Hindi, Marathi)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Live 4-Step Grievance & Ticket Progress Tracker</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewState('citizen_login')}
                  className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Citizen Welfare Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 1-Click Fast Presets */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="block text-[10px] font-mono uppercase font-bold text-slate-400 mb-1.5">
                    Fast Demo Beneficiary Profiles:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {CITIZEN_PRESETS.slice(0, 2).map((acc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickLogin(acc)}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-[#0b0e17] hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition-colors"
                      >
                        <div className="font-bold text-[11px] text-slate-900 dark:text-white truncate">{acc.name}</div>
                        <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono truncate">{acc.role}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Security Badges */}
          <div className="pt-4 text-center text-[10px] font-mono text-slate-400 flex items-center justify-center space-x-4">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>National Food Security Act (NFSA 2013)</span>
            </span>
            <span>•</span>
            <span>One Nation One Ration Card (ONORC)</span>
            <span>•</span>
            <span>256-Bit Encrypted Gov Gateway</span>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DEDICATED GOVERNMENT OFFICIAL LOGIN SCREEN */}
      {/* ========================================================================= */}
      {viewState === 'officer_login' && (
        <div className="w-full max-w-md theme-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-scaleUp">
          
          {/* Back button */}
          <button
            type="button"
            onClick={() => setViewState('selection')}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 flex items-center space-x-1 font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal Selection</span>
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-sky-600 text-white shadow-md">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Official Enforcement Gateway
              </h2>
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-0.5">
                Food, Civil Supplies & Vigilance Cell
              </p>
            </div>
          </div>

          {/* Officer Form */}
          <form onSubmit={handleOfficerSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300">
                Official Gov Email / Officer ID
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={officerEmail}
                  onChange={e => setOfficerEmail(e.target.value)}
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
                  value={officerPassword}
                  onChange={e => setOfficerPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full h-11 pl-10 pr-3.5 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
            >
              <span>{loading ? 'Verifying NIC Token...' : 'Authorize & Enter Command Center'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Officer Presets */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <span className="block text-[10px] font-mono uppercase font-bold text-slate-400 text-center">
              1-Click Demo Officer Profiles
            </span>
            <div className="space-y-1.5">
              {OFFICER_PRESETS.map((acc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#0b0e17] hover:bg-slate-100 dark:hover:bg-[#161f32] border border-slate-200 dark:border-slate-800 text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{acc.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{acc.designation}</div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-200">
                    LOGIN ➔
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DEDICATED CITIZEN WELFARE LOGIN SCREEN */}
      {/* ========================================================================= */}
      {viewState === 'citizen_login' && (
        <div className="w-full max-w-md theme-card rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-scaleUp">
          
          {/* Back button */}
          <button
            type="button"
            onClick={() => setViewState('selection')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center space-x-1 font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portal Selection</span>
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-600 text-white shadow-md">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                MahaPDS Beneficiary Access
              </h2>
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-0.5">
                Ration Entitlement & Grievance Shield
              </p>
            </div>
          </div>

          {/* Citizen Form */}
          <form onSubmit={handleCitizenSubmit} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300">
                12-Digit Ration Card Number
              </label>
              <div className="relative flex items-center">
                <Fingerprint className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={citizenCardNo}
                  onChange={e => setCitizenCardNo(e.target.value)}
                  placeholder="RC-MH-2710-8849"
                  required
                  className="w-full h-11 pl-10 pr-3.5 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono transition-colors"
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
                  value={citizenOtp}
                  onChange={e => setCitizenOtp(e.target.value)}
                  placeholder="4921"
                  required
                  className="w-full h-11 pl-10 pr-3.5 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
            >
              <span>{loading ? 'Validating Ration Entitlement...' : 'Enter Citizen Welfare Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Beneficiary Presets */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <span className="block text-[10px] font-mono uppercase font-bold text-slate-400 text-center">
              1-Click Demo Beneficiary Profiles
            </span>
            <div className="space-y-1.5">
              {CITIZEN_PRESETS.map((acc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-[#0b0e17] hover:bg-emerald-50 dark:hover:bg-[#102018] border border-slate-200 dark:border-slate-800 text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{acc.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{acc.role}</div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200">
                    ACCESS ➔
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
