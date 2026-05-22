export enum ProspectStatus {
  PRIMER_CONTACTO = 'Primer Contacto',
  REPROSPECTAR = 'Reprospectar',
  HACER_SEGUIMIENTO = 'Hacer Seguimiento',
  CREARLE_WEB = 'Crearle Web',
  REUNION_AGENDADA = 'Reunión Agendada',
  CLIENTE_CERRADO = 'Cliente Cerrado'
}

export interface ActivityLog {
  id: string;
  content: string;
  date: string;
}

export interface Prospect {
  id: string;
  username: string;
  fullName: string;
  conversationUrl: string;
  status: ProspectStatus;
  situationInfo?: string;
  nextActionPlan?: string;
  logs: ActivityLog[];
  category?: string; // e.g. "Marca Personal", "Negocio Local", "Ecommerce", "Infocreador"
  priority: 'Baja' | 'Media' | 'Alta';
  messageSent?: boolean;
  createdAt: string;
  updatedAt: string;
}
