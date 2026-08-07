import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Layers, FolderOpen, Star, Cpu } from "lucide-react";
import { CATEGORIES } from "@/data/projects";
import type { Project } from "@/types";

const PALETTE = ["#8B5CF6", "#A78BFA", "#22D3EE", "#6366F1", "#C4B5FD"];

const AXIS = { fill: "#8c8ca5", fontSize: 11, fontFamily: "JetBrains Mono, monospace" };
const GRID = "rgba(255,255,255,0.06)";

const tooltipStyle = {
  backgroundColor: "rgba(13,13,20,0.95)",
  border: "1px solid rgba(139,92,246,0.35)",
  borderRadius: 12,
  fontSize: 12,
  fontFamily: "JetBrains Mono, monospace",
  color: "#F0F0F8",
};

export function StatsCharts({ projects, className }: { projects: Project[]; className?: string }) {
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
    for (const p of projects)
      counts.set(CATEGORIES[p.category].label, (counts.get(CATEGORIES[p.category].label) ?? 0) + 1);
    return [...counts.entries()].map(([name, value]) => ({ name, value }));
  }, [projects]);

  const yearData = useMemo(() => {
    const counts = new Map<number, number>();
    for (const p of projects) counts.set(p.year, (counts.get(p.year) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0] - b[0]).map(([year, value]) => ({ year, value }));
  }, [projects]);

  const uniqueTech = useMemo(() => new Set(projects.flatMap((p) => p.technologies)).size, [projects]);
  const featuredCount = projects.filter((p) => p.featured).length;
  const categoryCount = new Set(projects.map((p) => p.category)).size;

  const metrics = [
    { label: "Proyectos", value: projects.length, icon: Layers },
    { label: "Categorías", value: categoryCount, icon: FolderOpen },
    { label: "Destacados", value: featuredCount, icon: Star },
    { label: "Tecnologías", value: uniqueTech, icon: Cpu },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }, i) => (
          <div
            key={label}
            className="glass relative overflow-hidden rounded-2xl p-5 transition-transform duration-base hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div
              aria-hidden
              className="absolute -top-10 -right-10 size-24 rounded-full blur-2xl"
              style={{ background: i % 2 === 0 ? "rgba(201,169,138,0.25)" : "rgba(212,165,165,0.22)" }}
            />
            <span className="glass grid size-10 place-items-center rounded-xl text-accent">
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="mt-4 font-display text-3xl font-semibold text-content">{value}</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            Tecnologías utilizadas
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={techData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={3}
                  stroke="none"
                >
                  {techData.map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {techData.map((t, i) => (
              <span key={t.name} className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="size-2 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
                {t.name}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            Proyectos por categoría
          </h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="name" tick={AXIS} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            Evolución de proyectos por año
          </h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearData}>
                <defs>
                  <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="year" tick={AXIS} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fill="url(#violetGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
