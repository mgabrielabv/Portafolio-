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
import { useI18n, interpolate } from "@/i18n";
import { getProject } from "@/services/projects";
import { toEmbedUrl } from "@/utils/file";
import type { Project } from "@/types";

export default function ProjectDetail() {
  const { t } = useI18n();
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

  if (project === undefined) return <PageSpinner label={t("common.loading.project")} />;

  if (project === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <EmptyState
          icon={FolderSearch}
          title={t("detail.notfound.title")}
          description={t("detail.notfound.desc")}
          action={
            <Link
              to="/proyectos"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-6 font-mono text-xs tracking-[0.12em] text-inverse uppercase shadow-[0_0_30px_-8px_rgb(201_139_155/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {t("detail.back")}
            </Link>
          }
        />
      </div>
    );
  }

  const videoUrl = project.video ? toEmbedUrl(project.video) : null;

  const tabs = [
    { value: "desc", label: t("detail.tab.desc"), icon: <Info className="size-3.5" aria-hidden /> },
    { value: "galeria", label: t("detail.tab.galeria"), icon: <Images className="size-3.5" aria-hidden /> },
    ...(videoUrl
      ? [{ value: "video", label: t("detail.tab.video"), icon: <Play className="size-3.5" aria-hidden /> }]
      : []),
    ...(project.code
      ? [{ value: "codigo", label: t("detail.tab.codigo"), icon: <Code2 className="size-3.5" aria-hidden /> }]
      : []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-fast hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t("detail.back")}
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge primary dot>{t(`cat.${project.category}`)}</Badge>
              <Badge>
                <CalendarDays className="size-3" aria-hidden />
                {project.year}
              </Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl tracking-[-0.01em] text-content sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-6 font-mono text-xs tracking-[0.12em] text-inverse uppercase shadow-[0_0_30px_-8px_rgb(201_139_155/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
              >
                <ExternalLink className="size-4" aria-hidden />
                {t("detail.demo")}
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface/60 px-6 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,border-color] duration-fast hover:border-accent/60 hover:text-accent active:scale-[0.97]"
              >
                <Github className="size-4" aria-hidden />
                {t("detail.repo")}
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
            ariaLabel={interpolate(t("detail.alt.galeria"), { title: project.title })}
            className="glass rounded-2xl p-2"
            slideClassName="aspect-[16/10] overflow-hidden rounded-xl"
            slides={project.images.map((img) => (
              <img
                key={img}
                src={img}
                alt={interpolate(t("detail.alt.captura"), { title: project.title, n: project.images.indexOf(img) + 1 })}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ))}
          />

          <div className="mt-8">
            <Tabs tabs={tabs} value={tab} onChange={setTab} ariaLabel={t("detail.tabsAria")} />
            <div
              role="tabpanel"
              className="glass mt-6 rounded-2xl p-6 sm:p-8"
            >
              {tab === "desc" && (
                <div className="space-y-4">
                  <p className="text-[15px] leading-7 whitespace-pre-line text-muted">
                    {project.longDescription}
                  </p>
                  <div className="pt-4">
                    <h2 className="font-display text-sm font-semibold text-content">{t("detail.stack")}</h2>
                    <div className="mt-4">
                      <TechStack technologies={project.technologies} />
                    </div>
                  </div>
                </div>
              )}

              {tab === "galeria" && (
                <Carousel
                  ariaLabel={interpolate(t("detail.alt.galeria"), { title: project.title })}
                  className="rounded-xl p-2"
                  slideClassName="aspect-[16/10]"
                  showDots={false}
                  slides={project.images.map((img, i) => (
                    <img
                      key={img}
                      src={img}
                      alt={interpolate(t("detail.alt.ampliada"), { title: project.title, n: i + 1 })}
                      className="h-full w-full object-cover"
                    />
                  ))}
                />
              )}

              {tab === "video" && videoUrl && (
                <div className="aspect-video overflow-hidden rounded-xl">
                  <iframe
                    src={videoUrl}
                    title={interpolate(t("detail.alt.video"), { title: project.title })}
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
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-sm font-medium text-content">{t("detail.ficha")}</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("detail.categoria")}</dt>
                <dd className="font-medium text-content">{t(`cat.${project.category}`)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("detail.anio")}</dt>
                <dd className="font-medium text-content">{project.year}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("detail.tipo")}</dt>
                <dd className="font-medium text-content capitalize">{t(`cat.${project.category}`)}</dd>
              </div>
            </dl>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-sm font-medium text-content">{t("detail.tecnologias")}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          {(project.demo || project.repo) && (
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-sm font-medium text-content">{t("detail.enlaces")}</h2>
              <div className="mt-4 flex flex-col gap-2.5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-line px-4 font-mono text-xs tracking-[0.1em] text-content uppercase transition-colors duration-fast hover:border-accent/60 hover:text-accent"
                  >
                    <ExternalLink className="size-4" aria-hidden />
                    {t("detail.live")}
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-line px-4 font-mono text-xs tracking-[0.1em] text-content uppercase transition-colors duration-fast hover:border-accent/60 hover:text-accent"
                  >
                    <Github className="size-4" aria-hidden />
                    {t("detail.source")}
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
