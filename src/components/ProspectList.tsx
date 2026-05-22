import { Trash2, Edit2, Sparkles, ExternalLink, Check } from 'lucide-react';
import { Prospect } from '../types.ts';

interface ProspectListProps {
  prospects: Prospect[];
  onEditProspect: (prospect: Prospect) => void;
  onDeleteProspect: (id: string) => void;
  onToggleMessageSent: (id: string, sent: boolean) => void;
}

export default function ProspectList({
  prospects,
  onEditProspect,
  onDeleteProspect,
  onToggleMessageSent
}: ProspectListProps) {
  
  // Sorting Priority Weight (High first, then newly created)
  const priorityWeight = {
    'Alta': 3,
    'Media': 2,
    'Baja': 1
  };

  // Automatically sort by priority and date
  const processedProspects = [...prospects]
    .sort((a, b) => {
      const weightA = priorityWeight[a.priority] || 0;
      const weightB = priorityWeight[b.priority] || 0;
      
      if (weightB !== weightA) {
        return weightB - weightA;
      }
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getPriorityColor = (priority: 'Baja' | 'Media' | 'Alta') => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-500 ring-4 ring-red-100 animate-pulse';
      case 'Media':
        return 'bg-yellow-400 ring-4 ring-yellow-50';
      case 'Baja':
        return 'bg-green-500 ring-4 ring-green-50';
    }
  };

  const handleRowClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col h-full overflow-hidden" id="prospects-list-container">
      {/* Compact List Header */}
      <div className="px-4 py-2 bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
        <span>Lista ({processedProspects.length})</span>
        <span className="text-[9px] lowercase font-normal italic text-zinc-400">Clic en una fila para ir al chat directo</span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto divide-y divide-zinc-100" id="prospects-scrollable">
        {processedProspects.length === 0 ? (
          <div className="py-16 px-6 text-center text-zinc-400">
            <Sparkles className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-xs font-bold uppercase text-zinc-800">No hay prospectos</p>
            <p className="text-[10px] text-zinc-500 mt-1">Registra nuevos prospectos para verlos aquí.</p>
          </div>
        ) : (
          processedProspects.map((p) => {
            return (
              <div
                key={p.id}
                onClick={() => handleRowClick(p.conversationUrl)}
                className="p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-zinc-50/80 transition-all duration-150 group"
                id={`prospect-item-${p.id}`}
                title="Abrir chat en Instagram"
              >
                {/* Left block: Priority Circle indicator & Name details */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Message Sent Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMessageSent(p.id, !p.messageSent);
                    }}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer ${
                      p.messageSent
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-zinc-300 text-transparent hover:border-blue-500 hover:bg-zinc-50'
                    }`}
                    title={p.messageSent ? 'Mensaje enviado. Haz clic para desmarcar' : 'Marcar como: Mensaje Enviado'}
                  >
                    <Check className={`w-3.5 h-3.5 stroke-[3] ${p.messageSent ? 'block' : 'hidden group-hover:block text-zinc-300'}`} />
                  </button>

                  {/* Circular Priority Indicator */}
                  <div 
                    className={`w-3.5 h-3.5 rounded-full shrink-0 ${getPriorityColor(p.priority)}`} 
                    title={`Prioridad: ${p.priority}`} 
                  />
                  
                  {/* Name and Username on single clean row */}
                  <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className={`font-extrabold text-xs leading-snug uppercase tracking-tight truncate max-w-[140px] sm:max-w-[200px] ${p.messageSent ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>
                      {p.fullName}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-medium block leading-none">
                      @{p.username}
                    </span>
                  </div>
                </div>

                {/* Right side: Actions / External indicator */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* External icon shown to nudge user that this goes directly to instagram */}
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-300 group-hover:text-blue-500 transition-colors" />

                  {/* Inline CRUD actions for quick editing/deleting */}
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onEditProspect(p)}
                      className="p-1 rounded-lg bg-zinc-50 hover:bg-zinc-150 text-zinc-500 hover:text-zinc-900 border border-zinc-200 transition-colors cursor-pointer"
                      title="Editar prioridad u origen"
                      id={`edit-btn-${p.id}`}
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteProspect(p.id)}
                      className="p-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition-colors cursor-pointer"
                      title="Eliminar"
                      id={`delete-btn-${p.id}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
