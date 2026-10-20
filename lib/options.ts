// Opciones compartidas sin dependencias, para que los componentes de cliente no arrastren Zod al bundle inicial.

export const PROJECT_TYPES = ["ia", "automatizacion", "web-app", "saas", "landing", "ecommerce", "otro"] as const;
export const LEAD_STAGES = ["explorando", "interesado", "calificado"] as const;
export const BUDGET_OPTIONS = ["lt-5m", "5-15m", "15-40m", "gt-40m", "unknown"] as const;
