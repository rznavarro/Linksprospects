import React, { useState } from 'react';
import { 
  Instagram, ExternalLink, Calendar, AlertCircle, 
  MapPin, Clock, Plus, Tag, FileText, CheckCircle, 
  TrendingUp, CircleDot, RefreshCw, Send, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { Prospect, ProspectStatus, ActivityLog } from '../types.ts';

interface ProspectDetailProps {
  prospect: Prospect | null;
  onUpdateStatus: (id: string, nextStatus: ProspectStatus) => void;
  onUpdatePriority: (id: string, nextPriority: 'Baja' | 'Media' | 'Alta') => void;
  onAddLog: (id: string, content: string) => void;
  onDeleteLog: (id: string, logId: string) => void;
  onEditProspect: (prospect: Prospect) => void;
}

export default function ProspectDetail({
  prospect,
  onUpdateStatus,
  onUpdatePriority,
  onAddLog,
  onDeleteLog,
  onEditProspect
}: ProspectDetailProps) {
  const [newLogContent, setNewLogContent] = useState('');

  if (!prospect) {
    return (
      <div 
        className="bg-white rounded-3xl border border-zinc-200 h-full shadow-md"
        id="empty-detail-placeholder"
      />
    );
  }

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogContent.trim()) return;
    onAddLog(prospect.id, newLogContent.trim());
    setNewLogContent('');
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} a las ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const getStatusColorIndicator = (status: ProspectStatus) => {
    switch (status) {
      case ProspectStatus.PRIMER_CONTACTO:
        return 'bg-cyan-500';
      case ProspectStatus.REPROSPECTAR:
        return 'bg-amber-500';
      case ProspectStatus.HACER_SEGUIMIENTO:
        return 'bg-blue-500';
      case ProspectStatus.CREARLE_WEB:
        return 'bg-violet-500';
      case ProspectStatus.REUNION_AGENDADA:
        return 'bg-pink-500';
      case ProspectStatus.CLIENTE_CERRADO:
        return 'bg-emerald-500';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-md h-full overflow-hidden flex flex-col justify-between" id="prospect-detail-container">
      {/* Detail Header */}
      <div className="p-4 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-4 bg-zinc-50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-850 text-white flex items-center justify-center shrink-0">
            <span className="font-black text-sm uppercase">
              {prospect.fullName.substring(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="font-black text-zinc-900 text-sm leading-none uppercase tracking-tight flex items-center gap-2">
              {prospect.fullName}
              <button 
                onClick={() => onEditProspect(prospect)}
                className="text-[10px] text-blue-600 hover:underline hover:text-blue-800 font-black cursor-pointer uppercase transition-colors"
                id="edit-link-inner"
              >
                (Editar)
              </button>
            </h2>
            <div className="flex items-center gap-1 mt-1">
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <a 
                href={prospect.conversationUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono font-black text-zinc-650 hover:text-blue-600 flex items-center gap-0.5 underline decoration-2 decoration-zinc-300"
              >
                @{prospect.username}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Action Link button */}
        <a 
          href={prospect.conversationUrl}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95 text-center uppercase"
          id="btn-goto-instagram"
        >
          <Instagram className="w-4 h-4 text-white" />
          <span>Abrir Conversión de IG</span>
        </a>
      </div>

      {/* Detail Body Scrolls */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[580px]">
        
        {/* Core Quick Selectors Panel */}
        <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 grid grid-cols-2 gap-3.5 shadow-sm">
          {/* Status Quick Select */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-zinc-600 block mb-1">Mover Estado</label>
            <select
              value={prospect.status}
              onChange={(e) => onUpdateStatus(prospect.id, e.target.value as ProspectStatus)}
              className="w-full text-xs font-bold bg-white border border-zinc-250 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-zinc-800 cursor-pointer"
              id="detail-status-changer"
            >
              {Object.values(ProspectStatus).map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Priority Select */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-zinc-600 block mb-1">Prioridad de Cierre</label>
            <select
              value={prospect.priority}
              onChange={(e) => onUpdatePriority(prospect.id, e.target.value as 'Baja' | 'Media' | 'Alta')}
              className="w-full text-xs font-bold bg-white border border-zinc-250 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-zinc-800 cursor-pointer"
              id="detail-priority-changer"
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </div>

        {/* Timeline Log Feed of interactions */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-zinc-900 font-extrabold text-xs px-1 uppercase">
            <div className="flex items-center gap-1.5">
              <CircleDot className="w-4 h-4 text-zinc-800" />
              <h3>Bitácora de Interacciones</h3>
            </div>
            <span className="text-[10px] text-zinc-500 font-black">Historial ({prospect.logs.length})</span>
          </div>

          {/* Quick log submit */}
          <form onSubmit={handleLogSubmit} className="flex gap-2" id="log-form">
            <input
              type="text"
              placeholder="Ej: Respondí su historia, agendamos Meet..."
              value={newLogContent}
              onChange={(e) => setNewLogContent(e.target.value)}
              className="flex-1 text-xs px-3 py-2.5 border border-zinc-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-zinc-900 font-bold bg-white placeholder-zinc-400"
              id="log-input"
            />
            <button
              type="submit"
              className="px-4 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 border border-zinc-800 font-black text-xs transition-colors flex items-center justify-center shrink-0 active:scale-95 shadow-sm"
              title="Añadir nota"
              id="btn-add-log"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Logs List Feed */}
          <div className="space-y-3" id="logs-list">
            {prospect.logs.length === 0 ? (
              <div className="p-4 bg-zinc-50 rounded-xl border border-dashed border-zinc-300 text-center text-zinc-500 text-[10px] font-bold uppercase">
                No hay interacciones registradas. Escribe arriba para guardar tu primer hito de conversación.
              </div>
            ) : (
              [...prospect.logs].reverse().map((log) => (
                <div 
                  key={log.id} 
                  className="bg-white p-3.5 rounded-xl border border-zinc-200 shadow-xs flex items-start justify-between gap-3 text-xs leading-relaxed"
                  id={`log-item-${log.id}`}
                >
                  <div className="min-w-0">
                    <p className="text-zinc-800 font-bold font-sans">
                      {log.content}
                    </p>
                    <span className="text-[9px] text-zinc-500 font-bold block mt-1 font-mono uppercase tracking-wider">
                      {formatDate(log.date)}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      onDeleteLog(prospect.id, log.id);
                    }}
                    className="p-1 rounded bg-zinc-100 hover:bg-rose-100 text-zinc-500 hover:text-rose-600 border border-zinc-200 transition-colors shrink-0 font-bold text-sm" 
                    title="Eliminar registro"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Footer Meta tracker */}
      <div className="px-4 py-3 bg-zinc-900 border-t border-zinc-800 text-[10px] text-white font-black uppercase tracking-widest flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          Registrado: {new Date(prospect.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          Estado: <span className="text-cyan-300 font-black">{prospect.status}</span>
        </span>
      </div>
    </div>
  );
}
