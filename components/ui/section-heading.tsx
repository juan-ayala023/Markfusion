import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  as: Heading = "h2",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="label-mono flex items-center gap-3 text-brand">
        <span aria-hidden className="h-px w-6 bg-brand" />
        {eyebrow}
      </p>
      <Heading id={titleId} className="mt-5 text-h2 font-semibold text-fg">
        {title}
      </Heading>
      {description && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
