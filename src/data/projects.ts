import type { Category, CategoryMeta, Project } from "@/types";

export const CATEGORY_ORDER: Category[] = ["web", "mobile", "data", "backend", "design"];

export const CATEGORIES: Record<Category, CategoryMeta> = {
  web: { label: "Web", description: "Aplicaciones y sitios web" },
  mobile: { label: "Mobile", description: "Aplicaciones móviles" },
  data: { label: "Data", description: "Visualización y análisis" },
  backend: { label: "Backend", description: "APIs y servicios" },
  design: { label: "Design", description: "Sistemas e interfaz" },
};

const YT = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const REACT_SNIPPET = `import { useState } from "react";

export function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div className="counter">
      <p>Has pulsado {count} veces</p>
      <button onClick={() => setCount((c) => c + 1)}>
        Incrementar
      </button>
    </div>
  );
}`;

const API_SNIPPET = `import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const db = new PrismaClient();

app.get("/api/projects", async (c) => {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(projects);
});

export default app;`;

/**
 * Datos de ejemplo (mock) para previsualizar la app sin backend real.
 * Se siembran en localStorage la primera vez que se abre la app.
 */
export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Nebula — E-commerce",
    description:
      "Tienda online con carrito persistente, checkout en dos pasos y panel de pedidos en tiempo real.",
    longDescription:
      "Nebula es una tienda de moda digital construida para ofrecer una experiencia de compra fluida.\n\nEl proyecto incluye catálogo filtrable por categoría y talla, carrito con persistencia en IndexedDB, checkout con validación estricta y un mini panel de administración para gestionar pedidos con actualizaciones en tiempo real mediante Server-Sent Events.\n\nLa arquitectura está basada en React Server Components con streaming, lo que mejora el TTI y el SEO en páginas de producto.",
    thumbnail: "/images/img-01.svg",
    images: ["/images/img-01.svg", "/images/img-02.svg", "/images/img-03.svg"],
    video: YT,
    code: REACT_SNIPPET,
    repo: "https://github.com/",
    demo: "https://example.com",
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Zustand"],
    category: "web",
    year: 2026,
    featured: true,
    createdAt: 1767196800000,
  },
  {
    id: "p2",
    title: "Pulse — Finanzas personales",
    description:
      "App móvil para registrar gastos, presupuestos y metas de ahorro con gráficos interactivos.",
    longDescription:
      "Pulse ayuda a tomar control de las finanzas personales. Registro rápido de transacciones con categorización automática basada en ML, presupuestos mensuales por categoría y metas de ahorro.\n\nLos reportes usan gráficos interactivos y modo offline con sincronización diferida, lo que permite usarla sin conexión en el transporte público.",
    thumbnail: "/images/img-04.svg",
    images: ["/images/img-04.svg", "/images/img-05.svg"],
    repo: "https://github.com/",
    demo: "https://example.com",
    technologies: ["React Native", "Recharts", "SQLite", "FastAPI"],
    category: "mobile",
    year: 2025,
    featured: true,
    createdAt: 1735689600000,
  },
  {
    id: "p3",
    title: "Atlas — Dashboard analítico",
    description:
      "Dashboard de datos con 30+ métricas en tiempo real, filtros combinables y exportación a PDF.",
    longDescription:
      "Atlas centraliza las métricas de producto y marketing de equipos de hasta 200 personas.\n\nIncluye 30+ widgets configurables, drill-down por segmento, alertas programadas y exportación de informes a PDF. Se integró con Google Analytics, Stripe y sistemas internos vía webhooks.",
    thumbnail: "/images/img-03.svg",
    images: ["/images/img-03.svg", "/images/img-06.svg", "/images/img-09.svg"],
    video: YT,
    repo: "https://github.com/",
    demo: "https://example.com",
    technologies: ["React", "Recharts", "D3", "Node.js", "Redis"],
    category: "data",
    year: 2025,
    featured: true,
    createdAt: 1719792000000,
  },
  {
    id: "p4",
    title: "Nido — Plataforma de API",
    description:
      "API headless con autenticación JWT, rate limiting y panel de desarrollo con sandbox.",
    longDescription:
      "Nido es una API headless para equipos que necesitan exponer su catálogo de productos.\n\nIncluye autenticación JWT con refresh tokens, rate limiting por plan, versionado semántico, documentación interactiva con OpenAPI y un sandbox para probar endpoints sin consumir cuota.",
    thumbnail: "/images/img-05.svg",
    images: ["/images/img-05.svg", "/images/img-08.svg"],
    repo: "https://github.com/",
    demo: "https://example.com",
    code: API_SNIPPET,
    technologies: ["Node.js", "Hono", "Prisma", "PostgreSQL", "Docker"],
    category: "backend",
    year: 2024,
    featured: false,
    createdAt: 1698796800000,
  },
  {
    id: "p5",
    title: "Lumen — Sistema de diseño",
    description:
      "Design system con 60+ componentes accesibles, documentados y con soporte para tema oscuro.",
    longDescription:
      "Lumen es un sistema de diseño en código que unifica los productos de la empresa.\n\nCubre 60+ componentes con tokens semánticos, documentación viva con Storybook, pruebas de accesibilidad automatizadas (axe-core) y soporte nativo para tema oscuro.",
    thumbnail: "/images/img-06.svg",
    images: ["/images/img-06.svg", "/images/img-07.svg", "/images/img-10.svg"],
    repo: "https://github.com/",
    demo: "https://example.com",
    technologies: ["React", "Storybook", "Radix UI", "Figma", "Tailwind"],
    category: "design",
    year: 2024,
    featured: true,
    createdAt: 1693526400000,
  },
  {
    id: "p6",
    title: "EcoTrack — Mapa ambiental",
    description:
      "Plataforma web que visualiza la calidad del aire por distrito con datos abiertos.",
    longDescription:
      "EcoTrack combina datos abiertos de sensores ambientales con una visualización geoespacial clara.\n\nMapa interactivo por distrito, histórico con comparación anual, y alertas cuando los niveles superan los umbrales de la OMS. Los datos se procesan con pipelines de ETL diarios.",
    thumbnail: "/images/img-07.svg",
    images: ["/images/img-07.svg", "/images/img-11.svg", "/images/img-12.svg"],
    repo: "https://github.com/",
    demo: "https://example.com",
    technologies: ["Mapbox GL", "React", "Python", "Pandas", "FastAPI"],
    category: "data",
    year: 2024,
    featured: false,
    createdAt: 1682899200000,
  },
];

export const FALLBACK_PROJECTS: Project[] = MOCK_PROJECTS;
