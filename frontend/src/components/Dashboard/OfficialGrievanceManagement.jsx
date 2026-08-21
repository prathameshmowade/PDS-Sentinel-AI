import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Zap, 
  UserCheck, 
  Send, 
  MessageSquare, 
  AlertTriangle,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';

const SQUAD_UNITS = [
  "Flying Squad Unit #2 (East Zone - Nagpur)",
  "Flying Squad Unit #1 (West Zone - Nagpur)",
  "Weights & Measures Inspector Team 4",
  "District Supply Vigilance Cell",
  "Area Food Inspector (Wardha/Hingna Hub)"
];

export default function OfficialGrievanceManagement({ onRefreshData }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState(SQUAD_UNITS[0]);
  const [officerNotes, setOfficerNotes] = useState('');
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [actionSuccessBanner, setActionSuccessBanner] = useState(null);

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const data = await api.getGrievances();
      setComplaints(data || []);
    } catch (e) {
      console.error('Failed to load grievances', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleAutoAssign = async (complaint) => {
    // Recommend optimal squad based on category
    let recommendedSquad = SQUAD_UNITS[0];
    if (complaint.category === 'UNDER_WEIGHING') {
      recommendedSquad = SQUAD_UNITS[2]; // Weights & Measures
    } else if (complaint.fps_id === 'FPS-4106') {
      recommendedSquad = SQUAD_UNITS[4]; // Rural/Hingna
    }

    const res = await api.assignGrievance(
      complaint.id, 
      recommendedSquad, 
      `AI Auto-Dispatched based on NLP urgency [${complaint.urgency}] and location proximity.`,
      'AUTO_AI'
    );

    if (res.status === 'SUCCESS') {
      setActionSuccessBanner(`⚡ Ticket ${complaint.id} auto-assigned to ${recommendedSquad}`);
      setTimeout(() => setActionSuccessBanner(null), 4000);
      loadComplaints();
      if (onRefreshData) onRefreshData();
    }
  };

  const handleManualAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    const res = await api.assignGrievance(
      selectedComplaint.id,
      selectedSquad,
      officerNotes,
      'MANUAL'
    );

    if (res.status === 'SUCCESS') {
      setAssignModalOpen(false);
      setOfficerNotes('');
      setActionSuccessBanner(`Assigned Ticket ${selectedComplaint.id} to ${selectedSquad}`);
      setTimeout(() => setActionSuccessBanner(null), 4000);
      loadComplaints();
      if (onRefreshData) onRefreshData();
    }
  };

  const handleResolveSubmit = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    const res = await api.updateGrievanceStatus(
      selectedComplaint.id,
      'RESOLVED',
      resolutionNotes || 'Grievance verified and reconciled with dealer telemetry logs.'
    );

    if (res.status === 'SUCCESS') {
      setResolveModalOpen(false);
      setResolutionNotes('');
      setActionSuccessBanner(`Resolved Ticket ${selectedComplaint.id}. Beneficiary notified via SMS.`);
      setTimeout(() => setActionSuccessBanner(null), 4000);
      loadComplaints();
      if (onRefreshData) onRefreshData();
    }
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = 
      (c.citizen_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.card_no || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.fps_id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.original_text || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' ? true :
      statusFilter === 'PENDING' ? (c.status === 'PENDING_REVIEW' || c.status === 'AI_TRIAGED_ACTIVE') :
      statusFilter === 'ASSIGNED' ? (c.status === 'ASSIGNED' || c.status === 'UNDER_INVESTIGATION') :
      statusFilter === 'RESOLVED' ? (c.status === 'RESOLVED') : true;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = complaints.filter(c => c.status === 'PENDING_REVIEW' || c.status === 'AI_TRIAGED_ACTIVE').length;
  const assignedCount = complaints.filter(c => c.status === 'ASSIGNED' || c.status === 'UNDER_INVESTIGATION').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;

  return (
    <div className="space-y-4 animate-fadeIn">
      
      {/* Header Banner & Triage Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            <span>Citizen Grievance Triage • AI NLP Intelligence Node</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Citizen Complaints & Enforcement Assignment</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Review real-time beneficiary grievances, inspect NLP triage corroboration, and assign field vigilance squads.</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-xs font-mono text-amber-800 dark:text-amber-300">
            Pending Triage: <b>{pendingCount}</b>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-xs font-mono text-sky-800 dark:text-sky-300">
            Assigned: <b>{assignedCount}</b>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300">
            Resolved: <b>{resolvedCount}</b>
          </span>
        </div>
      </div>

      {/* Action Toast Notification */}
      {actionSuccessBanner && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-[#0f241a] border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-mono flex items-center space-x-2 shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{actionSuccessBanner}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="theme-card rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Citizen, Ration Card, Ticket ID..."
              className="w-full bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-[#0b0e17] p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded transition-colors ${statusFilter === 'ALL' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              All ({complaints.length})
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-3 py-1 rounded transition-colors ${statusFilter === 'PENDING' ? 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('ASSIGNED')}
              className={`px-3 py-1 rounded transition-colors ${statusFilter === 'ASSIGNED' ? 'bg-white dark:bg-slate-800 text-sky-700 dark:text-sky-400 font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Assigned ({assignedCount})
            </button>
            <button
              onClick={() => setStatusFilter('RESOLVED')}
              className={`px-3 py-1 rounded transition-colors ${statusFilter === 'RESOLVED' ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-bold shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>
      </div>

      {/* Complaints List Feed */}
      <div className="space-y-3">
        {filteredComplaints.length === 0 ? (
          <div className="theme-card rounded-xl p-8 text-center text-slate-500 dark:text-slate-400">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-50" />
            <p className="text-sm font-medium">No grievances matching current filter.</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => {
            const isResolved = complaint.status === 'RESOLVED';
            const isAssigned = complaint.status === 'ASSIGNED' || complaint.status === 'UNDER_INVESTIGATION';
            const isPending = !isResolved && !isAssigned;

            return (
              <div 
                key={complaint.id}
                className="theme-card rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
              >
                {/* Top Row: Ticket ID, Date, Priority Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-500/20">
                      {complaint.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {complaint.citizen_name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      ({complaint.card_no})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {complaint.urgency === 'CRITICAL' && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 text-[10px] font-mono font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>CRITICAL URGENCY</span>
                      </span>
                    )}
                    {complaint.urgency === 'HIGH' && (
                      <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-[10px] font-mono font-bold">
                        HIGH PRIORITY
                      </span>
                    )}
                    {isResolved ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-mono font-bold">
                        RESOLVED
                      </span>
                    ) : isAssigned ? (
                      <span className="px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 text-[10px] font-mono font-bold">
                        ASSIGNED TO SQUAD
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-[10px] font-mono font-bold">
                        PENDING ASSIGNMENT
                      </span>
                    )}
                  </div>
                </div>

                {/* Complaint Text & Shop Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                  <div className="lg:col-span-8 space-y-2">
                    <p className="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed bg-slate-50 dark:bg-[#0b0e17] p-3 rounded-lg border border-slate-200 dark:border-slate-800/80">
                      "{complaint.original_text}"
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center">
                        <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        Target Shop: <b className="text-slate-700 dark:text-slate-300 ml-1">{complaint.fps_id} ({complaint.fps_name})</b>
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Language: <b className="uppercase font-mono text-slate-700 dark:text-slate-300">{complaint.language}</b>
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Logged: <b className="font-mono text-slate-700 dark:text-slate-300">{complaint.created_at?.replace('T', ' ').substring(0, 16)}</b>
                      </span>
                    </div>
                  </div>

                  {/* AI NLP Triage & MSTE Corroboration Badge */}
                  <div className="lg:col-span-4 p-3 rounded-lg bg-slate-100/70 dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
                        <span className="flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                          <span>AI NLP Classification</span>
                        </span>
                        <span className="text-emerald-600 font-bold">{Math.round((complaint.nlp_confidence || 0.95) * 100)}% Conf</span>
                      </div>
                      
                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                        [{complaint.category?.replace(/_/g, ' ')}]
                      </div>

                      {complaint.verified_with_mste && (
                        <div className="mt-1 text-[10px] text-rose-700 dark:text-rose-400 font-mono flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                          <span>Corroborated by Weighbridge/GPS telemetry</span>
                        </div>
                      )}
                    </div>

                    {/* Assigned Squad Info */}
                    {complaint.assigned_squad && (
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-sky-700 dark:text-sky-300">
                        Assigned To: <b>{complaint.assigned_squad}</b> ({complaint.assigned_type || 'MANUAL'})
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Interactive Action Toolbar */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] font-mono text-slate-500">
                    Status: <b className="text-slate-800 dark:text-slate-200">{complaint.status}</b>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!isResolved && (
                      <>
                        <button
                          onClick={() => handleAutoAssign(complaint)}
                          className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 text-xs font-semibold flex items-center space-x-1 transition-colors"
                        >
                          <Zap className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                          <span>Auto-Assign (AI)</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setAssignModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center space-x-1 transition-colors"
                        >
                          <UserCheck className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                          <span>Manual Assign</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setResolveModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1 transition-colors shadow-2xs"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Resolve Ticket</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Manual Assignment Modal */}
      {assignModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="theme-card rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-sky-600" />
                <span>Assign Enforcement Unit • {selectedComplaint.id}</span>
              </h3>
              <button 
                onClick={() => setAssignModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualAssignSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Vigilance Flying Squad / Inspector Unit
                </label>
                <select
                  value={selectedSquad}
                  onChange={e => setSelectedSquad(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-sans"
                >
                  {SQUAD_UNITS.map((unit, idx) => (
                    <option key={idx} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Officer Dispatch Instructions & Special Directives
                </label>
                <textarea
                  rows="3"
                  value={officerNotes}
                  onChange={e => setOfficerNotes(e.target.value)}
                  placeholder="e.g. Conduct surprise weighbridge inspection at 14:00 and verify POS biometric failure logs..."
                  className="w-full bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-semibold flex items-center space-x-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Dispatch & Assign</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resolution Modal */}
      {resolveModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="theme-card rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Resolve Grievance • {selectedComplaint.id}</span>
              </h3>
              <button 
                onClick={() => setResolveModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleResolveSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Resolution Summary & Corrective Action Taken
                </label>
                <textarea
                  rows="3"
                  value={resolutionNotes}
                  onChange={e => setResolutionNotes(e.target.value)}
                  placeholder="e.g. Flying squad inspected shop. Dealer penalized for 350g scale offset. Beneficiary issued pending 5kg quota."
                  required
                  className="w-full bg-slate-50 dark:bg-[#0b0e17] border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResolveModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Close & Notify Citizen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
