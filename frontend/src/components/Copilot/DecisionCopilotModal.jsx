import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Send, 
  Bot, 
  User, 
  Zap, 
  ShieldAlert, 
  CheckCircle2,
  FileText,
  Lock,
  RotateCcw
} from 'lucide-react';
import { api } from '../../services/api';

export default function DecisionCopilotModal({ isOpen, onClose, onQuickAction, currentUser }) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `### 🛡️ PDS Decision Copilot Online
**Workspace Authenticated**: ${currentUser?.name || 'District Supply Officer (DSO)'}
**Jurisdiction**: Nagpur Division Hub-04

I have indexed live multi-stream telemetry across **8 Fair Price Shops**, **4 GPS logistics trucks**, and **3 FCI Buffer Depots**. You can ask me any question or issue enforcement commands:`,
      chips: [
        "hi",
        "Summarize active diversion threats in Nagpur",
        "Draft show-cause notice for flagged dealer",
        "Reallocate quota from FPS-4102 to verified backup",
        "Inspect weighbridge calibration drift",
        "Live truck fleet status"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionDoneMsg, setActionDoneMsg] = useState(null);

  const handleSend = async (textToSend = null) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: query }];
    setMessages(newMsgs);
    if (!textToSend) setInput('');
    setLoading(true);
    setActionDoneMsg(null);

    try {
      const response = await api.askCopilot(query, currentUser?.role || "District Supply Officer");
      
      setMessages([
        ...newMsgs,
        {
          sender: 'ai',
          text: response.reply,
          chips: response.suggested_chips || [],
          action_type: response.action_type,
          action_payload: response.action_payload
        }
      ]);
    } catch (e) {
      setMessages([
        ...newMsgs,
        {
          sender: 'ai',
          text: `I encountered an issue querying the live telemetry engine. Please try selecting a suggestion chip below.`,
          chips: [
            "Summarize active diversion threats in Nagpur",
            "Draft show-cause notice for flagged dealer"
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAction = (actionType, payload) => {
    if (onQuickAction) {
      if (actionType === 'DEPLOY_FLYING_SQUAD') {
        onQuickAction('ALT-2026-0891', 'DEPLOY_SQUAD');
        setActionDoneMsg("✅ Vigilance Flying Squad #2 dispatched with GPS geo-fencing route lock.");
      } else if (actionType === 'REALLOCATE_QUOTA') {
        onQuickAction('ALT-2026-0891', 'FREEZE_POS');
        setActionDoneMsg("✅ 12.0 MT Grain Quota reallocated to Pragati Mahila Kendra (FPS-4103).");
      } else {
        onQuickAction('ALT-2026-0891', actionType);
        setActionDoneMsg(`✅ Automated Action [${actionType}] executed in District Registry.`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f1422] border border-slate-300 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[620px]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0d17]">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wide">
                  PDS DECISION COPILOT
                </h3>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                  ONLINE • MSTE v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Autonomous Enforcement & Policy Intelligence Engine (Nagpur Division)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Confirmation Banner */}
        {actionDoneMsg && (
          <div className="bg-emerald-50 dark:bg-[#0c1f17] border-b border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs px-4 py-2 font-mono flex items-center justify-between animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{actionDoneMsg}</span>
            </div>
            <button 
              onClick={() => setActionDoneMsg(null)}
              className="text-emerald-600 hover:text-emerald-800 text-[10px] uppercase font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-sans">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2.5 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${msg.sender === 'user' ? 'bg-sky-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-400'}`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                
                <div className="space-y-2">
                  <div className={`p-3.5 rounded-xl leading-relaxed ${msg.sender === 'user' ? 'bg-sky-700 text-white font-medium shadow-sm' : 'bg-slate-50 dark:bg-[#080b12] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs'}`}>
                    <div className="prose prose-slate dark:prose-invert prose-xs leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </div>

                    {/* Interactive Enforcement Action Trigger Button if AI generated an action */}
                    {msg.action_type && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
                        <button
                          onClick={() => handleExecuteAction(msg.action_type, msg.action_payload)}
                          className="px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-xs"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Execute Recommended Action ({msg.action_type.replace(/_/g, ' ')})</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Quick Suggestion Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium transition-colors shadow-2xs text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-slate-500 text-xs pl-8 font-mono">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
              <span>PDS Sentinel AI synthesizing real-time operational response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0d17]">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask Copilot (e.g., 'hi', 'show threats', 'draft notice for FPS-4102', 'truck status')..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 h-10 bg-white dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 font-sans shadow-2xs"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 px-4 rounded-xl bg-sky-700 hover:bg-sky-600 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

// Sync step: 327

// Sync step: 393
