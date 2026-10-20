"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

/** Card con spotlight que sigue al cursor: brillo suave en el fondo y en el borde de 1px. */
export function SpotlightCard({ className, children, ...props }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-lg border border-line bg-surface-1/80 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(107 224 0 / 0.07), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="spotlight-border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      {children}
    </div>
  );
}
