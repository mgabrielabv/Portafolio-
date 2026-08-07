import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "@/data/projects";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

/** Fila editorial: índice, título, categoría/año y stack técnico en monoespaciada. */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Link
      to={`/proyectos/${project.id}`}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-baseline gap-4 border-b border-line py-6 transition-colors duration-fast hover:bg-surface-2/40 sm:grid-cols-[3rem_minmax(0,1fr)_auto_1.5rem] sm:gap-6"
      aria-label={`Ver detalle de ${project.title}`}
    >
      <span aria-hidden className="font-mono text-xs text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h3 className="font-display text-xl font-medium text-content transition-opacity duration-fast sm:text-2xl group-hover:opacity-70">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-muted">
          {CATEGORIES[project.category].label} · {project.year}
        </p>
      </div>

      <p className="hidden truncate text-right font-mono text-xs text-muted md:block">
        {project.technologies.slice(0, 4).join(" · ")}
        {project.technologies.length > 4 ? " · …" : ""}
      </p>

      <ArrowUpRight
        aria-hidden
        className="size-4 justify-self-end text-accent opacity-0 transition-all duration-fast group-hover:translate-x-1 group-hover:opacity-100"
      />
    </Link>
  );
}
