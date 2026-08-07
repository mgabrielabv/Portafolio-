import { CheckCircle2, Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { useState, type FormEvent } from "react";
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
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/contacto", label: "Contacto" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Introduce un email válido.");
      return;
    }
    if (message.trim().length < 4) {
      setError("El mensaje debe tener al menos 4 caracteres.");
      return;
    }
    setError("");
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      setEmail("");
      setMessage("");
      window.setTimeout(() => setStatus("idle"), 4000);
    }, 900);
  };

  return (
    <footer className="mt-24 border-t border-line bg-surface-2/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Estudiante de Ingeniería en Computación en la Universidad Rafael Urdaneta (Maracaibo).
              Creo interfaces claras, rápidas y accesibles, y aprendo algo nuevo cada día.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-muted transition-[transform,color,border-color] duration-fast hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="size-4.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.16em] text-content uppercase">Enlaces</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted transition-colors duration-fast hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="text-sm text-muted transition-colors duration-fast hover:text-accent"
                >
                  Acceso admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.16em] text-content uppercase">Escríbeme</h3>
            {status === "sent" ? (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 font-mono text-xs text-content">
                <CheckCircle2 className="size-4 text-accent" aria-hidden />
                ¡Mensaje enviado! Te respondo pronto.
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 flex flex-col gap-2.5" noValidate>
                <label className="sr-only" htmlFor="footer-email">
                  Tu email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="h-10 rounded-lg border border-line bg-surface px-3.5 text-sm text-content placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none"
                />
                <label className="sr-only" htmlFor="footer-msg">
                  Mensaje
                </label>
                <textarea
                  id="footer-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntame de tu proyecto…"
                  rows={3}
                  className="rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-content placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/25 focus:outline-none"
                />
                {error && (
                  <p role="alert" className="text-xs font-medium text-red-500">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-inverse px-5 font-mono text-[11px] tracking-[0.12em] text-bg uppercase transition-[transform,opacity] duration-fast hover:opacity-85 active:scale-[0.98] disabled:opacity-60"
                >
                  <Send className="size-3.5" aria-hidden />
                  {status === "sending" ? "Enviando…" : "Enviar"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Colofón */}
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} María Bermúdez. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[11px] text-muted">
            construido con react 19 · vite · tailwind v4 · fraunces + ibm plex mono
          </p>
        </div>
      </div>
    </footer>
  );
}
