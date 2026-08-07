import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{"error 404"}</p>
      <p className="mt-6 font-display text-7xl font-bold tracking-tight text-content sm:text-8xl">
        <span className="text-stroke">4</span>0<span className="text-gradient">4</span>
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
          className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 font-mono text-xs tracking-[0.12em] text-[#07070c] uppercase shadow-[0_0_30px_-8px_rgb(139_92_246/0.6)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
        >
          <Home className="size-4" aria-hidden />
          Ir al inicio
        </Link>
        <Link
          to="/proyectos"
          className="glass inline-flex h-12 items-center gap-2 rounded-full px-6 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,background-color,border-color] duration-fast hover:border-accent/50 hover:text-accent active:scale-[0.97]"
        >
          <Compass className="size-4" aria-hidden />
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}
