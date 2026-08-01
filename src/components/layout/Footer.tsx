import { CheckCircle2, Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const SOCIALS = [
  { href: "https://github.com/", label: "GitHub", Icon: Github },
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
                  className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-content">Enlaces rápidos</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/login" className="text-sm text-muted transition-colors hover:text-primary">
                  Acceso admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-content">Escríbeme</h3>
            {status === "sent" ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600">
                <CheckCircle2 className="size-4" aria-hidden />
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
                  className="h-10 rounded-xl border border-line bg-surface px-3.5 text-sm text-content placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
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
                  className="rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-content placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
                {error && (
                  <p role="alert" className="text-xs font-medium text-red-500">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-60"
                >
                  <Send className="size-3.5" aria-hidden />
                  {status === "sending" ? "Enviando…" : "Enviar"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-muted">© {new Date().getFullYear()} María Bermúdez. Todos los derechos reservados.</p>
          <p className="text-xs text-muted">
            Hecho con <span aria-hidden>♥</span> en React 19 · Vite · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
