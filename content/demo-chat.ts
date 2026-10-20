import type { ChatScript } from "./types";

/**
 * Conversación ilustrativa del pilar de IA. Es un ejemplo genérico (no es de un cliente real),
 * por eso no lleva nombres de clientes, precios ni cifras.
 */
export const demoChat: ChatScript = {
  name: "Hotel de ejemplo",
  status: "Asistente IA · en línea",
  done: "Reserva lista sin intervención humana",
  messages: [
    { from: "user", text: "Hola 👋 ¿tienen habitación para este sábado?", log: ["webhook ← WhatsApp", "intención: reserva"] },
    { from: "bot", text: "¡Hola! Sí, hay disponibilidad para el sábado. ¿Para cuántas personas?", log: ["pms.disponibilidad(sábado)"] },
    { from: "user", text: "Para 2 personas", log: ["memoria: huéspedes = 2"] },
    { from: "bot", text: "Perfecto ✨ Te comparto la tarifa y el link de pago para confirmar.", log: ["pms.tarifa()"] },
    { from: "user", text: "Dale" },
    {
      from: "bot",
      text: "Listo, aquí tienes tu reserva para el sábado · 2 huéspedes.",
      action: "Pagar reserva",
      log: ["pago.crearLink() ✓", "alerta al equipo ✓"],
    },
  ],
};
