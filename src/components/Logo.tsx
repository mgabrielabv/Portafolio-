import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";
import { useI18n } from "@/i18n";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  const { t } = useI18n();
  return (
    <Link
      to="/home"
      onClick={onClick}
      aria-label={t("logo.home")}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-soft font-sans text-lg font-bold text-inverse shadow-[0_6px_28px_-8px_rgb(201_139_155/0.8)] ring-1 ring-accent/40 transition-transform duration-base group-hover:scale-105">
        M
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgb(245_240_235/0.35),transparent_60%)]"
        />
      </span>
      <span className="flex flex-col justify-center leading-none">
        <span className="font-sans text-lg font-bold tracking-tight text-content">
          María<span className="text-gradient">.</span>
        </span>
        <span className="mt-1 font-sans text-[10px] font-semibold tracking-[0.22em] text-muted uppercase">
          Bermúdez
        </span>
      </span>
    </Link>
  );
}
