import React, { useState, useEffect } from 'react';



import Header from './components/Dashboard/Header';



import KPICards from './components/Dashboard/KPICards';



import GISMap from './components/Dashboard/GISMap';



import AlertFeed from './components/Dashboard/AlertFeed';



import FPSDirectory from './components/Dashboard/FPSDirectory';



import ShapModal from './components/Explainability/ShapModal';



import DecisionCopilotModal from './components/Copilot/DecisionCopilotModal';



import AuditReportModal from './components/Dashboard/AuditReportModal';



import CitizenPortal from './components/Citizen/CitizenPortal';



import Simulator from './components/DigitalTwin/Simulator';



import LoginPage from './components/Auth/LoginPage';



import AnimatedBackground from './components/Common/AnimatedBackground';



import { api } from './services/api';



import { CheckCircle2, FileText } from 'lucide-react';







export default function App() {



  // Authentication State



  const [currentUser, setCurrentUser] = useState(() => {



    const saved = localStorage.getItem('pds_user');



    try {



      return saved ? JSON.parse(saved) : null;



    } catch {



      return null;



    }



  });







  const [activeTab, setActiveTab] = useState('dashboard');



  const [stats, setStats] = useState(null);



  const [fpsList, setFpsList] = useState([]);



  const [trucks, setTrucks] = useState([]);



  const [alerts, setAlerts] = useState([]);



  const [isRefreshing, setIsRefreshing] = useState(false);







  // Theme Management (Light mode default, persistent toggle)



  const [theme, setTheme] = useState(() => {



    return localStorage.getItem('pds_theme') || 'light';



  });







  useEffect(() => {



    const root = document.documentElement;



    if (theme === 'dark') {



      root.classList.add('dark');



    } else {



      root.classList.remove('dark');



    }



    localStorage.setItem('pds_theme', theme);



  }, [theme]);







  const toggleTheme = () => {



    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));



  };







  const handleLogin = (user) => {



    setCurrentUser(user);



    localStorage.setItem('pds_user', JSON.stringify(user));



    if (user.defaultTab) {



      setActiveTab(user.defaultTab);



    }



  };







  const handleLogout = () => {



    setCurrentUser(null);



    localStorage.removeItem('pds_user');



  };







  // Modals & Inspection State



  const [selectedAlertForShap, setSelectedAlertForShap] = useState(null);



  const [isCopilotOpen, setIsCopilotOpen] = useState(false);



  const [isAuditReportOpen, setIsAuditReportOpen] = useState(false);



  const [selectedFPSId, setSelectedFPSId] = useState(null);



  const [notificationBanner, setNotificationBanner] = useState(null);







  const loadAllData = async () => {



    setIsRefreshing(true);



    try {



      const [s, f, t, a] = await Promise.all([



        api.getStats(),



        api.getFPSList(),



        api.getTrucks(),



        api.getAlerts()



      ]);



      setStats(s);



      setFpsList(f);



      setTrucks(t);



      setAlerts(a);



    } catch (err) {



      console.error('Error fetching PDS Sentinel telemetry', err);



    } finally {



      setIsRefreshing(false);



    }



  };







  useEffect(() => {



    loadAllData();



    const interval = setInterval(() => {



      loadAllData();



    }, 15000);



    return () => clearInterval(interval);



  }, []);







  const handleQuickAction = async (alertId, actionType) => {



    const res = await api.executeAlertAction(alertId, actionType);



    if (res.status === 'SUCCESS') {



      setNotificationBanner(`Enforcement Action Executed: ${actionType.replace(/_/g, ' ')} applied to Case ${alertId}.`);



      setTimeout(() => setNotificationBanner(null), 5000);



      loadAllData();



    }



  };







  const handleSelectFPS = (fpsId) => {



    setSelectedFPSId(fpsId);



    const alert = alerts.find(a => a.fps_id === fpsId);



    if (alert) {



      setSelectedAlertForShap(alert);



    } else {



      setActiveTab('fps_directory');



    }



  };







  return (



    <div className="min-h-screen relative bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300">



      



      {/* Dynamic Animated 3D Vanta Background */}



      <AnimatedBackground theme={theme} />







      {/* Conditional Rendering: Login Page vs Protected Dashboard */}



      {!currentUser ? (



        <LoginPage onLogin={handleLogin} theme={theme} />



      ) : (



        <>



          {/* Global Header */}



          <Header



            activeTab={activeTab}



            setActiveTab={setActiveTab}



            unreadAlertsCount={alerts.filter(a => a.status !== 'RESOLVED').length}



            onRefresh={loadAllData}



            isRefreshing={isRefreshing}



            onOpenCopilot={() => setIsCopilotOpen(true)}



            theme={theme}



            onToggleTheme={toggleTheme}



            currentUser={currentUser}



            onLogout={handleLogout}



          />







          {/* Clean System Notification Toast */}



          {notificationBanner && (



            <div className="relative z-30 bg-emerald-50 dark:bg-[#0f241a] border-b border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-200 text-xs font-mono py-2 px-4 text-center shadow-xs animate-fadeIn flex items-center justify-center space-x-2">



              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />



              <span>{notificationBanner}</span>



            </div>



          )}







          {/* Main Container */}



          <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">



            



            {/* TAB 1: EXECUTIVE COMMAND CENTER */}



            {activeTab === 'dashboard' && (



              <div className="space-y-4 animate-fadeIn">



                



                {/* Top KPIs */}



                <KPICards stats={stats} />







                {/* Split Screen: GIS Map & Live Alert Triage Feed */}



                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">



                  <div className="lg:col-span-8">



                    <GISMap



                      fpsList={fpsList}



                      trucks={trucks}



                      onSelectFPS={handleSelectFPS}



                      selectedFPSId={selectedFPSId}



                      theme={theme}



                    />



                  </div>







                  <div className="lg:col-span-4">



                    <AlertFeed



                      alerts={alerts}



                      onInspectShap={alert => setSelectedAlertForShap(alert)}



                      onQuickAction={handleQuickAction}



                    />



                  </div>



                </div>







                {/* Sub-bar with Audit Report Trigger */}



                <div className="flex items-center justify-between pt-2">



                  <div className="text-xs text-slate-500 font-mono">



                    Nagpur District Vigilance Node • MSTE Trust Index v2.4 Active



                  </div>



                  <button



                    onClick={() => setIsAuditReportOpen(true)}



                    className="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-colors backdrop-blur-xs"



                  >



                    <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />



                    <span>Generate Official Audit Report</span>



                  </button>



                </div>







                {/* FPS Registry */}



                <FPSDirectory



                  fpsList={fpsList}



                  onSelectFPS={handleSelectFPS}



                />







              </div>



            )}







            {/* TAB 2: LIVE FLEET GIS SURVEILLANCE */}



            {activeTab === 'gis_map' && (



              <div className="space-y-4 animate-fadeIn">



                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">



                  <div>



                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Geospatial Surveillance & Logistics Fleet</h2>



                    <p className="text-xs text-slate-500 dark:text-slate-400">Live GPS tracking of food grain consignments and corridor geofence surveillance.</p>



                  </div>



                  <div className="flex items-center space-x-2 text-xs font-mono">



                    <span className="px-2.5 py-1 rounded bg-white/90 dark:bg-[#111726]/90 backdrop-blur-xs border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs">



                      Active Fleet: <b className="text-sky-600 dark:text-sky-400">{trucks.length} Vehicles</b>



                    </span>



                    <span className="px-2.5 py-1 rounded bg-rose-50/90 dark:bg-rose-500/10 backdrop-blur-xs border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300">



                      Breach: <b className="text-rose-600 dark:text-rose-400">{trucks.filter(t => t.geofence_breach).length} Flagged</b>



                    </span>



                  </div>



                </div>







                <div className="h-[620px]">



                  <GISMap



                    fpsList={fpsList}



                    trucks={trucks}



                    onSelectFPS={handleSelectFPS}



                    selectedFPSId={selectedFPSId}



                    theme={theme}



                  />



                </div>



              </div>



            )}







            {/* TAB 3: FPS REGISTRY */}



            {activeTab === 'fps_directory' && (



              <div className="animate-fadeIn">



                <FPSDirectory



                  fpsList={fpsList}



                  onSelectFPS={handleSelectFPS}



                />



              </div>



            )}







            {/* TAB 4: CITIZEN PORTAL */}



            {activeTab === 'citizen_portal' && (



              <CitizenPortal fpsList={fpsList} />



            )}







            {/* TAB 5: DIGITAL TWIN SIMULATOR */}



            {activeTab === 'digital_twin' && (



              <Simulator onSimulationComplete={loadAllData} />



            )}







          </main>







          {/* Clean Govt Footer */}



          <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#080b11]/90 backdrop-blur-xs py-4 text-[11px] text-slate-500 transition-colors">



            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">



              <div>



                <span className="font-semibold text-slate-700 dark:text-slate-400">PDS Sentinel AI</span> • Department of Food, Civil Supplies and Consumer Protection



              </div>



              <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 font-mono text-[10px]">



                <span>NFSA 2013</span>



                <span>•</span>



                <span>ONORC Portability</span>



                <span>•</span>



                <span>Pilot: Nagpur Division</span>



              </div>



            </div>



          </footer>







          {/* SHAP Forensic Audit Modal */}



          {selectedAlertForShap && (



            <ShapModal



              alert={selectedAlertForShap}



              onClose={() => setSelectedAlertForShap(null)}



              onExecuteAction={handleQuickAction}



            />



          )}







          {/* Decision Copilot Modal */}



          <DecisionCopilotModal



            isOpen={isCopilotOpen}



            onClose={() => setIsCopilotOpen(false)}



            onQuickAction={handleQuickAction}



            currentUser={currentUser}



          />







          {/* Official Audit Report Modal */}



          <AuditReportModal



            isOpen={isAuditReportOpen}



            onClose={() => setIsAuditReportOpen(false)}



            stats={stats}



            fpsList={fpsList}



            alerts={alerts}



            trucks={trucks}



          />



        </>



      )}







    </div>



  );



}243275323389
