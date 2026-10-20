import type { MDXComponents } from "mdx/types";

/** Estilos de la narrativa MDX de los casos de estudio. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-14 text-h3 font-semibold text-fg first:mt-0" {...props} />,
    h3: (props) => <h3 className="mt-10 text-lg font-semibold text-fg" {...props} />,
    p: (props) => <p className="mt-5 text-lg leading-relaxed text-muted" {...props} />,
    strong: (props) => <strong className="font-semibold text-fg" {...props} />,
    a: (props) => <a className="text-brand-to underline decoration-brand/40 underline-offset-4 hover:decoration-brand" {...props} />,
    ul: (props) => <ul className="mt-5 space-y-2 text-lg text-muted" {...props} />,
    li: (props) => <li className="relative pl-6 before:absolute before:left-0 before:text-brand before:content-['→']" {...props} />,
    blockquote: (props) => (
      <blockquote className="mt-10 border-l-2 border-brand pl-6 text-xl font-medium leading-snug tracking-tight text-fg [&>p]:mt-0 [&>p]:text-xl [&>p]:text-fg" {...props} />
    ),
    ...components,
  };
}
