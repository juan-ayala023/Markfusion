import type { Launch } from "./types";

/**
 * Sitios lanzados que no tienen caso de estudio completo. Las capturas están en /public/assets/sites/<slug>.jpg.
 * Para promover uno a caso: crear su objeto en projects.ts y quitarlo de aquí.
 */
export const launches: Launch[] = [
  { slug: "air-ghana", name: "Air Ghana", url: "https://www.airghana.com", category: "Aerolínea de carga", location: "Ghana" },
  { slug: "black-square", name: "Black Square", url: "https://blacksquare.com.co", category: "Ingeniería y robótica", location: "Colombia" },
  { slug: "fundacion-tcs", name: "Fundación The Columbus School", url: "https://fundaciontcs.columbus.edu.co", category: "Fundación · donaciones", location: "Medellín" },
  { slug: "gafas", name: "VYSE", url: "https://gafas-rose.vercel.app", category: "Prueba virtual de gafas", location: "SaaS" },
  { slug: "matu", name: "MATU", url: "https://matu-six.vercel.app", category: "Yerba mate · ecommerce", location: "Argentina" },
  { slug: "mellow-banana", name: "Mellow & Banana", url: "https://mellow-banana.vercel.app", category: "Consultora de branding", location: "LATAM" },
  { slug: "aoa-global-services", name: "AOA Global Services", url: "https://aoaglobalservices.com", category: "Consultoría estratégica", location: "Internacional" },
  { slug: "sebastian-gutierrez-abogados", name: "Sebastián Gutiérrez Abogados", url: "https://sebastiangutierrezabogados.com", category: "Abogado penalista", location: "Medellín" },
  { slug: "manuela-toro-correa", name: "Manuela Toro Correa", url: "https://manuelatorocorrea.com", category: "Abogada penalista", location: "Medellín" },
  { slug: "glamping-loma-roja", name: "Glamping Loma Roja", url: "https://glampinglomarojaecohabs.com", category: "Glamping · reservas", location: "Palmira" },
  { slug: "la-cabana-kudita", name: "Cabaña Alpina Kudita", url: "https://lacabañakudita.com", category: "Alojamiento", location: "Santa Cruz" },
  { slug: "maremia", name: "Maremía", url: "https://maremia.com.co", category: "Joyería artesanal", location: "Colombia" },
  { slug: "stattus", name: "Stattus", url: "https://stattus.shop", category: "Perfumería · catálogo", location: "Colombia" },
  { slug: "raleger-films", name: "Raléger Films", url: "https://ralegerfilms.com", category: "Productora audiovisual", location: "La Ceja" },
  { slug: "focus-beauty-studio", name: "Focus Beauty Studio", url: "https://focusbeautystudio.com", category: "Estudio de belleza", location: "La Unión" },
  { slug: "construlejes", name: "Construlejes", url: "https://construlejes.com", category: "Materiales de construcción", location: "La Unión" },
  { slug: "talento-unitense", name: "Talento Unitense", url: "https://talentounitense.online", category: "Escuela de fútbol", location: "La Unión" },
  { slug: "cachorros-king-dog", name: "Criadero King Dog", url: "https://cachorroskingdog.com", category: "Criadero", location: "Colombia" },
];
