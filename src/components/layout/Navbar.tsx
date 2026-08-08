import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { useI18n, type Lang } from "@/i18n";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { to: "/home", labelKey: "nav.home" },
  { to: "/proyectos", labelKey: "nav.projects" },
  { to: "/sobre-mi", labelKey: "nav.about" },
  { to: "/dashboard", labelKey: "nav.dashboard" },
  { to: "/contacto", labelKey: "nav.contact" },
];

const LANGS: Lang[] = ["es", "en"];

export function Navbar() {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-5"
    >
      <nav
        aria-label={t("nav.main")}
        className={cn(
          "relative flex h-14 w-full max-w-4xl items-center justify-between gap-3 rounded-full border px-3 pl-4 transition-all duration-base sm:px-4",
          scrolled
            ? "border-line/70 bg-surface/80 shadow-card backdrop-blur-xl"
            : "border-transparent bg-surface/30 backdrop-blur-md",
        )}
      >
        <Logo />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-3.5 py-2 font-sans text-[12px] font-medium tracking-wide transition-colors duration-fast",
                  isActive ? "text-content" : "text-muted hover:text-content",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {t(link.labelKey)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-accent/30 bg-accent/12"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t("nav.lang")}
            className="hidden items-center gap-0.5 rounded-full border border-line/70 p-0.5 md:flex"
          >
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "h-7 w-8 rounded-full font-mono text-[11px] font-medium uppercase transition-colors duration-fast",
                  lang === l ? "bg-accent/20 text-accent" : "text-muted hover:text-content",
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="hidden h-9 items-center gap-2 rounded-full border border-line/70 px-4 font-sans text-[12px] font-medium text-muted uppercase transition-colors duration-fast hover:border-accent/50 hover:text-accent md:inline-flex"
            >
              <LogOut className="size-3.5" aria-hidden />
              {t("nav.logout")}
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("nav.close") : t("nav.open")}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-line/70 text-content transition-colors duration-fast hover:border-accent/50 hover:text-accent md:hidden"
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
                        "block border-b border-line/60 py-5 font-display text-4xl transition-colors",
                        isActive ? "text-gradient" : "text-content/80 hover:text-content",
                      )
                    }
                  >
                    {t(link.labelKey)}
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
              <div
                role="group"
                aria-label={t("nav.lang")}
                className="mb-4 flex w-fit items-center gap-0.5 rounded-full border border-line/70 p-0.5"
              >
                {LANGS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={cn(
                      "h-8 w-10 rounded-full font-mono text-xs font-medium uppercase transition-colors duration-fast",
                      lang === l ? "bg-accent/20 text-accent" : "text-muted hover:text-content",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line/70 font-sans text-xs font-medium text-content uppercase"
              >
                <LogOut className="size-4" aria-hidden />
                {t("nav.logout")}
              </button>
              <p className="mt-6 text-center font-mono text-[11px] text-muted">
                maría bermúdez · portfolio
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
