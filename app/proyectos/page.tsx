import type { Metadata } from "next";

import { Launches } from "@/components/sections/launches";
import { ProjectsList } from "@/components/sections/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Sitios web en producción y proyectos de MarkFusion: agentes de IA para WhatsApp, automatizaciones con n8n, plataformas SaaS y ticketing.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  const dict = getDictionary();

  return (
    <>
      <Launches dict={dict.launches} headingAs="h1" />
      <section className="container-x section-y border-t border-line">
        <SectionHeading eyebrow={dict.projects.eyebrow} title={dict.projects.title} description={dict.projects.description} />
        <div className="mt-14">
          <ProjectsList dict={dict.projects} />
        </div>
      </section>
    </>
  );
}
