export const site = {
  name: "MarkFusion",
  url: "https://markfusion.com.co",
  email: "comercial@markfusion.com.co",
  // TODO: número comercial de WhatsApp en formato internacional sin "+" (ej. 573001234567)
  whatsapp: "570000000000",
  locale: "es_CO",
  countries: ["Colombia", "LATAM", "Australia"],
  socials: {
    instagram: "https://www.instagram.com/mark.fusion/",
    // TODO: confirmar LinkedIn y otras redes
    linkedin: "",
  },
} as const;

/** false mientras el número sea el de relleno: los links y el botón flotante de WhatsApp no se muestran. */
export const whatsappReady = !/^570+$/.test(site.whatsapp);

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}
