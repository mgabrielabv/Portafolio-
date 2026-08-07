import { ArrowRight, Database, Download, Palette, Rocket, Sparkles, Waypoints, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectCard } from "@/components/ProjectCard";
import { DigitalCore } from "@/components/ui/DigitalCore";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listProjects } from "@/services/projects";
import type { Project } from "@/types";

const FOCUS = [
  {
    icon: Waypoints,
    title: "Aplicaciones web",
    text: "SPAs en React + TypeScript con estado controlado y detalle fino de interacción.",
  },
  {
    icon: Palette,
    title: "Diseño de producto",
    text: "Del boceto en Figma al código: jerarquía, sistemas y decisiones defendibles.",
  },
  {
    icon: Database,
    title: "Datos y lógica",
    text: "CRUDs, consultas SQL y paneles que administran registros de punta a punta.",
  },
  {
    icon: Cpu,
    title: "Fundamentos",
    text: "C++, estructuras de datos y algoritmos: la base de cada interfaz.",
  },
];

const MARQUEE = [
  "React", "TypeScript", "Tailwind", "SQL", "Node", "Figma", "C++", "MySQL",
  "REST", "UI / UX", "Git", "Vite",
];

const STACK_LINES = [
  "react · typescript · tailwind",
  "sql · mysql · modelado",
  "node · apis rest · auth",
  "figma · ui/ux · sistemas",
  "c++ · estructuras de datos",
];

