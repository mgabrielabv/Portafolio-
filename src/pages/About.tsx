import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { MORE_INFO, SKILL_GROUPS, TIMELINE } from "@/data/about";
import { useI18n } from "@/i18n";

const MORE_KEYS = ["exp", "edu", "process"];

function LevelBar({ value, index }: { value: number; index: number }) {
  return (
    <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-line/70">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
      />
    </div>
  );
}

export default function About() {
  const { t } = useI18n();
  const [skillGroup, setSkillGroup] = useState(SKILL_GROUPS[0].id);
  const activeSkills = SKILL_GROUPS.find((g) => g.id === skillGroup) ?? SKILL_GROUPS[0];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6">
      <header className="max-w-4xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{t("about.eyebrow")}</p>
          <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] text-content">
            María Gabriela
            <br />
            <span className="text-gradient">Bermúdez</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-muted">{t("about.p1")}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">{t("about.p2")}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
            <span className="font-semibold text-content">{t("about.stackLabel")}</span> {t("about.stackValue")}
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
            <span className="font-semibold text-content">{t("about.philosophyLabel")}</span>{" "}
            {t("about.philosophyValue")}
          </p>
        </Reveal>
      </header>

      <section className="mt-20" aria-label={t("about.timeline.title")}>
        <SectionHeading eyebrow={t("about.timeline.eyebrow")} title={t("about.timeline.title")} />
        <ol className="relative mt-12 space-y-12 border-l border-line/70 pl-8 sm:pl-10">
          {TIMELINE.map((entry, i) => (
            <li key={entry.period} className="relative">
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1.5 -left-[3.05rem] grid size-7 place-items-center rounded-full border border-accent/50 bg-surface sm:-left-[3.55rem]"
              >
                <span className="size-2 rounded-full bg-accent" />
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                  {entry.period}
                </p>
                <h3 className="mt-1.5 font-display text-2xl text-content">
                  {t(`timeline.${entry.period}.role`)}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{t(`timeline.${entry.period}.company`)}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  {t(`timeline.${entry.period}.desc`)}
                </p>
              </motion.div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24" aria-label={t("about.stack.title")}>
        <SectionHeading
          eyebrow={t("about.stack.eyebrow")}
          title={t("about.stack.title")}
          description={t("about.stack.desc")}
        />
        <Reveal delay={0.05}>
          <div className="mt-8 flex justify-center">
            <Tabs
              tabs={SKILL_GROUPS.map((g) => ({ value: g.id, label: t(`skills.${g.id}`) }))}
              value={skillGroup}
              onChange={setSkillGroup}
              ariaLabel={t("about.stack.eyebrow")}
            />
          </div>
        </Reveal>

        <Reveal key={activeSkills.id} delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="glass glow-rose rounded-3xl p-6 sm:p-8">
              <h3 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                {t(`skills.${activeSkills.id}`)}
              </h3>
              <ul className="mt-6">
                {activeSkills.skills.map((s, i) => (
                  <li
                    key={s.tech}
                    className="border-b border-line/70 py-4 last:border-b-0"
                  >
                    <div className="flex items-baseline justify-between gap-6">
                      <span className="font-sans text-base font-medium text-content">{s.tech}</span>
                      <span className="font-mono text-xs text-muted">{s.level}%</span>
                    </div>
                    <LevelBar value={s.level} index={i} />
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeSkills.related.map((r) => (
                  <span
                    key={r}
                    className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-3xl" aria-label={t("about.more.title")}>
        <SectionHeading eyebrow={t("about.more.eyebrow")} title={t("about.more.title")} />
        <Reveal delay={0.1} className="mt-10">
          <Accordion
            items={MORE_INFO.map((m, i) => ({
              title: t(`more.${MORE_KEYS[i]}`),
              content: (
                <ul className="list-disc space-y-2 pl-4">
                  {m.content.map((c, ci) => (
                    <li key={ci}>{t(`more.${MORE_KEYS[i]}.${ci + 1}`)}</li>
                  ))}
                </ul>
              ),
            }))}
            defaultOpenIndex={0}
          />
        </Reveal>
      </section>

      <section
        id="descargar-cv"
        className="glass glow-rose relative mt-24 overflow-hidden rounded-[2rem] p-10 sm:p-14"
      >
        <div aria-hidden className="bg-grid bg-grid-fade absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgb(201_139_155/0.12),transparent_60%)]"
        />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl text-content sm:text-4xl">{t("about.cv.title")}</h2>
            <p className="mt-2 text-sm text-muted">{t("about.cv.desc")}</p>
          </div>
          <a
            href="/cv.pdf"
            download
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-8 font-sans text-sm font-semibold text-inverse uppercase shadow-[0_0_32px_-6px_rgb(201_139_155/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
          >
            <Download className="size-4" aria-hidden />
            {t("about.cv.btn")}
          </a>
        </div>
      </section>
    </div>
  );
}
