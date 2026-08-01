# Portafolio Personal — SPA

Portafolio personal de **María Bermúdez** — estudiante de Ingeniería en Computación (URU, Maracaibo) — con estética minimalista tipo Awwwards: mucho espacio en blanco, tipografía grande, acentos de color sutiles y micro-animaciones.

Construido con **React 19**, **Vite**, **React Router v7**, **Tailwind CSS v4**, **Framer Motion** y **Recharts**.

## ✨ Características

| Área | Detalle |
| --- | --- |
| **Autenticación** | Login y Registro con validación en tiempo real (React Hook Form + Zod), token simulado en localStorage, rutas protegidas, toggle mostrar/ocultar contraseña, toasts de éxito/error. |
| **Proyectos** | Grid responsive con tarjetas, filtro por categoría (Tabs), buscador por tecnología, detalle con galería (carousel con swipe), video embebido, bloque de código con syntax highlighting y botón "copiar", enlaces a repo/demo. |
| **Admin (CRUD)** | `/admin` protegido: crear, editar, eliminar proyectos con `useOptimistic`, subida de imágenes optimizada (canvas → dataURL), restaurar datos demo. |
| **Gráficos** | BarChart de dominio técnico, RadarChart de soft skills y donut de distribución de proyectos (Sobre mí). |
| **Diseño** | Modo claro/oscuro con toggle, paleta violeta + lima, Space Grotesk / Inter, animaciones de entrada con Framer Motion, 100% responsive, accesibilidad (aria-labels, foco visible, `prefers-reduced-motion`). |
| **Rendimiento** | Lazy loading de rutas (`React.lazy` + `Suspense`), lazy loading de imágenes, code-splitting manual por dependencia. |

## 🚀 Instalación y ejecución

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
```

Otros comandos:

```bash
npm run build      # typecheck (tsc) + build de producción
npm run preview    # previsualiza el build de producción
npm run lint       # eslint
npm run gen:cv     # regenera public/cv.pdf
```

## 🔐 Demo de autenticación

No hay backend real: usuarios y proyectos se persisten en `localStorage` de forma simulada con latencia de red.

- Regístrate desde `/registro` (cualquier email válido).
- Acceso al panel de administración: `/admin` (requiere sesión).
- Para resetear los datos de ejemplo: botón **Restaurar demo** en el panel.

## 📁 Estructura

```
src/
├── components/
│   ├── auth/        # AuthLayout (split 50/50), ProtectedRoute
│   ├── forms/       # ProjectForm (RHF + Zod)
│   ├── layout/      # Navbar, Footer, Layout
│   └── ui/          # Button, Field, Tabs, Accordion, Carousel, CodeBlock,
│                    #   Toast, Skeleton, EmptyState, Modal, ConfirmDialog…
├── context/         # AuthContext, ThemeContext, ToastContext
├── data/            # Proyectos mock, habilidades, timeline, FAQs
├── hooks/           # useChartColors (colores del tema para Recharts)
├── pages/           # Home, About, Projects, ProjectDetail, Login, Register,
│                    #   Admin, Contact, NotFound
├── schemas/         # Esquemas Zod (auth, project, contact)
├── services/        # "Backend" simulado: auth + CRUD de proyectos
└── utils/           # cn (clsx+twMerge), fileToDataUrl, helpers
```

## 🛠 Stack

- **React 19** — Actions, `useOptimistic`, `useTransition`, compilador
- **Vite 7** + TypeScript
- **React Router v7** — rutas protegidas, lazy loading
- **Tailwind CSS v4** — design tokens CSS-first, modo oscuro por clase
- **Recharts 3** — gráficos sensibles al tema
- **Framer Motion 12** — animaciones de entrada, carousel, toasts
- **React Hook Form + Zod** — formularios validados
- **react-syntax-highlighter** — bloques de código (PrismLight)
- **lucide-react** — iconografía

## ✅ Verificación

El proyecto pasa `tsc`, `eslint` (0 errores) y una suite end-to-end automatizada con Playwright (26 checks: navegación, auth, CRUD, tema, responsive) con **cero errores de consola**.
