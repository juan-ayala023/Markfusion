import type { Launch } from "./types";

/**
 * Sitios en producción hechos por MarkFusion. Capturas en /public/assets/sites/<slug>.jpg.
 * Categoría y ubicación salen de lo que dice cada sitio; si no lo dice, la ubicación se omite.
 */
export const launches: Launch[] = [
  { slug: "banton-group", name: "Banton Group", url: "https://bantongroup.com", category: "Firma de litigio", location: "Sídney" },
  { slug: "air-ghana", name: "Air Ghana", url: "https://www.airghana.com", category: "Carga aérea", location: "Ghana" },
  { slug: "homecoming-tcs", name: "Homecoming 80 años · The Columbus School", url: "https://homecomingtcs.columbus.edu.co", category: "Evento · venta de boletas", location: "Medellín" },
  { slug: "fundacion-tcs", name: "Fundación The Columbus School", url: "https://fundaciontcs.columbus.edu.co", category: "Fundación · donaciones", location: "Medellín" },
  { slug: "emmporio-juridico", name: "Emmporio Jurídico", url: "https://emmporiojuridico.com", category: "Firma de abogados", location: "Medellín" },
  { slug: "universal-agro", name: "Universal Agro", url: "https://universalagrosas.com.co", category: "Fertilizantes y bioestimulantes", location: "Colombia" },
  { slug: "black-square", name: "Black Square", url: "https://blacksquare.com.co", category: "Ingeniería y robótica", location: "Colombia" },
  { slug: "aoa-global-services", name: "AOA Global Services", url: "https://aoaglobalservices.com", category: "Consultoría estratégica" },
  { slug: "gafas", name: "VYSE", url: "https://gafas-rose.vercel.app", category: "Prueba virtual de gafas" },
  { slug: "matu", name: "MATU", url: "https://matu-six.vercel.app", category: "Yerba mate" },
  { slug: "mellow-banana", name: "Mellow & Banana", url: "https://mellow-banana.vercel.app", category: "Consultora de branding" },
  { slug: "sebastian-gutierrez-abogados", name: "Sebastián Gutiérrez Abogados", url: "https://sebastiangutierrezabogados.com", category: "Abogado penalista", location: "Medellín" },
  { slug: "manuela-toro-correa", name: "Manuela Toro Correa", url: "https://manuelatorocorrea.com", category: "Abogada penalista", location: "Medellín" },
  { slug: "glamping-loma-roja", name: "Glamping Loma Roja", url: "https://glampinglomarojaecohabs.com", category: "Glamping", location: "Palmira" },
  { slug: "la-cabana-kudita", name: "Cabaña Alpina Kudita", url: "https://lacabañakudita.com", category: "Alojamiento", location: "Santa Cruz" },
  { slug: "maremia", name: "Maremía", url: "https://maremia.com.co", category: "Joyería artesanal", location: "Colombia" },
  { slug: "stattus", name: "Stattus", url: "https://stattus.shop", category: "Catálogo de perfumes" },
  { slug: "raleger-films", name: "Raléger Films", url: "https://ralegerfilms.com", category: "Productora audiovisual", location: "La Ceja" },
  { slug: "focus-beauty-studio", name: "Focus Beauty Studio", url: "https://focusbeautystudio.com", category: "Estudio de belleza", location: "La Unión" },
  { slug: "construlejes", name: "Construlejes", url: "https://construlejes.com", category: "Materiales de construcción", location: "La Unión" },
  { slug: "talento-unitense", name: "Talento Unitense", url: "https://talentounitense.online", category: "Escuela de fútbol" },
  { slug: "cachorros-king-dog", name: "Criadero King Dog", url: "https://cachorroskingdog.com", category: "Criadero", location: "Colombia" },
];
