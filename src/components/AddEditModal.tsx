import React, { useState, useEffect } from 'react';
import { X, Link, AlertCircle, Sparkles } from 'lucide-react';
import { Prospect, ProspectStatus } from '../types.ts';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prospectData: {
    username: string;
    fullName: string;
    conversationUrl: string;
    status: ProspectStatus;
    priority: 'Baja' | 'Media' | 'Alta';
  }) => void;
  prospectToEdit: Prospect | null;
}

export default function AddEditModal({ isOpen, onClose, onSave, prospectToEdit }: AddEditModalProps) {
  const [conversationUrl, setConversationUrl] = useState('');
  const [priority, setPriority] = useState<'Baja' | 'Media' | 'Alta'>('Media');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prospectToEdit) {
      setConversationUrl(prospectToEdit.conversationUrl || prospectToEdit.username);
      setPriority(prospectToEdit.priority || 'Media');
    } else {
      setConversationUrl('');
      setPriority('Media');
    }
    setErrorMsg('');
  }, [prospectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const targetUrl = conversationUrl.trim();
    if (!targetUrl) {
      setErrorMsg('Por favor ingresa un usuario o enlace para el chat.');
      return;
    }

    let cleanInput = targetUrl;
    let parsedUsername = '';
    let parsedUrl = '';

    // Advanced Parser for Instagram Profile URLs or usernames
    if (cleanInput.startsWith('@')) {
      parsedUsername = cleanInput.substring(1);
      parsedUrl = `https://www.instagram.com/${parsedUsername}/`;
    } else if (/^https?:\/\//i.test(cleanInput) || cleanInput.includes('instagram.com') || cleanInput.includes('ig.me')) {
      let urlString = cleanInput;
      if (!/^https?:\/\//i.test(urlString)) {
        urlString = 'https://' + urlString;
      }
      try {
        const urlObj = new URL(urlString);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
          if (pathParts[0] === 'direct') {
            const lastPart = pathParts[pathParts.length - 1];
            if (lastPart && lastPart !== 'direct' && lastPart !== 'inbox' && lastPart !== 't') {
              parsedUsername = lastPart;
            } else {
              parsedUsername = 'chat_ig';
            }
          } else {
            parsedUsername = pathParts[0];
          }
        } else {
          parsedUsername = 'prospecto_ig';
        }
        parsedUrl = urlString;
      } catch (err) {
        parsedUsername = 'prospecto_ig';
        parsedUrl = urlString;
      }
    } else {
      parsedUsername = cleanInput.toLowerCase().trim();
      parsedUrl = `https://www.instagram.com/${parsedUsername}/`;
    }

    if (!parsedUsername) {
      parsedUsername = 'prospecto_ig';
    }

    const finalUsername = prospectToEdit ? prospectToEdit.username : parsedUsername;
    const finalFullName = prospectToEdit ? prospectToEdit.fullName : parsedUsername;

    onSave({
      username: finalUsername,
      fullName: finalFullName,
      conversationUrl: parsedUrl,
      status: ProspectStatus.PRIMER_CONTACTO,
      priority
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" id="modal-container">
      <div 
        className="bg-white rounded-2xl border border-zinc-200 shadow-xl w-full max-w-md overflow-hidden flex flex-col"
        id="modal-card"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-blue-600" />
            <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-tight">
              {prospectToEdit ? 'Editar Prospecto' : 'Nuevo Prospecto'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors text-zinc-600 cursor-pointer"
            id="close-modal-btn"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 p-2.5 rounded-xl text-red-900 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Chat Link or Username */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider block">
              Usuario de IG o Enlace del Chat
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="ej: @nombre_usuario o url directa..."
                value={conversationUrl}
                onChange={(e) => setConversationUrl(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-zinc-350 rounded-xl text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 bg-white text-zinc-900 placeholder-zinc-450"
                required
                id="input-url"
              />
            </div>
          </div>

          {/* Priority Select Dot */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider block">
              Prioridad de Cierre (Círculo)
            </label>
            <div className="flex gap-1.5 bg-zinc-50 p-1 rounded-xl border border-zinc-200">
              {(['Baja', 'Media', 'Alta'] as const).map((p) => {
                const isActive = priority === p;
                
                // Color dots
                const getDotColor = (level: string) => {
                  if (level === 'Alta') return 'bg-red-500';
                  if (level === 'Media') return 'bg-yellow-400';
                  return 'bg-green-500';
                };

                return (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-1.5 px-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isActive 
                        ? p === 'Alta' 
                          ? 'bg-red-50 text-red-700 border border-red-200 font-extrabold' 
                          : p === 'Media' 
                            ? 'bg-yellow-50 text-yellow-800 border border-yellow-250 font-extrabold' 
                            : 'bg-green-50 text-green-700 border border-green-200 font-extrabold'
                        : 'text-zinc-650 hover:bg-zinc-100 border border-transparent'
                    }`}
                    id={`btn-priority-${p}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${getDotColor(p)}`} />
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-zinc-100 flex items-center justify-end gap-2 bg-zinc-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-white hover:bg-zinc-150 border border-zinc-200 text-zinc-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
            id="cancel-modal-btn"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg text-xs transition-all cursor-pointer shadow-xs"
            id="save-modal-btn"
          >
            {prospectToEdit ? 'Guardar Cambios' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
