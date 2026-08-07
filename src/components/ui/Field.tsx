import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
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

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement>, FieldProps {
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, options, id: idProp, className, ...props },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell label={label} error={error} hint={hint} htmlFor={id}>
      <select
        ref={ref}
        id={id}
        className={cn(baseClasses, "h-11 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.75rem_center] bg-no-repeat pr-10", className)}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
});
