import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * Layout dividido 50/50 para las pantallas de auth:
 * panel de marca con gradiente animado (desktop) + tarjeta de formulario centrada.
 */
export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
      {/* Panel de marca */}
      <div className="relative hidden overflow-hidden bg-primary lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden
          className="absolute -top-32 -left-24 size-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute right-0 bottom-0 size-80 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/30 blur-3xl"
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #fff 0 2px, transparent 2px 18px), radial-gradient(circle at 70% 60%, #fff 0 2px, transparent 2px 20px), radial-gradient(circle at 45% 85%, #fff 0 2px, transparent 2px 16px)",
            backgroundSize: "380px 380px",
          }}
        />

        <div className="relative z-10 flex items-center gap-2 text-white">
          <Logo className="[&_span:last-child]:text-white" />
        </div>

        <div className="relative z-10 max-w-md">
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="size-5 text-accent" aria-hidden />
            <p className="mt-4 font-display text-2xl leading-snug text-white">
              “El buen diseño es obvio. El gran diseño es transparente.”
            </p>
            <footer className="mt-6 text-sm text-white/75">— Principio que guía mi trabajo</footer>
          </motion.blockquote>
        </div>

        <div className="relative z-10">
          <p className="text-xs tracking-widest text-white/60 uppercase">Portafolio · María Bermúdez</p>
        </div>
      </div>

      {/* Panel del formulario */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-8 font-display text-3xl font-semibold text-content lg:mt-0">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
