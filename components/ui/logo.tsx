import { useId } from "react";

import { cn } from "@/lib/utils";

// TODO: reemplazar por el vector oficial del logo (SVG). Esta "MF" es una reconstrucción geométrica.
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const gradientId = `mf-${id}`;

  return (
    <svg viewBox="0 0 73 40" fill="none" aria-hidden className={cn("h-6 w-auto", className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="40" x2="73" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-brand-from)" />
          <stop offset="1" stopColor="var(--color-brand-to)" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M0 40 10 0h8l5 17L36 0h9L35 40h-8l6-24-11 14h-5l-4-15-6 25Z M41 40h8l2.5-12H64l1.6-7H53l2-9h15L72.5 0H50Z"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.32em] text-fg">MARK</span>
        <span className="mt-1 text-[8px] font-medium tracking-[0.5em] text-brand">FUSIÓN</span>
      </span>
    </span>
  );
}
