import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * Layout dividido para las pantallas de auth:
 * panel editorial con cita (desktop) + tarjeta de formulario centrada.
 */
export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
      {/* Panel de marca */}
      <div className="relative hidden flex-col justify-between border-r border-line bg-surface-2 p-12 lg:flex">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            // acceso admin
          </span>
        </div>

        <div className="max-w-md">
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <span aria-hidden className="mb-4 block h-px w-10 bg-accent" />
            <p className="font-display text-3xl leading-snug font-medium text-content">
              “El buen diseño es obvio.{" "}
              <span className="font-light text-muted italic">El gran diseño es transparente.</span>”
            </p>
            <footer className="mt-6 font-mono text-xs text-muted">
              — principio que guía mi trabajo
            </footer>
          </motion.blockquote>
        </div>

        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
            portafolio · María Bermúdez
          </p>
        </div>
      </div>

      {/* Panel del formulario */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-8 font-display text-3xl font-medium text-content lg:mt-0">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
