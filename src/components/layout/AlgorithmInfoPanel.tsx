"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, HardDrive, BookOpen, Tag } from "lucide-react";
import { ALGORITHM_INFO } from "@/constants/algorithms";

interface AlgorithmInfoPanelProps {
  algorithmId: string;
  currentStep?: string;
}

const ROW = "flex items-center justify-between py-2";
const LABEL = "text-xs text-text-muted";
const VALUE = "text-xs font-mono";

export default function AlgorithmInfoPanel({ algorithmId, currentStep }: AlgorithmInfoPanelProps) {
  const info = ALGORITHM_INFO[algorithmId];
  if (!info) return null;

  return (
    <div className="space-y-3">
      {/* ── Live step log ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {currentStep ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl p-3.5"
            style={{
              background: "rgba(34,211,238,0.05)",
              border: "1px solid rgba(34,211,238,0.14)",
            }}
          >
            <p className="text-[11px] font-mono leading-relaxed" style={{ color: "#22D3EE" }}>
              {currentStep}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl p-3.5"
            style={{ background: "var(--surface-1)", border: "1px solid var(--surface-4)" }}
          >
            <p className="text-[11px] font-mono text-text-muted">
              Press <span className="text-text-secondary">Run</span> or{" "}
              <span className="text-text-secondary">Step</span> to begin
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Algorithm name + category ─────────────────────────────── */}
      <Section>
        <p className="text-[11px] font-mono text-text-muted uppercase tracking-widest mb-1">
          {info.category}
        </p>
        <h2 className="font-display font-bold text-text-primary leading-tight" style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}>
          {info.name}
        </h2>
      </Section>

      {/* ── Description ───────────────────────────────────────────── */}
      <Section icon={BookOpen} label="Overview">
        <p className="text-xs text-text-secondary leading-[1.65]">{info.description}</p>
      </Section>

      {/* ── Complexity table ──────────────────────────────────────── */}
      <Section icon={Clock} label="Complexity">
        <div style={{ borderTop: "1px solid var(--surface-4)" }}>
          {[
            { key: "Best case",    val: info.timeComplexity.best,    color: "#34D399" },
            { key: "Average",      val: info.timeComplexity.average, color: "#FBBF24" },
            { key: "Worst case",   val: info.timeComplexity.worst,   color: "#F87171" },
          ].map((row) => (
            <div
              key={row.key}
              className={ROW}
              style={{ borderBottom: "1px solid var(--surface-3)" }}
            >
              <span className={LABEL}>{row.key}</span>
              <span className={VALUE} style={{ color: row.color }}>{row.val}</span>
            </div>
          ))}
          <div className={ROW} style={{ borderBottom: "1px solid var(--surface-3)" }}>
            <span className={LABEL + " flex items-center gap-1"}>
              <HardDrive className="w-3 h-3" /> Space
            </span>
            <span className={VALUE} style={{ color: "#A78BFA" }}>{info.spaceComplexity}</span>
          </div>
          {info.stable !== undefined && (
            <div className={ROW}>
              <span className={LABEL}>Stable sort</span>
              <span
                className={VALUE}
                style={{ color: info.stable ? "#34D399" : "#F87171" }}
              >
                {info.stable ? "Yes" : "No"}
              </span>
            </div>
          )}
        </div>
      </Section>

      {/* ── Use cases ─────────────────────────────────────────────── */}
      <Section icon={Tag} label="Best used for">
        <ul className="space-y-1.5 mt-0.5">
          {info.useCases.map((uc) => (
            <li key={uc} className="flex items-start gap-2">
              <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: "#34D399", opacity: 0.7 }} />
              <span className="text-xs text-text-secondary leading-relaxed">{uc}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  label,
  children,
}: {
  icon?: React.ElementType;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "var(--surface-1)", border: "1px solid var(--surface-4)" }}
    >
      {label && (
        <div className="flex items-center gap-1.5 mb-3">
          {Icon && <Icon className="w-3.5 h-3.5 text-text-muted" />}
          <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
            {label}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
