import { launches } from "./launches";
import { projects } from "./projects";
import type { Metric } from "./types";

const countries = new Set(
  [...projects.map((project) => project.country), "Ghana", "Argentina"], // Air Ghana y MATU están en launches
);

/** Métricas globales de la home. Las dos primeras se calculan con el contenido real del sitio. */
export const globalMetrics: Metric[] = [
  { label: "Proyectos en producción", value: projects.length + launches.length, prefix: "+" },
  { label: "Países con clientes", value: countries.size },
  { label: "Flujos automatizados", value: 120, prefix: "+" }, // TODO: confirmar
  { label: "Horas manuales eliminadas al mes", value: 2000, prefix: "+" }, // TODO: confirmar
];
