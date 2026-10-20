import es from "./es";

export type Dictionary = typeof es;

// Para habilitar inglés: crear en.ts con `const en: Dictionary = {...}`,
// agregarlo aquí y mover las rutas a app/[locale].
const dictionaries = { es } satisfies Record<string, Dictionary>;

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = "es";

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}
