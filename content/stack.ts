import {
  siClaude,
  siMeta,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOpenai,
  siPython,
  siRailway,
  siReact,
  siShopify,
  siSupabase,
  siVercel,
  siWhatsapp,
} from "simple-icons";

export type StackItem = { name: string; path: string };

export const stack: StackItem[] = [
  { name: "Next.js", path: siNextdotjs.path },
  { name: "React", path: siReact.path },
  { name: "Node.js", path: siNodedotjs.path },
  { name: "Python", path: siPython.path },
  { name: "n8n", path: siN8n.path },
  { name: "Supabase", path: siSupabase.path },
  { name: "OpenAI", path: siOpenai.path },
  { name: "Claude", path: siClaude.path },
  { name: "Meta API", path: siMeta.path },
  { name: "WhatsApp Cloud API", path: siWhatsapp.path },
  { name: "Shopify", path: siShopify.path },
  { name: "Vercel", path: siVercel.path },
  { name: "Railway", path: siRailway.path },
];
