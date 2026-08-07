import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface SparklineProps {
  data: number[];
  className?: string;
}

/**
 * Mini-gráfico de área para las cards del dashboard. Sintetiza una
 * serie uniforme de puntos (índice, valor) para animarla con Recharts.
 */
export function Sparkline({ data, className }: SparklineProps) {
  const points = useMemo(
    () => data.map((value, index) => ({ index, value })),
    [data],
  );

  return (
    <div className={className} aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8B5CF6"
            strokeWidth={1.6}
            fill="url(#sparkGrad)"
            isAnimationActive
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
