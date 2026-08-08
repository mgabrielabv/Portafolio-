import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface SlotCounterProps {
  to: number;
  /** Duración del "tirado" de números aleatorios antes de estabilizar. */
  duration?: number;
  className?: string;
}

/**
 * Contador HUD con efecto slot-machine: ~0.8s de números aleatorios
 * que se van acercando al valor final antes de estabilizarse.
 */
export function SlotCounter({ to, duration = 0.8, className }: SlotCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      if (p < 1) {
        setValue(Math.floor(Math.random() * (to + 1)));
        raf = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value}
    </span>
  );
}
