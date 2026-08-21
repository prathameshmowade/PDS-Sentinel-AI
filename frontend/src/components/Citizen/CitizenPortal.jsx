import React, { useState, useEffect } from 'react';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Languages, 
  Phone,
  Mic,
  MicOff,
  Volume2,
  Clock,
  Package,
  History,
  Ticket,
  ArrowUpRight,
  Sparkles,
  FileCheck,
  Building2,
  ChevronRight
} from 'lucide-react';
import { api } from '../../services/api';

const TRANSLATIONS = {
  en: {
    portalTitle: "Beneficiary Food Security Dashboard",
    portalSubtitle: "Check monthly quota, verify Fair Price Shops, and submit & track grievances",
    cardSearchTitle: "1. 🪪 Ration Card & Monthly Entitlement",
    searchPlaceholder: "Enter 12-digit Ration Card Number (e.g. RC-MH-2710-8849)...",
    checkBtn: "Check Entitlement",
    familyMembers: "Registered Family Members",
    monthlyQuota: "Monthly Subsidized Food Grain Entitlement",
    entitledVsReceived: "Entitlement vs Actual Distribution (August 2026)",
    entitled: "Entitled",
    received: "Received / Lifted",
    pending: "Pending Collection",
    rice: "Rice (तांदूळ)",
    wheat: "Wheat (गहू)",
    sugar: "Sugar (साखर)",
    fpsLocatorTitle: "2. 🏪 Smart Fair Price Shop (FPS) Locator",
    fpsSubtitle: "Check shop verification status and locate verified alternate shops under ONORC Portability",
    distHistoryTitle: "3. 📦 Past Distribution & Transaction History",
    distHistorySubtitle: "Recent subsidized ration receipts and electronic POS biometric audit logs",
    grievanceTitle: "4. 🗣️ AI Grievance Redressal (Voice & Text)",
    grievanceSubtitle: "Submit complaints in English, Hindi, or Marathi — AI automatically categorizes and prioritizes your issue",
    grievancePlaceholder: "Speak or type your grievance (e.g., 'Dealer refused grain stating no stock, but truck was seen offloading sacks at night')...",
    submitGrievanceBtn: "Submit Grievance to AI Sentinel",
    trackerTitle: "5. 🎫 Live Complaint & Ticket Tracker",
    trackerSubtitle: "Track your grievance status from submission to flying squad resolution",
    trackInputPlaceholder: "Enter Ticket ID (e.g. GRV-2026-1049)...",
    trackBtn: "Track Status",
    voiceBtn: "Voice Record",
    tollFree: "National PDS Toll-Free: 1967",
    assignedShop: "Assigned Fair Price Shop",
    aadhaarStatus: "Aadhaar e-KYC: Linked & Verified"
  },
  hi: {
    portalTitle: "नागरिक खाद्य सुरक्षा एवं राशन सेवा पोर्टल",
    portalSubtitle: "मासिक राशन कोटा जांचें, दुकान सत्यापित करें और शिकायत दर्ज व ट्रैक करें",
    cardSearchTitle: "1. 🪪 राशन कार्ड एवं मासिक कोटा विवरण",
    searchPlaceholder: "12 अंकों का राशन कार्ड नंबर दर्ज करें (उदा. RC-MH-2710-8849)...",
    checkBtn: "कोटा जांचें",
    familyMembers: "पंजीकृत परिवार के सदस्य",
    monthlyQuota: "मासिक रियायती खाद्यान्न कोटा",
    entitledVsReceived: "निर्धारित कोटा बनाम प्राप्त राशन (अगस्त 2026)",
    entitled: "निर्धारित",
    received: "प्राप्त राशन",
    pending: "शेष राशन",
    rice: "चावल (Rice)",
    wheat: "गेहूं (Wheat)",
    sugar: "चीनी (Sugar)",
    fpsLocatorTitle: "2. 🏪 स्मार्ट राशन दुकान (FPS) लोकेटर",
    fpsSubtitle: "दुकान की सत्यापन स्थिति जांचें और ONORC के तहत वैकल्पिक सत्यापित दुकानें खोजें",
    distHistoryTitle: "3. 📦 पिछला वितरण एवं लेन-देन इतिहास",
    distHistorySubtitle: "बायोमेट्रिक ई-पॉस पर्ची एवं पिछले महीनों का खाद्यान्न विवरण",
    grievanceTitle: "4. 🗣️ एआई शिकायत निवारण (आवाज एवं टेक्स्ट)",
    grievanceSubtitle: "हिंदी, मराठी या अंग्रेजी में बोलकर या लिखकर शिकायत दर्ज करें — AI स्वचालित श्रेणीबद्ध करेगा",
    grievancePlaceholder: "बोलकर या लिखकर समस्या बताएं (उदा. 'डीलर ने कहा राशन खत्म हो गया लेकिन रात में ट्रक देखा गया था')...",
    submitGrievanceBtn: "एआई सेंटिनल को शिकायत भेजें",
    trackerTitle: "5. 🎫 लाइव शिकायत स्थिति ट्रैकर",
    trackerSubtitle: "अपनी शिकायत की स्थिति दर्ज करने से लेकर निवारण तक ट्रैक करें",
    trackInputPlaceholder: "शिकायत टोकन दर्ज करें (उदा. GRV-2026-1049)...",
    trackBtn: "स्थिति देखें",
    voiceBtn: "बोलकर दर्ज करें",
    tollFree: "राष्ट्रीय पीडीएस टोल-फ्री: 1967",
    assignedShop: "आवंटित राशन दुकान",
    aadhaarStatus: "आधार ई-केवाईसी: लिंक एवं सत्यापित"
  },
  mr: {
    portalTitle: "महापीडीएस नागरिक सेवा व धान्य वाटप पोर्टल",
    portalSubtitle: "मासिक धान्य कोटा तपासा, रास्त भाव दुकान शोधा आणि तक्रार नोंदवा व ट्रॅक करा",
    cardSearchTitle: "1. 🪪 रेशन कार्ड व मासिक शासकीय धान्य कोटा",
    searchPlaceholder: "१२ अंकी रेशन कार्ड क्रमांक टाका (उदा. RC-MH-2710-8849)...",
    checkBtn: "रेशन तपासा",
    familyMembers: "नोंदणीकृत लाभार्थी संख्या",
    monthlyQuota: "मासिक शासकीय सवलत धान्य कोटा",
    entitledVsReceived: "हक्काचे धान्य वि. मिळालेले धान्य (ऑगस्ट २०२६)",
    entitled: "हक्काचा कोटा",
    received: "मिळालेले धान्य",
    pending: "शिल्लक धान्य",
    rice: "तांदूळ (Rice)",
    wheat: "गहू (Wheat)",
    sugar: "साखर (Sugar)",
    fpsLocatorTitle: "2. 🏪 स्मार्ट रास्त भाव दुकान (FPS) लोकेटर",
    fpsSubtitle: "दुकान पडताळणी स्थिती तपासा आणि ONORC अंतर्गत जवळची पर्यायी दुकाने शोधा",
    distHistoryTitle: "3. 📦 मागील धान्य वाटप व पावती इतिहास",
    distHistorySubtitle: "मागील महिन्यांचे वाटप, ई-पॉस बायोमेट्रिक नोंदी आणि पावत्या",
    grievanceTitle: "4. 🗣️ एआय तक्रार निवारण (ध्वनी व मजकूर)",
    grievanceSubtitle: "मराठी, हिंदी किंवा इंग्रजीत बोलून किंवा लिहून तक्रार नोंदवा — AI तात्काळ वर्गवारी करेल",
    grievancePlaceholder: "बोलून किंवा लिहून समस्या सांगा (उदा. 'दुकानदाराने धान्य संपले सांगितले पण रात्री धान्य बाहेर नेताना पाहिले')...",
    submitGrievanceBtn: "एआय सेंटिनलकडे तक्रार नोंदवा",
    trackerTitle: "5. 🎫 थेट तक्रार ट्रॅकिंग (Ticket Tracker)",
    trackerSubtitle: "तक्रार नोंदणीपासून ते भरारी पथकाच्या कारवाईपर्यंत थेट प्रगती तपासा",
    trackInputPlaceholder: "तक्रार क्रमांक टाका (उदा. GRV-2026-1049)...",
    trackBtn: "स्थिती तपासा",
    voiceBtn: "बोलून सांगा",
    tollFree: "शासकीय टोल-फ्री हेल्पलाईन: १९६७",
    assignedShop: "नियुक्त रास्त भाव दुकान",
    aadhaarStatus: "आधार ई-केवायसी: जोडलेले व प्रमाणित"
  }
};

