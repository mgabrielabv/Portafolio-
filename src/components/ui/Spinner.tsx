import { cn } from "@/utils/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-6 animate-spin text-accent", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-3A7 7 0 0 0 12 5z" />
    </svg>
  );
}

export function PageSpinner({ label = "Cargando…" }: { label?: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <Spinner className="size-8" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
