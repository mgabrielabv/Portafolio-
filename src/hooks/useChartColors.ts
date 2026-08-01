import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

/** Lee los tokens de color del tema actual para usarlos en los gráficos. */
export function useChartColors() {
  const { theme } = useTheme();
  return useMemo(() => {
    const s = getComputedStyle(document.documentElement);
    const triple = (name: string) => s.getPropertyValue(name).trim();
    void theme; // dependencia intencional: re-evaluar los tokens CSS al cambiar de tema
    return {
      content: `rgb(${triple("--content")})`,
      muted: `rgb(${triple("--muted")})`,
      line: `rgb(${triple("--line")})`,
      grid: `rgb(${triple("--line")})`,
      primary: s.getPropertyValue("--primary").trim(),
      accent: s.getPropertyValue("--accent").trim(),
      surface: `rgb(${triple("--surface")})`,
    };
  }, [theme]);
}
