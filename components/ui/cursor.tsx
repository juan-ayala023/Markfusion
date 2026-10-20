"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], label, summary, [data-cursor]";

type CursorState = { hover: boolean; label?: string };

/**
 * Cursor personalizado: punto + anillo con resorte.
 * Un elemento con `data-cursor-label="Ver"` hace que el anillo crezca y muestre el texto.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>({ hover: false });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!query.matches) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest(INTERACTIVE);
      setState(target ? { hover: true, label: target.getAttribute("data-cursor-label") ?? undefined } : { hover: false });
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    root.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", leave);
      root.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = state.label ? Math.max(84, state.label.length * 8 + 32) : state.hover ? 48 : 30;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <m.div
        style={{ x, y }}
        animate={{ opacity: visible && !state.hover ? 1 : 0 }}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-brand"
      />
      <m.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <m.div
          animate={{
            width: size,
            height: size,
            opacity: visible ? 1 : 0,
            backgroundColor: state.hover ? "rgba(142, 234, 0, 0.1)" : "rgba(142, 234, 0, 0)",
            borderColor: state.hover ? "rgba(142, 234, 0, 0.6)" : "rgba(255, 255, 255, 0.25)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-[2px]"
        >
          {state.label && <span className="label-mono text-[10px] text-brand-to">{state.label}</span>}
        </m.div>
      </m.div>
    </div>
  );
}