function TypeText({ lines }: { lines: string[] }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[index % lines.length];
    let timer: number;
    if (!deleting && text === current) {
      timer = window.setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % lines.length);
    } else {
      timer = window.setTimeout(
        () => setText(deleting ? current.slice(0, -1) : current.slice(0, text.length + 1)),
        deleting ? 16 : 46,
      );
    }
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, lines]);

  return (
    <span className="text-accent-2">
      {text}
      <span className="caret" aria-hidden />
    </span>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    listProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);

  const featured = projects.filter((p) => p.featured);
  const hero = featured[0] ?? projects[0];

  return (
    <div>
      {/* ================= HERO DASHBOARD ================= */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.9fr_1.05fr]">
            {/* ------- Izquierda: identidad ------- */}
            <div>
              <Reveal>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                  <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
                  system online
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-7 font-display leading-[0.92] font-bold tracking-[-0.03em]">
                  <span className="block text-[clamp(3.4rem,9vw,7rem)] text-content">
                    MARÍA
                  </span>
                  <span className="text-gradient block text-[clamp(3.4rem,9vw,7rem)]">
                    BERMÚDEZ
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <ul className="mt-7 space-y-1.5 font-mono text-[13px] tracking-[0.08em]">
                  {["software engineer", "ui designer", "creative developer"].map((r) => (
                    <li key={r} className="flex items-center gap-3 text-muted">
                      <span className="size-1 rounded-full bg-accent" aria-hidden />
                      {r}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.24}>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                  Construyo productos web reales con React, datos y diseño — desde la
                  base de datos hasta el último píxel de la interfaz.
                </p>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <MagneticButton>
                    <Link
                      to="/proyectos"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 font-mono text-xs tracking-[0.12em] text-[#07070c] uppercase shadow-[0_0_32px_-6px_rgb(139_92_246/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
                    >
                      Ver proyectos
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </MagneticButton>
                  <Link
                    to="/contacto"
                    className="glass inline-flex h-12 items-center gap-2 rounded-full px-7 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,background-color,border-color] duration-fast hover:border-accent/50 hover:text-accent active:scale-[0.97]"
                  >
                    Contactarme
                  </Link>
                  <Link
                    to="/sobre-mi#descargar-cv"
                    className="inline-flex h-12 items-center gap-2 rounded-full px-5 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-fast hover:text-accent"
                    title="Descargar CV"
                  >
                    <Download className="size-4" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ------- Centro: núcleo 3D ------- */}
            <Reveal delay={0.2} className="relative">
              <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
                <div
                  aria-hidden
                  className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgb(139_92_246/0.22),transparent_65%)] blur-2xl"
                />
                <div aria-hidden className="ping-ring absolute inset-10 rounded-full border border-accent/25" />
                <DigitalCore className="absolute inset-0" />

                {/* Chips flotantes */}
                {[
                  { label: "React", cls: "top-6 left-4", delay: "0s" },
                  { label: "Node", cls: "top-10 right-0", delay: "-1.6s" },
                  { label: "SQL", cls: "bottom-8 left-2", delay: "-3.2s" },
                  { label: "Figma", cls: "bottom-4 right-4", delay: "-4.6s" },
                ].map((c) => (
                  <span
                    key={c.label}
                    className={`animate-float glass absolute rounded-full px-3.5 py-1.5 font-mono text-[11px] text-content ${c.cls}`}
                    style={{ animationDelay: c.delay }}
                  >
                    {c.label}
                  </span>
                ))}
              </div>

              {/* Estado del sistema */}
              <div className="glass mx-auto mt-4 max-w-xs rounded-2xl p-4">
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                  ◉ system online
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Frontend", on: true },
                    { label: "Backend", on: true },
                    { label: "Database", on: true },
                  ].map((s) => (
                    <div key={s.label}>
                      <span
                        className={`mx-auto block size-2 rounded-full ${s.on ? "bg-accent-2 shadow-[0_0_10px_2px_rgb(34_211_238/0.6)]" : "bg-muted/30"}`}
                        aria-hidden
                      />
                      <p className="mt-1.5 font-mono text-[10px] text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between font-mono text-[10px] text-muted">
                    <span>learning</span>
                    <span className="text-accent">98%</span>
                  </div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-line">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-accent to-accent-2" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ------- Derecha: terminal ------- */}
            <Reveal delay={0.28} className="max-lg:mx-auto max-lg:w-full max-lg:max-w-xl">
              <div className="glass glow-accent relative overflow-hidden rounded-2xl">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 size-48 rounded-full bg-accent/15 blur-3xl"
                />
                <div className="flex items-center justify-between border-b border-line/80 px-4 py-3">
                  <span className="font-mono text-xs text-muted">maria@portfolio: ~</span>
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-red-400/70" />
                    <span className="size-2.5 rounded-full bg-amber-400/70" />
                    <span className="size-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                </div>
                <div className="space-y-2 overflow-x-auto px-5 py-5 font-mono text-[13px] leading-6 text-content">
                  <p>
                    <span className="text-accent">$</span> whoami
                  </p>
                  <p className="text-muted">maría · software engineer & designer</p>
                  <p className="mt-3">
                    <span className="text-accent">$</span> status
                  </p>
                  <p className="flex items-center gap-2 text-muted">
                    <span className="pulse-dot size-1.5 rounded-full bg-emerald-400" aria-hidden />
                    available for projects
                  </p>
                  <p className="mt-3">
                    <span className="text-accent">$</span> stack
                  </p>
                  <p className="text-muted">
                    <TypeText lines={STACK_LINES} />
                  </p>
                  <p className="mt-3">
                    <span className="text-accent">$</span> experience
                  </p>
                  <p className="text-muted">2+ years · react · full-stack projects</p>
                  <p className="mt-3">
                    <span className="text-accent">$</span> <span className="caret" aria-hidden />
                  </p>
                </div>
              </div>

              {/* Mini métricas */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "repos", value: `${projects.length}+` },
                  { label: "stack", value: "12+" },
                  { label: "estudios", value: "URU" },
                ].map((m) => (
                  <div key={m.label} className="glass rounded-xl px-4 py-3 text-center">
                    <p className="font-display text-lg font-semibold text-content">{m.value}</p>
                    <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section aria-hidden className="border-y border-line/60 bg-surface/40 py-4">
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-mono text-xs tracking-[0.18em] text-muted uppercase"
              >
                {t}
                <Sparkles className="size-3.5 text-accent/60" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUÉ HAGO (paneles) ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="capacidades"
          title="Qué hago"
          description="Cuatro frentes del mismo oficio: de la base de datos al píxel."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} delay={Math.min(i * 0.06, 0.24)}>
              <div className="group glass relative h-full overflow-hidden rounded-2xl p-5 transition-transform duration-base hover:-translate-y-1">
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 size-28 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-base group-hover:opacity-100"
                />
                <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25 transition-transform duration-base group-hover:scale-110">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-content">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PROJECT ================= */}
      {hero && (
        <section className="border-y border-line/60 bg-surface/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <FeaturedProject project={hero} />
          </div>
        </section>
      )}

      {/* ================= FEATURED EXPERIENCES ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="gallery"
            title="Experiencias destacadas"
            description="Proyectos con contexto real: qué resuelven y qué aprendí. Autoplay, flechas o arrastra."
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

        <div className="mt-10">
          {featured.length > 0 ? (
            <Carousel
              ariaLabel="Experiencias destacadas"
              autoplay={5200}
              className="rounded-2xl"
              slideClassName="px-1 pb-10"
              slides={Array.from({ length: Math.ceil(featured.length / 2) }, (_, s) => {
                const pair = featured.slice(s * 2, s * 2 + 2);
                return (
                  <div key={s} className="grid gap-5 sm:grid-cols-2">
                    {pair.map((p, j) => (
                      <ProjectCard key={p.id} project={p} index={s * 2 + j} />
                    ))}
                  </div>
                );
              })}
            />
          ) : (
            <p className="border-b border-line py-8 font-mono text-xs text-muted">
              {"Aún no hay proyectos publicados"}
            </p>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="glass glow-accent relative overflow-hidden rounded-[2rem] p-10 sm:p-16">
            <div
              aria-hidden
              className="bg-grid bg-grid-fade absolute inset-0"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(139_92_246/0.2),transparent_60%)]"
            />
            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                <Rocket className="size-3.5" aria-hidden />
                siguiente paso
              </p>
              <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-content sm:text-6xl">
                ¿Una idea, un proyecto o una materia difícil?{" "}
                <span className="text-gradient">Hablemos.</span>
              </h2>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 font-mono text-xs tracking-[0.12em] text-[#07070c] uppercase shadow-[0_0_32px_-6px_rgb(139_92_246/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
                >
                  Hablemos
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/proyectos"
                  className="glass inline-flex h-12 items-center rounded-full px-8 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,background-color,border-color] duration-fast hover:border-accent/50 hover:text-accent active:scale-[0.97]"
                >
                  Explorar proyectos
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
