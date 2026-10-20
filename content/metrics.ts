import { launches } from "./launches";
import { projects } from "./projects";
import type { Metric } from "./types";

// Todo se calcula con el contenido real del sitio: nada de cifras de ejemplo.
const launchUrls = new Set(launches.map((launch) => launch.url));
const projectsWithoutSite = projects.filter((project) => !project.url || !launchUrls.has(project.url)).length;
const countries = new Set([...projects.map((project) => project.country), "Ghana"]); // Air Ghana

export const globalMetrics: Metric[] = [
  { label: "Proyectos entregados", value: launches.length + projectsWithoutSite },
  { label: "Sitios web en producción", value: launches.length },
  {
    label: "Proyectos de IA y automatización",
    value: projects.filter((project) => project.category.some((category) => category === "ia" || category === "automatizacion")).length,
  },
  { label: "Países", value: countries.size },
];
