import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";

const baseClasses =
  "w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-content placeholder:text-muted/60 transition-all duration-fast focus:border-accent/60 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-accent/25";

interface FieldProps {
  label?: string;
  error?: string;
  hint?: string;
  rightSlot?: ReactNode;
  id?: string;
  className?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

function FieldShell({
  label,
  error,
  hint,
  htmlFor,
  id,
  children,
}: Pick<FieldProps, "label" | "error" | "hint"> & { htmlFor?: string; id?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor ?? id} className="text-sm font-medium text-content">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, rightSlot, id: idProp, className, ...props },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(baseClasses, "h-11", rightSlot && "pr-11", error && "border-red-500/70 focus:border-red-500 focus:ring-red-500/20", className)}
          {...props}
        />
        {rightSlot && <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightSlot}</div>}
      </div>
      {error && <span id={`${id}-error`} className="hidden" />}
    </FieldShell>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, id: idProp, className, ...props },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
      <textarea ref={ref} id={id} className={cn(baseClasses, "min-h-28 py-2.5", className)} {...props} />
    </FieldShell>
  );
});

export interface SelectProps extends InputHTMLAttributes<HTMLButtonElement>, FieldProps {
  options: { value: string; label: string }[];
  defaultValue?: string;
  value?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { label, error, hint, options, id: idProp, className, defaultValue, value, onChange, onBlur, name, ...props },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const [local, setLocal] = useState<string>(() =>
    String(defaultValue ?? value ?? options[0]?.value ?? ""),
  );

  const active = value !== undefined ? String(value) : local;
  const activeOption = options.find((o) => o.value === active) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onDocKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onDocKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onDocKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setHighlight(Math.max(options.findIndex((o) => o.value === active), 0));
  }, [open, active, options]);

  const choose = (v: string) => {
    setLocal(v);
    setOpen(false);
    onChange?.({ target: { name, value: v } } as unknown as ChangeEvent<HTMLButtonElement>);
    onBlur?.({} as unknown as FocusEvent<HTMLButtonElement>);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = options[highlight];
      if (opt) choose(opt.value);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
      <div ref={rootRef} className="relative">
        <button
          ref={ref}
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={!!error}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKeyDown}
          className={cn(
            baseClasses,
            "flex h-11 items-center justify-between gap-2 text-left",
            error && "border-red-500/70 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...(props as object)}
        >
          <span className="truncate">{activeOption?.label ?? "Seleccionar"}</span>
          <ChevronDown
            className={cn("size-4 shrink-0 text-muted transition-transform duration-fast", open && "rotate-180")}
            aria-hidden
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              aria-labelledby={id}
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-20 mt-1.5 max-h-60 w-full overflow-y-auto rounded-xl border border-line bg-surface-2/95 p-1 shadow-card-lg backdrop-blur-md scrollbar-thin"
            >
              {options.map((o, i) => (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={o.value === active}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => choose(o.value)}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-fast",
                      o.value === active
                        ? "bg-accent/20 text-accent"
                        : i === highlight
                          ? "bg-surface text-content"
                          : "text-muted hover:bg-surface hover:text-content",
                    )}
                  >
                    <span className="truncate">{o.label}</span>
                    {o.value === active && <Check className="size-3.5 shrink-0 text-accent" aria-hidden />}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </FieldShell>
  );
});
