import { FolderOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCardSkeleton } from "@/components/ui/Skeleton";
import { Tabs } from "@/components/ui/Tabs";
import { CATEGORIES, CATEGORY_ORDER } from "@/data/projects";
import { listProjects } from "@/services/projects";
import { useEffect } from "react";
import type { Category, Project } from "@/types";

const ALL = "all";

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    listProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!projects) return [];
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = category === ALL || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  const tabs = [
    { value: ALL, label: "Todos" },
    ...CATEGORY_ORDER.map((c: Category) => ({ value: c, label: CATEGORIES[c].label })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Reveal>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">Portafolio</p>
        <h1 className="text-4xl text-content sm:text-5xl">Proyectos</h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          Una selección de aplicaciones web, móviles y de datos en las que he trabajado. Filtra por
          categoría o busca por tecnología.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          tabs={tabs}
          value={category}
          onChange={setCategory}
          ariaLabel="Filtrar proyectos por categoría"
        />
        <div className="relative w-full sm:max-w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por tecnología…"
            aria-label="Buscar proyectos"
            className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-content placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </div>
      </Reveal>

      <div className="mt-10">
        {!projects ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i * 0.05, 0.3)}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title={query ? "Sin resultados" : "No hay proyectos en esta categoría"}
            description={
              query
                ? `No encontramos proyectos que coincidan con “${query}”. Prueba con otra tecnología.`
                : "Aún no hay proyectos publicados en esta categoría."
            }
          />
        )}
      </div>
    </div>
  );
}
