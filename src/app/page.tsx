"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, BarChart3, Network, Search,
  Code2, Layers, GitBranch, Cpu, Zap,
  NetworkIcon,
} from "lucide-react";

const FEATURES = [
  {
    icon: BarChart3,
    label: "Sorting",
    title: "Sorting Algorithms",
    desc: "Animate comparisons, swaps, pivots, and shuffles across seven sorting algorithms.",
    accent: "cyan",
    accentHex: "#22D3EE",
    algorithms: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Bogo Sort"],
  },
  {
    icon: Network,
    label: "Pathfinding",
    title: "Pathfinding Algorithms",
    desc: "Draw walls, move nodes, and watch four algorithms explore the grid.",
    accent: "purple",
    accentHex: "#A78BFA",
    algorithms: ["BFS", "DFS", "Dijkstra's", "A* Search"],
  },
  {
    icon: Search,
    label: "Searching",
    title: "Searching Algorithms",
    desc: "Step through linear and binary search on sorted and unsorted arrays.",
    accent: "green",
    accentHex: "#34D399",
    algorithms: ["Linear Search", "Binary Search"],
  },
  {
    icon: NetworkIcon,
    label: "Binary Tree",
    title: "BST Algorithms",
    desc: "Visualize how nodes are inserted, searched, and traversed in a binary tree structure",
    accent: "orange",
    accentHex: "#fb923c",
    algorithms: ["BST Insert", "BST Search", "BFS Traversal", "DFS Traversal"],
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-accent-purple/[0.07] blur-[140px]" />
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent-cyan/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* ── Nav ─────────────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 border-b"
          style={{ borderColor: "var(--surface-5)", background: "var(--bg-header)", backdropFilter: "blur(20px)" }}
        >
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #22D3EE, #A78BFA)" }}
              >
                <Layers className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-[15px] text-text-primary tracking-tight">
                VizaRithm
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {["Sorting", "Pathfinding", "Searching", "Binary Tree"].map((item) => (
                <Link
                  key={item}
                  href="/visualizer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/DDDesignDev/VizaRithm"
                className="text-text-muted hover:text-text-secondary transition-colors"
                aria-label="GitHub"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <Link
                href="/visualizer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg transition-all"
                style={{
                  background: "rgba(34,211,238,0.12)",
                  border: "1px solid rgba(34,211,238,0.24)",
                  color: "#22D3EE",
                }}
              >
                Open app <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full"
                style={{
                  background: "rgba(34,211,238,0.08)",
                  border: "1px solid rgba(34,211,238,0.18)",
                  color: "#22D3EE",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-slow"
                />
                17 algorithms · Step-through · Open source
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-bold leading-[0.95] mb-7"
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              <span className="text-text-primary">Algorithms,</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(110deg, #22D3EE 0%, #A78BFA 55%, #F472B6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                made visible.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-text-secondary text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ fontWeight: 300 }}
            >
              An interactive visualization tool for sorting, pathfinding, and searching
              algorithms. Step through each operation, control speed, and understand
              complexity — all in real time.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <Link
                href="/visualizer"
                className="group inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
                style={{
                  background: "#22D3EE",
                  color: "var(--bg-primary)",
                  boxShadow: "0 0 0 1px #22D3EE, 0 4px 24px rgba(34,211,238,0.22)",
                }}
              >
                Start visualizing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="https://github.com/DDDesignDev/VizaRithm"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition-all text-text-secondary hover:text-text-primary"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
              >
                <Code2 className="w-4 h-4" /> View source
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Stats strip ─────────────────────────────────────────────── */}
        <motion.section
          className="max-w-6xl mx-auto px-6 pb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <div
            className="grid grid-cols-4 rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--surface-5)", background: "var(--surface-glass)" }}
          >
            {[
              { value: "17",   label: "Algorithms",   accent: "#22D3EE" },
              { value: "4",    label: "Categories",   accent: "#A78BFA" },
              { value: "∞",    label: "Step modes",   accent: "#34D399" },
              { value: "MIT",  label: "Open source",  accent: "#FBBF24" },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                className="py-7 text-center"
                style={{ borderRight: i < arr.length - 1 ? "1px solid var(--surface-5)" : undefined }}
              >
                <div
                  className="font-display text-3xl font-bold mb-1"
                  style={{ color: s.accent }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-text-muted tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Feature cards ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold text-text-primary mb-3" style={{ letterSpacing: "-0.02em" }}>
              Four categories, one tool
            </h2>
            <p className="text-text-secondary text-base max-w-lg">
              Every algorithm ships with complexity tables, plain-language descriptions,
              and live step annotations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-6 flex flex-col"
                style={{
                  background: "var(--surface-glass)",
                  border: "1px solid var(--surface-5)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${feat.accentHex}66, transparent)` }}
                />

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: `${feat.accentHex}14`, border: `1px solid ${feat.accentHex}22` }}
                >
                  <feat.icon className="w-5 h-5" style={{ color: feat.accentHex }} />
                </div>

                <p
                  className="text-xs font-mono font-semibold mb-2 uppercase tracking-widest"
                  style={{ color: feat.accentHex, opacity: 0.7 }}
                >
                  {feat.label}
                </p>

                <h3 className="font-display text-lg font-semibold text-text-primary mb-2" style={{ letterSpacing: "-0.015em" }}>
                  {feat.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">{feat.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {feat.algorithms.map((alg) => (
                    <span
                      key={alg}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                      style={{
                        background: "var(--surface-3)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {alg}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Highlights row ──────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Cpu,      title: "Pure step-generators",  desc: "All algorithm logic is decoupled from UI — each run produces an immutable snapshot array." },
              { icon: Zap,      title: "Sub-10ms playback",     desc: "Speed slider maps to 10–600ms delay. Toggle from slow teach mode to blazing fast." },
              { icon: GitBranch, title: "Easy to extend",       desc: "Add any new algorithm in three steps: constants entry, step function, one switch case." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: "var(--surface-1)", border: "1px solid var(--surface-4)" }}
              >
                <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0 mt-0.5"
                  style={{ border: "1px solid var(--surface-5)" }}>
                  <item.icon className="w-4 h-4 text-text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden p-12 text-center"
            style={{ background: "var(--surface-glass)", border: "1px solid var(--border-default)" }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-60"
                style={{
                  background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(167,139,250,0.12) 0%, transparent 70%)",
                }} />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4">Get started</p>
              <h2 className="font-display text-4xl font-bold text-text-primary mb-4" style={{ letterSpacing: "-0.025em" }}>
                Ready to explore?
              </h2>
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                No signup. No install. Open the visualizer and start learning.
              </p>
              <Link
                href="/visualizer"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all"
                style={{ background: "#22D3EE", color: "var(--bg-primary)", boxShadow: "0 4px 24px rgba(34,211,238,0.25)" }}
              >
                Open visualizer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid var(--surface-4)" }} className="py-8">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #22D3EE, #A78BFA)" }}
              >
                <Layers className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-xs font-mono text-text-muted">VizaRithm © {new Date().getFullYear()}</span>
            </div>
            <span className="text-xs text-text-muted hidden md:block">
              Next.js · TypeScript · Tailwind · Framer Motion
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
