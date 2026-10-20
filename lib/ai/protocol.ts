import type { Lead } from "./lead";

/** Límites de la demo, compartidos por el endpoint y el widget. */
export const CHAT_LIMITS = {
  maxMessages: 24,
  maxChars: 1000,
} as const;

/** Eventos que /api/chat envía al navegador, uno por línea (NDJSON). */
export type ChatEvent =
  | { type: "text"; text: string }
  | { type: "lead"; lead: Lead }
  | { type: "error"; code: "unavailable" | "rate_limited" | "invalid" | "failed" }
  | { type: "done" };
