export type ProjectCategory = "ia" | "automatizacion" | "web-app" | "saas" | "landing" | "ecommerce";

export type Metric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type ChatMessage = {
  from: "user" | "bot";
  text: string;
  /** Botón que aparece bajo el mensaje (link de pago, catálogo…). */
  action?: string;
  /** Lo que hace el sistema por detrás en ese paso; se muestra en el panel "backstage". */
  log?: string[];
};

export type ChatScript = {
  name: string;
  status: string;
  done: string;
  messages: ChatMessage[];
};

export type FlowNode = {
  id: string;
  title: string;
  sub: string;
  /** Columna del diagrama (0 = disparador). Los nodos de una misma columna se apilan. */
  col: number;
};

export type FlowEdge = { from: string; to: string };

export type Architecture = {
  title: string;
  done: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory[];
  /** Una frase: qué es y qué logra. Se usa en cards, metadata y Open Graph. */
  summary: string;
  challenge: string;
  solution: string;
  /** Puntos concretos de la solución (opcional). */
  highlights?: string[];
  stack: string[];
  metrics: Metric[];
  /** Ruta en /public. `null` → se genera un mockup elegante (navegador o teléfono). */
  cover: string | null;
  video?: string;
  gallery: string[];
  featured: boolean;
  year: number;
  country: string;
  url?: string;
  chat?: ChatScript;
  architecture?: Architecture;
};

export type Launch = {
  slug: string;
  name: string;
  url: string;
  category: string;
  location: string;
};
