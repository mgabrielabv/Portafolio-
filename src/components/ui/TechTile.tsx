import { cn } from "@/utils/cn";

/** Abreviación neutral en dos letras para cada tecnología. */
function abbr(name: string): string {
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
}

export function TechTile({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 font-mono text-xs font-medium text-muted",
        className,
      )}
      aria-hidden
    >
      {abbr(name)}
    </span>
  );
}

export function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {technologies.map((tech) => (
        <li key={tech} className="flex flex-col items-center gap-1.5">
          <TechTile name={tech} />
          <span className="max-w-20 text-center text-xs text-muted">{tech}</span>
        </li>
      ))}
    </ul>
  );
}
