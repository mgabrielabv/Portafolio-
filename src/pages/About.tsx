import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { SkillsMap } from "@/components/ui/SkillsMap";
import { FAQS, SKILL_GROUPS, SOFT_SKILLS, TIMELINE } from "@/data/about";

function LevelBar({ value, index = 0 }: { value: number; index?: number }) {
  return (
    <span aria-hidden className="relative block h-1 w-full overflow-hidden rounded-full bg-line">
      <motion.span
        className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-accent to-accent-2"
        style={{ width: `${value}%` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}

export default function About() {
  const [skillGroup, setSkillGroup] = useState(SKILL_GROUPS[0].id);
  const activeSkills = SKILL_GROUPS.find((g) => g.id === skillGroup) ?? SKILL_GROUPS[0];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6">
      {/* ------- Header ------- */}
      <header className="max-w-4xl">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
          {"sobre mí"}
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.02] font-bold tracking-[-0.02em] text-content">
          Diseño y código,
          <br />
          <span className="text-gradient italic">un mismo oficio.</span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="glass glow-accent relative shrink-0 rounded-3xl p-2">
            <img
              src="/images/avatar.svg"
              alt="Retrato ilustrado de María Bermúdez"
              width={640}
              height={640}
              loading="lazy"
              className="h-44 w-44 rounded-2xl object-cover"
            />
            <span
              className="pulse-dot absolute -right-1 -bottom-1 size-4 rounded-full border-2 border-surface bg-accent-2"
              aria-hidden
            />
          </div>
          <div className="max-w-2xl space-y-4 text-[15px] leading-7 text-muted">
            <p>
              Soy <strong className="font-medium text-content">María</strong>, estudiante de{" "}
              <strong className="font-medium text-content">Ingeniería en Computación</strong> en la
              Universidad Rafael Urdaneta (Maracaibo). Me muevo igual de cómoda en Figma que en un
              editor: prototipo, valido y construyo interfaces rápidas, accesibles y con detalle.
            </p>
            <p>
              He desarrollado aplicaciones web para proyectos universitarios y clientes reales:
              dashboards de datos, sistemas con login y bases de datos, y pequeños sistemas de
              diseño. En este portafolio soy a la vez la diseñadora y la desarrolladora.
            </p>
          </div>
        </div>
      </header>

      {/* ------- Timeline interactiva ------- */}
      <section className="mt-24" aria-label="Recorrido">
        <SectionHeading eyebrow="trayectoria" title="Recorrido" />
        <ol className="relative mt-10 grid gap-6 lg:grid-cols-2">
          {TIMELINE.map((entry, i) => (
            <Reveal key={entry.period} delay={Math.min(i * 0.06, 0.24)}>
              <li className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-base hover:-translate-y-1">
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 size-28 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-base group-hover:opacity-100"
                />
                <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                  {entry.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-content">{entry.role}</h3>
                <p className="mt-0.5 font-mono text-xs text-muted">{entry.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{entry.description}</p>
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px w-12 bg-gradient-to-r from-accent to-accent-2 transition-all duration-base group-hover:w-full"
                />
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------- Skills map ------- */}
      <section className="mt-24" aria-label="Mapa de habilidades">
        <SectionHeading
          eyebrow="stack"
          title="María Stack"
          description="El ecosistema técnico donde trabajo todos los días, en un solo mapa."
          className="mx-auto max-w-2xl text-center"
        />
        <div className="mt-12 flex justify-center">
          <SkillsMap />
        </div>
      </section>

      {/* ------- My Arsenal (tabs) ------- */}
      <section className="mt-24" aria-label="Habilidades">
        <SectionHeading
          eyebrow="arsenal"
          title="My Arsenal"
          description="Tecnologías y nivel por área. El arsenal completo que llevo a cada proyecto."
        />

        <div className="mt-8 flex justify-center">
          <Tabs
            tabs={SKILL_GROUPS.map((g) => ({ value: g.id, label: g.label }))}
            value={skillGroup}
            onChange={setSkillGroup}
            ariaLabel="Áreas de habilidad"
          />
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-10 lg:grid-cols-2">
          <Reveal key={`skills-${activeSkills.id}`}>
            <div className="glass rounded-3xl p-6 sm:p-7">
              <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                {"Tecnologías · "}
                <span className="text-accent">{activeSkills.label}</span>
              </h3>
              <ul className="mt-6">
                {activeSkills.skills.map((s, i) => (
                  <li
                    key={s.tech}
                    className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-center gap-x-6 gap-y-2 border-b border-line py-4 last:border-b-0"
                  >
                    <span className="font-display text-base font-medium text-content">{s.tech}</span>
                    <span className="text-right font-mono text-xs text-muted">{s.level}%</span>
                    <LevelBar value={s.level} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="glass rounded-3xl p-6 sm:p-7">
            <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              {"Soft skills"}
            </h3>
            <ul className="mt-6 space-y-3">
              {SOFT_SKILLS.map((s, i) => (
                <li key={s.skill}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-content">{s.skill}</span>
                    <span className="font-mono text-xs text-muted">{s.value}%</span>
                  </div>
                  <LevelBar value={s.value} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------- FAQ ------- */}
      <section className="mt-24" aria-label="Preguntas frecuentes">
        <SectionHeading eyebrow="faq" title="Cómo trabajo" />
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <Accordion
            items={FAQS.map((f) => ({ title: f.title, content: f.content }))}
            defaultOpenIndex={0}
          />
        </Reveal>
      </section>

      {/* ------- CV ------- */}
      <section
        id="descargar-cv"
        className="glass glow-accent relative mt-24 overflow-hidden rounded-[2rem] p-10 sm:p-14"
      >
        <div
          aria-hidden
          className="bg-grid bg-grid-fade absolute inset-0"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(139_92_246/0.18),transparent_60%)]"
        />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
              {"Resumen en una página"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-content sm:text-4xl">
              ¿Quieres mi CV?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Un PDF con el recorrido, las habilidades y el contacto, listo para compartir.
            </p>
          </div>
          <a
            href="/cv.pdf"
            download="Maria-Bermudez-CV.pdf"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 font-mono text-xs tracking-[0.12em] text-[#07070c] uppercase shadow-[0_0_32px_-6px_rgb(139_92_246/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
          >
            <Download className="size-4" aria-hidden />
            Descargar CV
          </a>
        </div>
      </section>
    </div>
  );
}