const SAMPLE_VOICE_PROMPTS = {
  mr: [
    { label: "धान्य काळाबाजार तक्रार", text: "दुकानदार सांगतो धान्य संपले आहे, पण रात्री ट्रक मधून धान्य खासगी गिरणीत नेताना पाहिले. आम्हाला या महिन्याचा कोटा मिळाला नाही." },
    { label: "बायोमेट्रिक नाकारले", text: "दुकानदाराने अंगठा लावून घेतला आणि सर्वर डाऊन आहे म्हणून राशन दिले नाही. तीन दिवसांपासून चकरा मारत आहोत." }
  ],
  hi: [
    { label: "राशन देने से मना किया", text: "राशन डीलर फिंगरप्रिंट लगवा लेता है और बोलता है सर्वर डाउन है राशन कल आना। 3 दिन से चक्कर लगा रहे हैं राशन नहीं दिया।" },
    { label: "कम वजन व अधिक पैसे", text: "कांटे पर 5 किलो दिखाता है लेकिन घर पर नापने पर केवल 4 किलो 200 ग्राम निकला और प्रति किलो 5 रुपए ज्यादा लिए।" }
  ],
  en: [
    { label: "Stock Diversion to Mill", text: "The dealer claimed food grain is exhausted, but we observed supply truck offloading sacks at Pardi private flour mill at night." },
    { label: "Electronic Scale Tamper", text: "The digital scale tare is locked with -350 grams offset. We received 4.2kg instead of entitled 5.0kg quota." }
  ]
};

