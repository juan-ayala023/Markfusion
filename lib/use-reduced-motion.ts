"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Igual que `useReducedMotion`, pero devuelve `false` en el primer render para que el HTML
 * coincida con el del servidor (evita errores de hidratación cuando cambia el markup).
 */
export function useReducedMotionSafe() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(reduceMotion);
}
