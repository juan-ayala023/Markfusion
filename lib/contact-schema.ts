import { z } from "zod";

import { LeadSchema } from "@/lib/ai/lead";
import { BUDGET_OPTIONS, PROJECT_TYPES } from "@/lib/options";

/**
 * Formulario de contacto, compartido por el navegador y /api/contact.
 * Cada mensaje de error es una clave del diccionario (contact.errors).
 */
export const ContactSchema = z.object({
  name: z.string().trim().min(2, "name").max(120, "name"),
  company: z.string().trim().max(160, "company").default(""),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[\d\s().-]{7,20}$/, "whatsapp"),
  projectType: z.enum(PROJECT_TYPES, { message: "projectType" }),
  budget: z.enum(BUDGET_OPTIONS, { message: "budget" }),
  message: z.string().trim().min(10, "message").max(2000, "message"),
  consent: z.literal(true, { message: "consent" }),
  /** Honeypot: los humanos no ven este campo; si llega con texto es un bot (la ruta responde éxito sin enviar). */
  website: z.string().max(500).optional(),
  /** Ficha que armó la demo de IA, si la persona llegó desde ahí. */
  lead: LeadSchema.nullable().optional(),
});

export type ContactInput = z.input<typeof ContactSchema>;
export type ContactField = "name" | "company" | "whatsapp" | "projectType" | "budget" | "message" | "consent";

export type ContactResponse = { ok: true } | { ok: false; code: "invalid" | "unavailable" | "rate_limited" | "failed" };
