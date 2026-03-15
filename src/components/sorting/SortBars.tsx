"use client";

import { motion } from "framer-motion";
import { SortBar } from "@/types";
import { cn } from "@/lib/utils";

interface SortBarsProps {
  bars: SortBar[];
}

/* Returns inline style object for a bar based on its state */
function barStyle(state: string): React.CSSProperties {
  switch (state) {
    case "comparing":
      return { background: "#22D3EE", boxShadow: "0 0 18px rgba(34,211,238,0.45)" };
    case "swapping":
      return { background: "#FBBF24", boxShadow: "0 0 18px rgba(251,191,36,0.45)" };
    case "sorted":
      return { background: "rgba(52,211,153,0.65)", boxShadow: "none" };
    case "pivot":
      return { background: "#F472B6", boxShadow: "0 0 18px rgba(244,114,182,0.45)" };
    case "selected":
      return { background: "#A78BFA", boxShadow: "0 0 18px rgba(167,139,250,0.45)" };
    default:
      return { background: "var(--border-default)", boxShadow: "none" };
  }
}

const LABEL_THRESHOLD = 22;

export default function SortBars({ bars }: SortBarsProps) {
  const maxValue = Math.max(...bars.map((b) => b.value), 1);
  const showLabels = bars.length <= LABEL_THRESHOLD;

  return (
    <div className="flex items-end h-full w-full gap-px pb-6">
      {bars.map((bar) => {
        const heightPct = (bar.value / maxValue) * 90; // cap at 90% to leave breathing room
        const style = barStyle(bar.state);

        return (
          <motion.div
            key={bar.id}
            className="relative flex-1 min-w-0 flex flex-col items-center justify-end"
            style={{ height: "100%" }}
            layout
            transition={{ type: "spring", stiffness: 400, damping: 36 }}
          >
            <motion.div
              className="w-full rounded-t-[2px]"
              style={style}
              animate={{ height: `${heightPct}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            {showLabels && (
              <span
                className="absolute text-[9px] font-mono text-text-muted pointer-events-none"
                style={{ bottom: "-18px" }}
              >
                {bar.value}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
