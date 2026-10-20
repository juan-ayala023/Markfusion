import type { Project, ProjectCategory } from "./types";

/**
 * Fuente única de los proyectos: el grid, las páginas /proyectos/[slug], el sitemap y el OG salen de aquí.
 * Agregar un proyecto = agregar un objeto. Las métricas marcadas con TODO son valores de ejemplo por confirmar.
 */
export const projects: Project[] = [
  {
    slug: "secreto-suites",
    title: "Recepcionista con IA + PMS propio",
    client: "Secreto Suites",
    category: ["ia", "automatizacion", "web-app"],
    summary:
      "Un agente de IA que vende reservas por WhatsApp 24/7, conectado a un PMS propio sincronizado con Airbnb y Booking.",
    challenge:
      "Las reservas llegaban por WhatsApp a cualquier hora y se respondían a mano. Cada mensaje sin responder era una reserva perdida, la disponibilidad vivía en tres calendarios distintos (Airbnb, Booking y una hoja de cálculo) y los overbookings eran cuestión de tiempo.",
    solution:
      "Construimos un PMS a la medida en Next.js y Supabase como única fuente de verdad, sincronizado con Airbnb y Booking. Encima pusimos un agente de IA en WhatsApp que consulta disponibilidad real, cotiza con tarifas dinámicas, genera el link de pago y avisa al equipo por Telegram cuando entra una reserva.",
    highlights: [
      "Disponibilidad en tiempo real contra el PMS, no contra un prompt",
      "Sincronización bidireccional con Airbnb y Booking vía iCal",
      "Traspaso a un humano cuando el huésped lo pide o la IA no está segura",
      "Alertas de reservas, pagos y check-ins por Telegram",
    ],
    stack: ["Next.js", "Supabase", "WhatsApp Cloud API", "OpenAI", "n8n", "Telegram API", "Wompi"],
    metrics: [
      { label: "Conversaciones resueltas sin humano", value: 78, suffix: "%" }, // TODO: confirmar
      { label: "Tiempo de primera respuesta", value: 10, prefix: "< ", suffix: " s" }, // TODO: confirmar
      { label: "Overbookings desde el lanzamiento", value: 0 }, // TODO: confirmar
    ],
    cover: null, // TODO: captura del PMS o video del bot
    gallery: [],
    featured: true,
    year: 2025, // TODO: confirmar
    country: "Colombia",
    chat: {
      name: "Secreto Suites",
      status: "Asistente IA · en línea",
      done: "Reserva confirmada en 2 min, sin intervención humana",
      messages: [
        { from: "user", text: "Hola 👋 ¿tienen suite para este sábado?", log: ["webhook ← WhatsApp Cloud API", "intent: reserva · 0.97"] },
        { from: "bot", text: "¡Hola! Sí, me quedan 2 suites para el sábado. ¿Para cuántas personas?", log: ["pms.disponibilidad(sáb) → 2"] },
        { from: "user", text: "Para 2, con jacuzzi si se puede", log: ["memoria: huéspedes=2, jacuzzi"] },
        { from: "bot", text: "Perfecto ✨ Suite Jacuzzi a $480.000 la noche con desayuno. ¿Te envío el link de pago?", log: ["tarifa dinámica aplicada"] },
        { from: "user", text: "Sí, dale" },
        {
          from: "bot",
          text: "Listo, aquí tienes tu reserva: Suite Jacuzzi · sábado · 2 huéspedes.",
          action: "Pagar con Wompi",
          log: ["wompi.crearLink() ✓", "telegram → alerta al hotel ✓"],
        },
      ],
    },
    architecture: {
      title: "Flujo de una reserva",
      done: "Reserva confirmada y sincronizada",
      nodes: [
        { id: "guest", title: "Huésped", sub: "WhatsApp", col: 0 },
        { id: "agent", title: "Agente IA", sub: "LLM + memoria", col: 1 },
        { id: "pms", title: "PMS", sub: "Next.js + Supabase", col: 2 },
        { id: "pay", title: "Wompi", sub: "Link de pago", col: 2 },
        { id: "ota", title: "Airbnb · Booking", sub: "Sync iCal", col: 3 },
        { id: "alert", title: "Telegram", sub: "Alerta al equipo", col: 3 },
      ],
      edges: [
        { from: "guest", to: "agent" },
        { from: "agent", to: "pms" },
        { from: "agent", to: "pay" },
        { from: "pms", to: "ota" },
        { from: "pay", to: "alert" },
      ],
    },
  },
  {
    slug: "cosecharte-lia",
    title: "Lía, la vendedora con IA",
    client: "Cosecharte",
    category: ["ia", "automatizacion", "ecommerce"],
    summary:
      "Lía vende por WhatsApp con el catálogo de Shopify y una suite de flujos n8n opera pedidos, logística, carritos abandonados y recompra.",
    challenge:
      "El crecimiento por WhatsApp desbordó al equipo: cientos de chats al día preguntando lo mismo, pedidos que se copiaban a mano a Dropi, carritos abandonados que nadie recuperaba y clientes que compraban una vez y no volvían.",
    solution:
      "Diseñamos a Lía, un agente que conoce el catálogo, los precios y las políticas de Cosecharte, asesora y cierra ventas en WhatsApp. Detrás, una suite de flujos en n8n conecta Shopify con Dropi: crea guías, notifica cada estado del envío, recupera carritos abandonados y dispara campañas de recompra en el momento justo.",
    highlights: [
      "Catálogo, stock y precios leídos en vivo desde Shopify",
      "Pedidos creados en Dropi sin intervención humana",
      "Secuencias de carrito abandonado y recompra por WhatsApp",
      "Reportes diarios de ventas y conversaciones",
    ],
    stack: ["n8n", "Shopify", "Dropi", "WhatsApp Cloud API", "OpenAI", "Google Sheets"],
    metrics: [
      { label: "Pedidos procesados sin intervención", value: 92, suffix: "%" }, // TODO: confirmar
      { label: "Carritos abandonados recuperados", value: 18, suffix: "%" }, // TODO: confirmar
      { label: "Horas manuales ahorradas por semana", value: 35, prefix: "+" }, // TODO: confirmar
    ],
    cover: null, // TODO: video de Lía o captura de los flujos n8n
    gallery: [],
    featured: true,
    year: 2025, // TODO: confirmar
    country: "Colombia",
    chat: {
      name: "Lía · Cosecharte",
      status: "Asesora IA · en línea",
      done: "Venta cerrada y pedido creado en Dropi",
      messages: [
        { from: "user", text: "Hola, ¿qué me recomiendas para regalar?", log: ["webhook ← WhatsApp", "intent: asesoría · regalo"] },
        { from: "bot", text: "¡Hola! 💚 Soy Lía. Para regalo, el kit Cosecha Viva es el favorito. ¿Es para alguien que cocina?", log: ["shopify.productos(tag: regalo) → 6"] },
        { from: "user", text: "Sí, a mi mamá le encanta cocinar", log: ["memoria: destinataria=mamá"] },
        { from: "bot", text: "Entonces te va a encantar: kit Cosecha Viva a $129.900 con envío gratis. ¿Te lo dejo listo?", log: ["stock ✓ · envío gratis aplicado"] },
        { from: "user", text: "Sí, mándamelo a Medellín" },
        {
          from: "bot",
          text: "¡Hecho! Te comparto el resumen de tu pedido.",
          action: "Confirmar pedido",
          log: ["shopify.crearPedido() ✓", "dropi.crearGuía() ✓"],
        },
      ],
    },
    architecture: {
      title: "Suite de flujos n8n",
      done: "Pedido despachado y cliente notificado",
      nodes: [
        { id: "wa", title: "WhatsApp", sub: "Cliente", col: 0 },
        { id: "shop", title: "Shopify", sub: "Pedido / carrito", col: 0 },
        { id: "lia", title: "Lía", sub: "Agente IA", col: 1 },
        { id: "n8n", title: "n8n", sub: "Orquestador", col: 2 },
        { id: "dropi", title: "Dropi", sub: "Guía y envío", col: 3 },
        { id: "crm", title: "Sheets", sub: "Ventas y recompra", col: 3 },
      ],
      edges: [
        { from: "wa", to: "lia" },
        { from: "shop", to: "lia" },
        { from: "lia", to: "n8n" },
        { from: "n8n", to: "dropi" },
        { from: "n8n", to: "crm" },
      ],
    },
  },
  {
    slug: "the-columbus-school",
    title: "Ticketing para el Homecoming 80 años",
    client: "The Columbus School",
    category: ["web-app"],
    summary:
      "Plataforma de venta de boletas para el reencuentro de egresados por los 80 años del colegio, con pagos por Wompi y PlacetoPay y boletas con QR.",
    challenge:
      "El evento más grande en la historia del colegio necesitaba vender boletas por etapas, aceptar los medios de pago de las familias y egresados, y controlar el acceso el día del evento, todo con la imagen de una institución de 80 años.",
    solution:
      "Construimos un sitio de evento inmersivo en Next.js con su propio backend de ticketing: inventario por etapas, checkout con Wompi y PlacetoPay, emisión automática de boletas en PDF con código QR por correo y un panel para validar el ingreso en la puerta.",
    highlights: [
      "Dos pasarelas de pago integradas: Wompi y PlacetoPay",
      "Boletas en PDF con QR único, enviadas por correo al pagar",
      "Conteo regresivo, galería y experiencia pensada para móvil",
      "Panel administrativo de ventas y validación de ingreso",
    ],
    stack: ["Next.js", "Node.js", "Express", "SQL Server", "Wompi", "PlacetoPay", "Lenis"],
    metrics: [
      { label: "Pasarelas de pago integradas", value: 2 },
      { label: "Boletas emitidas", value: 600, prefix: "+" }, // TODO: confirmar
      { label: "Ventas desde móvil", value: 74, suffix: "%" }, // TODO: confirmar
    ],
    cover: "/assets/projects/the-columbus-school/cover.jpg",
    gallery: [
      "/assets/projects/the-columbus-school/gallery-1.jpg",
      "/assets/projects/the-columbus-school/gallery-2.jpg",
      "/assets/projects/the-columbus-school/mobile.jpg",
    ],
    featured: true,
    year: 2026,
    country: "Colombia",
    url: "https://homecomingtcs.columbus.edu.co",
    architecture: {
      title: "Compra de una boleta",
      done: "Boleta emitida y enviada",
      nodes: [
        { id: "web", title: "Sitio del evento", sub: "Next.js", col: 0 },
        { id: "api", title: "API ticketing", sub: "Node + Express", col: 1 },
        { id: "wompi", title: "Wompi", sub: "Pago", col: 2 },
        { id: "ptp", title: "PlacetoPay", sub: "Pago", col: 2 },
        { id: "ticket", title: "Boleta PDF", sub: "QR único", col: 3 },
        { id: "mail", title: "Correo", sub: "Envío al comprador", col: 4 },
      ],
      edges: [
        { from: "web", to: "api" },
        { from: "api", to: "wompi" },
        { from: "api", to: "ptp" },
        { from: "wompi", to: "ticket" },
        { from: "ptp", to: "ticket" },
        { from: "ticket", to: "mail" },
      ],
    },
  },
  {
    slug: "banton-group",
    title: "Planificador de casos legales integrado con Actionstep",
    client: "Banton Group",
    category: ["web-app", "automatizacion"],
    summary:
      "Herramienta interna para planificar casos de litigio en una firma australiana, conectada en tiempo real con la API de Actionstep.",
    challenge:
      "Banton Group, firma de litigio y class actions en Sídney, planificaba sus casos en hojas de cálculo separadas de Actionstep, su sistema de gestión legal. La información se duplicaba y los plazos dependían de que alguien actualizara todo a mano.",
    solution:
      "Desarrollamos una herramienta de planificación a la medida que lee y escribe directamente en Actionstep por API: matters, tareas, plazos y responsables en una sola vista, con la lógica de planificación que el equipo legal ya usaba, sin cambiar de sistema.",
    highlights: [
      "Integración OAuth con la API de Actionstep",
      "Planificación de casos, etapas y plazos en una sola vista",
      "Sincronización en ambos sentidos: nada se escribe dos veces",
    ],
    stack: ["Next.js", "TypeScript", "Actionstep API", "OAuth 2.0", "Vercel"], // TODO: confirmar stack
    metrics: [
      { label: "Fuentes de verdad", value: 1 },
      { label: "Tiempo de planificación por caso", value: 60, prefix: "-", suffix: "%" }, // TODO: confirmar
      { label: "Husos horarios de trabajo coordinados", value: 2 },
    ],
    cover: "/assets/projects/banton-group/cover.jpg", // TODO: reemplazar por captura de la herramienta (esta es la web)
    gallery: [
      "/assets/projects/banton-group/gallery-1.jpg",
      "/assets/projects/banton-group/gallery-2.jpg",
      "/assets/projects/banton-group/mobile.jpg",
    ],
    featured: true,
    year: 2025, // TODO: confirmar
    country: "Australia",
    url: "https://bantongroup.com",
    architecture: {
      title: "Sincronización con Actionstep",
      done: "Plan sincronizado con Actionstep",
      nodes: [
        { id: "team", title: "Equipo legal", sub: "Planificador", col: 0 },
        { id: "app", title: "App", sub: "Next.js", col: 1 },
        { id: "auth", title: "OAuth", sub: "Actionstep", col: 2 },
        { id: "api", title: "Actionstep API", sub: "Matters · tareas", col: 3 },
      ],
      edges: [
        { from: "team", to: "app" },
        { from: "app", to: "auth" },
        { from: "auth", to: "api" },
      ],
    },
  },
  {
    slug: "universal-agro",
    title: "SEO técnico para una SPA en React",
    client: "Universal Agro",
    category: ["landing"],
    summary: "Pre-render de una SPA en React: 15 páginas de producto indexadas en Google en 24 horas.",
    challenge:
      "El sitio de Universal Agro estaba hecho como SPA en React: bonito para el usuario, invisible para Google. Las fichas de producto no aparecían en búsquedas y el catálogo no generaba tráfico orgánico.",
    solution:
      "Implementamos pre-render estático de cada ruta, metadata y datos estructurados por producto, sitemap y enlazado interno. Sin reescribir el sitio, cada página llega a Google con HTML completo.",
    highlights: [
      "Pre-render de cada ruta de la SPA en el build",
      "Metadata, Open Graph y JSON-LD de producto",
      "Sitemap y envío a Search Console",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Pre-render", "Search Console"],
    metrics: [
      { label: "Páginas de producto indexadas", value: 15 },
      { label: "Horas para indexarlas", value: 24 },
      { label: "Rutas pre-renderizadas", value: 100, suffix: "%" },
    ],
    cover: "/assets/projects/universal-agro/cover.jpg",
    gallery: [
      "/assets/projects/universal-agro/gallery-1.jpg",
      "/assets/projects/universal-agro/gallery-2.jpg",
      "/assets/projects/universal-agro/mobile.jpg",
    ],
    featured: false,
    year: 2025, // TODO: confirmar
    country: "Colombia",
    url: "https://universalagrosas.com.co",
  },
  {
    slug: "emmporio-juridico",
    title: "Web y embudo de captación penal",
    client: "Emmporio Jurídico",
    category: ["landing"],
    summary: "Sitio en React + Tailwind y un embudo de captación de casos penales con Google Ads para una firma con 30 años en Medellín.",
    challenge:
      "Una firma con 30 años de trayectoria tenía una presencia digital que no estaba a su altura y dependía del voz a voz para conseguir casos penales.",
    solution:
      "Diseñamos un sitio sobrio y rápido que transmite autoridad, con un embudo enfocado en casos penales: landing por especialidad, formularios cortos validados, seguimiento de conversiones y campañas en Google Ads para búsquedas de alta intención.",
    stack: ["React", "Tailwind CSS", "React Hook Form", "Zod", "Google Ads", "Google Tag Manager"],
    metrics: [
      { label: "Años de trayectoria del cliente", value: 30 },
      { label: "Leads calificados por mes", value: 40, prefix: "+" }, // TODO: confirmar
      { label: "Costo por lead", value: 45, prefix: "-", suffix: "%" }, // TODO: confirmar
    ],
    cover: "/assets/projects/emmporio-juridico/cover.jpg",
    gallery: [
      "/assets/projects/emmporio-juridico/gallery-1.jpg",
      "/assets/projects/emmporio-juridico/gallery-2.jpg",
      "/assets/projects/emmporio-juridico/mobile.jpg",
    ],
    featured: true,
    year: 2025, // TODO: confirmar
    country: "Colombia",
    url: "https://emmporiojuridico.com",
  },
  {
    slug: "lubrimotor",
    title: "Ventas por WhatsApp con bot y Meta Ads",
    client: "Servicentro Lubrimotor",
    category: ["ia", "landing"],
    summary: "Tienda web, bot de ventas por WhatsApp y campañas en Meta Ads para un servicentro automotriz.",
    challenge:
      "Lubrimotor vendía lubricantes y servicios en el mostrador. Querían vender en línea sin montar un ecommerce complejo y sin un equipo dedicado a responder chats.",
    solution:
      "Construimos una tienda ligera mobile-first que lleva cada producto a WhatsApp, donde un bot responde precios, recomienda el lubricante según el vehículo y agenda el servicio. Las campañas en Meta Ads llevan tráfico directo a esa conversación.",
    stack: ["HTML", "JavaScript", "WhatsApp Cloud API", "OpenAI", "Meta Ads"],
    metrics: [
      { label: "Consultas atendidas por el bot", value: 70, suffix: "%" }, // TODO: confirmar
      { label: "Costo por conversación", value: 1200, prefix: "$" }, // TODO: confirmar
      { label: "Ventas atribuidas a WhatsApp", value: 3, suffix: "x" }, // TODO: confirmar
    ],
    cover: null, // TODO: captura de la tienda
    gallery: [],
    featured: false,
    year: 2025, // TODO: confirmar
    country: "Colombia",
    chat: {
      name: "Lubrimotor",
      status: "Asistente · en línea",
      done: "Servicio agendado para mañana 8:00 a.m.",
      messages: [
        { from: "user", text: "Buenas, ¿qué aceite le sirve a una Duster 2019?", log: ["intent: recomendación"] },
        { from: "bot", text: "Para tu Duster 2019 te recomiendo 5W-30 sintético. Con cambio incluido queda en $189.000. ¿Te agendo?", log: ["catálogo.compatibles(Duster 2019)"] },
        { from: "user", text: "Sí, mañana temprano" },
        { from: "bot", text: "Listo ✅ Te espero mañana a las 8:00 a.m.", action: "Ver ubicación", log: ["agenda.reservar(8:00) ✓"] },
      ],
    },
  },
  {
    slug: "growth-os",
    title: "Growth OS para hoteles",
    client: "MarkFusion · producto propio",
    category: ["saas"],
    summary: "Plataforma SaaS de 16 módulos para operar y hacer crecer hoteles: reservas, canales, CRM, marketing y reportes en un solo lugar.",
    challenge:
      "Los hoteles independientes trabajan con una docena de herramientas que no se hablan entre sí: el channel manager, el CRM, las campañas, los reportes. Crecer exige ver todo junto.",
    solution:
      "Construimos Growth OS, una plataforma de 16 módulos que centraliza la operación y el crecimiento del hotel. Es la base sobre la que implementamos IA y automatizaciones para cada cliente hotelero.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "n8n", "Vercel"],
    metrics: [
      { label: "Módulos", value: 16 },
      { label: "Herramientas que reemplaza", value: 8, prefix: "+" }, // TODO: confirmar
      { label: "Hoteles operando", value: 5 }, // TODO: confirmar
    ],
    cover: null, // TODO: captura del dashboard
    gallery: [],
    featured: true,
    year: 2026,
    country: "Colombia",
  },
  {
    slug: "masterwash",
    title: "POS para lavaderos de autos",
    client: "MasterWash",
    category: ["saas"],
    summary: "SaaS de punto de venta para lavaderos: turnos, servicios, caja, comisiones de lavadores y reportes.",
    challenge:
      "Los lavaderos llevan turnos, pagos y comisiones en cuadernos o en Excel. Al final del día nadie sabe con certeza cuánto se vendió ni cuánto se le debe a cada lavador.",
    solution:
      "Diseñamos un POS pensado para la operación real de un lavadero: registro rápido de vehículos y servicios, cola de turnos, cierre de caja y liquidación automática de comisiones.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    metrics: [
      { label: "Segundos para registrar un servicio", value: 15, prefix: "< " }, // TODO: confirmar
      { label: "Cierre de caja", value: 1, suffix: " clic" }, // TODO: confirmar
      { label: "Comisiones calculadas a mano", value: 0 },
    ],
    cover: null, // TODO: captura del POS
    gallery: [],
    featured: false,
    year: 2026, // TODO: confirmar
    country: "Colombia",
  },
  {
    slug: "inventfly",
    title: "Inventario inteligente con IA",
    client: "InventFly",
    category: ["saas", "ia"],
    summary: "Gestión de inventario con IA: predice quiebres de stock, sugiere pedidos y responde preguntas sobre el inventario en lenguaje natural.",
    challenge:
      "Los negocios con muchas referencias se enteran de un quiebre de stock cuando ya perdieron la venta, y las compras se hacen por intuición.",
    solution:
      "InventFly centraliza el inventario y usa IA para proyectar la demanda, alertar antes del quiebre y sugerir órdenes de compra. Además, cualquiera del equipo puede preguntarle al sistema en lenguaje natural.",
    stack: ["Next.js", "Python", "Supabase", "OpenAI", "Tailwind CSS"],
    metrics: [
      { label: "Quiebres de stock evitados", value: 40, prefix: "-", suffix: "%" }, // TODO: confirmar
      { label: "Referencias gestionadas", value: 5000, prefix: "+" }, // TODO: confirmar
      { label: "Tiempo en conteos", value: 70, prefix: "-", suffix: "%" }, // TODO: confirmar
    ],
    cover: null, // TODO: captura del producto
    gallery: [],
    featured: false,
    year: 2026, // TODO: confirmar
    country: "Colombia",
  },
];

export const categoryOrder: ProjectCategory[] = ["ia", "automatizacion", "web-app", "saas", "landing", "ecommerce"];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Destacados primero, luego por año (más reciente primero). */
export function sortedProjects() {
  return [...projects].sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
}
