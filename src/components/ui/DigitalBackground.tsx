import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const LINK_DIST = 130;
const COUNT = 64;

/**
 * Fondo global fijo: red de partículas conectadas por líneas (canvas),
 * sobre una rejilla técnica y orbes de aurora violeta/cian.
 * Puro decorativo, respeta prefers-reduced-motion y se pausa al
 * perder foco para no gastar CPU.
 */
export function DigitalBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167,139,250,0.5)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    init();
    if (reduced) {
      draw();
    } else {
      tick();
    }

    const onResize = () => {
      init();
      if (reduced) draw();
    };
    const onFocus = () => {
      if (reduced) return;
      cancelAnimationFrame(raf);
      tick();
    };
    const onBlur = () => cancelAnimationFrame(raf);

    window.addEventListener("resize", onResize);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}
    >
      {/* Capa base: negro + radiales violeta/cian */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(130,80,255,0.16),transparent_42%),radial-gradient(circle_at_85%_85%,rgba(34,211,238,0.08),transparent_45%),radial-gradient(circle_at_50%_110%,rgba(139,92,246,0.12),transparent_55%)]" />

      {/* Rejilla técnica con máscara de degradado */}
      <div className="bg-grid bg-grid-fade absolute inset-0" />

      {/* Orbes de aurora */}
      <div className="animate-aurora absolute -top-32 -left-32 size-[28rem] rounded-full bg-accent/12 blur-[120px]" />
      <div
        className="animate-aurora absolute top-1/3 -right-40 size-[30rem] rounded-full bg-accent-2/8 blur-[130px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora absolute -bottom-40 left-1/4 size-96 rounded-full bg-accent/10 blur-[120px]"
        style={{ animationDelay: "-10s" }}
      />

      {/* Red de partículas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
