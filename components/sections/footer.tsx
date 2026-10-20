import Link from "next/link";

import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import type { Dictionary } from "@/i18n";
import { site, whatsappLink, whatsappReady } from "@/lib/site";

export function Footer({ dict }: { dict: Dictionary["footer"] }) {
  const contactLinks = [
    { href: `mailto:${site.email}`, label: site.email, external: false },
    ...(whatsappReady ? [{ href: whatsappLink(), label: `WhatsApp +${site.whatsapp}`, external: true }] : []),
    { href: site.socials.instagram, label: dict.instagram, external: true },
    ...(site.socials.linkedin ? [{ href: site.socials.linkedin, label: "LinkedIn", external: true }] : []),
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x grid gap-12 pb-12 pt-20 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div className="space-y-6">
          <Logo />
          <p className="max-w-xs text-muted">{dict.tagline}</p>
          <ButtonLink href="/#contacto" size="sm">
            {dict.cta}
            <ArrowIcon />
          </ButtonLink>
        </div>

        <FooterColumn title={dict.columns.services} links={dict.services} />
        <FooterColumn title={dict.columns.company} links={dict.links} />

        <nav aria-label={dict.columns.contact}>
          <h2 className="label-mono text-subtle">{dict.columns.contact}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="break-all text-muted transition-colors duration-300 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Wordmark gigante de cierre */}
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center text-[15vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]"
      >
        MARKFUSION
      </p>

      <div className="container-x flex flex-col gap-3 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {dict.rights}
        </p>
        <p className="label-mono">{dict.based}</p>
        <Link href="#" className="transition-colors hover:text-fg">
          {dict.backToTop} ↑
        </Link>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="label-mono text-subtle">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-muted transition-colors duration-300 hover:text-fg">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
