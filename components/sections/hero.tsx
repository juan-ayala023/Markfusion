import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { RevealWords } from "@/components/ui/reveal-words";
import type { Dictionary } from "@/i18n";

import { HeroSceneLoader } from "./hero-scene-loader";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
  const titleWords = dict.title.split(" ").length;
  // El resto del hero entra cuando el titular va por la mitad
  const afterTitle = 250 + titleWords * 70;

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32">
      {/* Fondo estático: es lo único que ve el móvil y lo que pinta primero el desktop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_60%_40%,black,transparent)]" />
        <div className="hero-aurora absolute inset-0" />
      </div>

      <HeroSceneLoader />

      {/* Velo para que el texto se lea sobre la red */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_15%_55%,var(--color-bg)_20%,transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-bg" />

      <div className="container-x relative">
        <div className="fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: "100ms" }}>
          <span className="label-mono text-muted">{dict.eyebrow}</span>
          <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="label-mono inline-flex items-center gap-2 text-brand-to">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            {dict.availability}
          </span>
        </div>

        <h1 className="mt-7 max-w-[15ch] text-display font-semibold text-fg">
          <RevealWords text={dict.title} highlight={dict.highlight} delay={250} />
        </h1>

        <p
          className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          style={{ animationDelay: `${afterTitle}ms` }}
        >
          {dict.subtitle}
        </p>

        <div
          className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: `${afterTitle + 120}ms` }}
        >
          <Magnetic>
            <ButtonLink href="/#contacto" size="lg" className="w-full sm:w-auto">
              {dict.primaryCta}
              <ArrowIcon />
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href="/#proyectos" size="lg" variant="secondary" className="w-full sm:w-auto">
              {dict.secondaryCta}
            </ButtonLink>
          </Magnetic>
        </div>

        <ul
          className="fade-up mt-16 grid max-w-2xl grid-cols-1 border-t border-line sm:grid-cols-3"
          style={{ animationDelay: `${afterTitle + 240}ms` }}
        >
          {dict.pillars.map((pillar) => (
            <li
              key={pillar.index}
              className="flex items-baseline gap-3 border-b border-line py-4 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
            >
              <span className="label-mono text-brand">{pillar.index}</span>
              <span className="text-sm text-fg">{pillar.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="label-mono text-[10px] text-subtle">{dict.scroll}</span>
        <span className="scroll-cue relative h-10 w-px overflow-hidden bg-line-strong" />
      </div>
    </section>
  );
}
