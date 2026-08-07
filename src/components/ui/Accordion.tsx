import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Permite abrir varias secciones a la vez. */
  multiple?: boolean;
  defaultOpenIndex?: number;
  className?: string;
}

/** Acordeón accesible con animación de altura. */
export function Accordion({ items, multiple = false, defaultOpenIndex, className }: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpenIndex === undefined ? [] : [defaultOpenIndex]);
  const baseId = useId();

  const toggle = (index: number) => {
    setOpen((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : multiple ? [...prev, index] : [index],
    );
  };

  return (
    <div className={cn("divide-y divide-line/70 rounded-2xl border border-line/70 bg-surface/40 backdrop-blur-sm", className)}>
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={index}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2/60"
              >
                <span className="font-display font-medium text-content">{item.title}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-2 text-muted"
                  aria-hidden
                >
                  <ChevronDown className="size-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
