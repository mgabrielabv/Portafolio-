import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { DigitalBackground } from "@/components/ui/DigitalBackground";

/** Layout global: fondo digital + navbar flotante + transiciones de página. */
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
    <div className="cursor-custom relative flex min-h-dvh flex-col">
      <DigitalBackground />
      <Navbar />

      <div className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 14, scale: 0.995, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.995, filter: "blur(6px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>

      <CursorGlow />
    </div>
  );
}
