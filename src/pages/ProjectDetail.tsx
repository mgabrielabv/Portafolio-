import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, FolderSearch, Github, Images, Code2, Info, Play, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Carousel } from "@/components/ui/Carousel";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageSpinner } from "@/components/ui/Spinner";
import { Tabs } from "@/components/ui/Tabs";
import { TechStack } from "@/components/ui/TechTile";
import { CATEGORIES } from "@/data/projects";
import { getProject } from "@/services/projects";
import { toEmbedUrl } from "@/utils/file";
import type { Project } from "@/types";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [tab, setTab] = useState("desc");

  useEffect(() => {
    let active = true;
    setProject(undefined);
    setTab("desc");
    if (id) {
      getProject(id).then((p) => active && setProject(p));
    } else {
      setProject(null);
    }
    return () => {
      active = false;
    };
  }, [id]);

  if (project === undefined) return <PageSpinner label="Cargando proyecto…" />;

  if (project === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <EmptyState
          icon={FolderSearch}
          title="Proyecto no encontrado"
          description="El proyecto que buscas no existe o fue eliminado."
          action={
            <Link
              to="/proyectos"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Volver a proyectos
            </Link>
          }
        />
      </div>
    );
  }

  const videoUrl = project.video ? toEmbedUrl(project.video) : null;

  const tabs = [
    { value: "desc", label: "Descripción", icon: <Info className="size-3.5" aria-hidden /> },
    { value: "galeria", label: "Galería", icon: <Images className="size-3.5" aria-hidden /> },
    ...(videoUrl
      ? [{ value: "video", label: "Video", icon: <Play className="size-3.5" aria-hidden /> }]
      : []),
    ...(project.code
      ? [{ value: "codigo", label: "Código", icon: <Code2 className="size-3.5" aria-hidden /> }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver a proyectos
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge primary dot>{CATEGORIES[project.category].label}</Badge>
              <Badge>
                <CalendarDays className="size-3" aria-hidden />
                {project.year}
              </Badge>
            </div>
            <h1 className="mt-4 text-4xl text-content sm:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white transition-all hover:bg-primary/90"
              >
                <ExternalLink className="size-4" aria-hidden />
                Demo en vivo
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium text-content transition-all hover:border-primary/40 hover:text-primary"
              >
                <Github className="size-4" aria-hidden />
                Repositorio
              </a>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]"
      >
        <div>
          <Carousel
            ariaLabel={`Galería de ${project.title}`}
            className="rounded-2xl border border-line bg-surface shadow-card"
            slideClassName="aspect-[16/10]"
            slides={project.images.map((img) => (
              <img
                key={img}
                src={img}
                alt={`Captura ${project.images.indexOf(img) + 1} de ${project.title}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ))}
          />

          <div className="mt-8">
            <Tabs tabs={tabs} value={tab} onChange={setTab} ariaLabel="Secciones del proyecto" />
            <div
              role="tabpanel"
              className="mt-6 rounded-2xl border border-line bg-surface p-6 sm:p-8"
            >
              {tab === "desc" && (
                <div className="space-y-4">
                  <p className="text-[15px] leading-7 whitespace-pre-line text-muted">
                    {project.longDescription}
                  </p>
                  <div className="pt-4">
                    <h2 className="font-display text-sm font-semibold text-content">Stack completo</h2>
                    <div className="mt-4">
                      <TechStack technologies={project.technologies} />
                    </div>
                  </div>
                </div>
              )}

              {tab === "galeria" && (
                <Carousel
                  ariaLabel={`Imágenes de ${project.title}`}
                  className="rounded-xl"
                  slideClassName="aspect-[16/10]"
                  showDots={false}
                  slides={project.images.map((img, i) => (
                    <img
                      key={img}
                      src={img}
                      alt={`Vista ampliada ${i + 1} de ${project.title}`}
                      className="h-full w-full object-cover"
                    />
                  ))}
                />
              )}

              {tab === "video" && videoUrl && (
                <div className="aspect-video overflow-hidden rounded-xl">
                  <iframe
                    src={videoUrl}
                    title={`Video de ${project.title}`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}

              {tab === "codigo" && project.code && (
                <CodeBlock code={project.code} language="typescript" fileName={`${project.id}.tsx`} />
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h2 className="font-display text-sm font-semibold text-content">Ficha del proyecto</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Categoría</dt>
                <dd className="font-medium text-content">{CATEGORIES[project.category].label}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Año</dt>
                <dd className="font-medium text-content">{project.year}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Tipo</dt>
                <dd className="font-medium text-content capitalize">{project.category}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <h2 className="font-display text-sm font-semibold text-content">Tecnologías</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          {(project.demo || project.repo) && (
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <h2 className="font-display text-sm font-semibold text-content">Enlaces</h2>
              <div className="mt-4 flex flex-col gap-2.5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-content transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <ExternalLink className="size-4" aria-hidden />
                    Demo en vivo
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-content transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Github className="size-4" aria-hidden />
                    Código fuente
                  </a>
                )}
              </div>
            </div>
          )}
        </aside>
      </motion.div>
    </div>
  );
}
