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

  Volume2

} from 'lucide-react';

import { api } from '../../services/api';



const TRANSLATIONS = {

  en: {

    title: "MahaPDS Beneficiary Welfare Portal",

    subtitle: "Verify Monthly Ration Entitlement, Track Live Stock, and File Grievances",

    searchPlaceholder: "Enter 12-digit Ration Card Number (e.g. RC-MH-2710-8849)...",

    checkBtn: "Check Entitlement",

    familyMembers: "Registered Beneficiaries",

    monthlyQuota: "Monthly Subsidized Food Grain Allocation",

    quotaStatus: "Distribution Status",

    nearbyShops: "Verified Alternate Fair Price Shops (ONORC Portability)",

    fileGrievance: "Voice & Text AI Grievance Redressal",

    grievancePlaceholder: "Speak or type your grievance in English, Hindi, or Marathi (e.g., 'Dealer refused grain stating no stock, but truck was seen at night')...",

    submitBtn: "Submit Grievance to Sentinel AI",

    subsidizedTotal: "Total Subsidized Amount",

    voiceAssistant: "Voice Assistant (बोलून तक्रार नोंदवा / बोलकर शिकायत दर्ज करें)",

    rice: "Rice (तांदूळ)",

    wheat: "Wheat (गहू)",

    sugar: "Sugar (साखर)"

  },

  hi: {

    title: "महापीडीएस नागरिक कल्याण एवं राशन सेवा पोर्टल",

    subtitle: "अपना मासिक राशन कोटा, दुकान का लाइव स्टॉक जांचें और शिकायत दर्ज करें",

    searchPlaceholder: "12 अंकों का राशन कार्ड नंबर दर्ज करें (उदा. RC-MH-2710-8849)...",

    checkBtn: "कोटा जांचें",

    familyMembers: "पंजीकृत परिवार के सदस्य",

    monthlyQuota: "मासिक रियायती राशन कोटा",

    quotaStatus: "वितरण स्थिति",

    nearbyShops: "आस-पास की सत्यापित वैकल्पिक राशन दुकानें (ONORC)",

    fileGrievance: "आवाज और टेक्स्ट एआई शिकायत निवारण प्रणाली",

    grievancePlaceholder: "बोलकर या लिखकर समस्या बताएं (उदा. 'डीलर ने कहा राशन खत्म हो गया लेकिन रात में ट्रक देखा गया था')...",

    submitBtn: "एआई सेंटिनल को शिकायत भेजें",

    subsidizedTotal: "कुल देय राशि",

    voiceAssistant: "वॉयस असिस्टेंट (बोलकर शिकायत दर्ज करें)",

    rice: "चावल (Rice)",

    wheat: "गेहूं (Wheat)",

    sugar: "चीनी (Sugar)"

  },

  mr: {

    title: "महापीडीएस नागरिक सेवा व धान्य वाटप तक्रार निवारण पोर्टल",

    subtitle: "तुमचे रेशन धान्य, दुकानातील उपलब्ध साठा तपासा आणि तक्रार नोंदवा",

    searchPlaceholder: "१२ अंकी रेशन कार्ड क्रमांक टाका (उदा. RC-MH-2710-8849)...",

    checkBtn: "रेशन तपासा",

    familyMembers: "नोंदणीकृत लाभार्थी संख्या",

    monthlyQuota: "मासिक शासकीय धान्य कोटा व दर",

    quotaStatus: "धान्य वाटप स्थिती",

    nearbyShops: "जवळची अधिकृत व सत्यापित पर्यायी रास्त भाव दुकाने (ONORC)",

    fileGrievance: "ध्वनी (व्हॉइस) व मजकूर एआई तक्रार निवारण कक्ष",

    grievancePlaceholder: "बोलून किंवा लिहून समस्या सांगा (उदा. 'दुकानदाराने धान्य संपले सांगितले पण रात्री धान्य बाहेर नेले')...",

    submitBtn: "एआय सेंटिनलकडे तक्रार नोंदवा",

    subsidizedTotal: "एकूण शासकीय शुल्क",

    voiceAssistant: "व्हॉइस असिस्टंट (बोलून तक्रार नोंदवा)",

    rice: "तांदूळ (Rice)",

    wheat: "गहू (Wheat)",

    sugar: "साखर (Sugar)"

  }

};



