import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor personalizado: punto central + anillo que sigue al ratón con
 * física de resorte y crece al pasar sobre elementos interactivos.
 * Se activa solo en dispositivos con hover fino y sin reduced-motion.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(hover.matches && !reduced.matches);
    update();
    hover.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      hover.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setActive(!!target?.closest("a, button, [role='tab'], input, textarea, select, [data-cursor]"));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      {/* Anillo */}
      <motion.div
        className="absolute rounded-full border border-accent/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: pressed ? 20 : active ? 44 : 30,
          height: pressed ? 20 : active ? 44 : 30,
          opacity: active ? 0.9 : 0.5,
          boxShadow: active
            ? "0 0 24px -4px rgb(139 92 246 / 0.7)"
            : "0 0 16px -4px rgb(139 92 246 / 0.4)",
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Punto */}
      <motion.div
        className="absolute size-1.5 rounded-full bg-accent-2"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
