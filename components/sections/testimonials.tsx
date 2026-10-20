import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { visibleTestimonials, type Testimonial } from "@/content/testimonials";
import type { Dictionary } from "@/i18n";

/** Carrusel infinito de testimonios. No se renderiza si no hay testimonios reales. */
export function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  const items = visibleTestimonials();
  if (items.length === 0) return null;

  const half = Math.ceil(items.length / 2);
  const rows = items.length >= 4 ? [items.slice(0, half), items.slice(half)] : [items];

  return (
    <section className="section-y relative overflow-hidden border-t border-line">
      <div className="container-x">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
      </div>
      <div className="mt-14 space-y-4">
        {rows.map((row, index) => (
          <Marquee key={index} duration={55} reverse={index === 1}>
            {row.map((item) => (
              <Card key={`${item.company}-${item.name}`} item={item} sampleLabel={dict.sample} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

function Card({ item, sampleLabel }: { item: Testimonial; sampleLabel: string }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between gap-8 rounded-lg border border-line bg-surface-1/80 p-6 sm:w-[420px]">
      <blockquote className="text-[17px] leading-relaxed text-fg">
        <span aria-hidden className="mr-1 text-brand">“</span>
        {item.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-brand-from/30 to-brand-to/10 font-mono text-xs text-brand-to"
        >
          {item.company.slice(0, 2).toUpperCase()}
        </span>
        <span className="flex-1 leading-tight">
          <span className="block text-sm font-medium text-fg">{item.name}</span>
          <span className="block text-xs text-muted">
            {item.role} · {item.company}
          </span>
        </span>
        {item.placeholder && (
          <span className="rounded-full border border-amber-300/30 px-2 py-0.5 font-mono text-[10px] text-amber-200">
            {sampleLabel}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
