import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-7xl font-bold text-primary sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-content sm:text-3xl">
        Esta página se ha perdido en el espacio
      </h1>
      <p className="mt-3 text-sm text-muted sm:text-base">
        La ruta que buscas no existe o fue movida. Volvamos a tierra firme.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          <Home className="size-4" aria-hidden />
          Ir al inicio
        </Link>
        <Link
          to="/proyectos"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium text-content transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Compass className="size-4" aria-hidden />
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}
