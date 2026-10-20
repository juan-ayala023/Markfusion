"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useLenis } from "@/components/providers/lenis-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Dictionary } from "@/i18n";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

type ProcessDict = Dictionary["process"];
type Step = ProcessDict["steps"][number];

/**
 * Timeline del proceso. En desktop la sección queda fija (GSAP ScrollTrigger) y el scroll avanza las etapas;
 * sin GSAP o con reduced-motion las etapas se eligen con clic. En móvil es una lista vertical.
 */
export function Process({ dict }: { dict: ProcessDict }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduceMotion = useReducedMotionSafe();
  const lenis = useLenis();
  const steps = dict.steps;

  useEffect(() => {
    const element = pinRef.current;
    if (!element || reduceMotion || !window.matchMedia("(min-width: 1024px)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        ScrollTrigger.create({
          trigger: element,
          start: "top top",
          end: () => `+=${window.innerHeight * (steps.length - 0.5)}`,
          pin: true,
          onUpdate: (self) => {
            setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
            if (progressRef.current) progressRef.current.style.transform = `scaleY(${self.progress})`;
          },
        });
      }, element);

      const sync = () => ScrollTrigger.update();
      lenis?.on("scroll", sync);
      setPinned(true);

      cleanup = () => {
        lenis?.off("scroll", sync);
        context.revert();
        setPinned(false);
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduceMotion, lenis, steps.length]);

  return (
    <section id="proceso" className="relative border-t border-line">
      {/* Móvil: lista vertical */}
      <div className="container-x section-y lg:hidden">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />
        <ol className="relative mt-12 space-y-4 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-line-strong">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-5">
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-bg font-mono text-xs text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 rounded-md border border-line bg-surface-1/60 p-5">
                <StepDetail step={step} dict={dict} compact />
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop: sección fija que avanza con el scroll */}
      <div ref={pinRef} className="hidden min-h-screen items-center lg:flex">
        <div className="container-x grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-16 py-24">
          <div>
            <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />
            <ol className="relative mt-12 pl-8">
              <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-line-strong">
                <span
                  ref={progressRef}
                  className={cn(
                    "absolute inset-0 origin-top bg-brand",
                    !pinned && "transition-transform duration-500 ease-out-expo",
                  )}
                  style={pinned ? undefined : { transform: `scaleY(${(active + 1) / steps.length})` }}
                />
              </span>
              {steps.map((step, index) => (
                <li key={step.title}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={active === index ? "step" : undefined}
                    disabled={pinned}
                    className={cn(
                      "group flex w-full items-baseline gap-4 py-2.5 text-left transition-colors duration-500 disabled:cursor-default",
                      active === index ? "text-fg" : "text-subtle hover:text-muted",
                    )}
                  >
                    <span className={cn("font-mono text-xs transition-colors duration-500", active === index && "text-brand")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl font-medium tracking-tight">{step.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <SpotlightCard className="relative min-h-[460px] overflow-hidden p-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-10 select-none font-semibold leading-none tracking-[-0.06em] text-white/[0.035] [font-size:15rem]"
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <p className="label-mono text-brand">
                  {dict.stepLabel} {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </p>
                <StepDetail step={steps[active]} dict={dict} />
              </m.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

function StepDetail({ step, dict, compact = false }: { step: Step; dict: ProcessDict; compact?: boolean }) {
  return (
    <div className="relative">
      <h3 className={cn("font-semibold tracking-tight text-fg", compact ? "text-xl" : "mt-6 text-h2")}>{step.title}</h3>
      <p className={cn("leading-relaxed text-muted", compact ? "mt-2 text-[15px]" : "mt-5 max-w-md text-lg")}>{step.description}</p>
      <dl className={cn("grid gap-5", compact ? "mt-5" : "mt-10 grid-cols-[auto_1fr] gap-x-12")}>
        <div>
          <dt className="label-mono text-subtle">{dict.duration}</dt>
          <dd className="mt-2 text-sm text-fg">{step.duration}</dd>
        </div>
        <div>
          <dt className="label-mono text-subtle">{dict.deliverables}</dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {step.deliverables.map((deliverable) => (
                <li key={deliverable} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {deliverable}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}
