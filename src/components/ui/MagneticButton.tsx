import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Qué tanto se acerca al cursor (0 = sin efecto). */
  strength?: number;
}

/**
 * Botón "magnético": se desplaza levemente hacia el cursor al acercarse.
 * Se usa SOLO en el CTA principal. Se desactiva en touch y con
 * prefers-reduced-motion para no interferir con la accesibilidad.
 */
export function MagneticButton({ children, className, strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

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

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
