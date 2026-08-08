import { Compass, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{t("notfound.tag")}</p>
      <p className="mt-6 font-display text-7xl font-bold tracking-tight text-content sm:text-8xl">
        <span className="text-stroke">4</span>0<span className="text-gradient">4</span>
      </p>
      <h1 className="mt-4 font-display text-2xl font-medium text-content sm:text-3xl">
        {t("notfound.title")}
      </h1>
      <p className="mt-3 text-sm text-muted sm:text-base">{t("notfound.desc")}</p>
      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-soft px-6 font-mono text-xs tracking-[0.12em] text-inverse uppercase shadow-[0_0_30px_-8px_rgb(201_139_155/0.65)] transition-[transform,filter] duration-fast hover:brightness-110 active:scale-[0.97]"
        >
          <Home className="size-4" aria-hidden />
          {t("notfound.home")}
        </Link>
        <Link
          to="/proyectos"
          className="glass inline-flex h-12 items-center gap-2 rounded-full px-6 font-mono text-xs tracking-[0.12em] text-content uppercase transition-[transform,color,background-color,border-color] duration-fast hover:border-accent/50 hover:text-accent active:scale-[0.97]"
        >
          <Compass className="size-4" aria-hidden />
          {t("notfound.projects")}
        </Link>
      </div>
    </div>
  );
}
