import { cn } from "@/utils/cn";

/** Paleta estable de colores por tecnología (derivada de un hash del nombre). */
const TILES = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-fuchsia-500",
  "bg-lime-600",
];

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function abbr(name: string): string {
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
}

export function TechTile({ name, className }: { name: string; className?: string }) {
  const color = TILES[hashString(name.toLowerCase()) % TILES.length];
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl text-xs font-bold text-white",
        color,
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
