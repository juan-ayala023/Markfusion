# Markfusion

Sitio web y portafolio de **MarkFusion**, agencia de tecnología (Colombia · LATAM · Australia) especializada en inteligencia artificial, automatización y desarrollo fullstack.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · GSAP ScrollTrigger · Lenis · React Three Fiber · MDX · Zod · Anthropic SDK

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev                  # http://localhost:3000
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build (úsalo para medir Lighthouse) |
| `npm run lint` | ESLint |

## Variables de entorno

| Variable | Para qué |
|---|---|
| `ANTHROPIC_API_KEY` | Demo de IA en vivo (`/api/chat`). Sin ella la demo muestra un aviso de mantenimiento. |
| `N8N_WEBHOOK_URL` | Webhook de n8n que recibe el formulario de contacto (`/api/contact`). |
| `N8N_WEBHOOK_SECRET` | Opcional. Se envía en el encabezado `X-Webhook-Secret` para que n8n valide el origen. |

## Contenido

Los textos y datos no están escritos dentro de los componentes:

| Archivo | Contenido |
|---|---|
| `content/projects.ts` | Casos de estudio. Agregar un proyecto = agregar un objeto; su página `/proyectos/[slug]` se genera sola. |
| `content/case-studies/*.mdx` | Narrativa larga opcional por proyecto (se registra en `content/case-studies/index.ts`). |
| `content/launches.ts` | Sitios lanzados (capturas en `public/assets/sites/`). |
| `content/testimonials.ts` | Testimonios. Los marcados `placeholder` solo se ven en desarrollo. |
| `content/metrics.ts` | Métricas globales de la home. |
| `i18n/es.ts` | Todos los textos de la interfaz (estructura lista para agregar `en`). |
| `lib/site.ts` | Correo, WhatsApp y redes. |
| `lib/ai/system-prompt.ts` | Instrucciones del asistente de la demo. |

Los valores por confirmar están marcados con `// TODO`.

## Estructura

```
app/                 rutas, API (chat, contact) y estilos globales con los tokens de diseño
components/ui/       piezas reutilizables (botones, cursor, marcos, diagramas, chat replay…)
components/sections/ secciones de la home
components/projects/ cards, portadas y grid de proyectos
components/case/     bloques de los casos de estudio
content/             datos del sitio
lib/                 utilidades, IA, validación y rate limit
```
