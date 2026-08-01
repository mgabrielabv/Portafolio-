import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  /** Si es true usa la variante de color primario. */
  primary?: boolean;
  dot?: boolean;
}

export function Badge({ children, className, primary, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        primary
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-line bg-surface-2 text-muted",
        className,
      )}
    >
      {dot && (
        <span className={cn("size-1.5 rounded-full", primary ? "bg-primary" : "bg-muted")} aria-hidden />
      )}
      {children}
    </span>
  );
}
