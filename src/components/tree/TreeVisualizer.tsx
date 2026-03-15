"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Shuffle, CheckCircle } from "lucide-react";
import { TreeMap, TreeStep, PlayState, TreeTraversalOrder } from "@/types";
import { ALGORITHM_INFO } from "@/constants/algorithms";
import {
  buildBST,
  generateBSTInsertSteps,
  generateBSTSearchSteps,
  generateBFSTraversalSteps,
  generateDFSTraversalSteps,
  computeLayout,
  resetIdCounter,
} from "@/lib/algorithms/tree";
import { speedToDelay } from "@/lib/utils";
import ControlBar from "@/components/ui/ControlBar";
import AlgorithmInfoPanel from "@/components/layout/AlgorithmInfoPanel";
import TreeCanvas from "./TreeCanvas";

// A balanced default set of values
const DEFAULT_VALUES = [40, 20, 60, 10, 30, 50, 70, 5, 15, 25, 35];

function generateRandomValues(): number[] {
  const vals = new Set<number>();
  // Start with a root in mid-range to avoid degenerate trees
  vals.add(40 + Math.floor(Math.random() * 20) - 10);
  while (vals.size < 10) {
    vals.add(Math.floor(Math.random() * 90) + 5);
  }
  return Array.from(vals);
}

