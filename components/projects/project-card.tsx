"use client";

import Link from "next/link";
import { useRef } from "react";

import type { Project } from "@/content/types";
import type { Dictionary } from "@/i18n";
import { formatMetric } from "@/lib/format";

type ProjectCardProps = {
  project: Project;
  cover: React.ReactNode;
  dict: Dictionary["projects"];
};

export function ProjectCard({ project, cover, dict }: ProjectCardProps) {
  const video = useRef<HTMLVideoElement>(null);
  const metric = project.metrics[0];

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      data-cursor-label={dict.viewCase}
      onPointerEnter={() => video.current?.play().catch(() => {})}
      onPointerLeave={() => video.current?.pause()}
      className="group block"
    >
      <div className="relative rounded-lg border border-line bg-surface-1/60 p-2 transition-colors duration-500 group-hover:border-line-strong">
        <div className="relative overflow-hidden rounded-[14px]">
          <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]">{cover}</div>
          {project.video && (
            <video
              ref={video}
              src={project.video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-x-0 bottom-0 top-[37px] h-[calc(100%-37px)] w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>
        {metric && (
          <p className="absolute bottom-5 left-5 flex items-baseline gap-2 rounded-full border border-white/10 bg-bg/75 px-3.5 py-1.5 backdrop-blur-md">
            <span className="text-sm font-semibold text-brand-to">{formatMetric(metric)}</span>
            <span className="text-xs text-muted">{metric.label}</span>
          </p>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-6 px-1">
        <div>
          <p className="label-mono text-subtle">
            {project.client} · {project.year}
          </p>
          <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{project.title}</h3>
        </div>
        <span
          aria-hidden
          className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 ease-out-expo group-hover:-rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-black"
        >
          <svg viewBox="0 0 16 16" fill="none" className="size-4">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <p className="mt-2 line-clamp-2 px-1 text-[15px] leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2 px-1">
        {project.category.map((category) => (
          <li key={category} className="rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[11px] text-brand-to">
            {dict.categories[category]}
          </li>
        ))}
        {project.stack.slice(0, 3).map((tech) => (
          <li key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}
