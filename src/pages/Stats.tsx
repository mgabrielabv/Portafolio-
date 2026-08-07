import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { StatsCharts } from "@/components/stats/StatsCharts";
import { PageSpinner } from "@/components/ui/Spinner";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listProjects } from "@/services/projects";
import type { Project } from "@/types";

export default function Stats() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    let active = true;
    listProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        as="h1"
        index="01"
        eyebrow="Métricas"
        title="Estadísticas del portafolio"
        description="Los números detrás del trabajo: proyectos, tecnologías y evolución por año."
      />

      {!projects ? (
        <div className="mt-10">
          <PageSpinner label="Calculando métricas…" />
        </div>
      ) : projects.length === 0 ? (
        <div className="glass mt-10 rounded-2xl p-10 text-center">
          <p className="font-mono text-sm text-muted">{"Aún no hay proyectos para medir"}</p>
          <Link
            to="/proyectos"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-accent uppercase"
          >
            Explorar proyectos <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      ) : (
        <Reveal className="mt-10">
          <StatsCharts projects={projects} />
        </Reveal>
      )}
    </div>
  );
}
