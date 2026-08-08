import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { ParticleField } from "@/components/hero/ParticleField";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const card: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, staggerChildren: 0.08, delayChildren: 0.15 } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.32, ease: EASE } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.22, ease: EASE } },
};

const screen: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <motion.div
      variants={screen}
      initial="hidden"
      animate="show"
      exit="exit"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12"
    >
      <ParticleField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="animate-float absolute -top-24 left-[12%] size-72 rounded-full bg-accent/10 blur-3xl"
        style={{ animationDuration: "9s" }}
      />
      <div
        aria-hidden
        className="animate-float absolute -bottom-28 right-[8%] size-80 rounded-full bg-accent-soft/15 blur-3xl"
        style={{ animationDelay: "1.4s", animationDuration: "11s" }}
      />
      <div
        aria-hidden
        className="animate-float absolute top-[55%] left-[4%] size-40 rounded-full bg-accent-faint/10 blur-2xl"
        style={{ animationDelay: "2.6s", animationDuration: "8s" }}
      />
      <div aria-hidden className="bg-grid bg-grid-fade absolute inset-0" />
      <div aria-hidden className="bg-grain absolute inset-0" />

      <motion.div variants={card} initial="hidden" animate="show" exit="exit" className="relative w-full max-w-md">
        <div className="glass glow-rose relative overflow-hidden rounded-[2rem] p-7 sm:p-9">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          />
          <div
            aria-hidden
            className="animate-float absolute -top-16 -right-16 size-44 rounded-full bg-accent/8 blur-3xl"
            style={{ animationDelay: "0.8s", animationDuration: "10s" }}
          />

          <motion.div variants={item} className="text-center">
            <h1 className="font-sans text-3xl font-bold tracking-tight text-content sm:text-4xl">
              {title}
            </h1>
            <div
              aria-hidden
              className="mx-auto mt-3 h-px w-14 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            />
            <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p>
          </motion.div>

          <motion.div variants={item} className="mt-7">
            {children}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
