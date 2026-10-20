import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import { LEAD_STAGES, PROJECT_TYPES } from "@/lib/options";

/** Ficha del lead que la IA va llenando durante la conversación. */
export const LeadSchema = z.object({
  name: z.string().max(120).nullable(),
  company: z.string().max(160).nullable(),
  contact: z.string().max(160).nullable(),
  project_type: z.enum(PROJECT_TYPES).nullable(),
  need: z.string().max(400).nullable(),
  budget: z.string().max(120).nullable(),
  timeline: z.string().max(120).nullable(),
  score: z.number().transform((value) => Math.round(Math.min(100, Math.max(0, value)))),
  stage: z.enum(LEAD_STAGES),
});

export type Lead = z.infer<typeof LeadSchema>;

const nullableString = (description: string) => ({ type: ["string", "null"], description });

export const updateLeadTool: Anthropic.Beta.BetaTool = {
  name: "update_lead",
  description:
    "Actualiza la ficha del prospecto con todo lo que sabes hasta ahora. Llámala cada vez que el usuario revele un dato nuevo (necesidad, tipo de proyecto, plazo, presupuesto, nombre, empresa o contacto). Envía siempre la ficha completa: repite los valores ya conocidos y usa null solo para lo que aún no sabes.",
  strict: true,
  eager_input_streaming: true,
  input_schema: {
    type: "object",
    additionalProperties: false,
    required: ["name", "company", "contact", "project_type", "need", "budget", "timeline", "score", "stage"],
    properties: {
      name: nullableString("Nombre de la persona."),
      company: nullableString("Empresa o marca."),
      contact: nullableString("WhatsApp o correo, tal como lo escribió el usuario."),
      project_type: {
        type: ["string", "null"],
        enum: [...PROJECT_TYPES, null],
        description: "Categoría principal del proyecto.",
      },
      need: nullableString("Resumen en una frase de lo que necesita y por qué."),
      budget: nullableString("Presupuesto o rango mencionado, con su moneda."),
      timeline: nullableString("Para cuándo lo necesita."),
      score: { type: "integer", description: "Calificación de 0 a 100 según la rúbrica del sistema." },
      stage: { type: "string", enum: [...LEAD_STAGES], description: "Etapa del prospecto." },
    },
  },
};
