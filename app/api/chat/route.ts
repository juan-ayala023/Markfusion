import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import { LeadSchema, updateLeadTool } from "@/lib/ai/lead";
import { CHAT_LIMITS, type ChatEvent } from "@/lib/ai/protocol";
import { SYSTEM_PROMPT, leadStateMessage } from "@/lib/ai/system-prompt";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "claude-opus-5-5";
/** Vueltas máximas por mensaje: texto → update_lead → texto. */
const MAX_TOOL_ROUNDS = 3;

const RequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(CHAT_LIMITS.maxChars),
      }),
    )
    .min(1)
    .max(CHAT_LIMITS.maxMessages),
  lead: LeadSchema.partial().nullable().optional(),
});

let client: Anthropic | null = null;
function getClient() {
  client ??= new Anthropic();
  return client;
}

function json(event: ChatEvent, status: number) {
  return Response.json(event, { status });
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    return json({ type: "error", code: "unavailable" }, 503);
  }

  // 20 mensajes cada 10 minutos por IP
  if (!rateLimit(clientIp(request), 20, 10 * 60 * 1000).ok) {
    return json({ type: "error", code: "rate_limited" }, 429);
  }

  const parsed = RequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.messages.at(-1)?.role !== "user") {
    return json({ type: "error", code: "invalid" }, 400);
  }

  const messages: Anthropic.Beta.BetaMessageParam[] = [
    ...parsed.data.messages,
    { role: "system", content: leadStateMessage(parsed.data.lead) },
  ];

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ChatEvent) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));

      // Si una ronda ya escribió texto, la siguiente empieza en un párrafo nuevo
      let wroteText = false;
      let needsBreak = false;

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          needsBreak = wroteText;
          const stream = getClient().beta.messages.stream(
            {
              model: MODEL,
              max_tokens: 4096, // respuestas de chat cortas: tope de costo deliberado
              output_config: { effort: "low" },
              betas: ["server-side-fallback-2026-07-01"],
              fallbacks: "default",
              system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
              tools: [updateLeadTool],
              messages,
            },
            { signal: request.signal },
          );
          stream.on("text", (delta) => {
            if (needsBreak) {
              send({ type: "text", text: "\n\n" });
              needsBreak = false;
            }
            wroteText = true;
            send({ type: "text", text: delta });
          });

          const message = await stream.finalMessage();
          if (message.stop_reason === "refusal") break;

          const toolUses = message.content.filter(
            (block): block is Anthropic.Beta.BetaToolUseBlock => block.type === "tool_use",
          );
          // Sin herramientas (o input truncado por max_tokens): la respuesta terminó
          if (toolUses.length === 0 || message.stop_reason === "max_tokens") break;

          messages.push({ role: "assistant", content: message.content });
          messages.push({
            role: "user",
            content: toolUses.map((toolUse): Anthropic.Beta.BetaToolResultBlockParam => {
              const lead = LeadSchema.safeParse(toolUse.input);
              if (toolUse.name !== updateLeadTool.name || !lead.success) {
                return {
                  type: "tool_result",
                  tool_use_id: toolUse.id,
                  is_error: true,
                  content: JSON.stringify({ INVALID_JSON: JSON.stringify(toolUse.input) }),
                };
              }
              send({ type: "lead", lead: lead.data });
              return { type: "tool_result", tool_use_id: toolUse.id, content: "Ficha actualizada." };
            }),
          });
        }
      } catch (error) {
        if (!request.signal.aborted) {
          console.error("[api/chat]", error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
          send({
            type: "error",
            code: error instanceof Anthropic.RateLimitError ? "rate_limited" : "failed",
          });
        }
      } finally {
        if (!request.signal.aborted) send({ type: "done" });
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
