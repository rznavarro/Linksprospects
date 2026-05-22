import { useState, useEffect } from 'react';
import { 
  Plus, Instagram, Trash2, RotateCcw, Sparkles 
} from 'lucide-react';
import { Prospect, ProspectStatus } from './types.ts';
import { INITIAL_PROSPECTS } from './data.ts';
import ProspectList from './components/ProspectList.tsx';
import AddEditModal from './components/AddEditModal.tsx';

export default function App() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  
  // Modal states
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [prospectToEdit, setProspectToEdit] = useState<Prospect | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('ig_prospects_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Prospect[];
        setProspects(parsed);
      } catch (err) {
        console.error('Error parsing loaded prospects, fallback to demo data', err);
        setProspects(INITIAL_PROSPECTS);
      }
    } else {
      setProspects(INITIAL_PROSPECTS);
    }
  }, []);

  // Sync back to LocalStorage
  const saveToLocalStorage = (newProspects: Prospect[]) => {
    setProspects(newProspects);
    localStorage.setItem('ig_prospects_v1', JSON.stringify(newProspects));
  };

  // Add / Edit handler
  const handleSaveProspect = (data: {
    username: string;
    fullName: string;
    conversationUrl: string;
    status: ProspectStatus;
    priority: 'Baja' | 'Media' | 'Alta';
  }) => {
    let nextProspectsList: Prospect[];

    if (prospectToEdit) {
      // Edit Mode
      nextProspectsList = prospects.map((p) => {
        if (p.id === prospectToEdit.id) {
          return {
            ...p,
            ...data,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      });
      setProspectToEdit(null);
    } else {
      // Add Mode
      const newProspect: Prospect = {
        id: `p-${Date.now()}`,
        username: data.username,
        fullName: data.fullName,
        conversationUrl: data.conversationUrl,
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        logs: [],
        priority: data.priority
      };
      nextProspectsList = [newProspect, ...prospects];
    }

    saveToLocalStorage(nextProspectsList);
  };

  // Delete prospect
  const handleDeleteProspect = (id: string) => {
    const remaining = prospects.filter((p) => p.id !== id);
    saveToLocalStorage(remaining);
  };

  // Toggle message sent status
  const handleToggleMessageSent = (id: string, sent: boolean) => {
    const updated = prospects.map((p) => {
      if (p.id === id) {
        return { ...p, messageSent: sent };
      }
      return p;
    });
    saveToLocalStorage(updated);
  };

  // Utilities action logs
  const handleResetDemoData = () => {
    saveToLocalStorage(INITIAL_PROSPECTS);
  };

  const handleClearAll = () => {
    saveToLocalStorage([]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-6 flex flex-col justify-between" id="app-wrapper" style={{ backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
      
      {/* Centered Desktop Simulator Workspace Frame */}
      <div 
        className="w-full max-w-3xl mx-auto bg-white rounded-3xl border border-zinc-250 shadow-md p-5 flex flex-col justify-between space-y-5 min-h-[600px] md:min-h-[750px]"
        id="desktop-workspace"
      >
        
        {/* Navigation / Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-100 pb-4" id="app-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs shrink-0">
              <Instagram className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h1 className="text-sm font-black text-zinc-900 uppercase tracking-tight flex items-center gap-2">
                Links Prospectos IG
              </h1>
              <p className="text-[11px] text-zinc-500 font-medium">Pulsa en cualquier prospecto para abrir su chat al instante.</p>
            </div>
          </div>

          {/* Quick core actions toolbar */}
          <div className="flex items-center gap-2" id="toolbar-actions">
            <button
              onClick={handleResetDemoData}
              className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-zinc-800 border border-amber-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              title="Restaurar demo"
              id="reset-demo-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Demos</span>
            </button>

            <button
              onClick={handleClearAll}
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 rounded-lg text-xs font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              title="Limpiar todo"
              id="clear-all-btn"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>

            <button
              onClick={() => {
                setProspectToEdit(null);
                setIsAddEditOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 active:scale-95 cursor-pointer uppercase"
              id="new-prospect-top-btn"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Nuevo</span>
            </button>
          </div>
        </header>

        {/* Vertical List Panel (Takes up the whole card content body) */}
        <div className="flex-1 flex flex-col" id="main-content-column">
          <ProspectList
            prospects={prospects}
            onEditProspect={(p) => {
              setProspectToEdit(p);
              setIsAddEditOpen(true);
            }}
            onDeleteProspect={handleDeleteProspect}
            onToggleMessageSent={handleToggleMessageSent}
          />
        </div>

      </div>

      {/* Modern low-key footer */}
      <footer className="mt-6 text-center" id="app-footer-info">
        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          EnlaceDirecto • Círculos indican prioridad : Rojo (Alta) • Amarillo (Media) • Verde (Baja)
        </p>
      </footer>

      {/* Add / Edit Form Modal */}
      <AddEditModal
        isOpen={isAddEditOpen}
        onClose={() => {
          setIsAddEditOpen(false);
          setProspectToEdit(null);
        }}
        onSave={handleSaveProspect}
        prospectToEdit={prospectToEdit}
      />

    </div>
  );
}
