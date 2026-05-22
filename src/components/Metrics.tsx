import { Users, CheckCircle2 } from 'lucide-react';
import { Prospect, ProspectStatus } from '../types.ts';

interface MetricsProps {
  prospects: Prospect[];
  activeStatusFilter: ProspectStatus | 'todos';
  onSelectStatusFilter: (status: ProspectStatus | 'todos') => void;
}

export default function Metrics({ prospects, activeStatusFilter, onSelectStatusFilter }: MetricsProps) {
  const countByStatus = (status: ProspectStatus) => {
    return prospects.filter((p) => p.status === status).length;
  };

  const getMetricClass = (isActive: boolean, activeColor: string) => {
    const base = 'p-4.5 rounded-3xl border border-zinc-200 transition-all duration-200 cursor-pointer text-left ';
    if (isActive) {
      return base + activeColor + ' shadow-md scale-102';
    }
    return base + 'bg-white hover:bg-zinc-50/80 shadow-xs hover:shadow-sm active:scale-98';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-6" id="metrics-grid">
      {/* Total Card */}
      <button
        onClick={() => onSelectStatusFilter('todos')}
        className={getMetricClass(activeStatusFilter === 'todos', 'bg-zinc-100 text-zinc-900')}
        id="metric-todos"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Prospectos</span>
          <Users className="w-4 h-4 text-zinc-900" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black tracking-tight text-zinc-900">{prospects.length}</span>
          <span className="text-[10px] text-zinc-500 uppercase font-black">total</span>
        </div>
      </button>

      {/* Cerrados */}
      <button
        onClick={() => onSelectStatusFilter(ProspectStatus.CLIENTE_CERRADO)}
        className={getMetricClass(activeStatusFilter === ProspectStatus.CLIENTE_CERRADO, 'bg-emerald-100 text-emerald-950')}
        id="metric-cerrado"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Cerrados</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black tracking-tight text-emerald-950">{countByStatus(ProspectStatus.CLIENTE_CERRADO)}</span>
          <span className="text-[10px] text-emerald-700 uppercase font-black">ganado!</span>
        </div>
      </button>
    </div>
  );
}
