import { Prospect, ProspectStatus } from './types.ts';

export const INITIAL_PROSPECTS: Prospect[] = [
  {
    id: 'p-1',
    username: 'origen_cafe_artesanal',
    fullName: 'Origen Café & Tostauría',
    conversationUrl: 'https://instagram.com/direct/inbox/',
    status: ProspectStatus.CREARLE_WEB,
    situationInfo: 'Tienen café gourmet excelente y 12k seguidores, pero su biolink lleva a un PDF de WhatsApp desactualizado. Tardan en responder cotizaciones.',
    nextActionPlan: 'Diseñarle una landing page demo donde sus clientes canjeen cafés online y agenden entregas en 1 clic. Enviar captura interactiva del prototipo.',
    category: 'Negocio Local',
    priority: 'Alta',
    createdAt: '2026-05-18T10:30:00Z',
    updatedAt: '2026-05-20T14:20:00Z',
    logs: [
      { id: 'l-1', content: 'Le di like a sus últimas 3 publicaciones sobre tueste medio.', date: '2026-05-18T10:35:00Z' },
      { id: 'l-2', content: 'Respondí a su historia sobre la nueva máquina expreso ofreciendo consejo de flujo.', date: '2026-05-19T11:00:00Z' }
    ]
  },
  {
    id: 'p-2',
    username: 'vicky.fitmind',
    fullName: 'Vicky Rojas | Coach de Bienestar',
    conversationUrl: 'https://instagram.com/direct/inbox/',
    status: ProspectStatus.REPROSPECTAR,
    situationInfo: 'Ofrece mentoría 1-a-1 de nutrición y fitness. Cuenta con buen engagement en reels pero no tiene una oferta "high-ticket" automatizada.',
    nextActionPlan: 'Sugerirle estructurar un Bootcamp Premium de 8 semanas. Propuse hacer una llamada breve para guiarla sobre cómo estructurar el contenido.',
    category: 'Marca Personal',
    priority: 'Media',
    createdAt: '2026-05-15T09:15:00Z',
    updatedAt: '2026-05-21T08:10:00Z',
    logs: [
      { id: 'l-3', content: 'Vio mi mensaje de contacto pero no respondió. Dejó un emoji en mi última historia.', date: '2026-05-16T15:00:00Z' },
      { id: 'l-4', content: 'Interacción en encuestas de sus historias de entrenamiento.', date: '2026-05-21T08:00:00Z' }
    ]
  },
  {
    id: 'p-3',
    username: 'dental_estetica_nord',
    fullName: 'Clínica Dental Nord-Estética',
    conversationUrl: 'https://instagram.com/direct/inbox/',
    status: ProspectStatus.HACER_SEGUIMIENTO,
    situationInfo: 'Clínica odontológica con sede física de lujo. Su web está caída y no consiguen leads desde Instagram, solo hacen posts corporativos aburridos.',
    nextActionPlan: 'Enviarles una auditoría rápida de 2 minutos en video Loom mostrando cómo sus competidores captan leads con anuncios dirigidos a DMs.',
    category: 'Negocio Local',
    priority: 'Alta',
    createdAt: '2026-05-19T14:00:00Z',
    updatedAt: '2026-05-20T16:30:00Z',
    logs: [
      { id: 'l-5', content: 'Establecí contacto inicial con el administrador. Mostró interés pero pidió revisar la próxima semana.', date: '2026-05-19T16:45:00Z' }
    ]
  },
  {
    id: 'p-4',
    username: 'aurora.concept_ar',
    fullName: 'Aurora Concept | Joyería de Diseño',
    conversationUrl: 'https://instagram.com/direct/inbox/',
    status: ProspectStatus.PRIMER_CONTACTO,
    situationInfo: 'Marca de indumentaria/joyería artesanal de nicho. Envían mucho a todo el país pero su checkout es manual mediante conversaciones tediosas.',
    nextActionPlan: 'Presentarles plantillas automatizadas de ManyChat para que puedan autocompletar ventas por Instagram DMs sin perder clientes en la espera.',
    category: 'Ecommerce',
    priority: 'Baja',
    createdAt: '2026-05-21T12:00:00Z',
    updatedAt: '2026-05-21T12:00:00Z',
    logs: []
  },
  {
    id: 'p-5',
    username: 'dr.marcelo.ojeda',
    fullName: 'Dr. Marcelo Ojeda - Cardiólogo',
    conversationUrl: 'https://instagram.com/direct/inbox/',
    status: ProspectStatus.REUNION_AGENDADA,
    situationInfo: 'Cardiólogo interesado en mejorar su marca personal para conferencias de salud y captar pacientes particulares de alto poder adquisitivo.',
    nextActionPlan: 'Reunión acordada por Google Meet este viernes a las 16:00. Preparar brief de marca, paleta de colores profesional y estructura de contenido médico.',
    category: 'Infocreador',
    priority: 'Alta',
    createdAt: '2026-05-10T11:00:00Z',
    updatedAt: '2026-05-21T15:30:00Z',
    logs: [
      { id: 'l-6', content: 'Aceptó la propuesta de sesión estratégica tras mostrarle un reel corregido.', date: '2026-05-20T18:00:00Z' }
    ]
  }
];

export interface PitchTemplate {
  id: string;
  title: string;
  category: string;
  text: string;
}

export const PITCH_TEMPLATES: PitchTemplate[] = [
  {
    id: 't-1',
    title: 'Gancho de Propuesta Web',
    category: 'Crearle Web',
    text: 'Hola {name}! 👋 Vi que tienen un producto excelente en su cuenta, pero el enlace de la bio está roto o es confuso para comprar de inmediato. Justo creé un prototipo de cómo se vería una landing rápida para ustedes que automatiza el proceso. ¿Te molesta si te paso un capture por aquí para ver qué te parece? Sin compromiso alguno!'
  },
  {
    id: 't-2',
    title: 'Gancho sobre Auditoría Exprés',
    category: 'Hacer Seguimiento',
    text: 'Hola {name}, muy fan de su contenido! Estaba revisando su perfil y me di cuenta de un detalle técnico simple en sus reels que les está reduciendo el alcance orgánico un 30%. Grabé un video de 1 minutito explicándolo paso a paso. ¿Me das luz verde para enviártelo por aquí?'
  },
  {
    id: 't-3',
    title: 'Propuesta de Colaboración High Ticket',
    category: 'Reprospectar',
    text: 'Hola {name}! Estuve analizando tu comunidad y veo que te adoran en los comentarios de bienestar. Creo que tienes espacio ideal para un programa premium personalizado de 8 semanas. Estructuré una pequeña guía de 3 pasos para lanzar esto en piloto automático. Te la puedo compartir si gustas!'
  },
  {
    id: 't-4',
    title: 'ManyChat y Automatización DM',
    category: 'Primer Contacto',
    text: 'Excelente trabajo con la tienda {name}! Me encanta su catálogo. Vi que para responder precios atienden uno a uno en DMs. Esto suele fatigar la venta si el cliente espera. ¿Han considerado implementar una automatización nativa que envíe el link al instante cuando comenten "precio"? Te puedo pasar una demo de 30 segundos.'
  }
];
