import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, LogIn, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Principal">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-surface-2 text-content" : "text-muted hover:text-content",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-content"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-content transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <LayoutDashboard className="size-4" aria-hidden />
                  Panel
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="inline-flex h-10 items-center gap-2 rounded-full text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-content"
                >
                  <LogOut className="size-4" aria-hidden />
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90"
              >
                <LogIn className="size-4" aria-hidden />
                Entrar
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-content md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-line bg-surface md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive ? "bg-surface-2 text-content" : "text-muted hover:text-content",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-line pt-4">
                {user ? (
                  <>
                    <Link
                      to="/admin"
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-surface text-sm font-medium text-content"
                    >
                      <LayoutDashboard className="size-4" aria-hidden />
                      Panel
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-surface-2 text-sm font-medium text-content"
                    >
                      <LogOut className="size-4" aria-hidden />
                      Salir
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-white"
                  >
                    <LogIn className="size-4" aria-hidden />
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
