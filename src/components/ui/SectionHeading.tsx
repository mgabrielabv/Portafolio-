import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <RevealHeader align={align} className={className}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
      )}
      <Tag className="text-3xl text-content sm:text-4xl">{title}</Tag>
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className={cn(align === "center" && "text-center", className)}
    >
      {children}
    </motion.div>
  );
}
