import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listProjects } from "@/services/projects";
import type { Project } from "@/types";

const FOCUS = [
  {
    title: "Aplicaciones web",
    text: "SPAs y productos en React + TypeScript: componentes claros, estado controlado y detalle fino de interacción.",
  },
  {
    title: "Diseño de producto",
    text: "Del boceto en Figma al código: sistemas de diseño, jerarquía tipográfica y decisiones que se pueden defender.",
  },
  {
    title: "Datos y lógica",
    text: "CRUDs, consultas SQL y gestión de registros: de la base de datos al panel que la administra.",
  },
  {
    title: "Fundamentos de computación",
    text: "C++, estructuras de datos y algoritmos: la base que sostiene cada interfaz que construyo.",
  },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    listProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);

  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* ------- Hero ------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 lg:pt-20">
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {"// estudiante de ingeniería en computación — uru"}
          </p>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-content">
                María Bermúdez<span className="text-accent">.</span>
                <span className="mt-4 block text-[0.38em] leading-none font-light text-muted italic">
                  diseño y código, con intención.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
                Soy estudiante de Ingeniería en Computación en la Universidad Rafael Urdaneta
                (Maracaibo, Venezuela). Construyo aplicaciones web con React y diseño de producto
                que se sienten pensadas de principio a fin.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/proyectos"
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-inverse px-7 font-mono text-xs tracking-[0.12em] text-bg uppercase transition-[transform,opacity] duration-fast hover:opacity-85 active:scale-[0.98]"
                >
                  Ver proyectos
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/sobre-mi#descargar-cv"
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-line px-7 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,border-color] duration-fast hover:border-accent/60 hover:text-accent active:scale-[0.98]"
                >
                  Descargar CV
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 font-mono text-xs text-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  disponible para proyectos
                </span>
                <span>maracaibo, ve</span>
                <span>react · typescript · figma</span>
              </div>
            </div>

            {/* Terminal decorativo — el único elemento con movimiento con propósito */}
            <div aria-hidden className="border-t-2 border-t-accent border-x border-b border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-mono text-xs text-muted">maria@mb:~/portafolio</span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">mb</span>
              </div>
              <div className="space-y-1 overflow-x-auto px-4 py-5 font-mono text-[13px] leading-6 text-content">
                <p><span className="text-muted">$</span> whoami</p>
                <p className="text-muted">maría · diseñadora y desarrolladora</p>
                <p><span className="text-muted">$</span> cat stack.txt</p>
                <p className="text-muted">react · typescript · tailwind · figma</p>
                <p><span className="text-muted">$</span> ping intención</p>
                <p className="text-muted">
                  64 bytes: cada píxel tiene una razón<span className="caret" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------- Qué hago ------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          index="01"
          eyebrow="Qué hago"
          title="Cuatro frentes, un mismo oficio"
          description="De la base de datos al píxel: lo que hago bien, sin humo."
        />
        <ul className="mt-10 border-t border-line">
          {FOCUS.map((f, i) => (
            <li
              key={f.title}
              className="grid gap-1 border-b border-line py-6 sm:grid-cols-[3.5rem_1fr_1.5fr] sm:items-baseline sm:gap-8"
            >
              <span aria-hidden className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-medium text-content sm:text-2xl">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------- Proyectos destacados ------- */}
      <section className="border-y border-line bg-surface-2/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              index="02"
              eyebrow="Proyectos"
              title="Trabajo real, repos reales"
              description="Piezas con contexto: qué resuelven y qué aprendí. El resto de la cursada vive en GitHub."
            />
            <Link
              to="/proyectos"
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-content uppercase transition-colors duration-fast hover:text-accent"
            >
              índice completo
              <ArrowRight
                className="size-3.5 transition-transform duration-fast group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          <div className="mt-10 border-t border-line">
            {featured.length > 0 ? (
              featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            ) : (
              <p className="border-b border-line py-8 font-mono text-xs text-muted">
                {"// aún no hay proyectos publicados"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ------- CTA ------- */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="border border-line border-l-2 border-l-accent bg-surface p-8 sm:p-12">
          <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
            {"// siguiente paso"}
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-medium tracking-tight text-content sm:text-5xl">
            ¿Un proyecto, una idea o una materia difícil?{" "}
            <span className="font-light text-muted italic">Hablemos.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contacto"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-inverse px-7 font-mono text-xs tracking-[0.12em] text-bg uppercase transition-[transform,opacity] duration-fast hover:opacity-85 active:scale-[0.98]"
            >
              Hablemos
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/proyectos"
              className="inline-flex h-12 items-center rounded-lg border border-line px-7 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,border-color] duration-fast hover:border-accent/60 hover:text-accent active:scale-[0.98]"
            >
              Explorar proyectos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
