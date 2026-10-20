"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/** Contador que anima de 0 al valor al entrar en viewport. El HTML del servidor ya trae el valor final (SEO / sin JS). */
export function Counter({ value, prefix = "", suffix = "", decimals = 0, duration = 1.8, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  const format = (n: number) =>
    `${prefix}${n.toLocaleString("es-CO", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useLayoutEffect(() => {
    if (!reduceMotion && ref.current) ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(value)}
    </span>
  );
}