const SAMPLE_VOICE_PROMPTS = {

  mr: [

    { label: "धान्य चोरी व काळाबाजार", text: "दुकानदार सांगतो धान्य संपले आहे, पण रात्री ट्रक मधून धान्य खासगी गिरणीत नेताना पाहिले. आम्हाला या महिन्याचा कोटा मिळाला नाही." },

    { label: "बायोमेट्रिक नाकारले", text: "दुकानदाराने अंगठा लावून घेतला आणि सर्वर डाऊन आहे म्हणून राशन दिले नाही. तीन दिवसांपासून चकरा मारत आहोत." }

  ],

  hi: [

    { label: "राशन देने से मना किया", text: "राशन डीलर फिंगरप्रिंट लगवा लेता है और बोलता है सर्वर डाउन है राशन कल आना। 3 दिन से चक्कर लगा रहे हैं।" },

    { label: "कम वजन व अधिक पैसे", text: "कांटे पर 5 किलो दिखाता है लेकिन घर पर नापने पर केवल 4 किलो 200 ग्राम निकला और प्रति किलो 5 रुपए ज्यादा लिए।" }

  ],

  en: [

    { label: "Stock Diversion to Mill", text: "The dealer claimed food grain is exhausted, but we observed supply truck offloading sacks at Pardi private flour mill at night." },

    { label: "Electronic Scale Tamper", text: "The digital scale tare is locked with -350 grams offset. We received 4.2kg instead of entitled 5.0kg quota." }

  ]

};



