import { Loader2 } from "lucide-react";
import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  /** Reemplaza el botón por su hijo (polimorfismo, útil para links). */
  asChild?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-2 text-[#07070c] shadow-[0_0_28px_-8px_rgb(139_92_246/0.6)] hover:brightness-110 focus-visible:outline-accent",
  accent:
    "border border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 focus-visible:outline-accent",
  secondary:
    "glass text-content hover:border-accent/50 hover:text-accent focus-visible:outline-accent",
  outline:
    "glass text-content hover:border-accent/60 hover:text-accent",
  ghost: "text-muted hover:bg-surface-2 hover:text-content",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-500",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-[11px] gap-1.5",
  md: "h-11 px-5 text-xs gap-2",
  lg: "h-13 px-7 text-xs gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  asChild,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-mono font-medium uppercase tracking-[0.12em]",
    "select-none transition-[transform,opacity,color,background-color,border-color,filter] duration-fast active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    VARIANTS[variant],
    SIZES[size],
    (disabled || loading) && "pointer-events-none opacity-60",
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, { className: classes });
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
}
