import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/estadisticas", label: "Stats" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/contacto", label: "Contacto" },
];

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-fast",
    isActive ? "text-content" : "text-muted hover:text-content",
  );

/** Navbar flotante estilo menú de aplicación: pill glass fija arriba al centro. */
export function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-5"
    >
      <nav
        aria-label="Principal"
        className="glass relative flex h-14 w-full max-w-4xl items-center justify-between gap-3 rounded-full px-3 pl-4 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6),0_0_0_1px_rgb(139_92_246/0.12)] sm:px-4"
      >
        <Logo />

        {/* Links desktop */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClasses}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-accent/12 ring-1 ring-accent/30"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden font-mono text-[11px] text-muted lg:inline">
                {user.name.split(" ")[0]}
              </span>
              <Link
                to="/admin"
                className="hidden h-9 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 font-mono text-[11px] tracking-[0.12em] text-[#07070c] uppercase shadow-[0_0_20px_-6px_rgb(139_92_246/0.7)] transition-transform duration-fast hover:scale-[1.03] active:scale-[0.98] md:inline-flex"
              >
                <LayoutDashboard className="size-3.5" aria-hidden />
                Panel
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="glass hidden h-9 items-center gap-2 rounded-full px-4 font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors duration-fast hover:text-content md:inline-flex"
              >
                <LogOut className="size-3.5" aria-hidden />
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden h-9 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 font-mono text-[11px] tracking-[0.12em] text-[#07070c] uppercase shadow-[0_0_20px_-6px_rgb(139_92_246/0.7)] transition-transform duration-fast hover:scale-[1.03] active:scale-[0.98] md:inline-flex"
            >
              <LogIn className="size-3.5" aria-hidden />
              Entrar
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="glass grid size-10 place-items-center rounded-full text-content transition-colors duration-fast hover:text-accent md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Menú móvil tipo aplicación */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-[-1] flex flex-col bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "block border-b border-line/60 py-5 font-display text-4xl font-medium tracking-tight transition-colors",
                        isActive ? "text-gradient" : "text-content/80 hover:text-content",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 pb-10"
            >
              {user ? (
                <div className="flex gap-3">
                  <Link
                    to="/admin"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 font-mono text-xs tracking-[0.12em] text-[#07070c] uppercase"
                  >
                    <LayoutDashboard className="size-4" aria-hidden />
                    Panel
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="glass inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full font-mono text-xs tracking-[0.12em] text-content uppercase"
                  >
                    <LogOut className="size-4" aria-hidden />
                    Salir
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 font-mono text-xs tracking-[0.12em] text-[#07070c] uppercase"
                >
                  <LogIn className="size-4" aria-hidden />
                  Iniciar sesión
                </Link>
              )}
              <p className="mt-6 text-center font-mono text-[11px] text-muted">
                maría bermúdez · digital workspace
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
