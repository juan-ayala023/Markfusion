"use client";

import Image from "next/image";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { launches } from "@/content/launches";
import type { Dictionary } from "@/i18n";
import { hostname } from "@/lib/format";
import { cn } from "@/lib/utils";

const PREVIEW_W = 360;
const spring = { stiffness: 260, damping: 28, mass: 0.5 };

/** Índice de sitios lanzados. En desktop, una vista previa del sitio sigue al cursor. */
export function Launches({ dict, headingAs = "h2" }: { dict: Dictionary["launches"]; headingAs?: "h1" | "h2" }) {
  const [active, setActive] = useState<string | null>(null);
  // Solo se montan las capturas que ya se pidieron, así no se descargan 18 imágenes al cargar
  const [loaded, setLoaded] = useState<string[]>([]);
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function activate(slug: string) {
    setActive(slug);
    setLoaded((current) => (current.includes(slug) ? current : [...current, slug]));
  }

  function handleMove(event: React.PointerEvent) {
    x.set(event.clientX + 28);
    y.set(event.clientY - (PREVIEW_W * 10) / 16 / 2);
  }

  return (
    <section aria-labelledby="launches-title" className={cn("relative", headingAs === "h1" ? "pb-24 pt-36 sm:pt-44" : "section-y")}>
      <div className="container-x">
        <SectionHeading as={headingAs} titleId="launches-title" eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />

        <ol className="mt-14 border-t border-line" onPointerMove={handleMove} onPointerLeave={() => setActive(null)}>
          {launches.map((launch, index) => (
            <li key={launch.slug}>
              <a
                href={launch.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label={dict.visit}
                onPointerEnter={() => activate(launch.slug)}
                onFocus={() => activate(launch.slug)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-line py-4 md:grid-cols-[3rem_minmax(0,1fr)_14rem_9rem_1.5rem] md:py-6"
              >
                <span className="relative aspect-[16/10] overflow-hidden rounded-md border border-line md:hidden">
                  <Image
                    src={`/assets/sites/${launch.slug}.jpg`}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover object-top"
                  />
                </span>
                <span className="hidden font-mono text-xs text-subtle md:block">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="block truncate text-lg font-medium tracking-tight text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:text-2xl">
                    {launch.name}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-muted md:hidden">{launch.category}</span>
                </span>
                <span className="hidden truncate text-sm text-muted md:block">{launch.category}</span>
                <span className="hidden font-mono text-xs text-subtle md:block">{launch.location}</span>
                <span
                  aria-hidden
                  className="text-subtle transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                >
                  ↗
                </span>
                <span className="sr-only">
                  {hostname(launch.url)} {dict.opensInNewTab}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <m.div
        aria-hidden
        style={{ x, y, width: PREVIEW_W }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {active && (
            <m.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] overflow-hidden rounded-[12px] border border-line-strong bg-surface-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]"
            >
              {loaded.map((slug) => (
                <Image
                  key={slug}
                  src={`/assets/sites/${slug}.jpg`}
                  alt=""
                  fill
                  sizes={`${PREVIEW_W}px`}
                  className={cn("object-cover object-top transition-opacity duration-300", slug === active ? "opacity-100" : "opacity-0")}
                />
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </section>
  );
}
