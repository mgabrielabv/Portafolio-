import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  /** Texto que va después del número, ej. "+". */
  suffix?: string;
  /** Rellenar con ceros a la izquierda, ej. pad=2 → "06". */
  pad?: number;
  duration?: number;
  className?: string;
}

/** Contador ascendente que se activa al entrar en viewport. */
export function CountUp({ to, suffix = "", pad = 0, duration = 1.5, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const display = String(value).padStart(pad, "0");
  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
