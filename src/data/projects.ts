import type { Category, CategoryMeta, Project } from "@/types";

export const CATEGORY_ORDER: Category[] = ["web", "fundamentos"];

export const CATEGORIES: Record<Category, CategoryMeta> = {
  web: { label: "Web", description: "Aplicaciones y sistemas web" },
  fundamentos: { label: "Fundamentos", description: "Cursada · C++ y estructuras de datos" },
};

const GH = "https://github.com/mgabrielabv";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proyectodb",
    title: "proyectodb — Sistema de gestión",
    description:
      "Sistema web con login, registro, panel de administración y consultas sobre una base de datos. Un CRUD completo de punta a punta.",
    longDescription:
      "El proyecto más completo que tengo en GitHub: un sistema web en JavaScript/HTML que resuelve un problema real de gestión de registros con base de datos.\n\nIncluye autenticación (login y registro), un panel de administración con roles y consultas filtradas, y operaciones CRUD sobre la base de datos. Fue mi primera oportunidad de llevar un proyecto de principio a fin: desde el modelo de datos hasta la interfaz que lo usa.\n\nLo que aprendí: diseñar tablas y relaciones que no den dolor después, validar entradas antes de tocar la base, y que un panel 'simple' esconde decisiones de UX que se notan en el uso real.",
    thumbnail: "/images/img-01.svg",
    images: ["/images/img-01.svg", "/images/img-02.svg"],
    repo: `${GH}/proyectodb`,
    technologies: ["JavaScript", "HTML", "CSS", "SQL"],
    category: "web",
    year: 2025,
    featured: true,
    createdAt: 1743552000000,
  },
  {
    id: "proyecto-final",
    title: "proyecto-final- — Proyecto final (C++)",
    description:
      "Proyecto final de la materia en C++: gestión de registros con estructuras de datos, archivos y operaciones sobre colecciones.",
    longDescription:
      "El proyecto final de la cursada: una aplicación de consola en C++ donde el foco está en la lógica, no en la interfaz.\n\nUsa estructuras de datos y manejo de archivos para almacenar y consultar registros, con menús de operaciones para crear, buscar, modificar y eliminar. Es el mejor ejemplo de mi lado técnico: resolver el problema con la herramienta adecuada y que el código sea legible para el que viene después.\n\nLo que aprendí: a pensar en memoria y en cómo se ordenan los datos antes de escribir la primera línea, algo que hoy aplico cuando diseño el estado de una app en React.",
    thumbnail: "/images/img-04.svg",
    images: ["/images/img-04.svg", "/images/img-05.svg"],
    repo: `${GH}/proyecto-final-`,
    technologies: ["C++"],
    category: "fundamentos",
    year: 2024,
    featured: true,
    createdAt: 1727308800000,
  },
  {
    id: "practica3y4",
    title: "práctica 3 y 4 — Listas y algoritmos",
    description:
      "Ejercicios de la cursada sobre listas, búsqueda y ordenamiento, con implementación y pruebas en C++.",
    longDescription:
      "Prácticas 3 y 4 de la materia de programación: implementación de listas, algoritmos de búsqueda y ordenamiento, y análisis de la lógica detrás de cada uno.\n\nSon ejercicios de cursada, pero marcaron el momento en que dejé de 'copiar código' y empecé a entender por qué funcionan las estructuras.",
    thumbnail: "/images/img-03.svg",
    images: ["/images/img-03.svg"],
    repo: `${GH}/practica3y4`,
    technologies: ["C++"],
    category: "fundamentos",
    year: 2024,
    featured: false,
    createdAt: 1723673600000,
  },
  {
    id: "practica2",
    title: "práctica 2 — Control y funciones",
    description:
      "Ejercicios de estructuras de control, funciones y arreglos. La base del pensamiento algorítmico.",
    longDescription:
      "Segunda práctica de la cursada: estructuras de control, funciones y arreglos en C++. Ejercicios cortos y directos donde se consolidan los fundamentos del lenguaje y del pensamiento algorítmico.",
    thumbnail: "/images/img-05.svg",
    images: ["/images/img-05.svg"],
    repo: `${GH}/practica2`,
    technologies: ["C++"],
    category: "fundamentos",
    year: 2024,
    featured: false,
    createdAt: 1720041600000,
  },
  {
    id: "practica1",
    title: "práctica 1 — Primeros pasos",
    description:
      "Tipos de datos, entrada/salida y condicionales. El primer repo que subí a GitHub.",
    longDescription:
      "La primera práctica de la materia y el primer código que subí a GitHub. Tipos de datos, entrada/salida por consola y condicionales en C++.\n\nLo dejo en el portafolio con cariño: es el punto de partida del recorrido que muestra el resto de la sección.",
    thumbnail: "/images/img-06.svg",
    images: ["/images/img-06.svg"],
    repo: `${GH}/practica1`,
    technologies: ["C++"],
    category: "fundamentos",
    year: 2024,
    featured: false,
    createdAt: 1716409600000,
  },
  {
    id: "examen3",
    title: "examen3 — Punteros y memoria",
    description:
      "Examen práctico de la materia: resolución de problemas con punteros y memoria dinámica en C++.",
    longDescription:
      "Examen práctico de la cursada: problemas resueltos con punteros y memoria dinámica en C++. Un buen termómetro de dónde estaba mi dominio del lenguaje en ese momento.",
    thumbnail: "/images/img-07.svg",
    images: ["/images/img-07.svg"],
    repo: `${GH}/examen3`,
    technologies: ["C++"],
    category: "fundamentos",
    year: 2024,
    featured: false,
    createdAt: 1712774400000,
  },
];

export const FALLBACK_PROJECTS: Project[] = MOCK_PROJECTS;
