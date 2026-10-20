import Image from "next/image";

import { BrowserFrame } from "@/components/ui/device-frame";
import type { Project } from "@/content/types";
import { hostname } from "@/lib/format";
import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Portada de un proyecto. Con captura: dentro de un marco de navegador con su URL real.
 * Sin captura: portada tipográfica con el nombre del cliente, sin simular pantallas ni dominios.
 */
export function ProjectCover({ project, sizes, priority, className }: ProjectCoverProps) {
  if (project.cover) {
    return (
      <BrowserFrame url={project.url ? hostname(project.url) : undefined} className={className}>
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-1">
          <Image
            src={project.cover}
            alt={`${project.client}: ${project.title}`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      </BrowserFrame>
    );
  }

  // TODO: reemplazar por la captura o el video real cuando exista
  return (
    <div
      role="img"
      aria-label={`${project.client}: ${project.title}`}
      className={cn("@container relative aspect-[16/10] overflow-hidden rounded-[14px] border border-line bg-surface-1", className)}
    >
      <div aria-hidden className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_20%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(55%_65%_at_80%_0%,rgb(107_224_0/0.18),transparent_70%),radial-gradient(45%_55%_at_0%_100%,rgb(74_219_0/0.06),transparent_70%)]"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-[7%]">
        <p className="text-[clamp(1.5rem,7cqw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-fg">
          {project.client}
        </p>
        <p className="mt-[2cqw] max-w-[80%] text-[clamp(11px,1.7cqw,18px)] text-muted">{project.title}</p>
      </div>
    </div>
  );
}
