type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Límite simple en memoria por clave (IP). En Vercel cada instancia tiene su propio mapa,
 * así que es una barrera básica contra abuso, no un límite global.
 * TODO: pasar a Upstash Redis / Vercel KV si la demo recibe tráfico alto.
 */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) {
      for (const [entryKey, entry] of buckets) if (entry.resetAt <= now) buckets.delete(entryKey);
    }
    return { ok: true, remaining: limit - 1 };
  }

  bucket.count += 1;
  return { ok: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) };
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
}
