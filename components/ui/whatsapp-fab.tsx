"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { siWhatsapp } from "simple-icons";

import type { Dictionary } from "@/i18n";
import { whatsappLink, whatsappReady } from "@/lib/site";

/** Botón flotante de WhatsApp: aparece al pasar el hero y se esconde cuando el formulario está a la vista. */
export function WhatsappFab({ dict }: { dict: Dictionary["whatsapp"] }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!whatsappReady) return;
    const update = () => {
      const contact = document.getElementById("contacto")?.getBoundingClientRect();
      const nearContact = contact ? contact.top < window.innerHeight * 0.6 && contact.bottom > 0 : false;
      setVisible(window.scrollY > window.innerHeight * 0.8 && !nearContact);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!whatsappReady) return null;

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href={whatsappLink(dict.message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.label}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="group fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_12px_40px_-8px_rgb(37_211_102/0.6)] sm:bottom-6 sm:right-6"
        >
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-wa opacity-20" />
          <svg viewBox="0 0 24 24" aria-hidden className="relative size-7 fill-current">
            <path d={siWhatsapp.path} />
          </svg>
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-line bg-bg/90 px-3 py-1.5 text-sm text-fg opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 sm:block">
            {dict.label}
          </span>
        </m.a>
      )}
    </AnimatePresence>
  );
}
