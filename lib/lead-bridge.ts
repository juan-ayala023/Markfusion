import type { Lead } from "@/lib/ai/lead";

const EVENT = "markfusion:lead";
const STORAGE_KEY = "markfusion:lead";

/** Pasa la ficha de la demo de IA al formulario de contacto (misma página o tras recargar). */
export function publishLead(lead: Lead) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
  } catch {
    // sessionStorage no disponible (modo privado): el evento basta para la misma página
  }
  window.dispatchEvent(new CustomEvent<Lead>(EVENT, { detail: lead }));
}

export function readStoredLead(): Lead | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead) : null;
  } catch {
    return null;
  }
}

export function subscribeLead(callback: (lead: Lead) => void) {
  const handler = (event: Event) => callback((event as CustomEvent<Lead>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
