import { ProjectCard } from "@/components/projects/project-card";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { categoryOrder, sortedProjects } from "@/content/projects";
import type { Dictionary } from "@/i18n";

const COVER_SIZES = "(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw";

/** Grid de proyectos. Las cards se renderizan en el servidor y el filtro corre en el cliente. */
export function ProjectsList({ dict, limit }: { dict: Dictionary["projects"]; limit?: number }) {
  const items = sortedProjects().map((project) => ({
    slug: project.slug,
    category: project.category,
    card: <ProjectCard project={project} dict={dict} cover={<ProjectCover project={project} sizes={COVER_SIZES} />} />,
  }));

  return <ProjectsGrid items={items} categories={categoryOrder} dict={dict} limit={limit} />;
}

export function Projects({ dict }: { dict: Dictionary["projects"] }) {
  return (
    <section id="proyectos" className="section-y relative">
      <div className="container-x">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />
        <div className="mt-12">
          <ProjectsList dict={dict} limit={6} />
        </div>
        <div className="mt-16 flex justify-center">
          <ButtonLink href="/proyectos" variant="secondary" size="lg">
            {dict.viewAll}
            <ArrowIcon />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
