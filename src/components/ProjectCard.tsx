import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/data/projects";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/proyectos/${project.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg"
      aria-label={`Ver detalle de ${project.title}`}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge primary className="backdrop-blur">
            {CATEGORIES[project.category].label}
          </Badge>
          <Badge className="bg-black/40 text-white backdrop-blur border-transparent">{project.year}</Badge>
        </div>
        <div className="absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full bg-surface text-content opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" aria-hidden />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-content transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          {project.demo && (
            <span
              className="mt-0.5 text-muted"
              role="img"
              aria-label="Tiene demo en vivo"
              title="Demo en vivo"
            >
              <ExternalLink className="size-4" aria-hidden />
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.technologies.length > 4 && <Badge>+{project.technologies.length - 4}</Badge>}
        </div>
      </div>
    </Link>
  );
}
