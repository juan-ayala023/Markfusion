import type { MDXContent } from "mdx/types";

/** Narrativa larga opcional por proyecto. Si un slug no está aquí, el caso se arma solo con projects.ts. */
export const caseStudies: Record<string, () => Promise<{ default: MDXContent }>> = {
  "secreto-suites": () => import("./secreto-suites.mdx"),
};
