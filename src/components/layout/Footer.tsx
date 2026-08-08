import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/i18n";

const SOCIALS = [
  { href: "https://github.com/mgabrielabv", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://x.com/", label: "Twitter / X", Icon: Twitter },
  { href: "mailto:maria.bermudez@uru.edu", labelKey: "footer.email", Icon: Mail },
];

const QUICK_LINKS = [
  { to: "/home", labelKey: "nav.home" },
  { to: "/proyectos", labelKey: "nav.projects" },
  { to: "/sobre-mi", labelKey: "nav.about" },
  { to: "/dashboard", labelKey: "nav.dashboard" },
  { to: "/contacto", labelKey: "nav.contact" },
];

/** Footer minimalista: CTA corto, redes, enlaces y copyright. */
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-surface/30 pb-10 pt-16 backdrop-blur-sm">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-4xl text-content sm:text-5xl">
              {t("footer.cta1")} <span className="text-gradient">{t("footer.cta2")}</span>
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{t("footer.sub")}</p>
          </div>

          <Link
            to="/contacto"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-7 font-sans text-sm font-semibold text-inverse uppercase shadow-[0_0_28px_-8px_rgb(201_139_155/0.6)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
          >
            {t("footer.contact")}
            <ArrowUpRight className="size-4 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        {/* Fila inferior */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line/60 pt-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Logo />
            <div className="flex gap-2">
              {SOCIALS.map(({ href, label, labelKey, Icon }) => (
                <a
                  key={labelKey ?? label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label ?? t(labelKey)}
                  className="grid size-10 place-items-center rounded-full border border-line/70 text-muted transition-[transform,color,border-color] duration-fast hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
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
                  className="font-sans text-xs text-muted transition-colors duration-fast hover:text-accent"
                >
                  {t(l.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} María Bermúdez · Maracaibo, Venezuela
        </p>
      </div>
    </footer>
  );
}
