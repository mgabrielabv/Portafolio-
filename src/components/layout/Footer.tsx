import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const SOCIALS = [
  { href: "https://github.com/mgabrielabv", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://x.com/", label: "Twitter / X", Icon: Twitter },
  { href: "mailto:maria.bermudez@uru.edu", label: "Correo", Icon: Mail },
];

const QUICK_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/estadisticas", label: "Stats" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/login", label: "Acceso admin" },
];

/** Cierre de experiencia: CTA gigante + redes + colofón. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-surface/30 pt-20 pb-10 backdrop-blur-sm">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] font-bold tracking-tight text-content sm:text-6xl lg:text-7xl">
              READY TO BUILD
              <br />
              <span className="text-gradient">SOMETHING?</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] text-muted">
              Let's create something amazing. Contame tu idea y trabajemos en el siguiente
              proyecto juntos.
            </p>
          </div>

          <Link
            to="/contacto"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-accent to-accent-2 px-9 font-mono text-xs tracking-[0.14em] text-[#07070c] uppercase shadow-[0_0_40px_-8px_rgb(139_92_246/0.7)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
          >
            Contact me
            <ArrowUpRight className="size-4 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        {/* Fila inferior */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line/60 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Logo />
            <div className="flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass grid size-10 place-items-center rounded-full text-muted transition-[transform,color,border-color] duration-fast hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="size-4.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-mono text-xs text-muted transition-colors duration-fast hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 font-mono text-[11px] text-muted">
          María Bermúdez © {new Date().getFullYear()} · digital workspace · react 19 · three.js ·
          framer-motion
        </p>
      </div>
    </footer>
  );
}
