import { ChatReplay } from "@/components/ui/chat-replay";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { demoChat } from "@/content/demo-chat";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

import { DemoDashboard } from "./demo-dashboard";

type Pillar = Dictionary["pillars"]["items"]["ai"];

export function Pillars({ dict, chatLabels }: { dict: Dictionary["pillars"]; chatLabels: Dictionary["chat"] }) {
  const { ai, automation, fullstack } = dict.items;
  const { flow, dashboard } = dict.demos;

  return (
    <section id="servicios" className="section-y relative">
      <div className="container-x">
        <ScrollRevealText
          text={dict.statement}
          highlight={dict.statementHighlight}
          className="max-w-4xl text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.15] tracking-[-0.03em] text-fg"
        />

        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} className="mt-28 sm:mt-40" />

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <PillarCard pillar={ai} className="lg:col-span-7 lg:row-span-2" visualClassName="h-[420px] sm:h-[460px] lg:h-auto lg:min-h-[460px]">
            <ChatReplay script={demoChat} labels={chatLabels} />
          </PillarCard>
          <PillarCard pillar={automation} className="lg:col-span-5" visualClassName="h-56">
            <FlowDiagram nodes={flow.nodes} edges={flow.edges} title={flow.title} done={flow.done} />
          </PillarCard>
          <PillarCard pillar={fullstack} className="lg:col-span-5" visualClassName="h-60">
            <DemoDashboard dict={dashboard} />
          </PillarCard>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  className,
  visualClassName,
  children,
}: {
  pillar: Pillar;
  className?: string;
  visualClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <SpotlightCard className={cn("flex flex-col p-5 sm:p-7", className)}>
      <span className="label-mono text-brand">
        {pillar.index} · {pillar.label}
      </span>
      <h3 className="mt-5 text-h3 font-semibold text-fg">{pillar.title}</h3>
      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">{pillar.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {pillar.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
            {tag}
          </li>
        ))}
      </ul>
      <div className={cn("mt-7 min-h-0 flex-1", visualClassName)}>{children}</div>
    </SpotlightCard>
  );
}
