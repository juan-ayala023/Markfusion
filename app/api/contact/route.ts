import { ContactSchema, type ContactResponse } from "@/lib/contact-schema";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function reply(body: ContactResponse, status: number) {
  return Response.json(body, { status });
}

/** Valida el formulario y lo reenvía al webhook de n8n. La URL del webhook nunca llega al navegador. */
export async function POST(request: Request) {
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) return reply({ ok: false, code: "unavailable" }, 503);

  if (!rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000).ok) {
    return reply({ ok: false, code: "rate_limited" }, 429);
  }

  const parsed = ContactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return reply({ ok: false, code: "invalid" }, 400);

  const { website, consent, ...data } = parsed.data;
  // Bot detectado por el honeypot: respondemos éxito para no darle pistas
  if (website) return reply({ ok: true }, 200);

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.N8N_WEBHOOK_SECRET && { "X-Webhook-Secret": process.env.N8N_WEBHOOK_SECRET }),
      },
      body: JSON.stringify({
        ...data,
        consent,
        source: site.url,
        referer: request.headers.get("referer"),
        userAgent: request.headers.get("user-agent"),
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[api/contact] n8n respondió", response.status);
      return reply({ ok: false, code: "failed" }, 502);
    }
    return reply({ ok: true }, 200);
  } catch (error) {
    console.error("[api/contact]", error);
    return reply({ ok: false, code: "failed" }, 502);
  }
}