export default function TreeVisualizer({ algorithmId }: { algorithmId: string }) {
  const info = ALGORITHM_INFO[algorithmId];

  const [rootId, setRootId]         = useState<number | null>(null);
  const [nodes, setNodes]           = useState<TreeMap>({});
  const [steps, setSteps]           = useState<TreeStep[]>([]);
  const [stepIndex, setStepIndex]   = useState(-1);
  const [playState, setPlayState]   = useState<PlayState>("idle");
  const [speed, setSpeed]           = useState(55);
  const [insertInput, setInsertInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [traversalOrder, setTraversalOrder] = useState<TreeTraversalOrder>("inorder");
  const [currentDesc, setCurrentDesc] = useState("");
  const [found, setFound]           = useState<boolean | null>(null);

  const intervalRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepsRef      = useRef<TreeStep[]>([]);
  const stepIndexRef  = useRef(-1);
  const rootIdRef     = useRef<number | null>(null);

  // Build initial tree
  useEffect(() => {
    resetIdCounter();
    const { nodes: n, rootId: r } = buildBST(DEFAULT_VALUES);
    setNodes(n);
    setRootId(r);
    rootIdRef.current = r;
  }, []);

  useEffect(() => { handleReset(); }, [algorithmId]); // eslint-disable-line

  function handleReset() {
    clearInterval(intervalRef.current!);
    setPlayState("idle");
    setSteps([]); setStepIndex(-1); stepIndexRef.current = -1; stepsRef.current = [];
    setCurrentDesc(""); setFound(null);
    // Restore node states without rebuilding the tree
    setNodes((prev) => {
      const out: TreeMap = {};
      for (const id in prev) out[id] = { ...prev[id], state: "default" };
      return out;
    });
  }

  function handleRandomize() {
    clearInterval(intervalRef.current!);
    resetIdCounter();
    const vals = generateRandomValues();
    const { nodes: n, rootId: r } = buildBST(vals);
    setNodes(n); setRootId(r); rootIdRef.current = r;
    setSteps([]); setStepIndex(-1); stepIndexRef.current = -1; stepsRef.current = [];
    setCurrentDesc(""); setFound(null); setPlayState("idle");
  }

  function handleInsert() {
    const val = parseInt(insertInput);
    if (isNaN(val)) return;
    handleReset();
    const s = generateBSTInsertSteps(nodes, rootId, val);
    // After the last step, rootId might be new if tree was empty
    // The steps carry the new nodes, so we just need to apply the final step
    stepsRef.current = s; setSteps(s);
    setInsertInput("");
  }

  function prepareSteps(): TreeStep[] {
    let s: TreeStep[] = [];
    if (algorithmId === "bstInsert") {
      const val = parseInt(insertInput) || 45;
      s = generateBSTInsertSteps(nodes, rootId, val);
    } else if (algorithmId === "bstSearch") {
      const val = parseInt(searchInput) || 30;
      s = generateBSTSearchSteps(nodes, rootId, val);
    } else if (algorithmId === "bfsBST") {
      s = generateBFSTraversalSteps(nodes, rootId);
    } else if (algorithmId === "dfsBST") {
      s = generateDFSTraversalSteps(nodes, rootId, traversalOrder);
    }
    stepsRef.current = s; setSteps(s);
    return s;
  }

  const advance = useCallback(() => {
    const next = stepIndexRef.current + 1;
    if (next >= stepsRef.current.length) {
      setPlayState("finished"); clearInterval(intervalRef.current!);
      return;
    }
    stepIndexRef.current = next; setStepIndex(next);
    const step = stepsRef.current[next];
    setNodes(step.nodes); setCurrentDesc(step.description);
    // Detect "found" state
    const hasFound = Object.values(step.nodes).some((n) => n.state === "found");
    if (hasFound) setFound(true);
  }, []);

  function handlePlay() {
    let s = steps;
    if (!s.length) { s = prepareSteps(); stepIndexRef.current = -1; }
    setPlayState("playing");
    intervalRef.current = setInterval(advance, speedToDelay(speed));
  }
  function handlePause() { clearInterval(intervalRef.current!); setPlayState("paused"); }
  function handleStep() {
    let s = steps;
    if (!s.length) { s = prepareSteps(); stepIndexRef.current = -1; }
    const next = stepIndexRef.current + 1;
    if (next >= s.length) return;
    stepIndexRef.current = next; setStepIndex(next);
    const step = s[next]; setNodes(step.nodes); setCurrentDesc(step.description);
    setPlayState(next === s.length - 1 ? "finished" : "paused");
  }

  // Apply final step's nodes to the tree state when insert finishes
  useEffect(() => {
    if (playState === "finished" && algorithmId === "bstInsert" && steps.length > 0) {
      const finalNodes = steps[steps.length - 1].nodes;
      // Find the new rootId (node with no parent)
      const newRoot = Object.values(finalNodes).find((n) => n.parent === null);
      if (newRoot) { setRootId(newRoot.id); rootIdRef.current = newRoot.id; }
      setNodes(finalNodes);
    }
  }, [playState]); // eslint-disable-line

  useEffect(() => {
    if (playState === "playing") {
      clearInterval(intervalRef.current!);
      intervalRef.current = setInterval(advance, speedToDelay(speed));
    }
  }, [speed]); // eslint-disable-line
  useEffect(() => () => clearInterval(intervalRef.current!), []);

  const progress = steps.length > 0 ? Math.round(((stepIndex + 1) / steps.length) * 100) : 0;
  const nodeCount = Object.keys(nodes).length;

  return (
    <div className="flex h-full min-h-0 overflow-hidden flex-col lg:flex-row">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-6 h-12 shrink-0"
          style={{ borderBottom: "1px solid var(--surface-4)", background: "var(--bg-secondary)" }}
        >
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-text-primary text-sm tracking-tight">{info.name}</h1>
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded-md"
              style={{ background: "rgba(167,139,250,0.08)", color: "#A78BFA", border: "1px solid rgba(167,139,250,0.16)" }}
            >
              Binary Tree
            </span>
          </div>
          <div className="flex items-center gap-5 mr-2">
            <div>
              <span className="text-xs font-display font-bold" style={{ color: "#A78BFA" }}>{nodeCount}</span>
              <span className="text-[10px] text-text-muted ml-1.5">nodes</span>
            </div>
            <AnimatePresence>
              {found && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg"
                  style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", color: "#34D399" }}
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Found
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-2">
              {steps.length > 0 && (
                <span className="text-[11px] font-mono text-text-muted tabular-nums">{stepIndex + 1} / {steps.length}</span>
              )}
              <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "var(--surface-5)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "#A78BFA" }}
                  animate={{ width: `${progress}%` }} transition={{ duration: 0.08 }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div
          className="flex items-center gap-3 px-6 h-11 shrink-0 flex-wrap"
          style={{ borderBottom: "1px solid var(--surface-3)", background: "var(--bg-primary)" }}
        >
          <ControlBar
            playState={playState} speed={speed}
            onPlay={handlePlay} onPause={handlePause}
            onReset={handleReset} onStep={handleStep}
            onSpeedChange={setSpeed}
          >
            {/* Algorithm-specific controls */}
            {algorithmId === "bstInsert" && (
              <div className="flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-text-muted" />
                <input
                  type="number" placeholder="Value…" value={insertInput}
                  onChange={(e) => setInsertInput(e.target.value)}
                  disabled={playState === "playing"}
                  className="w-20 h-7 px-2.5 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-muted outline-none disabled:opacity-40"
                  style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(167,139,250,0.4)"}
                  onBlur={(e)  => e.target.style.borderColor = "var(--border-default)"}
                />
              </div>
            )}
            {algorithmId === "bstSearch" && (
              <div className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-text-muted" />
                <input
                  type="number" placeholder="Search…" value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  disabled={playState === "playing"}
                  className="w-20 h-7 px-2.5 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-muted outline-none disabled:opacity-40"
                  style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(52,211,153,0.4)"}
                  onBlur={(e)  => e.target.style.borderColor = "var(--border-default)"}
                />
              </div>
            )}
            {algorithmId === "dfsBST" && (
              <div
                className="flex items-center gap-0.5 rounded-lg p-0.5"
                style={{ background: "var(--surface-3)", border: "1px solid var(--surface-5)" }}
              >
                {(["preorder", "inorder", "postorder"] as TreeTraversalOrder[]).map((o) => (
                  <button key={o} onClick={() => { setTraversalOrder(o); handleReset(); }}
                    className="h-6 px-2 rounded-md text-[11px] font-medium transition-all"
                    style={traversalOrder === o
                      ? { background: "rgba(167,139,250,0.14)", color: "#A78BFA", border: "1px solid rgba(167,139,250,0.22)" }
                      : { color: "var(--text-secondary)" }
                    }
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleRandomize}
              disabled={playState === "playing"}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
            >
              <Shuffle className="w-3 h-3" /> New tree
            </button>
          </ControlBar>
        </div>

        {/* ── Legend ── */}
        <div
          className="flex items-center gap-5 px-6 h-8 shrink-0"
          style={{ borderBottom: "1px solid var(--surface-3)", background: "var(--bg-primary)" }}
        >
          {[
            { color: "rgba(34,211,238,0.5)",  border: "#22D3EE", label: "Comparing" },
            { color: "rgba(251,191,36,0.5)",  border: "#FBBF24", label: "Visiting" },
            { color: "rgba(52,211,153,0.5)",  border: "#34D399", label: "Found / done" },
            { color: "rgba(167,139,250,0.5)", border: "#A78BFA", label: "Inserting" },
            { color: "var(--border-bright)", border: "var(--border-bright)", label: "On path" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color, border: `1px solid ${item.border}` }} />
              <span className="text-[11px] text-text-muted">{item.label}</span>
            </div>
          ))}
        </div>

        {/* ── Canvas ── */}
        <div className="flex-1 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
          <TreeCanvas nodes={nodes} rootId={rootId} />
        </div>
      </div>

      {/* ── Info panel ── */}
      <aside
        className="w-full lg:w-80 overflow-y-auto shrink-0 p-4 max-h-[42vh] lg:max-h-none border-t lg:border-t-0 lg:border-l"
        style={{ borderColor: "var(--surface-4)", background: "var(--bg-secondary)" }}
      >
        <AlgorithmInfoPanel algorithmId={algorithmId} currentStep={currentDesc || undefined} />
      </aside>
    </div>
  );
}