export default function CitizenPortal({ fpsList = [], currentLang = 'en', onLangChange }) {
  const [lang, setLang] = useState(currentLang);
  const [cardNo, setCardNo] = useState('RC-MH-2710-8849');
  const [cardData, setCardData] = useState(null);
  const [loadingCard, setLoadingCard] = useState(false);
  
  // Grievance submission state
  const [complaintText, setComplaintText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  // Grievance tracker state
  const [trackTicketId, setTrackTicketId] = useState('GRV-2026-1049');
  const [trackedGrievance, setTrackedGrievance] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackError, setTrackError] = useState(null);

  // Sync prop lang
  useEffect(() => {
    if (currentLang && currentLang !== lang) {
      setLang(currentLang);
    }
  }, [currentLang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Search Ration Card
  const handleSearchCard = async (searchNo = null) => {
    const q = searchNo || cardNo;
    if (!q.trim()) return;
    setLoadingCard(true);
    try {
      const data = await api.getRationCard(q.trim());
      setCardData(data);
    } catch (e) {
      console.error('Failed to load card', e);
    } finally {
      setLoadingCard(false);
    }
  };

  // Initial auto load
  useEffect(() => {
    handleSearchCard('RC-MH-2710-8849');
    handleTrackTicket('GRV-2026-1049');
  }, []);

  // Voice recording simulation or Web Speech API
  const handleVoiceRecord = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
      recognition.continuous = false;
      
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setComplaintText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        const prompts = SAMPLE_VOICE_PROMPTS[lang] || SAMPLE_VOICE_PROMPTS.en;
        setComplaintText(prompts[0].text);
        setIsListening(false);
      }, 1000);
    }
  };

  // Submit Grievance
  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    if (!complaintText.trim()) return;

    setIsSubmitting(true);
    const res = await api.submitGrievance({
      citizen_name: cardData?.head_of_family || "Sunil Vitthal Kamble",
      card_no: cardNo,
      fps_id: cardData?.assigned_fps_id || "FPS-4102",
      language: lang,
      complaint_text: complaintText
    });
    setIsSubmitting(false);

    if (res.status === 'SUCCESS') {
      setSubmittedComplaint(res);
      setComplaintText('');
      setTrackTicketId(res.tracking_token);
      setTrackedGrievance(res.complaint);
    }
  };

  // Track Grievance
  const handleTrackTicket = async (ticketIdToTrack = null) => {
    const id = ticketIdToTrack || trackTicketId;
    if (!id.trim()) return;

    setTrackingLoading(true);
    setTrackError(null);
    try {
      const res = await api.trackGrievance(id.trim());
      if (res) {
        setTrackedGrievance(res);
      } else {
        setTrackError(`Ticket ID "${id}" not found. Please check and retry.`);
      }
    } catch (e) {
      setTrackError('Ticket not found');
    } finally {
      setTrackingLoading(false);
    }
  };

  const verifiedShops = fpsList.filter(f => f.trust_score >= 85.0).slice(0, 2);
  const voicePrompts = SAMPLE_VOICE_PROMPTS[lang] || SAMPLE_VOICE_PROMPTS.en;

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-12 animate-fadeIn font-sans">
      
      {/* Top Welcome Card */}
      <div className="theme-card rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <span>National Food Security Mission • Beneficiary Direct Shield</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t.portalTitle}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.portalSubtitle}</p>
          </div>

          {/* Quick Language Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-[#0b0e17] p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start text-xs font-medium">
            <button
              onClick={() => { setLang('en'); if (onLangChange) onLangChange('en'); }}
              className={`px-3 py-1 rounded-lg transition-colors ${lang === 'en' ? 'bg-white dark:bg-emerald-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              English
            </button>
            <button
              onClick={() => { setLang('hi'); if (onLangChange) onLangChange('hi'); }}
              className={`px-3 py-1 rounded-lg transition-colors ${lang === 'hi' ? 'bg-white dark:bg-emerald-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => { setLang('mr'); if (onLangChange) onLangChange('mr'); }}
              className={`px-3 py-1 rounded-lg transition-colors ${lang === 'mr' ? 'bg-white dark:bg-emerald-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. 🪪 RATION CARD & ENTITLEMENT */}
      {/* ========================================================================= */}
      <section className="theme-card rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>{t.cardSearchTitle}</span>
          </h2>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
            {t.aadhaarStatus}
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={cardNo}
              onChange={e => setCardNo(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full h-11 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <button
            onClick={() => handleSearchCard()}
            disabled={loadingCard}
            className="h-11 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>{loadingCard ? 'Checking...' : t.checkBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Test Card Numbers */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Test Demo Cards:</span>
          <button
            onClick={() => { setCardNo('RC-MH-2710-8849'); handleSearchCard('RC-MH-2710-8849'); }}
            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-rose-700 dark:text-rose-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700"
          >
            RC-MH-2710-8849 (Flagged Shop Issue)
          </button>
          <button
            onClick={() => { setCardNo('RC-MH-2710-3321'); handleSearchCard('RC-MH-2710-3321'); }}
            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700"
          >
            RC-MH-2710-3321 (Biometric Denial)
          </button>
          <button
            onClick={() => { setCardNo('RC-MH-2710-9912'); handleSearchCard('RC-MH-2710-9912'); }}
            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700"
          >
            RC-MH-2710-9912 (Under-Weighing)
          </button>
          <button
            onClick={() => { setCardNo('RC-MH-2710-4410'); handleSearchCard('RC-MH-2710-4410'); }}
            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700"
          >
            RC-MH-2710-4410 (Lifted / Clean)
          </button>
        </div>


        {/* Card Details & Entitled vs Received Comparison */}
        {cardData && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800">
              <div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-mono font-bold">
                  {cardData.card_type}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{cardData.head_of_family}</h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5 flex flex-wrap gap-2">
                  <span>Card: <b>{cardData.card_no}</b></span>
                  <span>•</span>
                  <span>District: <b>{cardData.district}</b></span>
                  <span>•</span>
                  <span>Assigned Shop: <b className="text-sky-700 dark:text-sky-400">{cardData.assigned_fps_id}</b></span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-500">{t.familyMembers}</span>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">{cardData.family_members} Persons</div>
              </div>
            </div>

            {/* Warning Banner if Assigned Shop is flagged */}
            {cardData.current_month_status?.warning && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-[#2a1215] border border-rose-200 dark:border-rose-900/60 flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-rose-800 dark:text-rose-300">PDS Sentinel Alert: </span>
                  <span className="text-rose-700 dark:text-rose-200">{cardData.current_month_status.warning}</span>
                </div>
              </div>
            )}

            {/* Monthly Entitlement Cards with Entitled vs Received Comparison */}
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                {t.entitledVsReceived}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Rice */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{t.rice}</span>
                    <span className="text-[10px] font-mono text-emerald-600">₹3.00/kg</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    {cardData.monthly_quota?.rice_kg} <span className="text-xs font-normal text-slate-500">KG Entitled</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>Lifted: {cardData.current_month_status?.rice_lifted_kg || 0} kg</span>
                      <span className="text-amber-600 font-bold">Pending: {cardData.monthly_quota?.rice_kg - (cardData.current_month_status?.rice_lifted_kg || 0)} kg</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all" 
                        style={{ width: `${((cardData.current_month_status?.rice_lifted_kg || 0) / cardData.monthly_quota?.rice_kg) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Wheat */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{t.wheat}</span>
                    <span className="text-[10px] font-mono text-emerald-600">₹2.00/kg</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    {cardData.monthly_quota?.wheat_kg} <span className="text-xs font-normal text-slate-500">KG Entitled</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>Lifted: {cardData.current_month_status?.wheat_lifted_kg || 0} kg</span>
                      <span className="text-amber-600 font-bold">Pending: {cardData.monthly_quota?.wheat_kg - (cardData.current_month_status?.wheat_lifted_kg || 0)} kg</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all" 
                        style={{ width: `${((cardData.current_month_status?.wheat_lifted_kg || 0) / cardData.monthly_quota?.wheat_kg) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Sugar */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{t.sugar}</span>
                    <span className="text-[10px] font-mono text-emerald-600">₹20.00/kg</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    {cardData.monthly_quota?.sugar_kg} <span className="text-xs font-normal text-slate-500">KG Entitled</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>Lifted: {cardData.current_month_status?.sugar_lifted_kg || 0} kg</span>
                      <span className="text-amber-600 font-bold">Pending: {cardData.monthly_quota?.sugar_kg - (cardData.current_month_status?.sugar_lifted_kg || 0)} kg</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all" 
                        style={{ width: `${((cardData.current_month_status?.sugar_lifted_kg || 0) / cardData.monthly_quota?.sugar_kg) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 2. 🏪 SMART FPS LOCATOR & VERIFICATION */}
      {/* ========================================================================= */}
      <section className="theme-card rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>{t.fpsLocatorTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.fpsSubtitle}</p>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
            Portability Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {verifiedShops.map((shop) => (
            <div 
              key={shop.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400">{shop.id}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    TRUST: {shop.trust_score}%
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs mt-1.5">{shop.name}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                  <span>{shop.address}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Stock: Rice {shop.current_stock_mt?.rice} MT • Wheat {shop.current_stock_mt?.wheat} MT
                </span>
                <span className="text-slate-500">1.2 km away</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 📦 DISTRIBUTION & TRANSACTION HISTORY */}
      {/* ========================================================================= */}
      <section className="theme-card rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3.5">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>{t.distHistoryTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.distHistorySubtitle}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 uppercase">
                <th className="pb-2">Month & Date</th>
                <th className="pb-2">Distributed Commodity</th>
                <th className="pb-2">Subsidized Fee</th>
                <th className="pb-2">e-POS Authentication</th>
                <th className="pb-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-sans">
              {(cardData?.distribution_history || []).map((row, idx) => (
                <tr key={idx} className="py-2.5">
                  <td className="py-2.5 font-mono text-slate-800 dark:text-slate-200">
                    <div><b>{row.month}</b></div>
                    <div className="text-[10px] text-slate-500">{row.date}</div>
                  </td>
                  <td className="py-2.5">
                    <span className="font-mono font-medium text-slate-900 dark:text-white">
                      Rice {row.rice_kg}kg, Wheat {row.wheat_kg}kg, Sugar {row.sugar_kg}kg
                    </span>
                  </td>
                  <td className="py-2.5 font-mono text-emerald-600 font-bold">
                    ₹{row.amount_paid_inr}.00
                  </td>
                  <td className="py-2.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {row.auth_mode}
                  </td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-mono font-bold">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 🗣️ AI GRIEVANCE REDRESSAL (MULTILINGUAL VOICE & TEXT) */}
      {/* ========================================================================= */}
      <section className="theme-card rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>{t.grievanceTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.grievanceSubtitle}</p>
          </div>

          <button
            type="button"
            onClick={handleVoiceRecord}
            className={`h-9 px-3.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all self-start ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100'
            }`}
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span>{isListening ? 'Listening...' : t.voiceBtn}</span>
          </button>
        </div>

        {/* Quick Voice Simulation Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center space-x-1">
            <Volume2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Example Voice Grievance:</span>
          </span>
          {voicePrompts.map((vp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setComplaintText(vp.text)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] border border-slate-200 dark:border-slate-700"
            >
              {vp.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleComplaintSubmit} className="space-y-3">
          <textarea
            rows="3"
            value={complaintText}
            onChange={e => setComplaintText(e.target.value)}
            placeholder={t.grievancePlaceholder}
            className="w-full bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.tollFree}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !complaintText.trim()}
              className="h-10 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'AI Triaging...' : t.submitGrievanceBtn}</span>
            </button>
          </div>
        </form>

        {/* Submitted Confirmation Banner */}
        {submittedComplaint && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-[#0c1f17] border border-emerald-200 dark:border-emerald-900/60 space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Grievance Registered Successfully</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Ticket: {submittedComplaint.tracking_token}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              <b>AI NLP Classification: </b>
              <span className="font-mono text-emerald-700 dark:text-emerald-400">[{submittedComplaint.ai_triage_result?.category}] </span>
              <span>with {submittedComplaint.ai_triage_result?.urgency} urgency. Assigned for automated cross-referencing.</span>
            </p>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. 🎫 COMPLAINT & TICKET TRACKER */}
      {/* ========================================================================= */}
      <section className="theme-card rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>{t.trackerTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.trackerSubtitle}</p>
        </div>

        {/* Tracker Search Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Ticket className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={trackTicketId}
              onChange={e => setTrackTicketId(e.target.value)}
              placeholder={t.trackInputPlaceholder}
              className="w-full h-11 bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <button
            onClick={() => handleTrackTicket()}
            disabled={trackingLoading}
            className="h-11 px-5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>{trackingLoading ? 'Locating...' : t.trackBtn}</span>
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {trackError && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-mono">
            {trackError}
          </div>
        )}

        {/* 4-Step Progress Tracker Timeline */}
        {trackedGrievance && (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400">{trackedGrievance.id}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">[{trackedGrievance.category?.replace(/_/g, ' ')}]</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Shop: {trackedGrievance.fps_id} ({trackedGrievance.fps_name})</p>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border self-start ${
                trackedGrievance.status === 'RESOLVED' 
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300' 
                  : trackedGrievance.status === 'ASSIGNED'
                  ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-300'
                  : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300'
              }`}>
                STATUS: {trackedGrievance.status}
              </span>
            </div>

            {/* 4-Step Visual Progress Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
              
              {/* Step 1: Submitted */}
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">1. Submitted</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Logged in portal</div>
                </div>
              </div>

              {/* Step 2: AI Triaged */}
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start space-x-2.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">2. AI Triaged</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">NLP Verified</div>
                </div>
              </div>

              {/* Step 3: Assigned */}
              <div className={`p-3 rounded-lg border flex items-start space-x-2.5 ${
                trackedGrievance.status === 'ASSIGNED' || trackedGrievance.status === 'RESOLVED'
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : 'bg-slate-100/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  trackedGrievance.status === 'ASSIGNED' || trackedGrievance.status === 'RESOLVED'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {trackedGrievance.status === 'ASSIGNED' || trackedGrievance.status === 'RESOLVED' ? '✓' : '3'}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">3. Assigned</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {trackedGrievance.assigned_squad ? 'Squad Dispatched' : 'Pending Squad'}
                  </div>
                </div>
              </div>

              {/* Step 4: Resolved */}
              <div className={`p-3 rounded-lg border flex items-start space-x-2.5 ${
                trackedGrievance.status === 'RESOLVED'
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  : 'bg-slate-100/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  trackedGrievance.status === 'RESOLVED'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {trackedGrievance.status === 'RESOLVED' ? '✓' : '4'}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">4. Resolved</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Closed by Official</div>
                </div>
              </div>

            </div>

            {/* Timeline details */}
            {trackedGrievance.timeline && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] font-mono uppercase font-bold text-slate-500">Live Action History:</div>
                <div className="space-y-1.5">
                  {trackedGrievance.timeline.map((event, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs">
                      <span className="text-[10px] font-mono text-slate-400 shrink-0 mt-0.5">[{event.timestamp}]</span>
                      <span className="text-slate-800 dark:text-slate-200"><b>{event.status}:</b> {event.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </section>

    </div>
  );
}
