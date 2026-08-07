import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS, SKILL_LEVELS, SOFT_SKILLS, TIMELINE } from "@/data/about";
import { CATEGORIES } from "@/data/projects";
import { listProjects } from "@/services/projects";
import type { Project } from "@/types";

function LevelBar({ value }: { value: number }) {
  return (
    <span aria-hidden className="relative block h-px w-full bg-line">
      <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${value}%` }} />
    </span>
  );
}

export default function About() {
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
    }));
  }, [projects]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      {/* ------- Header ------- */}
      <header>
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          {"// sobre mí"}
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-content">
          Diseño y código,<br />
          <span className="font-light text-muted italic">un mismo oficio.</span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
          <img
            src="/images/avatar.svg"
            alt="Retrato ilustrado de María Bermúdez"
            width={640}
            height={640}
            loading="lazy"
            className="h-44 w-44 shrink-0 rounded-lg border border-accent/60 object-cover shadow-card"
          />
          <div className="max-w-2xl space-y-4 text-[15px] leading-7 text-muted">
            <p>
              Soy María,{" "}
              <strong className="font-medium text-content">estudiante de Ingeniería en
              Computación</strong>{" "}
              en la Universidad Rafael Urdaneta, en Maracaibo (Venezuela). Me muevo igual de
              cómoda en Figma que en un editor de código: prototipo, valido con usuarios y
              construyo interfaces rápidas, accesibles y con atención al detalle.
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
      </header>

      {/* ------- Timeline ------- */}
      <section className="mt-24" aria-label="Experiencia profesional">
        <SectionHeading index="01" eyebrow="Trayectoria" title="Recorrido" />
        <ol className="relative mt-10 border-l border-line">
          {TIMELINE.map((entry, i) => (
            <Reveal key={entry.period} delay={Math.min(i * 0.05, 0.2)}>
              <li className="relative border-b border-line py-6 first:pt-0 last:border-b-0 last:pb-0">
                <span
                  aria-hidden
                  className="absolute top-8 -left-[37px] size-2 rounded-full bg-accent"
                />
                <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-medium text-content">
                  {entry.role}
                </h3>
                <p className="mt-0.5 font-mono text-xs text-muted">{entry.company}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------- Habilidades ------- */}
      <section className="mt-24" aria-label="Habilidades">
        <SectionHeading
          index="02"
          eyebrow="Habilidades"
          title="Herramientas y capacidades"
          description="El peso tipográfico hace el trabajo que antes hacía el color."
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              {"// tecnologías"}
            </h3>
            <ul className="mt-6 border-t border-line">
              {SKILL_LEVELS.map((s) => (
                <li
                  key={s.tech}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_3rem]"
                >
                  <span className="font-display text-base font-medium text-content">{s.tech}</span>
                  <span className="text-right font-mono text-xs text-muted">{s.level}</span>
                  <LevelBar value={s.level} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              {"// soft skills"}
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2">
              {SOFT_SKILLS.map((s) => (
                <li
                  key={s.skill}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <span className="text-sm text-content">{s.skill}</span>
                  <span className="font-mono text-xs text-muted">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {"// proyectos por categoría"}
          </h3>
          <ul className="mt-6 max-w-xl border-t border-line">
            {categoryData.length > 0 ? (
              categoryData.map((c, i) => (
                <li
                  key={c.name}
                  className="grid grid-cols-[2rem_minmax(0,1fr)_3rem] items-baseline gap-4 border-b border-line py-4"
                >
                  <span aria-hidden className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-content">{c.name}</span>
                  <span className="text-right font-mono text-xs text-muted">{c.value}</span>
                </li>
              ))
            ) : (
              <li className="border-b border-line py-4 font-mono text-xs text-muted">
                {"// sin proyectos todavía"}
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* ------- FAQ ------- */}
      <section className="mt-24" aria-label="Preguntas frecuentes">
        <SectionHeading index="03" eyebrow="Preguntas frecuentes" title="Cómo trabajo" />
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <Accordion
            items={FAQS.map((f) => ({ title: f.title, content: f.content }))}
            defaultOpenIndex={0}
          />
        </Reveal>
      </section>

      {/* ------- CV ------- */}
      <section id="descargar-cv" className="mt-24 border border-line bg-surface p-8 sm:p-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              {"// resumen en una página"}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium text-content sm:text-3xl">
              ¿Quieres mi CV?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Un PDF con el recorrido, las habilidades y el contacto, listo para compartir.
            </p>
          </div>
          <a
            href="/cv.pdf"
            download="Maria-Bermudez-CV.pdf"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-lg bg-inverse px-7 font-mono text-xs tracking-[0.12em] text-bg uppercase transition-[transform,opacity] duration-fast hover:opacity-85 active:scale-[0.98]"
          >
            <Download className="size-4" aria-hidden />
            Descargar CV
          </a>
        </div>
      </section>
    </div>
  );
}
