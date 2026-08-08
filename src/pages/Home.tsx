import { motion, type Variants } from "framer-motion";
import { ArrowRight, Database, Palette, PenTool, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ParticleField } from "@/components/hero/ParticleField";
import { WireframeSphere } from "@/components/hero/WireframeSphere";
import { FeaturedCarousel } from "@/components/ui/FeaturedCarousel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { useI18n } from "@/i18n";
import { listProjects } from "@/services/projects";
import type { Project } from "@/types";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const STATS = [
  { value: 6, suffix: "+", labelKey: "home.stat.projects" },
  { value: 12, suffix: "+", labelKey: "home.stat.techs" },
  { value: 2, suffix: "+", labelKey: "home.stat.years" },
];

const FOCUS = [
  {
    icon: Waypoints,
    titleKey: "home.focus.web.title",
    textKey: "home.focus.web.text",
  },
  {
    icon: PenTool,
    titleKey: "home.focus.ui.title",
    textKey: "home.focus.ui.text",
  },
  {
    icon: Database,
    titleKey: "home.focus.data.title",
    textKey: "home.focus.data.text",
  },
  {
    icon: Palette,
    titleKey: "home.focus.ux.title",
    textKey: "home.focus.ux.text",
  },
];

const MARQUEE = [
  "React",
  "TypeScript",
  "JavaScript",
  "SQL",
  "Node",
  "Figma",
  "C++",
  "MySQL",
  "UI / UX",
  "Git",
  "Vite",
  "Tailwind",
];

export default function Home() {
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    listProjects().then((p) => active && setProjects(p));
    return () => {
      active = false;
    };
  }, []);

  const featured = projects.filter((p) => p.featured);

  return (
    <div>
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
        <ParticleField className="pointer-events-none absolute inset-0 h-full w-full" />
        <div aria-hidden className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div aria-hidden className="absolute right-1/5 bottom-0 h-80 w-80 rounded-full bg-accent-soft/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div variants={heroContainer} initial="hidden" animate="show">
              <motion.h1
                variants={heroContainer}
                className="mt-8 font-sans"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <motion.span
                  variants={fadeUp}
                  className="block text-[clamp(3.6rem,10vw,7.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-content"
                >
                  MARÍA
                </motion.span>
                <motion.span
                  variants={fadeUp}
                  className="text-gradient block text-[clamp(3.6rem,10vw,7.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em]"
                >
                  BERMÚDEZ
                </motion.span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 font-sans text-xl text-muted sm:text-2xl">
                Software Developer <span className="text-accent">·</span> UI Designer
              </motion.p>

              <motion.p variants={fadeUp} className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                {t("home.hero.text")}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticButton>
                  <Link
                    to="/proyectos"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-7 font-sans text-sm font-semibold text-inverse uppercase shadow-[0_0_32px_-6px_rgb(201_139_155/0.65)] transition-all duration-fast hover:scale-[1.03] hover:shadow-[0_0_48px_-6px_rgb(201_139_155/0.85)] hover:brightness-110 active:scale-[0.97]"
                  >
                    {t("home.cta1")}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </MagneticButton>
                <Link
                  to="/contacto"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-line/70 px-7 font-sans text-sm font-medium text-content uppercase transition-all duration-fast hover:scale-[1.03] hover:border-accent/50 hover:text-accent hover:shadow-[0_0_36px_-8px_rgb(201_139_155/0.5)] active:scale-[0.97]"
                >
                  {t("home.cta2")}
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9 max-w-xs">
                <div className="mb-2 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase">
                  <span className="text-muted">learning</span>
                  <span className="text-accent">98%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-line/60">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "98%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
                  />
                </div>
              </motion.div>

              <motion.dl variants={fadeUp} className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                {STATS.map((s) => (
                  <div key={s.labelKey}>
                    <dt className="sr-only">{t(s.labelKey)}</dt>
                    <dd className="font-sans text-3xl font-bold text-content">
                      <CountUp to={s.value} suffix={s.suffix} pad={2} />
                    </dd>
                    <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                      {t(s.labelKey)}
                    </p>
                  </div>
                ))}
              </motion.dl>
            </motion.div>

            <Reveal delay={0.15} className="max-lg:mx-auto max-lg:max-w-md">
              <WireframeSphere />
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-hidden className="border-y border-line/60 bg-surface/40 py-4">
        <div className="relative flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-mono text-xs tracking-[0.18em] text-muted uppercase"
              >
                {t}
                <span className="size-1 rounded-full bg-accent/50" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow={t("home.focus.eyebrow")}
          title={t("home.focus.title")}
          description={t("home.focus.desc")}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOCUS.map((f, i) => (
            <Reveal key={f.titleKey} delay={Math.min(i * 0.06, 0.24)}>
              <div className="group glass relative h-full overflow-hidden rounded-2xl p-5 transition-transform duration-base hover:-translate-y-1">
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 size-28 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-base group-hover:opacity-100"
                />
                <span className="grid size-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-base group-hover:scale-110">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-2xl text-content">{t(f.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(f.textKey)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line/60 bg-surface/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={t("home.featured.eyebrow")}
              title={t("home.featured.title")}
              description={t("home.featured.desc")}
            />
            <Link
              to="/proyectos"
              className="group inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.16em] text-content uppercase transition-colors duration-fast hover:text-accent"
            >
              {t("home.featured.all")}
              <ArrowRight
                className="size-3.5 transition-transform duration-fast group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          <div className="mt-12">
            {featured.length > 0 ? (
              <FeaturedCarousel projects={featured} />
            ) : (
              <p className="border-b border-line py-8 font-mono text-xs text-muted">
                {t("home.featured.empty")}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="glass glow-rose relative overflow-hidden rounded-[2rem] p-10 sm:p-16">
            <div aria-hidden className="bg-grid bg-grid-fade absolute inset-0" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(201_139_155/0.14),transparent_60%)]"
            />
            <div className="relative">
              <h2 className="max-w-3xl font-display text-4xl leading-[1.05] text-content sm:text-6xl">
                {t("home.cta.title")} <span className="text-gradient">{t("home.cta.talk")}</span>
              </h2>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-8 font-sans text-sm font-semibold text-inverse uppercase shadow-[0_0_32px_-6px_rgb(201_139_155/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
                >
                  {t("home.cta.contact")}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/proyectos"
                  className="inline-flex h-12 items-center rounded-full border border-line/70 px-8 font-sans text-sm font-medium text-content uppercase transition-[transform,color,border-color] duration-fast hover:border-accent/50 hover:text-accent active:scale-[0.97]"
                >
                  {t("home.cta.explore")}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
