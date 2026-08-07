import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-surface-2", className)} aria-hidden />;
}

/** Skeleton de fila editorial para la lista de proyectos. */
export function ProjectCardSkeleton() {
  return (
    <div className="flex items-baseline gap-4 border-b border-line py-6">
      <Skeleton className="h-3 w-6" />
      <div className="flex-1">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="mt-2 h-3 w-1/4" />
      </div>
      <Skeleton className="hidden h-3 w-40 md:block" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-4 h-10 w-56" />
      <Skeleton className="mt-4 h-4 w-96 max-w-full" />
      <div className="mt-12 border-t border-line">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
