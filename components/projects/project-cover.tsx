import Image from "next/image";

import { BrowserFrame, PhoneFrame } from "@/components/ui/device-frame";
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
 * Portada de un proyecto dentro de un mockup de navegador.
 * Sin captura: los bots muestran un teléfono con su conversación y el resto un dashboard abstracto.
 */
export function ProjectCover({ project, sizes, priority, className }: ProjectCoverProps) {
  const url = project.url ? hostname(project.url) : `${project.slug}.app`;

  return (
    <BrowserFrame url={url} className={className}>
      <div className="@container relative aspect-[16/10] overflow-hidden bg-surface-1">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.client}: ${project.title}`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        ) : project.chat ? (
          <ChatMock project={project} />
        ) : (
          <DashboardMock project={project} />
        )}
      </div>
    </BrowserFrame>
  );
}

function MockBackdrop() {
  return (
    <>
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_0%,rgb(107_224_0/0.2),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgb(74_219_0/0.08),transparent_70%)]"
      />
    </>
  );
}

// TODO: placeholder mientras llega la captura o el video real del proyecto.
function ChatMock({ project }: { project: Project }) {
  const messages = project.chat?.messages.slice(0, 4) ?? [];

  return (
    <div role="img" aria-label={`${project.client}: ${project.title}`} className="absolute inset-0">
      <MockBackdrop />
      <div className="absolute left-[7%] top-[14%] max-w-[40%]">
        <p className="label-mono text-[clamp(9px,1.4cqw,13px)] text-brand">{project.chat?.status}</p>
        <p className="mt-[1.5cqw] text-[clamp(1rem,4.4cqw,3.5rem)] font-semibold leading-tight tracking-[-0.03em] text-fg">
          {project.client}
        </p>
      </div>
      <PhoneFrame className="absolute right-[8%] top-[10%] w-[40%] translate-y-0 transition-transform duration-700 ease-out-expo group-hover:-translate-y-[4%]">
        <div className="flex flex-col gap-[1cqw] bg-[#0b141a] px-[1.6cqw] pb-[12cqw] pt-[5cqw]">
          {messages.map((message, index) => (
            <span
              key={index}
              className={cn(
                "max-w-[88%] rounded-lg px-[1.3cqw] py-[1cqw] text-[clamp(7px,1.45cqw,16px)] leading-snug text-white",
                message.from === "user" ? "self-end bg-[#005c4b]" : "self-start bg-[#202c33]",
              )}
            >
              {message.text}
            </span>
          ))}
        </div>
      </PhoneFrame>
    </div>
  );
}

// TODO: placeholder mientras llega la captura real del producto.
/** Variación determinista por proyecto para que dos mockups no se vean idénticos. */
function seeded(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (index: number) => ((hash >>> (index % 24)) ^ (index * 2654435761)) % 100 / 100;
}

function DashboardMock({ project }: { project: Project }) {
  const random = seeded(project.slug);
  const bars = Array.from({ length: 8 }, (_, index) => Math.round(30 + index * 7 + random(index) * 22));
  const tiles = 2 + Math.floor(random(9) * 3);

  return (
    <div role="img" aria-label={`${project.client}: ${project.title}`} className="absolute inset-0">
      <MockBackdrop />
      <p className="absolute left-[7%] top-[6%] text-[clamp(10px,1.6cqw,15px)] font-medium text-fg">{project.client}</p>
      <div aria-hidden className="absolute inset-x-[7%] bottom-[8%] top-[17%] flex gap-[4%]">
        <div className="flex w-[16%] flex-col gap-[8%] pt-[2%]">
          {[100, 70, 85, 60, 75].map((width, index) => (
            <span key={index} style={{ width: `${width}%` }} className={cn("h-[5%] rounded-full", index === 0 ? "bg-brand/50" : "bg-white/[0.07]")} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-[5%]">
          <div className="grid h-[24%] gap-[4%]" style={{ gridTemplateColumns: `repeat(${tiles}, minmax(0, 1fr))` }}>
            {Array.from({ length: tiles }, (_, tile) => (
              <span key={tile} className="rounded-[8px] border border-line bg-surface-2/80" />
            ))}
          </div>
          <div className="flex flex-1 items-end gap-[3%] rounded-[8px] border border-line bg-surface-2/50 p-[4%]">
            {bars.map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className={cn("flex-1 rounded-t-[3px]", index === bars.length - 1 ? "bg-brand" : "bg-brand/20")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
