import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}

/** Tabs accesibles con indicador animado (layoutId). */
export function Tabs({ tabs, value, onChange, className, ariaLabel }: TabsProps) {
  const baseId = useId();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel ?? "Pestañas"}
      className={cn(
        "inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 scrollbar-thin",
        className,
      )}
    >
      {tabs.map((tab) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            id={`${baseId}-tab-${tab.value}`}
            aria-selected={selected}
            aria-controls={`${baseId}-panel-${tab.value}`}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              selected ? "text-content" : "text-muted hover:text-content",
            )}
          >
            {selected && (
              <motion.span
                layoutId={`${baseId}-pill`}
                className="absolute inset-0 rounded-full bg-surface-2 shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                aria-hidden
              />
            )}
            {tab.icon && <span className="relative z-10">{tab.icon}</span>}
            <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
