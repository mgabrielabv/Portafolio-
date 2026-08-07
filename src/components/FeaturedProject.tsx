import { ArrowUpRight, Code2, Github, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { CATEGORIES } from "@/data/projects";
import type { Project } from "@/types";

/**
 * Proyecto destacado: sección casi a pantalla completa con imagen
 * gigante, tecnologías y acciones Código / Demo.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h2 className="mt-4 font-display text-4xl leading-[1.02] font-bold tracking-tight text-content sm:text-6xl">
          {project.title}
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
          {project.longDescription.split("\n\n")[0]}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <Badge key={t} primary>
              {t}
            </Badge>
          ))}
          <Badge>
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {CATEGORIES[project.category].label} · {project.year}
          </Badge>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.code && (
            <Link
              to={`/proyectos/${project.id}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 font-mono text-xs tracking-[0.12em] text-[#07070c] uppercase shadow-[0_0_32px_-6px_rgb(139_92_246/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
            >
              <Code2 className="size-4" aria-hidden />
              Código
            </Link>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-7 font-mono text-xs tracking-[0.12em] text-accent uppercase transition-[transform,background-color] duration-fast hover:bg-accent/20 active:scale-[0.97]"
            >
              <Play className="size-4" aria-hidden />
              Demo
            </a>
          ) : (
            <Link
              to={`/proyectos/${project.id}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-7 font-mono text-xs tracking-[0.12em] text-accent uppercase transition-[transform,background-color] duration-fast hover:bg-accent/20 active:scale-[0.97]"
            >
              Ver proyecto
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex h-12 items-center gap-2 rounded-full px-7 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,background-color,border-color] duration-fast hover:border-accent/50 hover:text-accent active:scale-[0.97]"
            >
              <Github className="size-4" aria-hidden />
              Repo
            </a>
          )}
        </div>
      </div>

      <TiltCard intensity={4}>
        <Link
          to={`/proyectos/${project.id}`}
          aria-label={`Ver detalle de ${project.title}`}
          className="glass group relative block overflow-hidden rounded-[2rem]"
        >
          <img
            src={project.thumbnail}
            alt={`Vista previa de ${project.title}`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/11] w-full object-cover transition-transform duration-base group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/25 to-transparent" />
          <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                {CATEGORIES[project.category].label}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-content">
                {project.title}
              </p>
            </div>
            <span className="glass grid size-12 shrink-0 place-items-center rounded-full text-content transition-all duration-fast group-hover:rotate-45 group-hover:text-accent">
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
          </div>
        </Link>
      </TiltCard>
    </div>
  );
}
