import type { Project, ProjectCategory } from "./types";

/**
 * Fuente única de los proyectos: el grid, las páginas /proyectos/[slug] y el contexto de la demo de IA salen de aquí.
 * Agregar un proyecto = agregar un objeto.
 *
 * Regla: solo datos confirmados. Si algo no se sabe (año, stack, métricas, reto), se omite y la página
 * esconde esa sección; no se rellena con valores de ejemplo.
 */
export const projects: Project[] = [
  {
    slug: "the-columbus-school",
    title: "Ticketing para el Homecoming 80 años",
    client: "The Columbus School",
    category: ["web-app"],
    summary:
      "Plataforma de venta de boletas para el Homecoming por los 80 años del colegio, con pagos por Wompi y PlacetoPay.",
    challenge:
      "Vender las boletas del reencuentro de egresados por los 80 años del colegio en línea, con los medios de pago de las familias y egresados.",
    solution:
      "Un sitio del evento en Next.js con su propio backend de ticketing en Node.js, integrado con las pasarelas Wompi y PlacetoPay.",
    highlights: [
      "Venta de boletas en línea",
      "Pagos con Wompi y PlacetoPay",
      "Sitio del evento con conteo regresivo y galería",
    ],
    stack: ["Next.js", "Node.js", "Express", "SQL Server", "Wompi", "PlacetoPay"],
    metrics: [{ label: "Pasarelas de pago integradas", value: 2 }],
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
      done: "Pago confirmado",
      nodes: [
        { id: "web", title: "Sitio del evento", sub: "Next.js", col: 0 },
        { id: "api", title: "API ticketing", sub: "Node + Express", col: 1 },
        { id: "wompi", title: "Wompi", sub: "Pasarela de pago", col: 2 },
        { id: "ptp", title: "PlacetoPay", sub: "Pasarela de pago", col: 2 },
      ],
      edges: [
        { from: "web", to: "api" },
        { from: "api", to: "wompi" },
        { from: "api", to: "ptp" },
      ],
    },
  },
  {
    slug: "banton-group",
    title: "Planificación de casos legales con la API de Actionstep",
    client: "Banton Group",
    category: ["web-app", "automatizacion"],
    summary:
      "Herramienta de planificación de casos legales integrada con la API de Actionstep para una firma de litigio en Australia.",
    solution:
      "Desarrollamos una herramienta de planificación de casos conectada a Actionstep, el sistema de gestión legal de la firma, a través de su API.",
    highlights: ["Planificación de casos legales", "Integración con la API de Actionstep"],
    stack: ["Actionstep API"],
    metrics: [],
    cover: "/assets/projects/banton-group/cover.jpg",
    coverNote: "Captura del sitio web de Banton Group, también desarrollado por MarkFusion. La herramienta de planificación es interna.",
    gallery: [
      "/assets/projects/banton-group/gallery-1.jpg",
      "/assets/projects/banton-group/gallery-2.jpg",
      "/assets/projects/banton-group/mobile.jpg",
    ],
    featured: true,
    country: "Australia",
    url: "https://bantongroup.com",
    architecture: {
      title: "Integración con Actionstep",
      done: "Datos sincronizados",
      nodes: [
        { id: "team", title: "Equipo legal", sub: "Usuarios", col: 0 },
        { id: "app", title: "Planificador", sub: "Herramienta a la medida", col: 1 },
        { id: "api", title: "Actionstep", sub: "API", col: 2 },
      ],
      edges: [
        { from: "team", to: "app" },
        { from: "app", to: "api" },
      ],
    },
  },
  {
    slug: "emmporio-juridico",
    title: "Web y embudo de captación penal",
    client: "Emmporio Jurídico",
    category: ["landing"],
    summary: "Sitio en React + Tailwind y embudo de captación de casos penales con Google Ads para una firma de abogados de Medellín.",
    solution: "Un sitio en React y Tailwind con formularios validados y un embudo de captación de casos penales con campañas en Google Ads.",
    stack: ["React", "Tailwind CSS", "React Hook Form", "Zod", "Google Ads"],
    metrics: [{ label: "Años de trayectoria de la firma", value: 30 }],
    cover: "/assets/projects/emmporio-juridico/cover.jpg",
    gallery: [
      "/assets/projects/emmporio-juridico/gallery-1.jpg",
      "/assets/projects/emmporio-juridico/gallery-2.jpg",
      "/assets/projects/emmporio-juridico/mobile.jpg",
    ],
    featured: true,
    country: "Colombia",
    url: "https://emmporiojuridico.com",
  },
  {
    slug: "universal-agro",
    title: "SEO técnico para una SPA en React",
    client: "Universal Agro",
    category: ["landing"],
    summary: "SEO técnico con pre-render de una SPA en React: 15 páginas de producto indexadas en Google en 24 horas.",
    challenge: "El sitio era una SPA en React y sus páginas de producto no se estaban indexando en Google.",
    solution: "Implementamos pre-render de las rutas de la SPA para que cada página de producto llegue a Google con su HTML completo.",
    stack: ["React"],
    metrics: [
      { label: "Páginas de producto indexadas", value: 15 },
      { label: "Horas para indexarlas", value: 24 },
    ],
    cover: "/assets/projects/universal-agro/cover.jpg",
    gallery: [
      "/assets/projects/universal-agro/gallery-1.jpg",
      "/assets/projects/universal-agro/gallery-2.jpg",
      "/assets/projects/universal-agro/mobile.jpg",
    ],
    featured: false,
    country: "Colombia",
    url: "https://universalagrosas.com.co",
  },
  {
    slug: "secreto-suites",
    title: "Bot de reservas con IA + PMS propio",
    client: "Secreto Suites",
    category: ["ia", "automatizacion", "web-app"],
    summary:
      "Bot de reservas por WhatsApp con IA conectado a un PMS propio en Next.js y Supabase, sincronizado con Airbnb y Booking, con alertas por Telegram.",
    solution:
      "Un PMS propio en Next.js y Supabase, sincronizado con Airbnb y Booking, y un bot de reservas por WhatsApp con IA conectado a él. Las alertas para el equipo llegan por Telegram.",
    highlights: [
      "Reservas por WhatsApp atendidas con IA",
      "PMS propio en Next.js y Supabase",
      "Sincronización con Airbnb y Booking",
      "Alertas por Telegram",
    ],
    stack: ["Next.js", "Supabase", "WhatsApp", "Telegram"],
    metrics: [],
    cover: null, // TODO: captura del PMS o video del bot
    gallery: [],
    featured: true,
    country: "Colombia",
    architecture: {
      title: "Flujo de una reserva",
      done: "Reserva registrada",
      nodes: [
        { id: "guest", title: "Huésped", sub: "WhatsApp", col: 0 },
        { id: "agent", title: "Bot con IA", sub: "Reservas", col: 1 },
        { id: "pms", title: "PMS propio", sub: "Next.js + Supabase", col: 2 },
        { id: "ota", title: "Airbnb · Booking", sub: "Sincronización", col: 3 },
        { id: "alert", title: "Telegram", sub: "Alertas", col: 3 },
      ],
      edges: [
        { from: "guest", to: "agent" },
        { from: "agent", to: "pms" },
        { from: "pms", to: "ota" },
        { from: "pms", to: "alert" },
      ],
    },
  },
  {
    slug: "cosecharte-lia",
    title: "Lía, vendedora por WhatsApp con IA",
    client: "Cosecharte",
    category: ["ia", "automatizacion", "ecommerce"],
    summary:
      "Lía, agente de ventas por WhatsApp con IA, y una suite de flujos n8n para pedidos, logística, carritos abandonados y recompra, integrada a Shopify y Dropi.",
    solution:
      "Lía atiende y vende por WhatsApp con IA. Detrás, una suite de flujos en n8n integrada a Shopify y Dropi se encarga de pedidos, logística, carritos abandonados y recompra.",
    highlights: ["Vendedora por WhatsApp con IA", "Pedidos y logística", "Carritos abandonados", "Recompra"],
    stack: ["n8n", "Shopify", "Dropi", "WhatsApp"],
    metrics: [],
    cover: null, // TODO: video de Lía o captura de los flujos n8n
    gallery: [],
    featured: true,
    country: "Colombia",
    architecture: {
      title: "Suite de flujos n8n",
      done: "Flujo completado",
      nodes: [
        { id: "wa", title: "WhatsApp", sub: "Cliente", col: 0 },
        { id: "lia", title: "Lía", sub: "Agente con IA", col: 1 },
        { id: "n8n", title: "n8n", sub: "Flujos", col: 2 },
        { id: "shop", title: "Shopify", sub: "Tienda", col: 3 },
        { id: "dropi", title: "Dropi", sub: "Logística", col: 3 },
      ],
      edges: [
        { from: "wa", to: "lia" },
        { from: "lia", to: "n8n" },
        { from: "n8n", to: "shop" },
        { from: "n8n", to: "dropi" },
      ],
    },
  },
  {
    slug: "lubrimotor",
    title: "Web, ventas por WhatsApp, bot y Meta Ads",
    client: "Servicentro Lubrimotor",
    category: ["ia", "landing"],
    summary: "Sitio web, ventas por WhatsApp con bot y campañas en Meta Ads para un servicentro automotriz.",
    stack: ["HTML", "CSS", "JavaScript", "WhatsApp", "Meta Ads"],
    metrics: [],
    cover: null, // TODO: captura del sitio
    gallery: [],
    featured: false,
    country: "Colombia",
  },
  {
    slug: "growth-os",
    title: "Growth OS para hoteles",
    client: "MarkFusion · producto propio",
    category: ["saas"],
    summary: "Plataforma SaaS interna de 16 módulos para hoteles.",
    stack: [],
    metrics: [{ label: "Módulos", value: 16 }],
    cover: null, // TODO: captura del producto
    gallery: [],
    featured: true,
    country: "Colombia",
  },
  {
    slug: "masterwash",
    title: "POS para lavaderos",
    client: "MasterWash",
    category: ["saas"],
    summary: "SaaS de punto de venta para lavaderos de autos.",
    stack: [],
    metrics: [],
    cover: null, // TODO: captura del producto
    gallery: [],
    featured: false,
    country: "Colombia",
  },
  {
    slug: "inventfly",
    title: "Gestión de inventario con IA",
    client: "InventFly",
    category: ["saas", "ia"],
    summary: "SaaS de gestión de inventario con IA.",
    stack: [],
    metrics: [],
    cover: null, // TODO: captura del producto
    gallery: [],
    featured: false,
    country: "Colombia",
  },
];

export const categoryOrder: ProjectCategory[] = ["ia", "automatizacion", "web-app", "saas", "landing", "ecommerce"];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Primero los proyectos con captura real, luego los destacados. */
export function sortedProjects() {
  return [...projects].sort(
    (a, b) => Number(Boolean(b.cover)) - Number(Boolean(a.cover)) || Number(b.featured) - Number(a.featured),
  );
}
