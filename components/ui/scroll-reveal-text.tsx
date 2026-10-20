"use client";

import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Párrafo que se enciende palabra por palabra a medida que avanza el scroll. */
export function ScrollRevealText({
  text,
  highlight = [],
  className,
}: {
  text: string;
  highlight?: readonly string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const highlighted = highlight.includes(word);
        if (reduceMotion) {
          return (
            <span key={index} className={cn(highlighted && "text-brand-to")}>
              {word}{" "}
            </span>
          );
        }
        const start = index / words.length;
        return (
          <Word key={index} progress={scrollYProgress} range={[start, start + 1 / words.length]} highlighted={highlighted}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  progress,
  range,
  highlighted,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  highlighted: boolean;
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <m.span style={{ opacity }} className={cn(highlighted && "text-brand-to")}>
        {children}
      </m.span>{" "}
    </>
  );
}
