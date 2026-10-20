"use client";

import { m, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const spring = { stiffness: 220, damping: 16, mass: 0.35 };

/** Atrae su contenido hacia el cursor (solo mouse; se desactiva con reduced-motion). */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function handleMove(event: React.PointerEvent) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("inline-flex", className)}
    >
      {children}
    </m.div>
  );
}
