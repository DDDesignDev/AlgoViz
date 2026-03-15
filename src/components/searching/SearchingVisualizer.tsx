"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Target, CheckCircle } from "lucide-react";
import { SearchBar, SearchStep, PlayState } from "@/types";
import { ALGORITHM_INFO } from "@/constants/algorithms";
import {
  generateLinearSearchSteps,
  generateBinarySearchSteps,
} from "@/lib/algorithms/searching";
import { generateSortedSearchBars, generateUnsortedSearchBars, speedToDelay } from "@/lib/utils";
import ControlBar from "@/components/ui/ControlBar";
import AlgorithmInfoPanel from "@/components/layout/AlgorithmInfoPanel";
import SearchBars from "./SearchBars";

const DEFAULT_SIZE = 28;

function getDefaultBars(algorithmId: string, size: number): SearchBar[] {
  return algorithmId === "binarySearch"
    ? generateSortedSearchBars(size)
    : generateUnsortedSearchBars(size);
}

function generateSteps(algorithmId: string, bars: SearchBar[], target: number): SearchStep[] {
  switch (algorithmId) {
    case "linearSearch": return generateLinearSearchSteps(bars, target);
    case "binarySearch": return generateBinarySearchSteps(bars, target);
    default:             return generateLinearSearchSteps(bars, target);
  }
}

