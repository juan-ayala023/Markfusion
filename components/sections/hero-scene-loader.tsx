"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { canRender3D } from "@/lib/device";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

/** Carga la escena 3D solo en desktop capaz y cuando el navegador queda libre (no compite con el LCP). */
export function HeroSceneLoader() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setEnabled(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setEnabled(true), 1200);
    return () => clearTimeout(id);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-[1600ms] ease-out-expo",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <HeroScene onReady={() => setReady(true)} />
    </div>
  );
}
