"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BarChart3, Network, Search, Layers, Home, ChevronDown, GitBranch } from "lucide-react";
import {
  SORTING_ALGORITHMS,
  PATHFINDING_ALGORITHMS,
  SEARCHING_ALGORITHMS,
  ALGORITHM_INFO,
  TREE_ALGORITHMS,
} from "@/constants/algorithms";
import { AlgorithmCategory } from "@/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedAlgorithm: string;
  onSelect: (algId: string, category: AlgorithmCategory) => void;
  className?: string;
}

const CATEGORIES = [
  {
    id: "sorting" as AlgorithmCategory,
    label: "Sorting",
    icon: BarChart3,
    accentColor: "#22D3EE",
    accentBg: "rgba(34,211,238,0.08)",
    accentBorder: "rgba(34,211,238,0.18)",
    algorithms: SORTING_ALGORITHMS,
  },
  {
    id: "pathfinding" as AlgorithmCategory,
    label: "Pathfinding",
    icon: Network,
    accentColor: "#A78BFA",
    accentBg: "rgba(167,139,250,0.08)",
    accentBorder: "rgba(167,139,250,0.18)",
    algorithms: PATHFINDING_ALGORITHMS,
  },
  {
    id: "searching" as AlgorithmCategory,
    label: "Searching",
    icon: Search,
    accentColor: "#34D399",
    accentBg: "rgba(52,211,153,0.08)",
    accentBorder: "rgba(52,211,153,0.18)",
    algorithms: SEARCHING_ALGORITHMS,
  },
  {
    id: "tree" as AlgorithmCategory,
    label: "Trees",
    icon: GitBranch,
    accentColor: "#A78BFA",
    accentBg: "rgba(167,139,250,0.08)",
    accentBorder: "rgba(167,139,250,0.18)",
    algorithms: TREE_ALGORITHMS,
  },
];

export default function Sidebar({ selectedAlgorithm, onSelect, className }: SidebarProps) {
  const activeCat = CATEGORIES.find((c) => c.algorithms.includes(selectedAlgorithm));
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    sorting: true,
    pathfinding: true,
    searching: true,
    tree: true
  });

  function toggle(id: string) {
    setExpanded((p) => ({ ...p, [id]: !p[id] }));
  }

  return (
    <aside
      className={cn("w-56 flex flex-col h-full overflow-y-auto shrink-0", className)}
      style={{ borderRight: "1px solid var(--surface-4)", background: "var(--bg-secondary)" }}
    >
      {/* ── Logo ────────────────────────────────────────────────────── */}
      <div
        className="px-4 h-12 flex items-center gap-2.5 shrink-0"
        style={{ borderBottom: "1px solid var(--surface-4)" }}
      >
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #22D3EE, #A78BFA)" }}
        >
          <Layers className="w-3 h-3 text-white" />
        </div>
        <span className="font-display font-bold text-sm text-text-primary tracking-tight">
          AlgoViz
        </span>
      </div>

      {/* ── Home link ───────────────────────────────────────────────── */}
      <div className="px-2 pt-3 pb-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-text-muted hover:text-text-secondary transition-colors text-xs"
        >
          <Home className="w-3.5 h-3.5" />
          Home
        </Link>
      </div>

      {/* ── Category groups ─────────────────────────────────────────── */}
      <nav className="flex-1 px-2 pt-2 pb-6 space-y-1">
        {CATEGORIES.map((cat) => (
          <div key={cat.id}>
            {/* Category header — clickable to collapse */}
            <button
              onClick={() => toggle(cat.id)}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg group transition-colors hover:bg-bg-hover"
            >
              <div className="flex items-center gap-2">
                <cat.icon className="w-3.5 h-3.5" style={{ color: cat.accentColor, opacity: 0.7 }} />
                <span
                  className="text-[11px] font-mono font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cat.label}
                </span>
              </div>
              <ChevronDown
                className="w-3 h-3 text-text-muted transition-transform duration-200"
                style={{ transform: expanded[cat.id] ? "rotate(0deg)" : "rotate(-90deg)" }}
              />
            </button>

            {/* Algorithm list */}
            <AnimatePresence initial={false}>
              {expanded[cat.id] && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5 pb-2">
                    {cat.algorithms.map((algId) => {
                      const info = ALGORITHM_INFO[algId];
                      const isActive = selectedAlgorithm === algId;

                      return (
                        <button
                          key={algId}
                          onClick={() => onSelect(algId, cat.id)}
                          className="relative w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all group"
                          style={
                            isActive
                              ? {
                                  background: cat.accentBg,
                                  border: `1px solid ${cat.accentBorder}`,
                                  color: cat.accentColor,
                                }
                              : {
                                  border: "1px solid transparent",
                                  color: "var(--text-secondary)",
                                }
                          }
                        >
                          {/* Active bar */}
                          {isActive && (
                            <motion.div
                              layoutId="sidebarActiveBar"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                              style={{ background: cat.accentColor }}
                            />
                          )}
                          <span className={cn("font-medium pl-2", !isActive && "group-hover:text-text-primary transition-colors")}>
                            {info.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <div
        className="px-4 py-3 shrink-0"
        style={{ borderTop: "1px solid var(--surface-3)" }}
      >
        <p className="text-[10px] font-mono text-text-muted">v1.0 · MIT License</p>
      </div>
    </aside>
  );
}
