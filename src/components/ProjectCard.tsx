import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { CATEGORIES } from "@/data/projects";
import type { Project } from "@/types";

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

/** Card de galería: tilt 3D, zoom de imagen, badges y barra de avance. */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const progress = useMemo(() => 82 + (hash(project.id) % 16), [project.id]);

  return (
    <TiltCard intensity={6} className="h-full">
      <Link
        to={`/proyectos/${project.id}`}
        className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl transition-[border-color] duration-base hover:border-accent/40"
        aria-label={`Ver detalle de ${project.title}`}
      >
        <div className="relative overflow-hidden">
          <img
            src={project.thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-base group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/25 to-transparent opacity-80 transition-opacity duration-base group-hover:opacity-100" />
          <span className="glass absolute top-3 left-3 rounded-full px-2.5 py-1 font-mono text-[11px] text-content">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.featured && (
            <span className="absolute top-3 right-3 rounded-full border border-accent/50 bg-accent/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-accent uppercase backdrop-blur-sm">
              featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {CATEGORIES[project.category].label} · {project.year}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-content transition-colors duration-fast group-hover:text-accent">
              {project.title}
            </h3>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge>+{project.technologies.length - 4}</Badge>
            )}
          </div>

          {/* Progreso */}
          <div className="mt-5">
            <div className="flex items-center justify-between font-mono text-[10px] text-muted">
              <span>completado</span>
              <span className="text-accent">{progress}%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
            View project
            <ArrowRight className="size-3.5 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
