import { Marquee } from "@/components/ui/marquee";
import { stack } from "@/content/stack";
import type { Dictionary } from "@/i18n";

export function StackMarquee({ dict }: { dict: Dictionary["stack"] }) {
  return (
    <section aria-label={dict.label} className="relative border-y border-line bg-surface-1/40 py-10">
      <p className="label-mono container-x text-center text-subtle">{dict.label}</p>
      <Marquee className="mt-8" duration={45}>
        {stack.map((item) => (
          <span
            key={item.name}
            className="flex items-center gap-3 text-muted transition-colors duration-300 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-current">
              <path d={item.path} />
            </svg>
            <span className="whitespace-nowrap text-[15px] font-medium tracking-tight">{item.name}</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
