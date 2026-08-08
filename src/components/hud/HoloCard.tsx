import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/utils/cn";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HoloCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: boolean;
  levitate?: boolean;
  elevate?: boolean;
  scan?: boolean;
}

export function HoloCard({
  children,
  className,
  delay = 0,
  tilt = true,
  levitate = false,
  elevate = false,
  scan = true,
}: HoloCardProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("glass relative overflow-hidden rounded-2xl", className)}>
        <div className="relative h-full">
          <div className="holo-crt pointer-events-none absolute inset-0" />
          <div className="relative h-full">{children}</div>
        </div>
      </div>
    );
  }

  const shell = (
    <>
      <motion.div
        aria-hidden
        variants={{
          init: { opacity: 0 },
          enter: {
            opacity: [0, 0, 1, 0.45],
            transition: { duration: 0.75, times: [0, 0.55, 0.7, 1], delay: delay + 0.1 },
          },
        }}
        className="holo-neon pointer-events-none absolute inset-0"
      />
      {scan && (
        <motion.div
          aria-hidden
          variants={{
            init: { y: "-135%", opacity: 0 },
            enter: {
              y: ["-135%", "340%"],
              opacity: [0, 1, 1, 0],
              transition: { duration: 0.8, times: [0, 0.12, 0.82, 1], ease: "easeInOut", delay: delay + 0.32 },
            },
          }}
          className="holo-sweep pointer-events-none absolute inset-x-0 top-0 h-[30%]"
        />
      )}
      <div aria-hidden className="holo-crt pointer-events-none absolute inset-0" />
      <motion.div
        variants={{
          init: { opacity: 0, scale: 0.94 },
          enter: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: EASE, delay: delay + 0.3 } },
        }}
        whileHover={elevate ? { y: -2 } : undefined}
        transition={{ y: { duration: 0.3, ease: EASE } }}
        className="relative h-full"
      >
        {children}
      </motion.div>
    </>
  );

  const flicker = <div className="holo-flicker relative h-full">{shell}</div>;
  const body = levitate ? <div className="holo-levitate relative h-full">{flicker}</div> : flicker;

  return (
    <motion.div
      initial="init"
      whileInView="enter"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        init: { scaleY: 0.03, opacity: 0 },
        enter: {
          scaleY: 1,
          opacity: [0.35, 1, 0.5, 1, 0.62, 1],
          transition: { duration: 0.5, times: [0, 0.16, 0.32, 0.5, 0.68, 1], ease: EASE, delay },
        },
      }}
      style={{ transformOrigin: "top", perspective: 1100 }}
      className={cn("glass relative overflow-hidden rounded-2xl", className)}
    >
      {tilt ? (
        <TiltCard intensity={4} className="relative h-full">
          {body}
        </TiltCard>
      ) : (
        <div className="relative h-full">{body}</div>
      )}
    </motion.div>
  );
}
