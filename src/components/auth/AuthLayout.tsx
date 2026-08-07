import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * Layout de auth: card glass flotante sobre el fondo digital global.
 * En desktop muestra un panel de marca lateral con una frase.
 */
export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="relative grid min-h-dvh items-center px-4 pt-28 pb-12 sm:px-8 lg:grid-cols-[1fr_auto]">
      {/* Panel de marca */}
      <div className="mx-auto hidden w-full max-w-2xl lg:block">
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <span aria-hidden className="mb-5 block h-px w-14 bg-gradient-to-r from-accent to-accent-2" />
          <p className="font-display text-5xl leading-[1.08] font-bold tracking-tight text-content">
            El buen código se ve.
            <br />
            <span className="text-gradient">El gran código se siente.</span>
          </p>
          <p className="mt-6 font-mono text-xs text-muted">
            $ maria@portfolio: ~ panel de control
          </p>
        </motion.blockquote>
      </div>

      {/* Card flotante */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-md"
      >
        <div className="glass glow-accent relative overflow-hidden rounded-[2rem] p-7 sm:p-9">
          <div
            aria-hidden
            className="absolute -top-16 -right-16 size-44 rounded-full bg-accent/15 blur-3xl"
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <Logo />
            </div>
            <h1 className="mt-7 font-display text-3xl font-bold text-content">{title}</h1>
            <p className="mt-2 text-sm text-muted">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
