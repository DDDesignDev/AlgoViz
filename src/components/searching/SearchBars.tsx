"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SearchBar, SearchStep } from "@/types";

interface SearchBarsProps {
  bars: SearchBar[];
  currentStep: SearchStep | null;
}

function barStyle(state: string): React.CSSProperties {
  switch (state) {
    case "active":
      return {
        background: "#22D3EE",
        borderColor: "#22D3EE",
        color: "var(--bg-primary)",
        boxShadow: "0 0 20px rgba(34,211,238,0.4)",
        transform: "translateY(-4px)",
      };
    case "found":
      return {
        background: "#34D399",
        borderColor: "#34D399",
        color: "var(--bg-primary)",
        boxShadow: "0 0 24px rgba(52,211,153,0.5)",
        transform: "translateY(-6px)",
      };
    case "eliminated":
      return {
        background: "var(--surface-1)",
        borderColor: "var(--surface-3)",
        color: "var(--text-muted)",
        opacity: 0.4,
      };
    case "range":
      return {
        background: "rgba(167,139,250,0.12)",
        borderColor: "rgba(167,139,250,0.25)",
        color: "#A78BFA",
      };
    default:
      return {
        background: "var(--surface-4)",
        borderColor: "var(--border-bright)",
        color: "var(--text-secondary)",
      };
  }
}

const CARD_BASE: React.CSSProperties = {
  width: "44px",
  height: "48px",
  borderRadius: "10px",
  border: "1px solid",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.18s cubic-bezier(0.22, 1, 0.36, 1)",
  position: "relative",
  flexShrink: 0,
};

export default function SearchBars({ bars, currentStep }: SearchBarsProps) {
  return (
    <div className="w-full space-y-8">
      {/* ── Binary search pointer row ── */}
      {currentStep && currentStep.low !== undefined && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-8"
        >
          {[
            { label: "low",  value: currentStep.low,  color: "#22D3EE" },
            { label: "mid",  value: currentStep.mid,  color: "#FBBF24" },
            { label: "high", value: currentStep.high, color: "#A78BFA" },
          ].map(
            (p) =>
              p.value !== undefined && (
                <div key={p.label} className="flex items-center gap-2">
                  <span className="text-[11px] font-mono" style={{ color: p.color }}>
                    {p.label}
                  </span>
                  <span
                    className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: `${p.color}14`, border: `1px solid ${p.color}28`, color: p.color }}
                  >
                    {p.value}
                  </span>
                </div>
              )
          )}
        </motion.div>
      )}

      {/* ── Bar cards ── */}
      <div className="flex flex-wrap items-end justify-center gap-1.5">
        {bars.map((bar, i) => {
          const style = barStyle(bar.state);
          const isMid = currentStep?.mid === i;

          return (
            <div key={bar.index} className="relative flex flex-col items-center">
              {/* Mid pointer above */}
              <AnimatePresence>
                {isMid && (
                  <motion.div
                    layoutId="midPointer"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute font-mono font-bold"
                    style={{
                      top: "-20px",
                      fontSize: "9px",
                      color: "#FBBF24",
                      letterSpacing: "0.05em",
                    }}
                  >
                    mid
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ ...CARD_BASE, ...style }}>
                <span style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                  {bar.value}
                </span>
                <span style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", opacity: 0.6, marginTop: "2px" }}>
                  [{i}]
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer annotation ── */}
      <div className="text-center">
        <p className="text-[11px] font-mono text-text-muted">
          {bars.length} elements · indices 0 → {bars.length - 1}
          {currentStep?.found && (
            <span style={{ color: "#34D399" }}>
              {" "}· ✓ found at [{currentStep.foundIndex}]
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
