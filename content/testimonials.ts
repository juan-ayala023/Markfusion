export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** true: texto de ejemplo. Solo se muestra en desarrollo, nunca en producción. */
  placeholder?: boolean;
};

// TODO: reemplazar por testimonios reales (con permiso del cliente) y quitar `placeholder`.
export const testimonials: Testimonial[] = [
  {
    quote: "Ejemplo: el bot atiende las reservas de noche y en la mañana encontramos todo confirmado en el PMS.",
    name: "Nombre del cliente",
    role: "Cargo",
    company: "Secreto Suites",
    placeholder: true,
  },
  {
    quote: "Ejemplo: dejamos de copiar pedidos a mano. Lía vende y los flujos hacen el resto.",
    name: "Nombre del cliente",
    role: "Cargo",
    company: "Cosecharte",
    placeholder: true,
  },
  {
    quote: "Ejemplo: vendimos las boletas del Homecoming sin una sola fila en taquilla.",
    name: "Nombre del cliente",
    role: "Cargo",
    company: "The Columbus School",
    placeholder: true,
  },
  {
    quote: "Ejemplo: nuestras fichas de producto aparecieron en Google al día siguiente.",
    name: "Nombre del cliente",
    role: "Cargo",
    company: "Universal Agro",
    placeholder: true,
  },
];

export function visibleTestimonials() {
  return process.env.NODE_ENV === "production" ? testimonials.filter((item) => !item.placeholder) : testimonials;
}
