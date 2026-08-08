import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";

interface SphereRing {
  rotateX?: number;
  rotateY?: number;
}

/** Aros de la esfera: ecuador + meridianos con inclinaciones distintas. */
const RINGS: SphereRing[] = [
  { rotateX: 90 },
  { rotateX: 35 },
  { rotateX: -35 },
  { rotateY: 90 },
  { rotateX: 90, rotateY: 30 },
];

interface TechNode {
  label: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

/** Nodos flotantes alrededor de la esfera con distinto delay de flotación. */
const TECH_NODES: TechNode[] = [
  { label: "React", left: "68%", top: "4%", delay: 0, duration: 6 },
  { label: "Node", left: "94%", top: "44%", delay: 1.2, duration: 6.8 },
  { label: "SQL", left: "62%", top: "92%", delay: 0.6, duration: 7.4 },
  { label: "Figma", left: "4%", top: "36%", delay: 1.8, duration: 6.4 },
];

/** Esfera 3D wireframe (estilo globo de red neuronal) rotando de forma infinita. */
export function WireframeSphere({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <div
      className={cn("relative mx-auto aspect-square w-full max-w-md select-none", className)}
      role="img"
      aria-label={t("home.hero.sphereAria")}
    >
      {/* Resplandor de fondo */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(201_139_155/0.14),transparent_68%)] blur-2xl"
      />

      {/* Globo wireframe */}
      <div
        className="absolute inset-[6%] animate-sphere"
        style={{ perspective: "900px", transformStyle: "preserve-3d" }}
        aria-hidden
      >
        {RINGS.map((ring, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-accent/30"
            style={{
              transform: `rotateX(${ring.rotateX ?? 0}deg)${ring.rotateY ? ` rotateY(${ring.rotateY}deg)` : ""}`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}
        {/* Núcleo */}
        <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/80 shadow-[0_0_28px_rgb(201_139_155/0.9)]" />
      </div>

      {/* Nodos de tecnologías orbitando */}
      {TECH_NODES.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.left, top: node.top }}
        >
          <span
            className="animate-float glass inline-flex items-center gap-1.5 rounded-full border-accent/40 px-3 py-1.5 font-mono text-[11px] tracking-wide text-accent"
            style={{ animationDelay: `${node.delay}s`, animationDuration: `${node.duration}s` }}
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
}
