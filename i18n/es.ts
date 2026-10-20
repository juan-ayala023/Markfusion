const es = {
  nav: {
    links: [
      { href: "/#servicios", label: "Servicios" },
      { href: "/#proyectos", label: "Proyectos" },
      { href: "/#proceso", label: "Proceso" },
      { href: "/#demo", label: "Demo IA" },
    ],
    cta: "Agenda un diagnóstico",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "MarkFusion, ir al inicio",
  },
  hero: {
    eyebrow: "IA · Automatización · Fullstack",
    availability: "Agenda abierta para nuevos proyectos",
    title: "Construimos los sistemas que hacen crecer tu negocio solo.",
    highlight: ["solo."],
    subtitle:
      "Agentes de IA que venden y atienden por WhatsApp, automatizaciones que eliminan el trabajo manual y software a la medida que escala contigo.",
    primaryCta: "Agenda un diagnóstico",
    secondaryCta: "Ver proyectos",
    pillars: [
      { index: "01", label: "Inteligencia artificial" },
      { index: "02", label: "Automatización" },
      { index: "03", label: "Desarrollo fullstack" },
    ],
    scroll: "Scroll",
  },
  stack: {
    label: "Stack con el que construimos",
  },
  pillars: {
    statement:
      "No vendemos horas de desarrollo. Construimos sistemas que venden, atienden y operan 24/7 para que tu equipo se dedique a lo que sí mueve el negocio.",
    statementHighlight: ["venden,", "atienden", "operan", "24/7"],
    eyebrow: "Servicios",
    title: "Tres pilares, un solo sistema.",
    description:
      "Cada proyecto combina lo que necesita: IA para conversar, automatización para operar y software para escalar.",
    items: {
      ai: {
        index: "01",
        label: "IA",
        title: "Inteligencia artificial",
        description:
          "Agentes que venden, agendan y atienden por WhatsApp 24/7 con tu catálogo, tus precios y tu tono. Con memoria, RAG sobre tus documentos y traspaso a un humano cuando hace falta.",
        tags: ["Agentes autónomos", "WhatsApp + LLMs", "RAG", "Calificación de leads"],
      },
      automation: {
        index: "02",
        label: "Automatización",
        title: "Automatización",
        description:
          "Flujos en n8n que conectan tus sistemas y eliminan el trabajo repetitivo: pedidos, logística, cobros y reportes sin que nadie mueva un dedo.",
        tags: ["n8n", "Integraciones API", "Sincronización"],
      },
      fullstack: {
        index: "03",
        label: "Fullstack",
        title: "Desarrollo fullstack",
        description:
          "Aplicaciones web, SaaS, PMS, ticketing y ecommerce a la medida. Rápidas, seguras y listas para escalar desde el día uno.",
        tags: ["Web apps", "SaaS", "PMS", "Ecommerce"],
      },
    },
    demos: {
      flow: {
        title: "n8n · flujo de pedidos (ejemplo)",
        done: "Ejecución exitosa",
        nodes: [
          { id: "trigger", title: "Shopify", sub: "Nuevo pedido", col: 0 },
          { id: "ai", title: "Agente IA", sub: "Valida datos", col: 1 },
          { id: "logistics", title: "Dropi", sub: "Crea la guía", col: 2 },
          { id: "sheet", title: "Sheets", sub: "Registra venta", col: 2 },
          { id: "notify", title: "WhatsApp", sub: "Avisa cliente", col: 3 },
        ],
        edges: [
          { from: "trigger", to: "ai" },
          { from: "ai", to: "logistics" },
          { from: "ai", to: "sheet" },
          { from: "logistics", to: "notify" },
          { from: "sheet", to: "notify" },
        ],
      },
      dashboard: {
        title: "Panel · ejemplo",
        chart: "Reservas por mes",
        deploy: "Deploy en Vercel",
        kpis: [
          { label: "Reservas", value: 128, delta: "+18%" },
          { label: "Ingresos", value: 42.6, prefix: "$", suffix: "M", decimals: 1, delta: "+24%" },
          { label: "Ocupación", value: 87, suffix: "%", delta: "+9 pts" },
        ],
      },
    },
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Sistemas en producción, no maquetas.",
    description:
      "Una selección de lo que hemos construido para marcas en Colombia, LATAM y Australia. Cada uno resuelve un problema real de negocio.",
    filterLabel: "Filtrar proyectos por categoría",
    all: "Todos",
    viewCase: "Ver caso",
    viewAll: "Ver todos los proyectos",
    empty: "Pronto agregamos proyectos en esta categoría.",
    categories: {
      ia: "IA",
      automatizacion: "Automatización",
      "web-app": "Web app",
      saas: "SaaS",
      landing: "Landing",
      ecommerce: "Ecommerce",
    },
  },
  launches: {
    eyebrow: "Lanzamientos",
    title: "Más de 20 sitios en producción.",
    description: "Marcas que confiaron en nosotros su presencia digital, de Medellín a Sídney.",
    visit: "Visitar sitio",
    opensInNewTab: "(se abre en una pestaña nueva)",
  },
  caseStudy: {
    back: "Todos los proyectos",
    client: "Cliente",
    year: "Año",
    country: "País",
    services: "Servicios",
    visit: "Ver sitio en vivo",
    challenge: "El reto",
    solution: "La solución",
    architecture: "Arquitectura",
    architectureDescription: "Cómo se conectan las piezas del sistema.",
    swipe: "Desliza para ver el flujo completo →",
    stack: "Stack",
    results: "Resultados",
    story: "Detrás del proyecto",
    gallery: "Galería",
    next: "Siguiente proyecto",
    ctaTitle: "¿Quieres un sistema así para tu negocio?",
    ctaDescription: "Cuéntanos qué te quita tiempo hoy y te mostramos cómo se vería resuelto.",
    ctaButton: "Agenda un diagnóstico",
    placeholder: "Vista previa del proyecto",
  },
  chat: {
    placeholder: "Escribe un mensaje",
    backstage: "Backstage",
  },
  process: {
    eyebrow: "Proceso",
    title: "Cómo trabajamos.",
    description: "De la primera llamada a un sistema que opera solo, en cinco etapas claras.",
    stepLabel: "Etapa",
    steps: [
      {
        title: "Diagnóstico",
        description:
          "Entendemos tu operación, dónde se pierden tiempo y dinero, y qué vale la pena automatizar primero.",
      },
      {
        title: "Arquitectura",
        description:
          "Diseñamos el sistema completo antes de escribir código: flujos, datos, integraciones y la experiencia de quien lo usa.",
      },
      {
        title: "Construcción",
        description: "Desarrollamos en entregas cortas para que veas avances funcionando, no promesas.",
      },
      {
        title: "Automatización",
        description:
          "Conectamos IA y flujos n8n a tus sistemas para que la operación corra sola, con alertas cuando algo necesita a una persona.",
      },
      {
        title: "Escala",
        description: "Medimos, optimizamos y crecemos contigo: nuevas funciones, más canales y soporte continuo.",
      },
    ],
  },
  demo: {
    eyebrow: "Demo en vivo",
    title: "Habla con nuestra IA.",
    description:
      "Este asistente funciona como los que construimos para nuestros clientes: responde, asesora y califica al prospecto en tiempo real. Pruébalo.",
    assistantName: "Asistente MarkFusion",
    assistantStatus: "IA en vivo · Claude",
    greeting:
      "¡Hola! 👋 Soy el asistente de MarkFusion. Cuéntame qué te quita tiempo hoy en tu negocio y te muestro cómo lo resolveríamos.",
    suggestions: [
      "Quiero un bot de WhatsApp que venda por mí",
      "Necesito automatizar los pedidos de mi tienda",
      "¿Cuánto cuesta una plataforma a la medida?",
    ],
    placeholder: "Escribe tu mensaje…",
    send: "Enviar",
    sending: "Respondiendo…",
    inputLabel: "Mensaje para el asistente",
    disclaimer: "IA real conectada a Claude. No compartas datos sensibles.",
    errors: {
      unavailable: "La demo está en mantenimiento en este momento. Escríbenos y te atendemos de inmediato.",
      rate_limited: "Recibimos muchos mensajes seguidos. Espera un momento y vuelve a intentarlo.",
      invalid: "No pude procesar ese mensaje. Intenta escribirlo de otra forma.",
      failed: "No pude responder. Intenta de nuevo en un momento.",
      limit: "Llegaste al límite de esta demo. Agenda un diagnóstico y seguimos la conversación con una persona.",
    },
    lead: {
      title: "Ficha del prospecto",
      live: "En vivo",
      description: "Lo que la IA va entendiendo de ti mientras conversan.",
      score: "Calificación",
      empty: "Por descubrir",
      fields: {
        need: "Necesidad",
        project_type: "Tipo de proyecto",
        timeline: "Plazo",
        budget: "Presupuesto",
        name: "Nombre",
        company: "Empresa",
        contact: "Contacto",
      },
      stages: {
        explorando: "Explorando",
        interesado: "Interesado",
        calificado: "Calificado",
      },
      projectTypes: {
        ia: "Inteligencia artificial",
        automatizacion: "Automatización",
        "web-app": "Web app",
        saas: "SaaS",
        landing: "Landing",
        ecommerce: "Ecommerce",
        otro: "Otro",
      },
      cta: "Agendar diagnóstico con esta ficha",
    },
  },
  metrics: {
    label: "MarkFusion en números",
  },
  testimonials: {
    eyebrow: "Clientes",
    title: "Lo que dicen quienes ya operan con nuestros sistemas.",
    sample: "Ejemplo",
  },
  contact: {
    eyebrow: "Contacto",
    title: "¿Construimos el tuyo?",
    description:
      "Cuéntanos qué quieres resolver y te contactamos para agendar tu diagnóstico.",
    direct: "O escríbenos directo",
    whatsapp: "WhatsApp",
    email: "Correo",
    fromDemo: "Prellenamos el formulario con lo que conversaste con la IA. Revísalo y envíalo.",
    fields: {
      name: "Nombre",
      company: "Empresa",
      whatsapp: "WhatsApp",
      projectType: "Tipo de proyecto",
      budget: "Presupuesto aproximado",
      message: "¿Qué quieres resolver?",
      consent: "Acepto que MarkFusion trate mis datos para responder a esta solicitud.", // TODO: enlazar política de tratamiento de datos (Ley 1581)
      website: "Deja este campo vacío",
    },
    placeholders: {
      name: "Tu nombre",
      company: "Tu empresa o marca",
      whatsapp: "+57 300 000 0000",
      message: "Ej: recibimos 200 mensajes diarios por WhatsApp y queremos que un agente responda y venda…",
    },
    optional: "Opcional",
    projectTypes: {
      ia: "Inteligencia artificial",
      automatizacion: "Automatización",
      "web-app": "Web app",
      saas: "SaaS",
      landing: "Landing",
      ecommerce: "Ecommerce",
      otro: "Otro",
    },
    // TODO: confirmar rangos de presupuesto
    budgets: {
      "lt-5m": "Menos de $5M COP",
      "5-15m": "$5M a $15M COP",
      "15-40m": "$15M a $40M COP",
      "gt-40m": "Más de $40M COP",
      unknown: "Aún no lo sé",
    },
    selectBudget: "Selecciona un rango",
    submit: "Enviar mensaje",
    submitting: "Enviando…",
    errors: {
      name: "Escribe tu nombre.",
      company: "El nombre de la empresa es demasiado largo.",
      whatsapp: "Escribe un número de WhatsApp válido, con indicativo si es fuera de Colombia.",
      projectType: "Elige el tipo de proyecto.",
      budget: "Elige un rango de presupuesto.",
      message: "Cuéntanos un poco más (mínimo 10 caracteres).",
      consent: "Necesitamos tu autorización para responderte.",
    },
    status: {
      successTitle: "¡Mensaje recibido!",
      successDescription: "Ya está en nuestro sistema. Te escribimos pronto para agendar tu diagnóstico.",
      again: "Enviar otro mensaje",
      unavailable: "El formulario no está disponible en este momento. Escríbenos por correo y te respondemos de inmediato.",
      rate_limited: "Enviaste varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo.",
      invalid: "Revisa los campos marcados.",
      failed: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por correo.",
    },
  },
  whatsapp: {
    label: "Escríbenos por WhatsApp",
    message: "Hola MarkFusion, vengo de su sitio web y quiero agendar un diagnóstico.",
  },
  footer: {
    tagline: "Sistemas que trabajan mientras tú creces.",
    cta: "Agenda un diagnóstico",
    rights: "Todos los derechos reservados.",
    based: "Colombia · LATAM · Australia",
    columns: {
      services: "Servicios",
      company: "Explora",
      contact: "Contacto",
    },
    services: [
      { href: "/#servicios", label: "Inteligencia artificial" },
      { href: "/#servicios", label: "Automatización" },
      { href: "/#servicios", label: "Desarrollo fullstack" },
    ],
    links: [
      { href: "/proyectos", label: "Proyectos" },
      { href: "/#proceso", label: "Proceso" },
      { href: "/#demo", label: "Demo IA" },
      { href: "/#contacto", label: "Contacto" },
    ],
    instagram: "Instagram",
    backToTop: "Volver arriba",
  },
};

export default es;
