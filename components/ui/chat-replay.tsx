"use client";

import { AnimatePresence, m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { ChatScript } from "@/content/types";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const VISIBLE_LOGS = 8;
const enter = { initial: { opacity: 0, y: 8, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0 } };

type ChatReplayProps = {
  script: ChatScript;
  labels: { placeholder: string; backstage: string };
  /** Muestra el panel con lo que hace el sistema por detrás (desde sm). */
  backstage?: boolean;
  className?: string;
};

function initials(name: string) {
  return name
    .split(/[\s·]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

/** Conversación de WhatsApp que se escribe sola en loop, con el "backstage" de cada paso. */
export function ChatReplay({ script, labels, backstage = true, className }: ChatReplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduceMotion = useReducedMotionSafe();
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);

  const { messages } = script;
  const total = messages.length + 1; // +1: confirmación final
  const shown = reduceMotion ? total : count;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (count >= total) {
      timers.push(setTimeout(() => setCount(0), 4500));
    } else if (count < messages.length && messages[count].from === "bot") {
      timers.push(setTimeout(() => setTyping(true), 350));
      timers.push(
        setTimeout(() => {
          setTyping(false);
          setCount((value) => value + 1);
        }, 1700),
      );
    } else {
      timers.push(setTimeout(() => setCount((value) => value + 1), count === 0 ? 700 : 1300));
    }
    return () => timers.forEach(clearTimeout);
  }, [count, inView, reduceMotion, total, messages]);

  const visible = messages.slice(0, Math.min(shown, messages.length));
  const logs = visible
    .flatMap((message, index) => (message.log ?? []).map((line, lineIndex) => ({ key: `${index}-${lineIndex}`, line })))
    .slice(-VISIBLE_LOGS);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("grid h-full gap-3", backstage && "sm:grid-cols-[minmax(0,1fr)_210px]", className)}
    >
      <div className="flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-line bg-[#0b141a]">
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#1f2c33] px-4 py-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-brand-from to-brand-to text-[11px] font-bold text-black">
            {initials(script.name)}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[13px] font-medium text-white">{script.name}</span>
            <span className="text-[11px] text-wa">{script.status}</span>
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 py-3">
          <AnimatePresence initial={false}>
            {visible.map((message, index) => (
              <m.div
                key={index}
                {...enter}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "max-w-[85%] shrink-0 rounded-xl px-3 py-2 text-[13px] leading-snug text-white",
                  message.from === "user"
                    ? "self-end rounded-tr-sm bg-[#005c4b]"
                    : "self-start rounded-tl-sm bg-[#202c33]",
                )}
              >
                {message.text}
                {message.action && (
                  <span className="mt-2 block border-t border-white/10 pt-2 text-center font-medium text-[#53bdeb]">
                    {message.action}
                  </span>
                )}
              </m.div>
            ))}
            {typing && (
              <m.div key="typing" {...enter} className="flex shrink-0 gap-1 self-start rounded-xl rounded-tl-sm bg-[#202c33] px-3 py-3">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className="typing-dot size-1.5 rounded-full bg-white/60" style={{ animationDelay: `${dot * 150}ms` }} />
                ))}
              </m.div>
            )}
            {shown >= total && (
              <m.div
                key="done"
                {...enter}
                className="mt-1 shrink-0 self-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-center font-mono text-[10px] text-brand-to"
              >
                ✓ {script.done}
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 bg-[#1f2c33] px-3 py-2.5">
          <span className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-[12px] text-white/40">{labels.placeholder}</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-wa/90">
            <svg viewBox="0 0 16 16" className="size-3.5 text-[#0b141a]" fill="currentColor">
              <path d="M1.5 14.5 15 8 1.5 1.5v5L10 8l-8.5 1.5z" />
            </svg>
          </span>
        </div>
      </div>

      {backstage && (
        <div className="hidden min-h-0 flex-col overflow-hidden rounded-[14px] border border-line bg-black/40 p-3 sm:flex">
          <div className="label-mono flex items-center gap-2 text-[10px] text-subtle">
            <span className="size-1.5 animate-pulse rounded-full bg-brand" />
            {labels.backstage}
          </div>
          <div className="mt-3 flex flex-1 flex-col justify-end gap-2 overflow-hidden font-mono text-[11px] leading-snug">
            <AnimatePresence initial={false}>
              {logs.map(({ key, line }) => (
                <m.p
                  key={key}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-muted"
                >
                  <span className="text-brand">→ </span>
                  {line}
                </m.p>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
