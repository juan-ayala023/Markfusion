/** Decide si el dispositivo merece la escena 3D: desktop, puntero fino, sin reduced-motion ni ahorro de datos. */
export function canRender3D() {
  if (typeof window === "undefined") return false;
  const matches = (query: string) => window.matchMedia(query).matches;

  if (matches("(prefers-reduced-motion: reduce)")) return false;
  if (!matches("(min-width: 1024px) and (pointer: fine)")) return false;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;

  return "WebGL2RenderingContext" in window || "WebGLRenderingContext" in window;
}
