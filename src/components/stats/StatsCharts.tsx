import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HoloCard } from "@/components/hud/HoloCard";
import { useI18n } from "@/i18n";
import type { Project } from "@/types";

const PALETTE = ["#C98B9B", "#8F626C", "#E7C3CC", "#B07A87", "#D9A9B3"];

const AXIS = { fill: "#A99D98", fontSize: 11, fontFamily: "JetBrains Mono, monospace" };
const GRID = "rgba(245,240,235,0.06)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;
  if (amt >= 0) {
    r = clamp(Math.round(r + (255 - r) * amt));
    g = clamp(Math.round(g + (255 - g) * amt));
    b = clamp(Math.round(b + (255 - b) * amt));
  } else {
    r = clamp(Math.round(r * (1 + amt)));
    g = clamp(Math.round(g * (1 + amt)));
    b = clamp(Math.round(b * (1 + amt)));
  }
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18, ease: EASE }}
      className="rounded-xl border border-accent/35 bg-[rgba(23,20,20,0.95)] px-3.5 py-2 font-mono text-xs text-content shadow-card backdrop-blur"
    >
      {label !== undefined && label !== "" && <p className="mb-1 text-muted">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex items-center gap-2 whitespace-nowrap">
          <span
            className="size-2 rounded-full"
            style={{ background: p.color ?? p.payload?.fill ?? "#C98B9B" }}
          />
          <span className="text-muted">{p.name}</span>
          <span className="ml-1 font-semibold text-accent">{p.value}</span>
        </p>
      ))}
    </motion.div>
  );
}

function ActiveDonutSlice(props: any) {
  const { outerRadius, innerRadius, ...rest } = props;
  return (
    <g filter="url(#sliceGlow)">
      <Sector {...rest} outerRadius={outerRadius + 7} innerRadius={innerRadius - 1} cornerRadius={4} />
    </g>
  );
}

function ActiveBar(props: any) {
  const { x, y, width, height, index } = props;
  if (width === undefined || height === undefined) return null;
  return (
    <g filter="url(#barGlow)">
      <rect
        x={x}
        y={y - 4}
        width={width}
        height={height + 4}
        rx={8}
        fill={`url(#barGrad-${(index ?? 0) % PALETTE.length})`}
      />
    </g>
  );
}

function CardTopLine() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
    />
  );
}

function BarSparks({ containerRef, start }: { containerRef: RefObject<HTMLDivElement | null>; start: boolean }) {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (!start) return;
    const el = containerRef.current;
    if (!el) return;
    const timer = window.setTimeout(() => {
      const cRect = el.getBoundingClientRect();
      const bars = el.querySelectorAll<SVGPathElement>(
        ".recharts-bar-rectangle path.recharts-rectangle:not(.recharts-bar-background-rectangle)",
      );
      const list = Array.from(bars).map((r, i) => {
        const b = r.getBoundingClientRect();
        return { id: i, x: b.left - cRect.left + b.width / 2, y: b.top - cRect.top };
      });
      setSparks(list);
    }, 820);
    return () => window.clearTimeout(timer);
  }, [containerRef, start]);

  return (
    <>
      {sparks.map((s, i) => (
        <span
          key={s.id}
          className="holo-spark"
          style={{ left: s.x, top: s.y, animationDelay: `${i * 45}ms` }}
        />
      ))}
    </>
  );
}

