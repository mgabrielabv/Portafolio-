import { motion } from "framer-motion";
import { Spinner } from "@/components/ui/Spinner";

interface LoadingOverlayProps {
  message: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Pantalla de espera a pantalla completa, usada al iniciar sesión / crear cuenta. */
export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-0 z-50 grid place-items-center bg-bg/70 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="flex flex-col items-center gap-5 text-center"
      >
        <div className="relative">
          <span aria-hidden className="ping-ring absolute inset-0 rounded-full" />
          <div className="glass glow-rose relative grid size-20 place-items-center rounded-full">
            <Spinner className="size-8" />
          </div>
        </div>
        <p className="font-sans text-xs font-semibold tracking-[0.22em] text-content uppercase">
          {message}
        </p>
      </motion.div>
    </motion.div>
  );
}
