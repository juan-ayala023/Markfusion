import { cn } from "@/lib/utils";

/** Bloque de un caso de estudio: etiqueta a la izquierda y contenido a la derecha (apilado en móvil). */
export function CaseSection({
  label,
  description,
  className,
  children,
}: {
  label: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("container-x grid gap-6 py-16 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 md:py-24", className)}>
      <div className="md:sticky md:top-28 md:self-start">
        <h2 className="label-mono flex items-center gap-3 text-brand">
          <span aria-hidden className="h-px w-6 bg-brand" />
          {label}
        </h2>
        {description && <p className="mt-4 text-sm leading-relaxed text-subtle md:max-w-[13rem]">{description}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
