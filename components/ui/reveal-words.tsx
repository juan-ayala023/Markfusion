import { cn } from "@/lib/utils";

/**
 * Revela un texto palabra por palabra al cargar (CSS puro, sin JS, para no retrasar el LCP).
 * Las palabras en `highlight` llevan el gradiente de marca.
 */
export function RevealWords({
  text,
  highlight = [],
  delay = 0,
  stagger = 70,
  className,
}: {
  text: string;
  highlight?: readonly string[];
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="reveal-word">
            <span
              style={{ animationDelay: `${delay + index * stagger}ms` }}
              className={cn(highlight.includes(word) && "text-gradient")}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
