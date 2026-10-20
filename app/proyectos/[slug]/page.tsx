import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseSection } from "@/components/case/case-section";
import { ProjectCover } from "@/components/projects/project-cover";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { Magnetic } from "@/components/ui/magnetic";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { caseStudies } from "@/content/case-studies";
import { getProject, projects } from "@/content/projects";
import { stack as stackIcons } from "@/content/stack";
import { getDictionary } from "@/i18n";
import { hostname } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.client}: ${project.title}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `/proyectos/${project.slug}`,
      images: project.cover ? [{ url: project.cover, width: 1440, height: 900 }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary();
  const t = dict.caseStudy;
  const loadStory = caseStudies[project.slug];
  const Story = loadStory ? (await loadStory()).default : null;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const meta = [
    { label: t.client, value: project.client },
    ...(project.year ? [{ label: t.year, value: String(project.year) }] : []),
    { label: t.country, value: project.country },
    { label: t.services, value: project.category.map((category) => dict.projects.categories[category]).join(" · ") },
  ];

  return (
    <article>
      <header className="container-x pb-14 pt-32 sm:pt-40">
        <Link href="/proyectos" className="label-mono inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
          <span aria-hidden>←</span> {t.back}
        </Link>

        <p className="label-mono fade-up mt-12 text-brand">
          {project.category.map((category) => dict.projects.categories[category]).join(" · ")}
        </p>
        <h1 className="fade-up mt-5 max-w-[16ch] text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-fg">
          {project.client}
        </h1>
        <p
          className="fade-up mt-6 max-w-2xl text-xl leading-snug tracking-tight text-fg/80 sm:text-2xl"
          style={{ animationDelay: "120ms" }}
        >
          {project.title}
        </p>
        <p className="fade-up mt-4 max-w-2xl text-lg leading-relaxed text-muted" style={{ animationDelay: "200ms" }}>
          {project.summary}
        </p>

        <div className="fade-up mt-12 flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-end lg:justify-between" style={{ animationDelay: "280ms" }}>
          <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="label-mono text-subtle">{item.label}</dt>
                <dd className="mt-2 text-sm text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
          {project.url && (
            <Magnetic>
              <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary">
                {t.visit} · {hostname(project.url)}
                <span aria-hidden>↗</span>
              </ButtonLink>
            </Magnetic>
          )}
        </div>
      </header>

      {/* Sin captura real no hay portada: el título ya presenta al cliente */}
      {project.cover && (
        <div className="container-x">
          <ProjectCover project={project} priority sizes="(min-width: 1280px) 1216px, 100vw" />
          {project.coverNote && <p className="mt-3 text-xs text-subtle">{project.coverNote}</p>}
        </div>
      )}

      {project.challenge && (
        <CaseSection label={t.challenge} className="pt-24 md:pt-32">
          <p className="max-w-3xl text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-snug tracking-[-0.02em] text-fg">
            {project.challenge}
          </p>
        </CaseSection>
      )}

      {(project.solution || project.highlights) && (
      <CaseSection label={t.solution} className={project.challenge ? undefined : "pt-24 md:pt-32"}>
        {project.solution && <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{project.solution}</p>}
        {project.highlights && (
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 rounded-md border border-line bg-surface-1/60 p-4 text-[15px] leading-snug text-fg">
                <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[11px] text-brand-to">
                  ✓
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </CaseSection>
      )}

      {project.architecture && (
        <CaseSection label={t.architecture} description={t.architectureDescription}>
          <SpotlightCard className="p-5 sm:p-7">
            <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <div className="min-w-[640px]">
                <FlowDiagram
                  nodes={project.architecture.nodes}
                  edges={project.architecture.edges}
                  title={project.architecture.title}
                  done={project.architecture.done}
                  loop={false}
                  nodeWidth={150}
                  columnGap={44}
                  rowGap={78}
                />
              </div>
            </div>
          </SpotlightCard>
          <p className="label-mono mt-4 text-[10px] text-subtle sm:hidden">{t.swipe}</p>
        </CaseSection>
      )}

      {project.stack.length > 0 && (
      <CaseSection label={t.stack}>
        <ul className="flex flex-wrap gap-2.5">
          {project.stack.map((tech) => {
            const icon = stackIcons.find((item) => item.name === tech || item.name.startsWith(tech));
            return (
              <li key={tech} className="flex items-center gap-2.5 rounded-full border border-line bg-surface-1/60 px-4 py-2.5 text-sm text-fg">
                {icon && (
                  <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current text-muted">
                    <path d={icon.path} />
                  </svg>
                )}
                {tech}
              </li>
            );
          })}
        </ul>
      </CaseSection>
      )}

      {project.metrics.length > 0 && (
      <CaseSection label={t.results}>
        <dl className="grid gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <SpotlightCard key={metric.label} className="p-6">
              <dd className="text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.04em] text-gradient">
                <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} decimals={metric.decimals} />
              </dd>
              <dt className="mt-4 text-sm leading-snug text-muted">{metric.label}</dt>
            </SpotlightCard>
          ))}
        </dl>
      </CaseSection>
      )}

      {Story && (
        <CaseSection label={t.story}>
          <div className="max-w-3xl">
            <Story />
          </div>
        </CaseSection>
      )}

      {project.gallery.length > 0 && (
        <CaseSection label={t.gallery}>
          <div className="grid items-start gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.42fr)]">
            {project.gallery.map((src, index) =>
              src.includes("mobile") ? (
                <PhoneFrame key={src} className="mx-auto w-[60%] sm:w-full">
                  <div className="relative aspect-[390/844]">
                    <Image src={src} alt={`${project.client}, vista móvil`} fill sizes="(min-width: 640px) 220px, 60vw" className="object-cover object-top" />
                  </div>
                </PhoneFrame>
              ) : (
                <BrowserFrame key={src}>
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={src}
                      alt={`${project.client}, captura ${index + 1}`}
                      fill
                      sizes="(min-width: 1280px) 460px, (min-width: 640px) 40vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              ),
            )}
          </div>
        </CaseSection>
      )}

      <section className="container-x py-16 md:py-24">
        <div className="relative overflow-hidden rounded-lg border border-line bg-surface-1 px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgb(107_224_0/0.16),transparent_70%)]" />
          <h2 className="relative mx-auto max-w-2xl text-h2 font-semibold text-fg">{t.ctaTitle}</h2>
          <p className="relative mx-auto mt-5 max-w-lg text-lg text-muted">{t.ctaDescription}</p>
          <Magnetic className="relative mt-10">
            <ButtonLink href="/#contacto" size="lg">
              {t.ctaButton}
              <ArrowIcon />
            </ButtonLink>
          </Magnetic>
        </div>
      </section>

      <Link
        href={`/proyectos/${next.slug}`}
        data-cursor-label={dict.projects.viewCase}
        className="group container-x flex items-end justify-between gap-6 border-t border-line pb-24 pt-14"
      >
        <span>
          <span className="label-mono text-subtle">{t.next}</span>
          <span className="mt-4 block text-[clamp(2rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-fg transition-colors duration-500 group-hover:text-brand-to">
            {next.client}
          </span>
          <span className="mt-3 block text-muted">{next.title}</span>
        </span>
        <span
          aria-hidden
          className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line text-xl text-muted transition-all duration-500 ease-out-expo group-hover:border-brand group-hover:bg-brand group-hover:text-black"
        >
          →
        </span>
      </Link>
    </article>
  );
}
