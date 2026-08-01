import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CarouselProps {
  slides: ReactNode[];
  className?: string;
  slideClassName?: string;
  /** Si se pasa, avanza solo cada `ms`. */
  autoplay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  ariaLabel?: string;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

/**
 * Carrusel con flechas, dots y swipe táctil.
 * Usado en el hero del Home y en la galería del detalle de proyecto.
 */
export function Carousel({
  slides,
  className,
  slideClassName,
  autoplay,
  showArrows = true,
  showDots = true,
  ariaLabel = "Carrusel",
}: CarouselProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count],
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(next, autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, next]);

  useEffect(() => {
    if (!count) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, count]);

  if (!count) return null;

  return (
    <div
      className={cn("group/carousel relative overflow-hidden", className)}
      role="region"
      aria-roledescription="carrusel"
      aria-label={ariaLabel}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 56) (delta < 0 ? next : prev)();
        touchStart.current = null;
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className={cn("will-change-transform", slideClassName)}
          aria-roledescription="slide"
          aria-label={`Diapositiva ${index + 1} de ${count}`}
        >
          {slides[index]}
        </motion.div>
      </AnimatePresence>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Diapositiva anterior"
            className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-content shadow-card backdrop-blur transition-all hover:scale-105 hover:bg-surface focus-visible:outline-primary opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 max-lg:opacity-100"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Diapositiva siguiente"
            className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-content shadow-card backdrop-blur transition-all hover:scale-105 hover:bg-surface focus-visible:outline-primary opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 max-lg:opacity-100"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la diapositiva ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-content" : "w-1.5 bg-content/30 hover:bg-content/60",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
