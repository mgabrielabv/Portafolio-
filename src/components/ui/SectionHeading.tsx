import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Número de índice editorial, ej. "01". */
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <RevealHeader align={align} className={className}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{eyebrow}</p>
      )}
      <div className={cn("mt-3 flex items-baseline gap-3", align === "center" && "justify-center")}>
        {index && <OdometerIndex value={index} />}
        <Tag className="font-display text-3xl text-content sm:text-4xl lg:text-5xl">
          {title}
        </Tag>
      </div>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </RevealHeader>
  );
}

/** Índice editorial tipo "01" que hace roll de dígitos al entrar en viewport. */
function OdometerIndex({ value }: { value: string }) {
  return (
    <span aria-hidden className="inline-flex font-mono text-sm text-accent">
      {value.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function RevealHeader({
  children,
  align,
  className,
}: {
  children: ReactNode;
  align: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(align === "center" && "text-center", className)}
    >
      {children}
    </motion.div>
  );
}
