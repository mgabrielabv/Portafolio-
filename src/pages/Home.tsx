import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Download, Palette, Rocket, Smartphone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listProjects } from "@/services/projects";
import { useEffect, useState } from "react";
import type { Project } from "@/types";

const SERVICES = [
  { icon: Rocket, title: "Web Apps", text: "Aplicaciones React modernas, rápidas y accesibles con SEO impecable." },
  { icon: Smartphone, title: "Mobile", text: "Experiencias nativas con React Native y sincronización offline." },
  { icon: BarChart3, title: "Data & Dashboards", text: "Visualización de datos clara y accionable con Recharts y D3." },
  { icon: Palette, title: "Diseño de producto", text: "Sistemas de diseño, prototipos y UI pulidas con enfoque humano." },
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
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 size-[480px] rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 -left-32 size-[380px] rounded-full bg-accent/20 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-20 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-600"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Disponible para nuevos proyectos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-6 text-4xl leading-[1.05] text-content sm:text-6xl lg:text-7xl"
            >
              María Bermúdez
              <span className="mt-3 block font-display text-2xl font-medium text-muted sm:text-4xl lg:text-5xl">
                construyo <span className="text-primary">interfaces</span> que la gente
                <span className="text-accent-soft"> disfruta</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              Estudiante de Ingeniería en Computación en la Universidad Rafael Urdaneta (Maracaibo,
              Venezuela). Me apasiona crear aplicaciones web con React, TypeScript y diseño con
              propósito.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/proyectos"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                Ver proyectos
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/sobre-mi#descargar-cv"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-7 text-sm font-medium text-content transition-all hover:border-primary/40 hover:text-primary active:scale-[0.98]"
              >
                <Download className="size-4" aria-hidden />
                Descargar CV
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/25 to-accent/25 blur-xl"
            />
            <img
              src="/images/avatar.svg"
              alt="Ilustración del retrato de María Bermúdez"
              width={640}
              height={640}
              className="w-full rounded-[2.5rem] border border-line shadow-card-lg"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 rounded-2xl border border-line bg-surface px-4 py-3 shadow-card"
            >
              <p className="text-xs text-muted">React · TypeScript</p>
              <p className="text-sm font-semibold text-content">Ing. en Computación · URU</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ------- Servicios ------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Qué hago"
          title="Experiencia que resuelve problemas reales"
          description="Combino diseño y código para llevar ideas desde el primer boceto hasta producción."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-lg">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-content">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------- Proyectos destacados ------- */}
      <section className="border-y border-line bg-surface-2/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Proyectos destacados"
              title="Trabajo reciente seleccionado"
              description="Una muestra de lo que hago mejor: producto, craft y detalle."
            />
            <Reveal delay={0.15}>
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-content transition-all hover:border-primary/40 hover:text-primary"
              >
                Ver todos
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-10">
            {featured.length > 0 ? (
              <Carousel
                ariaLabel="Proyectos destacados"
                autoplay={6000}
                className="rounded-2xl"
                slides={featured.map((p) => (
                  <div key={p.id} className="px-1 py-2">
                    <ProjectCard project={p} />
                  </div>
                ))}
              />
            ) : (
              <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
                <Sparkles className="size-4" aria-hidden />
                Aún no hay proyectos destacados.
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ------- CTA ------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
            <div aria-hidden className="absolute -top-24 -right-16 size-72 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden className="absolute -bottom-28 -left-16 size-72 rounded-full bg-accent/25 blur-2xl" />
            <h2 className="relative text-3xl font-display font-semibold text-white sm:text-4xl">
              ¿Tienes una idea en mente?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/85">
              Cuéntame tu proyecto y te propongo cómo convertirlo en un producto que la gente adore usar.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/contacto"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-primary transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Hablemos
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/proyectos"
                className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Explorar proyectos
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
