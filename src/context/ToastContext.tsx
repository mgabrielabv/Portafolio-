import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS = {
  success: <CheckCircle2 className="size-5 text-accent" aria-hidden />,
  error: <XCircle className="size-5 text-red-500" aria-hidden />,
  info: <Info className="size-5 text-accent" aria-hidden />,
};

const BAR_COLORS: Record<ToastType, string> = {
  success: "bg-accent",
  error: "bg-red-500",
  info: "bg-accent",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((t) => t.filter((item) => item.id !== id));
  }, []);

  const push = useCallback(
    (type: ToastType, message: string) => {
      const id = ++idRef.current;
      setToasts((t) => [...t.slice(-2), { id, type, message }]);
      window.setTimeout(() => remove(id), 4200);
    },
    [remove],
  );

  const value: ToastContextValue = {
    toast: push,
    success: (m) => push("success", m),
    error: (m) => push("error", m),
    info: (m) => push("info", m),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ul
        aria-live="polite"
        className="pointer-events-none fixed top-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.li
              key={t.id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="pointer-events-auto relative overflow-hidden rounded-xl border border-line bg-surface shadow-card-lg"
            >
              <div className="flex items-start gap-3 p-3.5 pr-4">
                <span className="mt-0.5 shrink-0">{ICONS[t.type]}</span>
                <p className="text-sm font-medium text-content">{t.message}</p>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  aria-label="Cerrar notificación"
                  className="ml-auto rounded-md p-0.5 text-muted transition-colors hover:text-content"
                >
                  <XCircle className="size-4" aria-hidden />
                </button>
              </div>
              <motion.span
                className={cn("absolute bottom-0 left-0 h-0.5", BAR_COLORS[t.type])}
                initial={{ width: "100%" }}
                animate={{ width: 0 }}
                transition={{ duration: 4.2, ease: "linear" }}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}
