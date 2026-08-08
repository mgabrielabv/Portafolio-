export interface SkillLevel {
  tech: string;
  level: number;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: SkillLevel[];
  related: string[];
}

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface MoreInfoItem {
  title: string;
  content: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { tech: "React", level: 95 },
      { tech: "TypeScript", level: 90 },
      { tech: "Tailwind / CSS", level: 92 },
      { tech: "HTML accesible", level: 90 },
    ],
    related: ["React", "TypeScript", "JavaScript", "UI Design"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { tech: "Node.js", level: 82 },
      { tech: "APIs REST", level: 78 },
      { tech: "Autenticación", level: 74 },
      { tech: "Diseño de APIs", level: 70 },
    ],
    related: ["Node", "APIs REST", "SQL"],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { tech: "SQL", level: 72 },
      { tech: "MySQL", level: 70 },
      { tech: "Modelado de datos", level: 75 },
      { tech: "CRUD / consultas", level: 80 },
    ],
    related: ["proyectodb", "SQL", "MySQL"],
  },
  {
    id: "design",
    label: "Design",
    skills: [
      { tech: "Figma", level: 88 },
      { tech: "UI / UX", level: 86 },
      { tech: "Sistemas de diseño", level: 80 },
      { tech: "Prototipado", level: 84 },
    ],
    related: ["UI Design", "Figma"],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { tech: "Git / GitHub", level: 86 },
      { tech: "Vite", level: 88 },
      { tech: "npm / CLI", level: 82 },
      { tech: "Testing", level: 76 },
    ],
    related: ["Git", "Vite"],
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2024",
    role: "Ingeniería en Computación",
    company: "Universidad Rafael Urdaneta (URU) · Maracaibo",
    description:
      "POO, estructuras de datos, bases de datos y desarrollo web, con proyectos prácticos cada semestre.",
  },
  {
    period: "2025",
    role: "Desarrollo Web",
    company: "Proyectos propios y para clientes",
    description:
      "Landing pages, dashboards y sistemas web con React y TypeScript, de la mano del diseño en Figma.",
  },
  {
    period: "2026",
    role: "Full Stack Projects",
    company: "De la base de datos a la interfaz",
    description:
      "Sistemas completos de punta a punta: modelado de datos, APIs y frontend con detalle fino.",
  },
];

export const MORE_INFO: MoreInfoItem[] = [
  {
    title: "Experiencia",
    content: [
      "Desarrolladora frontend freelance — landing pages, dashboards y sistemas web con React y TypeScript (2025 — presente).",
      "Proyectos universitarios en equipos multidisciplinarios — aplicaciones web para materias de base de datos y diseño de software (2024 — 2025).",
    ],
  },
  {
    title: "Educación",
    content: [
      "Ingeniería en Computación — Universidad Rafael Urdaneta (URU), Maracaibo (2024 — presente).",
      "Formación autodidacta: HTML, CSS y JavaScript como punto de partida del recorrido.",
    ],
  },
  {
    title: "Proceso de desarrollo",
    content: [
      "Entiendo el problema y defino el alcance, prototipo en Figma y luego implemento en iteraciones cortas con revisión continua.",
      "Prefiero entregas pequeñas y frecuentes antes que un lanzamiento gigante.",
    ],
  },
];