export default function CitizenPortal({ fpsList = [] }) {

  const [lang, setLang] = useState('en');

  const [cardNo, setCardNo] = useState('RC-MH-2710-8849');

  const [cardData, setCardData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [complaintText, setComplaintText] = useState('');

  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isListening, setIsListening] = useState(false);



  const t = TRANSLATIONS[lang];



  const handleSearchCard = async (searchNo = null) => {

    const q = searchNo || cardNo;

    if (!q.trim()) return;

    setLoading(true);

    const data = await api.getRationCard(q.trim());

    setCardData(data);

    setLoading(false);

  };



  const handleVoiceRecord = () => {

    // Try browser SpeechRecognition if available

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



      recognition.onerror = () => {

        setIsListening(false);

      };



      recognition.onend = () => {

        setIsListening(false);

      };

    } else {

      // Fallback simulation

      setIsListening(true);

      setTimeout(() => {

        const prompts = SAMPLE_VOICE_PROMPTS[lang] || SAMPLE_VOICE_PROMPTS.en;

        setComplaintText(prompts[0].text);

        setIsListening(false);

      }, 1200);

    }

  };



  const handleComplaintSubmit = async (e) => {

    e.preventDefault();

    if (!complaintText.trim()) return;

    setIsSubmitting(true);



    const res = await api.submitGrievance({

      citizen_name: cardData?.head_of_family || "Citizen Beneficiary",

      card_no: cardNo,

      fps_id: cardData?.assigned_fps_id || "FPS-4102",

      language: lang,

      complaint_text: complaintText

    });



    setIsSubmitting(false);

    if (res.status === 'SUCCESS') {

      setSubmittedComplaint(res);

      setComplaintText('');

    }

  };



  const verifiedShops = fpsList.filter(f => f.trust_score >= 85.0).slice(0, 3);

  const voicePrompts = SAMPLE_VOICE_PROMPTS[lang] || SAMPLE_VOICE_PROMPTS.en;



  return (

    <div className="max-w-5xl mx-auto space-y-4 pb-12 animate-fadeIn">

      

      {/* Top Banner & Language Selector */}

      <div className="theme-card rounded-xl p-5 sm:p-6 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>

            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">

              <span>National Food Security Mission • Citizen Shield</span>

            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-sans">{t.title}</h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.subtitle}</p>

          </div>



          {/* Clean Language Segmented Control */}

          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-[#0b0e17] p-1 rounded-lg border border-slate-200 dark:border-slate-700 self-start text-xs font-medium">

            <button

              onClick={() => setLang('en')}

              className={`px-3 py-1 rounded transition-colors ${lang === 'en' ? 'bg-white dark:bg-sky-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}

            >

              English

            </button>

            <button

              onClick={() => setLang('hi')}

              className={`px-3 py-1 rounded transition-colors ${lang === 'hi' ? 'bg-white dark:bg-sky-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}

            >

              हिंदी

            </button>

            <button

              onClick={() => setLang('mr')}

              className={`px-3 py-1 rounded transition-colors ${lang === 'mr' ? 'bg-white dark:bg-sky-700 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400'}`}

            >

              मराठी

            </button>

          </div>

        </div>



        {/* Search Ration Card */}

        <div className="mt-5 flex flex-col sm:flex-row gap-2">

          <div className="relative flex-1">

            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />

            <input

              type="text"

              value={cardNo}

              onChange={e => setCardNo(e.target.value)}

              placeholder={t.searchPlaceholder}

              className="w-full bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"

            />

          </div>

          <button

            onClick={() => handleSearchCard()}

            className="px-5 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"

          >

            <span>{t.checkBtn}</span>

            <ArrowRight className="w-3.5 h-3.5" />

          </button>

        </div>



        {/* Quick Sample Chips */}

        <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">

          <span>Test Card Numbers:</span>

          <button

            onClick={() => { setCardNo('RC-MH-2710-8849'); handleSearchCard('RC-MH-2710-8849'); }}

            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700"

          >

            RC-MH-2710-8849 (Flagged Shop)

          </button>

          <button

            onClick={() => { setCardNo('RC-MH-2710-4410'); handleSearchCard('RC-MH-2710-4410'); }}

            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] border border-slate-200 dark:border-slate-700"

          >

            RC-MH-2710-4410 (Clean Shop)

          </button>

        </div>

      </div>



      {/* Card Details View */}

      {cardData && (

        <div className="theme-card rounded-xl p-5 sm:p-6 shadow-sm space-y-4">

          

          {/* Top Info */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">

            <div>

              <span className="px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 text-[10px] font-mono font-bold">

                {cardData.card_type}

              </span>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{cardData.head_of_family}</h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Card No: {cardData.card_no} • {cardData.district}</p>

            </div>



            <div className="p-2.5 bg-slate-50 dark:bg-[#0b0e17] rounded-lg border border-slate-200 dark:border-slate-800 text-right">

              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">{t.familyMembers}</span>

              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">{cardData.family_members} Persons</div>

            </div>

          </div>



          {/* Assigned Shop Alert Banner if Flagged */}

          {cardData.current_month_status?.warning && (

            <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-[#2a1215] border border-rose-200 dark:border-rose-900/60 flex items-start space-x-2.5">

              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />

              <div className="text-xs">

                <span className="font-bold text-rose-800 dark:text-rose-300">PDS Sentinel Advisory: </span>

                <span className="text-rose-700 dark:text-rose-200">{cardData.current_month_status.warning}</span>

              </div>

            </div>

          )}



          {/* Quota Breakdown */}

          <div>

            <h4 className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 mb-2">{t.monthlyQuota}</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800">

                <span className="text-xs text-slate-500 dark:text-slate-400">{t.rice}</span>

                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">

                  {cardData.monthly_quota?.rice_kg} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">KG</span>

                </div>

                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">Rate: ₹3.00 / KG</div>

              </div>



              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800">

                <span className="text-xs text-slate-500 dark:text-slate-400">{t.wheat}</span>

                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">

                  {cardData.monthly_quota?.wheat_kg} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">KG</span>

                </div>

                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">Rate: ₹2.00 / KG</div>

              </div>



              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800">

                <span className="text-xs text-slate-500 dark:text-slate-400">{t.sugar}</span>

                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">

                  {cardData.monthly_quota?.sugar_kg} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">KG</span>

                </div>

                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-1">Rate: ₹20.00 / KG</div>

              </div>



            </div>

          </div>



          {/* Nearby Verified Alternative Shops */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <h4 className="text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">

                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />

                <span>{t.nearbyShops}</span>

              </h4>

              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">Portability Active</span>

            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">

              {verifiedShops.map(shop => (

                <div key={shop.id} className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0b0e17] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between">

                  <div>

                    <div className="flex items-center justify-between">

                      <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400">{shop.id}</span>

                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">

                        TRUST: {shop.trust_score} / 100

                      </span>

                    </div>

                    <div className="font-semibold text-slate-900 dark:text-white text-xs mt-1">{shop.name}</div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{shop.address}</div>

                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono">

                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Stock: Rice {shop.current_stock_mt?.rice} MT</span>

                    <span className="text-slate-500 flex items-center"><MapPin className="w-3 h-3 mr-1 text-slate-400" />1.2 km</span>

                  </div>

                </div>

              ))}

            </div>

          </div>



        </div>

      )}



      {/* Multilingual Voice & Text AI Grievance Redressal Form */}

      <div className="theme-card rounded-xl p-5 sm:p-6 shadow-sm space-y-3.5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

          <div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.fileGrievance}</h3>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.grievancePlaceholder}</p>

          </div>



          {/* Voice Input Mic Trigger */}

          <button

            type="button"

            onClick={handleVoiceRecord}

            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all self-start ${

              isListening

                ? 'bg-rose-600 text-white animate-pulse'

                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'

            }`}

          >

            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />}

            <span>{isListening ? 'Listening...' : 'Voice Record (बोलून सांगा)'}</span>

          </button>

        </div>



        {/* Realistic Voice Test Chips */}

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">

          <span className="flex items-center space-x-1">

            <Volume2 className="w-3 h-3 text-slate-400" />

            <span>Simulate Voice Prompt:</span>

          </span>

          {voicePrompts.map((vp, idx) => (

            <button

              key={idx}

              type="button"

              onClick={() => setComplaintText(vp.text)}

              className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] border border-slate-200 dark:border-slate-700 font-sans"

            >

              {vp.label}

            </button>

          ))}

        </div>



        <form onSubmit={handleComplaintSubmit} className="space-y-2.5">

          <textarea

            rows="3"

            value={complaintText}

            onChange={e => setComplaintText(e.target.value)}

            placeholder={t.grievancePlaceholder}

            className="w-full bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500"

          />



          <div className="flex items-center justify-between">

            <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">

              <Phone className="w-3 h-3 text-sky-600 dark:text-sky-400" />

              <span>National PDS Helpline: 1967 (Toll Free)</span>

            </div>



            <button

              type="submit"

              disabled={isSubmitting || !complaintText.trim()}

              className="px-4 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white font-medium text-xs transition-colors flex items-center space-x-1.5"

            >

              <Send className="w-3 h-3" />

              <span>{isSubmitting ? 'Submitting to AI...' : t.submitBtn}</span>

            </button>

          </div>

        </form>



        {/* Complaint Result */}

        {submittedComplaint && (

          <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-[#0c1f17] border border-emerald-200 dark:border-emerald-900/60 space-y-1 animate-fadeIn">

            <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs">

              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />

              <span>Grievance Registered • Tracking Token: {submittedComplaint.tracking_token}</span>

            </div>

            <div className="text-[11px] text-slate-700 dark:text-slate-300">

              <b>AI NLP Triage: </b>

              <span className="font-mono text-sky-700 dark:text-sky-300">[{submittedComplaint.ai_triage_result?.category}] </span>

              <span>with {submittedComplaint.ai_triage_result?.urgency} urgency. Automated cross-referencing initiated with FPS weighing scale logs.</span>

            </div>

          </div>

        )}

      </div>



    </div>

  );

}325391
