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
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
          <span aria-hidden>// </span>
          {eyebrow}
        </p>
      )}
      <div className={cn("mt-3 flex items-baseline gap-3", align === "center" && "justify-center")}>
        {index && (
          <span aria-hidden className="font-mono text-sm text-accent">
            {index}
          </span>
        )}
        <Tag className="text-3xl text-content sm:text-4xl">{title}</Tag>
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
