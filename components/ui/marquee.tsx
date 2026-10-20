import { cn } from "@/lib/utils";

/** Marquee infinito en CSS puro: dos copias del contenido que se desplazan su propio ancho. Pausa al hover. */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 || undefined}
          style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
          className="marquee-track flex shrink-0 items-center gap-14 pr-14"
        >
          {children}
        </div>
      ))}
    </div>
  );
}
