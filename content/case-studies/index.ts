import type { MDXContent } from "mdx/types";

/**
 * Narrativa larga opcional por proyecto (archivos .mdx en esta carpeta). Si un slug no está aquí,
 * el caso se arma solo con projects.ts. Ejemplo:
 *   "secreto-suites": () => import("./secreto-suites.mdx"),
 */
export const caseStudies: Record<string, () => Promise<{ default: MDXContent }>> = {};
