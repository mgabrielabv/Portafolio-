import { motion } from "framer-motion";
import { STACK_MAP } from "@/data/about";

/**
 * Mapa visual del stack: nodos orbitando alrededor de "María Stack"
 * conectados por líneas animadas. Solo decorativo + hover.
 */
export function SkillsMap() {
  return (
    <div className="glass glow-accent relative aspect-square w-full max-w-xl overflow-hidden rounded-[2rem]">
      <div aria-hidden className="bg-grid bg-grid-fade absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(139_92_246/0.16),transparent_60%)]"
      />

      {/* Líneas de conexión */}
      <svg aria-hidden className="absolute inset-0 size-full">
        {STACK_MAP.map((n) => (
          <line
            key={n.label}
            x1="50%"
            y1="50%"
            x2={`${n.x}%`}
            y2={`${n.y}%`}
            stroke="rgb(139 92 246 / 0.35)"
            strokeWidth="1"
            className="animate-dash"
          />
        ))}
      </svg>

      {/* Núcleo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          whileInView={{ scale: [0.9, 1.05, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass glow-accent grid size-28 place-items-center rounded-full text-center"
        >
          <div>
            <p className="font-display text-[13px] font-bold text-content">María</p>
            <p className="text-gradient font-display text-[13px] font-bold">Stack</p>
          </div>
        </motion.div>
      </div>

      {/* Nodos */}
      {STACK_MAP.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group absolute"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <span className="glass grid h-14 w-20 place-items-center rounded-full font-mono text-xs text-content transition-all duration-base group-hover:border-accent/60 group-hover:text-accent group-hover:shadow-[0_0_24px_-4px_rgb(139_92_246/0.7)]">
              {n.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
