import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { LenisProvider } from "@/components/providers/lenis-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Cursor } from "@/components/ui/cursor";
import { WhatsappFab } from "@/components/ui/whatsapp-fab";
import { getDictionary } from "@/i18n";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MarkFusion · IA, automatización y desarrollo a la medida",
    template: "%s · MarkFusion",
  },
  description:
    "Agencia de tecnología en Colombia, LATAM y Australia. Construimos agentes de IA para WhatsApp, automatizaciones con n8n y software fullstack que hace crecer tu negocio.",
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dict = getDictionary();

  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <MotionProvider>
          <LenisProvider>
            <Navbar dict={dict.nav} />
            <main>{children}</main>
            <Footer dict={dict.footer} />
            <WhatsappFab dict={dict.whatsapp} />
            <Cursor />
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
