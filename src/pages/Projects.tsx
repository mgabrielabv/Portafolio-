import { FolderOpen, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCardSkeleton } from "@/components/ui/Skeleton";
import { Tabs } from "@/components/ui/Tabs";
import { useToast } from "@/context/ToastContext";
import { CATEGORY_ORDER } from "@/data/projects";
import { useI18n, interpolate } from "@/i18n";
import { listProjects } from "@/services/projects";
import { useEffect } from "react";
import type { Category, Project } from "@/types";

const ALL = "all";

export default function Projects() {
  const toast = useToast();
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    let active = true;
    listProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);

  const handleSaved = () => {
    setFormOpen(false);
    listProjects().then(setProjects);
    toast.success(t("projects.toast.created"));
  };

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
    { value: ALL, label: t("projects.tab.all") },
    ...CATEGORY_ORDER.map((c: Category) => ({ value: c, label: t(`cat.${c}`) })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading as="h1" title={t("projects.title")} />

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          tabs={tabs}
          value={category}
          onChange={setCategory}
          ariaLabel={t("projects.aria.filter")}
        />
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:max-w-64">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("projects.search")}
              aria-label={t("projects.aria.search")}
              className="glass h-11 w-full rounded-full pl-10 pr-4 text-sm text-content placeholder:text-muted/60 focus:border-accent/60 focus:ring-2 focus:ring-accent/25 focus:outline-none"
            />
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="size-4" aria-hidden />
            {t("projects.new")}
          </Button>
        </div>
      </div>

      <div className="mt-10">
        {!projects ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i * 0.05, 0.3)}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>        ) : (
          <EmptyState
            icon={FolderOpen}
            title={query ? t("projects.empty.search.title") : t("projects.empty.cat.title")}
            description={
              query
                ? interpolate(t("projects.empty.search.desc"), { query })
                : t("projects.empty.cat.desc")
            }
          />
        )}
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={t("projects.modal.title")}
        description={t("projects.modal.desc")}
        className="sm:max-w-2xl"
      >
        <ProjectForm project={null} onDone={handleSaved} onCancel={() => setFormOpen(false)} />
      </Modal>
    </div>
  );
}