export default function SearchingVisualizer({ algorithmId }: { algorithmId: string }) {
  const info = ALGORITHM_INFO[algorithmId];

  const [arraySize, setArraySize]     = useState(DEFAULT_SIZE);
  const [bars, setBars]               = useState<SearchBar[]>(() => getDefaultBars(algorithmId, DEFAULT_SIZE));
  const [targetInput, setTargetInput] = useState("");
  const [steps, setSteps]             = useState<SearchStep[]>([]);
  const [stepIndex, setStepIndex]     = useState(-1);
  const [currentStep, setCurrentStep] = useState<SearchStep | null>(null);
  const [playState, setPlayState]     = useState<PlayState>("idle");
  const [speed, setSpeed]             = useState(55);

  const intervalRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepsRef      = useRef<SearchStep[]>([]);
  const stepIndexRef  = useRef(-1);

  useEffect(() => {
    const nb = getDefaultBars(algorithmId, arraySize);
    setBars(nb); setSteps([]); setStepIndex(-1); setCurrentStep(null);
    setPlayState("idle"); setTargetInput(""); clearInterval(intervalRef.current!);
  }, [algorithmId]); // eslint-disable-line

  function handleGenerate() {
    clearInterval(intervalRef.current!);
    const nb = getDefaultBars(algorithmId, arraySize);
    setBars(nb); setSteps([]); setStepIndex(-1); setCurrentStep(null); setPlayState("idle");
  }

  function handleReset() {
    clearInterval(intervalRef.current!);
    setBars((p) => p.map((b) => ({ ...b, state: "default" })));
    setSteps([]); setStepIndex(-1); stepIndexRef.current = -1; setCurrentStep(null); setPlayState("idle");
  }

  function resolveTarget(): number {
    if (targetInput !== "" && !isNaN(Number(targetInput))) return Number(targetInput);
    const t = bars[Math.floor(Math.random() * bars.length)].value;
    setTargetInput(String(t));
    return t;
  }

  function prepareSteps(currentBars: SearchBar[], tgt: number): SearchStep[] {
    const s = generateSteps(algorithmId, currentBars.map((b) => ({ ...b, state: "default" })), tgt);
    stepsRef.current = s; setSteps(s); return s;
  }

  const advance = useCallback(() => {
    const next = stepIndexRef.current + 1;
    if (next >= stepsRef.current.length) { setPlayState("finished"); clearInterval(intervalRef.current!); return; }
    stepIndexRef.current = next; setStepIndex(next);
    const step = stepsRef.current[next];
    setBars(step.bars); setCurrentStep(step);
  }, []);

  function handlePlay() {
    const tgt = resolveTarget();
    let s = steps;
    if (!s.length) { s = prepareSteps(bars, tgt); stepIndexRef.current = -1; }
    setPlayState("playing");
    intervalRef.current = setInterval(advance, speedToDelay(speed));
  }
  function handlePause() { clearInterval(intervalRef.current!); setPlayState("paused"); }
  function handleStep() {
    const tgt = resolveTarget();
    let s = steps;
    if (!s.length) { s = prepareSteps(bars, tgt); stepIndexRef.current = -1; }
    const next = stepIndexRef.current + 1;
    if (next >= s.length) return;
    stepIndexRef.current = next; setStepIndex(next);
    const step = s[next]; setBars(step.bars); setCurrentStep(step);
    setPlayState(next === s.length - 1 ? "finished" : "paused");
  }

  useEffect(() => {
    if (playState === "playing") { clearInterval(intervalRef.current!); intervalRef.current = setInterval(advance, speedToDelay(speed)); }
  }, [speed]); // eslint-disable-line
  useEffect(() => () => clearInterval(intervalRef.current!), []);

  const progress = steps.length > 0 ? Math.round(((stepIndex + 1) / steps.length) * 100) : 0;

  return (
    <div className="flex h-full overflow-hidden">
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
              style={{ background: "rgba(52,211,153,0.08)", color: "#34D399", border: "1px solid rgba(52,211,153,0.16)" }}
            >
              Searching
            </span>
            {algorithmId === "binarySearch" && (
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{ background: "rgba(251,191,36,0.08)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.16)" }}
              >
                Sorted array
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Found banner */}
            <AnimatePresence>
              {currentStep?.found && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg"
                  style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", color: "#34D399" }}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Found at index {currentStep.foundIndex}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress */}
            <div className="flex items-center gap-2">
              {steps.length > 0 && (
                <span className="text-[11px] font-mono text-text-muted tabular-nums">
                  {stepIndex + 1} / {steps.length}
                </span>
              )}
              <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "var(--surface-5)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "#34D399" }}
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
            {/* Target input */}
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <input
                type="number"
                placeholder="Target…"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                disabled={playState === "playing"}
                className="w-20 h-7 px-2.5 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-muted outline-none disabled:opacity-40"
                style={{
                  background: "var(--surface-3)",
                  border: "1px solid var(--border-default)",
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(52,211,153,0.4)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border-default)"}
              />
            </div>

            {/* Array size */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-text-muted">Size</span>
              <input
                type="range" min={10} max={50} value={arraySize}
                disabled={playState === "playing"}
                onChange={(e) => {
                  const sz = Number(e.target.value); setArraySize(sz);
                  const nb = getDefaultBars(algorithmId, sz);
                  setBars(nb); setSteps([]); setStepIndex(-1); setCurrentStep(null); setPlayState("idle");
                }}
                className="w-16"
                style={{ accentColor: "#34D399" }}
              />
              <span className="text-[11px] font-mono text-text-muted tabular-nums w-4">{arraySize}</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={playState === "playing"}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
            >
              <Shuffle className="w-3 h-3" /> New
            </button>
          </ControlBar>
        </div>

        {/* ── Legend ── */}
        <div
          className="flex items-center gap-5 px-6 h-8 shrink-0"
          style={{ borderBottom: "1px solid var(--surface-3)", background: "var(--bg-primary)" }}
        >
          {[
            { color: "var(--border-default)", border: "var(--border-default)", label: "Default" },
            { color: "#22D3EE",                label: "Checking" },
            { color: "#34D399",                label: "Found" },
            { color: "var(--surface-2)", border: "var(--surface-3)", label: "Eliminated" },
            { color: "rgba(167,139,250,0.2)",  label: "In range" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ background: item.color, border: item.border ? `1px solid ${item.border}` : undefined }}
              />
              <span className="text-[11px] text-text-muted">{item.label}</span>
            </div>
          ))}
        </div>

        {/* ── Visualization ── */}
        <div className="flex-1 overflow-hidden flex items-center justify-center px-8 py-10" style={{ background: "var(--bg-primary)" }}>
          <SearchBars bars={bars} currentStep={currentStep} />
        </div>
      </div>

      {/* Info panel */}
      <aside
        className="w-64 overflow-y-auto shrink-0 p-4"
        style={{ borderLeft: "1px solid var(--surface-4)", background: "var(--bg-secondary)" }}
      >
        <AlgorithmInfoPanel algorithmId={algorithmId} currentStep={currentStep?.description} />
      </aside>
    </div>
  );
}
