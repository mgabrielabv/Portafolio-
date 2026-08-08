import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid bg-grid-fade absolute inset-0" />
        <div
          className="animate-float absolute top-[-20%] left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(201_139_155/0.09),transparent_60%)] blur-3xl"
          style={{ animationDuration: "12s" }}
        />
        <div
          className="animate-float absolute bottom-[-20%] right-[-10%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgb(143_98_108/0.08),transparent_60%)] blur-3xl"
          style={{ animationDelay: "1.6s", animationDuration: "14s" }}
        />
        <div
          className="animate-float absolute top-[30%] left-[-8%] size-72 rounded-full bg-[radial-gradient(circle,rgb(201_139_155/0.07),transparent_60%)] blur-3xl"
          style={{ animationDelay: "0.8s", animationDuration: "10s" }}
        />
        <div className="bg-grain absolute inset-0" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 16, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}