export function StatsCharts({ projects, className }: { projects: Project[]; className?: string }) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-60px" });
  const areaRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLSpanElement>(null);
  const barContainerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  const techData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) for (const t of p.technologies) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7);
  }, [projects]);

  const categoryData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      const label = t(`cat.${p.category}`);
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return [...counts.entries()].map(([name, value]) => ({ name, value }));
  }, [projects, t]);

  const yearData = useMemo(() => {
    const counts = new Map<number, number>();
    for (const p of projects) counts.set(p.year, (counts.get(p.year) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0] - b[0]).map(([year, value]) => ({ year, value }));
  }, [projects]);

  useEffect(() => {
    const ring = ringRef.current;
    if (!inView || !ring || reduce || techData.length === 0) return;
    const C = ring.getTotalLength();
    ring.style.transition = "none";
    ring.style.strokeDasharray = `${C} ${C}`;
    ring.style.strokeDashoffset = String(C);
    const raf = requestAnimationFrame(() => {
      ring.style.transition = `stroke-dashoffset 1.15s ${EASE.join(",")}`;
      ring.style.strokeDashoffset = "0";
    });
    return () => {
      cancelAnimationFrame(raf);
      ring.style.strokeDasharray = "";
      ring.style.strokeDashoffset = "";
      ring.style.transition = "";
    };
  }, [inView, reduce, techData]);

  useEffect(() => {
    const el = areaRef.current;
    if (!inView || !el || reduce || yearData.length === 0) return;
    const curves = el.querySelectorAll<SVGPathElement>(".recharts-area-curve");
    const areas = el.querySelectorAll<SVGPathElement>(".recharts-area-area");
    const curve = curves[curves.length - 1];
    const area = areas[areas.length - 1];
    if (!curve) return;
    const len = curve.getTotalLength();
    curve.style.transition = "none";
    curve.style.strokeDasharray = `${len} ${len}`;
    curve.style.strokeDashoffset = String(len);
    if (area) area.style.opacity = "0";

    const svg = curve.ownerSVGElement;
    const svgRect = svg?.getBoundingClientRect();
    const cRect = el.getBoundingClientRect();
    const spark = sparkRef.current;
    let raf2 = 0;

    if (spark && svgRect) {
      spark.style.opacity = "0";
      const t0 = performance.now();
      const DUR = 1400;
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / DUR);
        const pt = curve.getPointAtLength(p * len);
        spark.style.opacity = "1";
        spark.style.transform = `translate3d(${svgRect.left - cRect.left + pt.x - 4}px, ${svgRect.top - cRect.top + pt.y - 4}px, 0)`;
        if (p < 1) raf2 = requestAnimationFrame(step);
        else spark.style.opacity = "0";
      };
      raf2 = requestAnimationFrame(step);
    }

    const raf = requestAnimationFrame(() => {
      curve.style.transition = `stroke-dashoffset 1.4s ${EASE.join(",")}`;
      curve.style.strokeDashoffset = "0";
      if (area) {
        area.style.transition = "opacity 1.2s ease 0.4s";
        area.style.opacity = "1";
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
      curve.style.strokeDasharray = "";
      curve.style.strokeDashoffset = "";
      curve.style.transition = "";
      if (area) {
        area.style.opacity = "";
        area.style.transition = "";
      }
      if (spark) {
        spark.style.opacity = "";
        spark.style.transform = "";
      }
    };
  }, [inView, reduce, yearData]);

  const uniqueTech = useMemo(() => new Set(projects.flatMap((p) => p.technologies)).size, [projects]);

  return (
    <div ref={rootRef} className={className}>
      <div className="grid gap-6 lg:grid-cols-2">
        <HoloCard className="p-8">
          <CardTopLine />
          <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {t("chart.techs")}
          </h3>
          <div className="relative mt-4 h-64 [filter:drop-shadow(0_14px_30px_rgb(143_98_108/0.3))]">
            <motion.div
              animate={inView ? { opacity: 1 } : { opacity: 0.15 }}
              transition={{ duration: 1.15, ease: EASE }}
              className="absolute inset-0"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {PALETTE.map((c, i) => (
                      <linearGradient key={i} id={`donutGrad-${i}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={shade(c, 0.32)} />
                        <stop offset="45%" stopColor={c} />
                        <stop offset="100%" stopColor={shade(c, -0.16)} />
                      </linearGradient>
                    ))}
                    <filter id="sliceGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#C98B9B" floodOpacity="0.4" />
                    </filter>
                  </defs>
                  <circle
                    cx="50%"
                    cy="50%"
                    r={98}
                    fill="none"
                    stroke="rgba(201,139,155,0.16)"
                    strokeWidth={1}
                    strokeDasharray="2 7"
                  />
                  <Pie
                    data={techData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={88}
                    paddingAngle={3}
                    cornerRadius={4}
                    stroke="#171414"
                    strokeWidth={3}
                    isAnimationActive={false}
                    activeShape={ActiveDonutSlice}
                  >
                    {techData.map((_, i) => (
                      <Cell key={i} fill={`url(#donutGrad-${i % PALETTE.length})`} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
            {inView && !reduce && (
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="holo-orbit absolute inset-0 m-auto size-[176px]">
                  <span className="holo-head-dot" />
                </div>
                <svg
                  className="absolute inset-0 m-auto size-[176px]"
                  width="176"
                  height="176"
                  style={{ filter: "drop-shadow(0 0 7px rgb(201 139 155 / 0.8))" }}
                >
                  <circle
                    ref={ringRef}
                    cx="88"
                    cy="88"
                    r="87.5"
                    fill="none"
                    stroke="#C98B9B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform="rotate(-90 88 88)"
                  />
                </svg>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <motion.div
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="text-center"
              >
                <p className="font-display text-3xl font-semibold text-content">{uniqueTech}</p>
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  {t("chart.techsLabel")}
                </p>
              </motion.div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {techData.map((t, i) => (
              <span key={t.name} className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="size-2 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
                {t.name}
                <span className="text-accent">{t.value}</span>
              </span>
            ))}
          </div>
        </HoloCard>

        <HoloCard className="p-8">
          <CardTopLine />
          <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {t("chart.category")}
          </h3>
          <div
            ref={barContainerRef}
            className="relative mt-4 h-64 [filter:drop-shadow(0_12px_24px_rgb(143_98_108/0.22))]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <defs>
                  {PALETTE.map((c, i) => (
                    <linearGradient key={i} id={`barGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={shade(c, 0.3)} />
                      <stop offset="100%" stopColor={c} />
                    </linearGradient>
                  ))}
                  <filter id="barGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#C98B9B" floodOpacity="0.35" />
                  </filter>
                </defs>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="name" tick={AXIS} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 2, 2]}
                  barSize={36}
                  isAnimationActive={!reduce}
                  animationDuration={800}
                  animationEasing="ease-out"
                  background={{ fill: "rgba(245,240,235,0.05)", radius: 8 }}
                  activeBar={ActiveBar}
                >
                  <LabelList
                    dataKey="value"
                    position="top"
                    style={{ fill: "#C98B9B", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
                  />
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={`url(#barGrad-${i % PALETTE.length})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {inView && !reduce && <BarSparks containerRef={barContainerRef} start={inView} />}
          </div>
        </HoloCard>

        <HoloCard className="p-8 lg:col-span-2">
          <CardTopLine />
          <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {t("chart.year")}
          </h3>
          <div ref={areaRef} className="relative mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearData}>
                <defs>
                  <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8F626C" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8F626C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C98B9B" stopOpacity={0.45}>
                      {!reduce && <animate attributeName="stopOpacity" values="0.45;0.28;0.45" dur="7s" repeatCount="indefinite" />}
                    </stop>
                    <stop offset="0.35" stopColor="#E7C3CC" stopOpacity={0.12}>
                      {!reduce && <animate attributeName="offset" values="0.12;0.62;0.12" dur="9s" repeatCount="indefinite" />}
                    </stop>
                    <stop offset="100%" stopColor="#C98B9B" stopOpacity={0} />
                  </linearGradient>
                  <filter id="areaGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#C98B9B" floodOpacity="0.25" />
                  </filter>
                </defs>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="year" tick={AXIS} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="url(#wallGrad)"
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#C98B9B"
                  strokeWidth={2.5}
                  fill="url(#roseGrad)"
                  filter="url(#areaGlow)"
                  dot={{ r: 4, fill: "#171414", stroke: "#C98B9B", strokeWidth: 2 }}
                  activeDot={{ r: 5.5, fill: "#C98B9B", stroke: "#0D0C0C", strokeWidth: 2 }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            {inView && !reduce && (
              <span
                ref={sparkRef}
                aria-hidden
                className="holo-spark-dot pointer-events-none absolute top-0 left-0"
                style={{ opacity: 0 }}
              />
            )}
          </div>
        </HoloCard>
      </div>
    </div>
  );
}
