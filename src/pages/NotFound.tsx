import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">{"// error 404"}</p>
      <p className="mt-6 font-display text-7xl font-light tracking-tight text-content sm:text-8xl">
        404<span className="text-accent">.</span>
      </p>
      <h1 className="mt-4 font-display text-2xl font-medium text-content sm:text-3xl">
        Esta página se ha perdido en el espacio
      </h1>
      <p className="mt-3 text-sm text-muted sm:text-base">
        La ruta que buscas no existe o fue movida. Volvamos a tierra firme.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-inverse px-6 font-mono text-xs tracking-[0.12em] text-bg uppercase transition-[transform,opacity] duration-fast hover:opacity-85 active:scale-[0.98]"
        >
          <Home className="size-4" aria-hidden />
          Ir al inicio
        </Link>
        <Link
          to="/proyectos"
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-line px-6 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,border-color] duration-fast hover:border-accent/60 hover:text-accent active:scale-[0.98]"
        >
          <Compass className="size-4" aria-hidden />
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}
