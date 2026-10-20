import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/button relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,box-shadow] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-black shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_40px_-10px_rgb(107_224_0/0.55)] hover:bg-brand-to hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_14px_50px_-10px_rgb(142_234_0/0.7)]",
        secondary:
          "border border-line-strong bg-white/[0.03] text-fg backdrop-blur-md hover:border-white/25 hover:bg-white/[0.07]",
        ghost: "text-muted hover:text-fg",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** Flecha que se desplaza al hacer hover sobre el botón padre. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-4 transition-transform duration-300 ease-out-expo group-hover/button:translate-x-0.5", className)}
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
