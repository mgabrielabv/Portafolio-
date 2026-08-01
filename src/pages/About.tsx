import { Award, Download, GraduationCap, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS, SKILL_LEVELS, SOFT_SKILLS, TIMELINE } from "@/data/about";
import { CATEGORIES } from "@/data/projects";
import { useChartColors } from "@/hooks/useChartColors";
import { listProjects } from "@/services/projects";
import type { Project } from "@/types";

const CHART_FILLS = ["#6d5df6", "#a3e635", "#0ea5e9", "#f59e0b", "#ec4899"];

export default function About() {
  const colors = useChartColors();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    listProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);

  const categoryData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [...counts.entries()].map(([cat, value]) => ({
      name: CATEGORIES[cat as keyof typeof CATEGORIES].label,
      value,
      fill: CHART_FILLS[[...counts.keys()].indexOf(cat) % CHART_FILLS.length],
    }));
  }, [projects]);

  const tooltipStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.line}`,
    borderRadius: 12,
    color: colors.content,
    fontSize: 13,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* ------- Header ------- */}
      <Reveal>
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">Sobre mí</p>
        <h1 className="text-4xl text-content sm:text-5xl">Diseño y código, un mismo oficio</h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start">
          <img
            src="/images/avatar.svg"
            alt="Retrato ilustrado de María Bermúdez"
            width={640}
            height={640}
            loading="lazy"
            className="h-40 w-40 shrink-0 rounded-3xl border border-line shadow-card object-cover"
          />
          <div className="max-w-2xl space-y-4 text-[15px] leading-7 text-muted">
            <p>
              Soy María, <strong className="font-semibold text-content">estudiante de Ingeniería en
              Computación</strong> en la Universidad Rafael Urdaneta, en Maracaibo (Venezuela).
              Me muevo igual de cómoda en Figma que en un editor de código: prototipo, valido con
              usuarios y construyo interfaces rápidas, accesibles y con atención al detalle.
            </p>
            <p>
              He desarrollado aplicaciones web para proyectos universitarios y clientes reales,
              desde dashboards de datos hasta pequeños sistemas de diseño. Creo en la simplicidad:
              cada decisión debe ser defendible y cada píxel debe tener una razón.
            </p>
            <p>
              Fuera de la carrera me encanta todo lo relacionado con UI, tipografía y bases de
              datos. Y sí, en este portafolio soy a la vez la diseñadora y la desarrolladora.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ------- Timeline ------- */}
      <section className="mt-20" aria-label="Experiencia profesional">
        <SectionHeading
          eyebrow="Trayectoria"
          title="Experiencia profesional"
          description="De freelance a liderar el frontend de productos usados por decenas de miles de personas."
        />
        <ol className="relative mt-10 space-y-8 border-l border-line pl-8">
          {TIMELINE.map((entry, i) => (
            <Reveal key={entry.period} delay={i * 0.06}>
              <li className="relative">
                <span
                  aria-hidden
                  className="absolute top-1 -left-[37px] grid size-5 place-items-center rounded-full border-4 border-bg bg-primary"
                />
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">{entry.period}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-content">{entry.role}</h3>
                <p className="text-sm font-medium text-muted">{entry.company}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{entry.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------- Charts ------- */}
      <section className="mt-20" aria-label="Habilidades">
        <SectionHeading
          eyebrow="Habilidades"
          title="Mis herramientas y capacidades"
          description="Nivel de dominio por tecnología, soft skills y distribución de proyectos por categoría."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-content">
                <TrendingUp className="size-4 text-primary" aria-hidden />
                Dominio por tecnología
              </h3>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SKILL_LEVELS} margin={{ top: 0, right: 0, bottom: 0, left: -22 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke={colors.grid} vertical={false} />
                    <XAxis dataKey="tech" tick={{ fill: colors.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: colors.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: colors.grid + "33" }} contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, "Nivel"]} />
                    <Bar dataKey="level" radius={[8, 8, 0, 0]} fill={colors.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-content">
                <Award className="size-4 text-primary" aria-hidden />
                Soft skills
              </h3>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={SOFT_SKILLS} outerRadius="72%">
                    <PolarGrid stroke={colors.grid} />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: colors.muted, fontSize: 12 }} />
                    <Radar dataKey="value" stroke={colors.accent} fill={colors.accent} fillOpacity={0.35} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}/100`, "Nivel"]} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-2">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-content">
                <GraduationCap className="size-4 text-primary" aria-hidden />
                Distribución de proyectos por categoría
              </h3>
              <div className="mt-6 flex h-64 flex-col items-center gap-6 sm:flex-row sm:justify-center">
                <div className="h-64 w-full max-w-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius="58%"
                        outerRadius="82%"
                        paddingAngle={3}
                        stroke="none"
                      >
                        {categoryData.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <Legend
                  content={({ payload }) => (
                    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                      {(payload ?? []).map((item) => (
                        <li key={item.value} className="flex items-center gap-2 text-sm text-muted">
                          <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden />
                          {item.value}
                        </li>
                      ))}
                    </ul>
                  )}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------- FAQ ------- */}
      <section className="mt-20" aria-label="Preguntas frecuentes">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title="Cómo trabajo"
          description="Respuestas a lo que suelen preguntarme antes de empezar un proyecto."
        />
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <Accordion
            items={FAQS.map((f) => ({ title: f.title, content: f.content }))}
            defaultOpenIndex={0}
          />
        </Reveal>
      </section>

      {/* ------- CV ------- */}
      <Reveal delay={0.1} className="mt-20">
        <div
          id="descargar-cv"
          className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-surface px-8 py-10 text-center shadow-card sm:flex-row sm:text-left"
        >
          <div>
            <h2 className="font-display text-2xl font-semibold text-content">¿Quieres el resumen en una página?</h2>
            <p className="mt-2 text-sm text-muted">Descarga mi currículum en PDF, listo para compartir.</p>
          </div>
          <a
            href="/cv.pdf"
            download="Maria-Bermudez-CV.pdf"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <Download className="size-4" aria-hidden />
            Descargar CV (PDF)
          </a>
        </div>
      </Reveal>
    </div>
  );
}
