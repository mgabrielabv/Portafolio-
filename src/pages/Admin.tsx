import { FolderPlus, LayoutGrid, Pencil, Plus, RotateCcw, Star, Trash2, Cpu, TrendingUp } from "lucide-react";
import { useOptimistic, useRef, useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCardSkeleton } from "@/components/ui/Skeleton";
import { Sparkline } from "@/components/ui/Sparkline";
import { StatsCharts } from "@/components/stats/StatsCharts";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { CATEGORIES } from "@/data/projects";
import { deleteProject, listProjects, resetProjects } from "@/services/projects";
import { useEffect, useMemo } from "react";
import type { Project } from "@/types";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 19) return "Good afternoon";
  return "Good evening";
}

export default function Admin() {
  const { user } = useAuth();
  const toast = useToast();
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
    toast.success(action === "created" ? "Proyecto creado correctamente" : "Proyecto actualizado");
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
      toast.success("Proyecto eliminado");
    });
  };

  const handleReset = async () => {
    const restored = await resetProjects();
    setProjects(restored);
    toast.info("Datos de ejemplo restaurados");
  };

  const total = projects?.length ?? 0;
  const featuredCount = projects?.filter((p) => p.featured).length ?? 0;
  const categoryCount = projects ? new Set(projects.map((p) => p.category)).size : 0;
  const techCount = projects ? new Set(projects.flatMap((p) => p.technologies)).size : 0;

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
    { label: "Projects", value: total, icon: LayoutGrid, series: sparkProjects },
    { label: "Categories", value: categoryCount, icon: FolderPlus, series: sparkProjects.slice(-2) },
    { label: "Featured", value: featuredCount, icon: Star, series: sparkFeatured },
    { label: "Technologies", value: techCount, icon: Cpu, series: sparkProjects.slice().reverse() },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6">
      {/* ===== Header ===== */}
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              portfolio analytics
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-content sm:text-5xl">
              {greeting()}, {user?.name.split(" ")[0]}
              <span className="text-gradient">.</span>
            </h1>
            <p className="mt-2 font-mono text-sm text-muted">
              Tue dashboard · <span className="text-accent">{total}</span> proyectos en línea
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleReset}>
              <RotateCcw className="size-4" aria-hidden />
              Restaurar demo
            </Button>
            <Button onClick={openCreate}>
              <Plus className="size-4" aria-hidden />
              Nuevo proyecto
            </Button>
          </div>
        </div>
      </Reveal>

      {/* ===== Stats cards con sparklines ===== */}
      <Reveal delay={0.08}>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, series }, i) => {
            const d = delta(series);
            return (
              <div
                key={label}
                className="glass relative overflow-hidden rounded-2xl p-5 transition-transform duration-base hover:-translate-y-1"
              >
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 size-24 rounded-full blur-2xl"
                  style={{ background: i % 2 === 0 ? "rgb(139 92 246 / 0.22)" : "rgb(34 211 238 / 0.16)" }}
                />
                <div className="flex items-center justify-between">
                  <span className="glass grid size-9 place-items-center rounded-xl text-accent">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <span className={`inline-flex items-center gap-1 font-mono text-[11px] ${d.up ? "text-emerald-400" : "text-red-400"}`}>
                    <TrendingUp className={`size-3 ${d.up ? "" : "rotate-180"}`} aria-hidden />
                    {d.pct}%
                  </span>
                </div>
                <p className="mt-4 font-display text-3xl font-bold text-content">{value}</p>
                <p className="mt-0.5 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {label}
                </p>
                <div className="mt-3 h-10">
                  <Sparkline data={series} className="h-full" />
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* ===== Performance charts ===== */}
      {projects && projects.length > 0 && (
        <Reveal delay={0.06}>
          <div className="mt-12 border-t border-line/60 pt-10">
            <h2 className="font-display text-2xl font-semibold text-content">
              Performance
              <span className="text-gradient">.</span>
            </h2>
            <p className="mt-1 text-sm text-muted">
              Distribución de tecnologías, categorías y evolución por año.
            </p>
            <StatsCharts projects={projects} className="mt-6" />
          </div>
        </Reveal>
      )}

      {/* ===== Lista de proyectos ===== */}
      <div ref={scrollRef} className="mt-12">
        {!projects ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : optimisticProjects.length > 0 ? (
          <div className="space-y-4">
            {optimisticProjects.map((project) => (
              <div
                key={project.id}
                className="glass flex flex-col gap-4 rounded-2xl p-4 transition-opacity sm:flex-row sm:items-center"
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
                    <h3 className="font-display font-semibold text-content">{project.title}</h3>
                    <Badge primary>{CATEGORIES[project.category].label}</Badge>
                    {project.featured && (
                      <Badge className="border-accent/30 bg-accent/10 text-accent">
                        <Star className="size-3 fill-current" aria-hidden />
                        Destacado
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted">{project.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/proyectos/${project.id}`}
                    className="inline-flex h-9 items-center rounded-full border border-line px-4 font-mono text-xs tracking-[0.1em] text-muted uppercase transition-colors duration-fast hover:border-accent/60 hover:text-accent"
                  >
                    Ver
                  </Link>
                  <Button variant="secondary" size="sm" onClick={() => openEdit(project)}>
                    <Pencil className="size-3.5" aria-hidden />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10" onClick={() => setPendingDelete(project)}>
                    <Trash2 className="size-3.5" aria-hidden />
                    <span className="sr-only sm:not-sr-only">Eliminar</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={LayoutGrid}
            title="Aún no tienes proyectos"
            description="Crea tu primer proyecto para que aparezca en la portada y en la sección de proyectos."
            action={
              <Button onClick={openCreate}>
                <Plus className="size-4" aria-hidden />
                Crear proyecto
              </Button>
            }
          />
        )}
      </div>

      {/* Modal crear/editar */}
      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Editar proyecto" : "Nuevo proyecto"}
        description={editing ? `Editando “${editing.title}”.` : "Completa los datos del proyecto."}
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
        title="Eliminar proyecto"
        message={`¿Seguro que quieres eliminar “${pendingDelete?.title}”? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}
