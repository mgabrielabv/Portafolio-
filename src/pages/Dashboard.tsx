import { Eye, FolderPlus, LayoutGrid, Pencil, Plus, RotateCcw, Star, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useOptimistic, useRef, useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { HoloCard } from "@/components/hud/HoloCard";
import { SlotCounter } from "@/components/hud/SlotCounter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCardSkeleton } from "@/components/ui/Skeleton";
import { StatsCharts } from "@/components/stats/StatsCharts";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { CATEGORIES } from "@/data/projects";
import { useI18n, interpolate } from "@/i18n";
import { deleteProject, listProjects, resetProjects } from "@/services/projects";
import type { Project } from "@/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Referencia por métrica para que la barra de carga represente un % real
   (no se compara con Visitas, que desbalanceaba las demás barras). */
const BAR_REF: Record<string, number> = {
  projects: 10,
  techs: 30,
  visits: 600,
  featured: 10,
};

function greetingKey(): string {
  const h = new Date().getHours();
  if (h < 12) return "dashboard.greeting.morning";
  if (h < 19) return "dashboard.greeting.afternoon";
  return "dashboard.greeting.night";
}

export default function Dashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticProjects, deleteOptimistic] = useOptimistic(projects ?? [], (state, id: string) =>
    state.filter((p) => p.id !== id),
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listProjects().then(setProjects);
  }, []);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setFormOpen(true);
  };

  const handleSaved = (project: Project, action: "created" | "updated") => {
    setFormOpen(false);
    setProjects((prev) => {
      if (!prev) return prev;
      return action === "created" ? [project, ...prev] : prev.map((p) => (p.id === project.id ? project : p));
    });
    toast.success(action === "created" ? t("dashboard.toast.created") : t("dashboard.toast.updated"));
  };

  const confirmDelete = () => {
    const target = pendingDelete;
    if (!target) return;
    setDeleting(true);
    startTransition(async () => {
      deleteOptimistic(target.id);
      await deleteProject(target.id);
      setDeleting(false);
      setPendingDelete(null);
      setProjects((prev) => (prev ? prev.filter((p) => p.id !== target.id) : prev));
      toast.success(t("dashboard.toast.deleted"));
    });
  };

  const handleReset = async () => {
    const restored = await resetProjects();
    setProjects(restored);
    toast.info(t("dashboard.toast.restored"));
  };

  const total = projects?.length ?? 0;
  const featuredCount = projects?.filter((p) => p.featured).length ?? 0;
  const techCount = projects ? new Set(projects.flatMap((p) => p.technologies)).size : 0;
  const visits = total * 88 + 14;

  // Series sintéticas para los sparklines del dashboard
  const sparkProjects = useMemo(() => {
    if (!projects) return [0];
    const byYear = new Map<number, number>();
    for (const p of projects) byYear.set(p.year, (byYear.get(p.year) ?? 0) + 1);
    return [...byYear.keys()].sort().map((y) => byYear.get(y) ?? 0);
  }, [projects]);

  const sparkFeatured = useMemo(() => {
    if (!projects) return [0];
    const byYear = new Map<number, number>();
    for (const p of projects.filter((p) => p.featured))
      byYear.set(p.year, (byYear.get(p.year) ?? 0) + 1);
    return [...byYear.keys()].sort().map((y) => byYear.get(y) ?? 0);
  }, [projects]);

  const delta = (series: number[]) => {
    if (series.length < 2) return { pct: 12, up: true };
    const a = series[series.length - 2];
    const b = series[series.length - 1];
    const pct = Math.round(((b - a) / (a || 1)) * 100);
    return { pct: Math.abs(pct) || 8, up: pct >= 0 };
  };

  const stats = [
    { key: "projects", labelKey: "dashboard.stat.projects", value: total, icon: LayoutGrid, series: sparkProjects },
    { key: "techs", labelKey: "dashboard.stat.techs", value: techCount, icon: FolderPlus, series: sparkProjects.slice().reverse() },
    { key: "visits", labelKey: "dashboard.stat.visits", value: visits, icon: Eye, series: sparkProjects.slice(-2) },
    { key: "featured", labelKey: "dashboard.stat.featured", value: featuredCount, icon: Star, series: sparkFeatured },
  ];

  return (
    <div className="relative">
      {/* Fondo animado: aurora rosa/burgundy + grano sutil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-aurora absolute top-[-12%] left-[-6%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(143_98_108/0.14),transparent_60%)] blur-3xl" />
        <div
          className="animate-aurora absolute top-[14%] right-[-12%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(201_139_155/0.11),transparent_60%)] blur-3xl"
          style={{ animationDelay: "-7s", animationDuration: "28s" }}
        />
        <div
          className="animate-aurora absolute bottom-[-16%] left-[22%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgb(178_122_135/0.09),transparent_60%)] blur-3xl"
          style={{ animationDelay: "-14s", animationDuration: "32s" }}
        />
        <div className="bg-grain animate-grain absolute inset-0" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6">
      {/* ===== Header ===== */}
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              {t("dashboard.eyebrow")}
            </p>
            <h1 className="mt-3 font-display text-4xl text-content sm:text-5xl">
              {t(greetingKey())}, <span className="text-gradient">{user?.name.split(" ")[0]}</span>.
            </h1>
            <p className="mt-2 font-mono text-sm text-muted">
              <span className="text-accent">{total}</span> {t("dashboard.online")} ·{" "}
              <span className="text-accent">{visits}</span> {t("dashboard.visits")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleReset}>
              <RotateCcw className="size-4" aria-hidden />
              {t("dashboard.restore")}
            </Button>
          </div>
        </div>
      </Reveal>

      {/* ===== Stats cards ===== */}
      <div className="relative isolate">
        <div
          aria-hidden
          className="animate-pulse pointer-events-none absolute -top-14 left-1/2 -z-10 h-72 w-[82%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_139_155/0.16),transparent_72%)] blur-2xl"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ key, labelKey, value, icon: Icon, series }, i) => {
            const d = delta(series);
            const pct = Math.max(14, Math.min(100, Math.round((value / (BAR_REF[key] ?? 100)) * 100)));
            return (
              <HoloCard
                key={key}
                delay={0.05 + i * 0.07}
                elevate
                className="group p-10 transition-[box-shadow,border-color] duration-300 ease-out hover:border-accent/35 hover:shadow-[0_22px_60px_-22px_rgb(201_139_155/0.6)]"
              >
                <div className="relative flex h-full flex-col items-center text-center">
                  {/* Halo radial detrás del ícono */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-8 -left-8 size-40 rounded-full bg-[radial-gradient(circle_at_center,rgb(201_139_155/0.2),transparent_62%)] blur-xl"
                  />
                  {/* Blob tenue arriba a la derecha */}
                  <div
                    aria-hidden
                    className="absolute -top-10 -right-10 size-24 rounded-full blur-2xl"
                    style={{ background: i % 2 === 0 ? "rgb(201 139 155 / 0.16)" : "rgb(143 98 108 / 0.14)" }}
                  />
                  {/* Ícono centrado con halo */}
                  <span className="relative mt-2">
                    <span
                      aria-hidden
                      className="absolute -inset-2.5 rounded-2xl bg-accent/25 blur-xl transition-[background-color] duration-300 group-hover:bg-accent/40"
                    />
                    <span className="relative grid size-14 place-items-center rounded-2xl border border-accent/40 bg-accent/15 text-accent shadow-[0_0_20px_-6px_rgb(201_139_155/0.8)] transition-[box-shadow] duration-300 group-hover:shadow-[0_0_26px_-6px_rgb(201_139_155/1)]">
                      <Icon className="size-6" aria-hidden />
                    </span>
                  </span>
                  {/* Badge de tendencia con "pop" */}
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.07, duration: 0.28, ease: EASE }}
                    className={`mt-4 inline-flex h-5 shrink-0 items-center justify-center gap-1 rounded-md border px-1.5 font-mono text-[10px] leading-none tabular-nums ${
                      d.up
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                        : "border-red-400/30 bg-red-400/10 text-red-400"
                    }`}
                  >
                    <TrendingIndicator up={d.up} />
                    <span>{d.pct}%</span>
                  </motion.span>
                  <p className="mt-4 font-display text-4xl leading-none font-bold tracking-tight text-content">
                    <SlotCounter to={value} />
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-[0.16em] text-muted/70 uppercase">
                    {t(labelKey)}
                  </p>
                  {/* Barra de carga anclada a la base, con cabeza de láser */}
                  <div className="mt-auto w-full pt-5">
                    <div className="h-2 rounded-full bg-line/60">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1.1, ease: EASE, delay: 0.45 + i * 0.08 }}
                        className="relative h-full origin-left rounded-full bg-gradient-to-r from-accent/20 via-accent/60 to-accent"
                        style={{ width: `${pct}%` }}
                      >
                        <span
                          aria-hidden
                          className="pulse-opacity absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent-faint shadow-[0_0_10px_2px_rgb(201_139_155/0.8)]"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </HoloCard>
            );
          })}
        </div>
      </div>

      {/* ===== Charts ===== */}
      {projects && projects.length > 0 && (
        <div className="mt-12 border-t border-line/60 pt-10">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl text-content">
                {t("dashboard.charts.title")}<span className="text-gradient">.</span>
              </h2>
              <p className="mt-1 text-sm text-muted">{t("dashboard.charts.desc")}</p>
            </div>
          </Reveal>
          <StatsCharts projects={projects} className="mt-6" />
        </div>
      )}

      {/* ===== CRUD: lista de proyectos ===== */}
      <div ref={scrollRef} className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl text-content">{t("dashboard.stat.projects")}</h2>
        </div>
        {!projects ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : optimisticProjects.length > 0 ? (
          <div className="mt-6 space-y-4">
            {optimisticProjects.map((project) => (
              <div
                key={project.id}
                className="glass flex flex-col gap-4 rounded-2xl p-6 transition-opacity sm:flex-row sm:items-center"
                style={{ opacity: isPending ? 0.6 : 1 }}
              >
                <img
                  src={project.thumbnail}
                  alt=""
                  loading="lazy"
                  className="h-20 w-32 shrink-0 rounded-xl border border-line object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-sans font-semibold text-content">{project.title}</h3>
                    <Badge primary>{CATEGORIES[project.category].label}</Badge>
                    {project.featured && (
                      <Badge className="border-accent/30 bg-accent/10 text-accent">
                        <Star className="size-3 fill-current" aria-hidden />
                        {t("dashboard.item.featured")}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted">{project.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/proyectos/${project.id}`}
                    className="inline-flex h-9 items-center rounded-full border border-line/70 px-4 font-sans text-xs font-medium text-muted uppercase transition-colors duration-fast hover:border-accent/60 hover:text-accent"
                  >
                    {t("dashboard.item.view")}
                  </Link>
                  <Button variant="secondary" size="sm" onClick={() => openEdit(project)}>
                    <Pencil className="size-3.5" aria-hidden />
                    {t("dashboard.item.edit")}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10" onClick={() => setPendingDelete(project)}>
                    <Trash2 className="size-3.5" aria-hidden />
                    <span className="sr-only sm:not-sr-only">{t("dashboard.item.delete")}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={LayoutGrid}
            title={t("dashboard.empty.title")}
            description={t("dashboard.empty.desc")}
            action={
              <Button onClick={openCreate}>
                <Plus className="size-4" aria-hidden />
                {t("dashboard.empty.action")}
              </Button>
            }
          />
        )}
      </div>

      {/* Modal crear/editar */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? t("dashboard.modal.edit") : t("dashboard.modal.new")}
        description={editing ? interpolate(t("dashboard.modal.editDesc"), { title: editing.title }) : t("dashboard.modal.newDesc")}
        className="sm:max-w-2xl"
      >
        <ProjectForm
          key={editing?.id ?? "new"}
          project={editing}
          onDone={handleSaved}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      {/* Confirmar borrado */}
      <ConfirmDialog
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title={t("dashboard.confirm.title")}
        message={interpolate(t("dashboard.confirm.message"), { title: pendingDelete?.title ?? "" })}
      />
      </div>
    </div>
  );
}

function TrendingIndicator({ up }: { up: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`size-3.5 shrink-0 leading-none ${up ? "" : "rotate-180"}`}
      aria-hidden
    >
      <path d="M3 17 9 11l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
