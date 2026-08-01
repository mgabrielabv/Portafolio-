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
    "bg-primary text-white shadow-sm hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-primary",
  accent:
    "bg-accent text-zinc-900 shadow-sm hover:bg-accent-soft active:scale-[0.98] focus-visible:outline-accent",
  secondary:
    "bg-surface-2 text-content hover:bg-surface-2/70 active:scale-[0.98]",
  outline:
    "border border-line bg-transparent text-content hover:border-primary/50 hover:text-primary",
  ghost: "text-muted hover:bg-surface-2 hover:text-content",
  danger: "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
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
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200",
    "select-none focus-visible:outline-2 focus-visible:outline-offset-2",
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
