import { cn } from "@/lib/utils";

/** Marco de navegador: barra con semáforo y URL. */
export function BrowserFrame({
  url,
  className,
  children,
}: {
  url?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] border border-line bg-surface-2", className)}>
      <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2.5 rounded-full bg-white/10" />
          ))}
        </span>
        {url && (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-subtle">
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Marco de teléfono con notch. */
export function PhoneFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[28px] border-[6px] border-[#1c1c24] bg-black shadow-2xl", className)}>
      <span aria-hidden className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#1c1c24]" />
      {children}
    </div>
  );
}
