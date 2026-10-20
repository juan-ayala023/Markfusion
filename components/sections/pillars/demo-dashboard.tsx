"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

import { Counter } from "@/components/ui/counter";
import type { Dictionary } from "@/i18n";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

type DashboardDict = Dictionary["pillars"]["demos"]["dashboard"];

const BARS = [34, 48, 41, 57, 52, 66, 61, 74, 69, 83, 78, 94];

/** Dashboard que se construye al entrar en pantalla: KPIs que cuentan, barras que crecen y el deploy al final. */
export function DemoDashboard({ dict }: { dict: DashboardDict }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotionSafe();
  const built = inView || reduceMotion;

  return (
    <div ref={ref} aria-hidden className="flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-black/40">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="size-2 rounded-full bg-white/10" />
        ))}
        <span className="label-mono ml-2 text-[10px] text-subtle">{dict.title}</span>
      </div>

      <div className="flex min-h-0 flex-1 gap-3 p-3">
        <div className="hidden w-14 shrink-0 flex-col gap-2 sm:flex">
          {[100, 70, 85, 60, 75].map((width, index) => (
            <span
              key={index}
              style={{ width: `${width}%`, transitionDelay: `${index * 60}ms` }}
              className={cn(
                "h-2 rounded-full transition-opacity duration-500",
                index === 0 ? "bg-brand/50" : "bg-white/[0.07]",
                built ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {dict.kpis.map((kpi, index) => (
              <div
                key={kpi.label}
                style={{ transitionDelay: `${index * 90}ms` }}
                className={cn(
                  "rounded-lg border border-line bg-surface-2/70 p-2.5 transition-[opacity,transform] duration-700 ease-out-expo",
                  built ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
              >
                <p className="truncate font-mono text-[9px] uppercase tracking-wider text-subtle">{kpi.label}</p>
                <p className="mt-1 text-base font-semibold tracking-tight text-fg sm:text-lg">
                  {built ? (
                    <Counter value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.decimals} />
                  ) : (
                    "—"
                  )}
                </p>
                <p className="font-mono text-[9px] text-brand">{kpi.delta}</p>
              </div>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-line bg-surface-2/40 p-2.5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-subtle">{dict.chart}</p>
            <div className="mt-2 flex min-h-0 flex-1 items-end gap-1">
              {BARS.map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%`, transitionDelay: `${300 + index * 45}ms` }}
                  className={cn(
                    "flex-1 origin-bottom rounded-t-[3px] transition-transform duration-700 ease-out-expo",
                    index === BARS.length - 1 ? "bg-linear-to-t from-brand-from to-brand-to" : "bg-brand/25",
                    built ? "scale-y-100" : "scale-y-0",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ transitionDelay: "1300ms" }}
        className={cn(
          "flex items-center gap-2 border-t border-line px-3 py-2 font-mono text-[10px] text-brand-to transition-opacity duration-500",
          built ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="size-1.5 rounded-full bg-brand" />✓ {dict.deploy}
      </div>
    </div>
  );
}
