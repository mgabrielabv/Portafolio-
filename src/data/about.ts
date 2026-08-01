export interface SkillLevel {
  tech: string;
  level: number;
}

export interface SoftSkill {
  skill: string;
  value: number;
}

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  description: string;
}

export const SKILL_LEVELS: SkillLevel[] = [
  { tech: "React / Next", level: 95 },
  { tech: "TypeScript", level: 90 },
  { tech: "Node.js", level: 82 },
  { tech: "UI / Diseño", level: 88 },
  { tech: "Datos / SQL", level: 72 },
  { tech: "Testing", level: 76 },
];

export const SOFT_SKILLS: SoftSkill[] = [
  { skill: "Comunicación", value: 92 },
  { skill: "Liderazgo", value: 78 },
  { skill: "Colaboración", value: 95 },
  { skill: "Creatividad", value: 88 },
  { skill: "Adaptabilidad", value: 90 },
  { skill: "Resolución", value: 85 },
];

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2024 — Presente",
    role: "Estudiante de Ingeniería en Computación",
    company: "Universidad Rafael Urdaneta (URU) · Maracaibo",
    description:
      "Formación en programación orientada a objetos, estructuras de datos, bases de datos y desarrollo web, con proyectos prácticos cada semestre.",
  },
  {
    period: "2025 — Presente",
    role: "Desarrolladora Frontend Freelance",
    company: "Proyectos propios y para clientes",
    description:
      "Construyo landing pages, dashboards y pequeños sistemas web con React y TypeScript, de la mano del diseño en Figma.",
  },
  {
    period: "2024 — 2025",
    role: "Proyectos universitarios",
    company: "URU · Equipos multidisciplinarios",
    description:
      "Desarrollé aplicaciones web para materias de base de datos y diseño de software, coordinándome con equipos de hasta 4 personas.",
  },
  {
    period: "2023 — 2024",
    role: "Primeros pasos en la programación",
    company: "Autodidacta",
    description:
      "Empecé con HTML, CSS y JavaScript, y descubrí que me encanta la mezcla entre lógica y diseño visual.",
  },
];

export const FAQS = [
  {
    title: "¿Cómo gestionas un proyecto de principio a fin?",
    content:
      "Empiezo por entender el problema y definir el alcance, luego prototipo en Figma, y finalmente implemento en iteraciones cortas con revisión continua. Prefiero entregas pequeñas y frecuentes antes que un lanzamiento gigante.",
  },
  {
    title: "¿Trabajas con equipos remotos y husos distintos?",
    content:
      "Sí. Trabajo asíncrono por defecto: documentación clara, reuniones cortas y actualizaciones semanales. Me adapto a la zona horaria del equipo principal.",
  },
  {
    title: "¿Ofreces mantenimiento después del lanzamiento?",
    content:
      "Por supuesto. Puedo encargarme de hotfixes, evolutivos y monitorización durante los meses posteriores al lanzamiento, con un SLA acordado.",
  },
];
