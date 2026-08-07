import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/** Marca: tile con gradiente violeta→cian + wordmark. */
export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Ir al inicio"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/15 text-accent ring-1 ring-accent/30 transition-transform duration-fast group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 20 9 4" />
          <path d="M19 20 15 4" />
          <path d="M7 12h10" />
          <circle cx="12" cy="16" r="1.6" fill="#22D3EE" stroke="none" />
        </svg>
        <span aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(139_92_246/0.35),transparent_60%)]" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-content">
        María<span className="text-gradient">.</span>
      </span>
    </Link>
  );
}
