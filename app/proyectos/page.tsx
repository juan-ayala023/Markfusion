import type { Metadata } from "next";

import { Launches } from "@/components/sections/launches";
import { ProjectsList } from "@/components/sections/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Casos de estudio de MarkFusion: agentes de IA para WhatsApp, automatizaciones con n8n, plataformas SaaS, ticketing y sitios web en producción.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  const dict = getDictionary();

  return (
    <>
      <section className="container-x pb-24 pt-36 sm:pt-44">
        <SectionHeading as="h1" eyebrow={dict.projects.eyebrow} title={dict.projects.title} description={dict.projects.description} />
        <div className="mt-14">
          <ProjectsList dict={dict.projects} />
        </div>
      </section>
      <Launches dict={dict.launches} />
    </>
  );
}
