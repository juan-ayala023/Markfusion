import { Counter } from "@/components/ui/counter";
import { globalMetrics } from "@/content/metrics";
import type { Dictionary } from "@/i18n";

export function Metrics({ dict }: { dict: Dictionary["metrics"] }) {
  return (
    <section aria-label={dict.label} className="relative border-y border-line bg-surface-1/40">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {globalMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col-reverse gap-3 border-line px-2 py-12 sm:px-6 lg:py-16 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r"
            >
              <dt className="text-sm leading-snug text-muted">{metric.label}</dt>
              <dd className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] text-fg">
                <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} decimals={metric.decimals} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
