"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";

import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Magnetic } from "@/components/ui/magnetic";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export function Navbar({ dict }: { dict: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        aria-label="Principal"
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo",
          scrolled || open
            ? "border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label={dict.home} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {dict.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Magnetic className="hidden sm:inline-flex">
            <ButtonLink href="/#contacto" size="sm">
              {dict.cta}
              <ArrowIcon />
            </ButtonLink>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            className="relative flex size-10 items-center justify-center rounded-full md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-300 ease-out-expo",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-300 ease-out-expo",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-bg/90 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {dict.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg tracking-tight text-fg hover:bg-white/[0.04]"
                  >
                    {link.label}
                    <ArrowIcon className="text-subtle" />
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/#contacto" onClick={() => setOpen(false)} className="mt-2 w-full" size="lg">
              {dict.cta}
            </ButtonLink>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
