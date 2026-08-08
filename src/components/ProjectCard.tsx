import { ArrowUpRight, Github, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { useI18n, interpolate } from "@/i18n";
import type { Project } from "@/types";
import { toEmbedUrl } from "@/utils/file";
import { cn } from "@/utils/cn";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { t } = useI18n();
  const [hovered, setHovered] = useState(false);
  const videoUrl = project.video ? toEmbedUrl(project.video) : null;

  return (
    <TiltCard intensity={5} className="h-full">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-base hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_44px_-14px_rgb(201_139_155/0.5)]"
      >
        <Link
          to={`/proyectos/${project.id}`}
          aria-label={interpolate(t("card.detailAria"), { title: project.title })}
          className="relative block overflow-hidden"
        >
          <img
            src={project.thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn(
              "aspect-[16/10] w-full object-cover transition-transform duration-base",
              hovered && videoUrl ? "opacity-0" : "group-hover:scale-[1.05]",
            )}
          />

          {videoUrl && (
            <iframe
              src={`${videoUrl}?autoplay=1&mute=1&controls=0&playsinline=1`}
              title={interpolate(t("card.previewAria"), { title: project.title })}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className={cn(
                "absolute inset-0 aspect-[16/10] w-full transition-opacity duration-base",
                hovered ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/20 to-transparent" />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-accent-faint/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
          />

          <span className="absolute top-3 left-3 rounded-full border border-line/70 bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-content backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute top-3 right-3 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-accent uppercase backdrop-blur-sm">
            {t(`cat.${project.category}`)}
          </span>

          {videoUrl && (
            <span
              className={cn(
                "absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-gradient-to-r from-accent to-accent-soft text-inverse shadow-[0_0_24px_-6px_rgb(201_139_155/0.7)] transition-transform duration-base",
                hovered ? "scale-110" : "group-hover:scale-105",
              )}
            >
              <Play className="size-4.5 fill-current" aria-hidden />
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            {project.year}
          </p>
          <Link to={`/proyectos/${project.id}`}>
            <h3 className="mt-1 font-display text-2xl text-content transition-colors duration-fast hover:text-accent">
              {project.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {project.technologies.length > 4 && <Badge>+{project.technologies.length - 4}</Badge>}
          </div>

          <div className="mt-auto flex items-center gap-2.5 pt-6">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-line/70 font-sans text-xs font-medium text-muted uppercase transition-colors duration-fast hover:border-accent/50 hover:text-accent"
              >
                <Github className="size-4" aria-hidden />
                {t("card.code")}
              </a>
            )}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft font-sans text-xs font-medium text-inverse uppercase shadow-[0_0_20px_-6px_rgb(201_139_155/0.6)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
              >
                {t("card.demo")}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : (
              <Link
                to={`/proyectos/${project.id}`}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft font-sans text-xs font-medium text-inverse uppercase shadow-[0_0_20px_-6px_rgb(201_139_155/0.6)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
              >
                {t("card.seeMore")}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
