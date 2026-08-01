import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Ir al inicio"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-white shadow-sm transition-transform group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 17 12 5l8 12" />
          <circle cx="12" cy="14" r="1.8" fill="#A3E635" stroke="none" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-content">
        María<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
