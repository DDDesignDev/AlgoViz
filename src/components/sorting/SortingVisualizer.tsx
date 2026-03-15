"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { SortBar, SortStep, PlayState } from "@/types";
import { ALGORITHM_INFO } from "@/constants/algorithms";
import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
} from "@/lib/algorithms/sorting";
import { generateRandomBars, speedToDelay } from "@/lib/utils";
import ControlBar from "@/components/ui/ControlBar";
import AlgorithmInfoPanel from "@/components/layout/AlgorithmInfoPanel";
import SortBars from "./SortBars";

const DEFAULT_SIZE = 42;

function generateSteps(algorithmId: string, bars: SortBar[]): SortStep[] {
  switch (algorithmId) {
    case "bubbleSort":    return generateBubbleSortSteps(bars);
    case "selectionSort": return generateSelectionSortSteps(bars);
    case "insertionSort": return generateInsertionSortSteps(bars);
    case "mergeSort":     return generateMergeSortSteps(bars);
    case "quickSort":     return generateQuickSortSteps(bars);
    case "heapSort":      return generateHeapSortSteps(bars);
    default:              return generateBubbleSortSteps(bars);
  }
}

export default function SortingVisualizer({ algorithmId }: { algorithmId: string }) {
  const info = ALGORITHM_INFO[algorithmId];

  const [arraySize, setArraySize]   = useState(DEFAULT_SIZE);
  const [bars, setBars]             = useState<SortBar[]>(() => generateRandomBars(DEFAULT_SIZE));
  const [steps, setSteps]           = useState<SortStep[]>([]);
  const [stepIndex, setStepIndex]   = useState(-1);
  const [playState, setPlayState]   = useState<PlayState>("idle");
  const [speed, setSpeed]           = useState(60);

  const intervalRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepsRef       = useRef<SortStep[]>([]);
  const stepIndexRef   = useRef(-1);

  useEffect(() => { handleReset(); }, [algorithmId]); // eslint-disable-line

  function handleGenerate() {
    clearInterval(intervalRef.current!);
    const nb = generateRandomBars(arraySize);
    setBars(nb); setSteps([]); setStepIndex(-1); setPlayState("idle");
  }

  function handleReset() {
    clearInterval(intervalRef.current!);
    setBars((p) => p.map((b) => ({ ...b, state: "default" })));
    setSteps([]); setStepIndex(-1); stepIndexRef.current = -1; setPlayState("idle");
  }

  function prepareSteps(currentBars: SortBar[]): SortStep[] {
    const s = generateSteps(algorithmId, currentBars.map((b) => ({ ...b, state: "default" })));
    stepsRef.current = s; setSteps(s); return s;
  }

  const advance = useCallback(() => {
    const next = stepIndexRef.current + 1;
    if (next >= stepsRef.current.length) {
      setPlayState("finished"); clearInterval(intervalRef.current!); return;
    }
    stepIndexRef.current = next;
    setStepIndex(next);
    setBars(stepsRef.current[next].bars);
  }, []);

  function handlePlay() {
    let s = steps, startIdx = stepIndex;
    if (!s.length) { s = prepareSteps(bars); startIdx = -1; stepIndexRef.current = -1; }
    if (startIdx >= s.length - 1) return;
    setPlayState("playing");
    intervalRef.current = setInterval(advance, speedToDelay(speed));
  }

  function handlePause() { clearInterval(intervalRef.current!); setPlayState("paused"); }

  function handleStep() {
    let s = steps;
    if (!s.length) { s = prepareSteps(bars); stepIndexRef.current = -1; }
    const next = stepIndexRef.current + 1;
    if (next >= s.length) return;
    stepIndexRef.current = next; setStepIndex(next); setBars(s[next].bars);
    setPlayState(next === s.length - 1 ? "finished" : "paused");
  }

  useEffect(() => {
    if (playState === "playing") {
      clearInterval(intervalRef.current!);
      intervalRef.current = setInterval(advance, speedToDelay(speed));
    }
  }, [speed]); // eslint-disable-line
  useEffect(() => () => clearInterval(intervalRef.current!), []);

  const currentDescription = stepIndex >= 0 && steps[stepIndex] ? steps[stepIndex].description : undefined;
  const progress = steps.length > 0 ? Math.round(((stepIndex + 1) / steps.length) * 100) : 0;

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Main canvas ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 h-12 shrink-0"
          style={{ borderBottom: "1px solid var(--surface-4)", background: "var(--bg-secondary)" }}
        >
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-text-primary text-sm tracking-tight">
              {info.name}
            </h1>
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded-md"
              style={{ background: "rgba(34,211,238,0.08)", color: "#22D3EE", border: "1px solid rgba(34,211,238,0.16)" }}
            >
              Sorting
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            {steps.length > 0 && (
              <span className="text-[11px] font-mono text-text-muted tabular-nums">
                {stepIndex + 1} / {steps.length}
              </span>
            )}
            <div
              className="w-28 h-0.5 rounded-full overflow-hidden"
              style={{ background: "var(--surface-5)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#22D3EE" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div
          className="flex items-center gap-4 px-6 h-11 shrink-0"
          style={{ borderBottom: "1px solid var(--surface-3)", background: "var(--bg-primary)" }}
        >
          <ControlBar
            playState={playState}
            speed={speed}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            onStep={handleStep}
            onSpeedChange={setSpeed}
          >
            {/* Array size */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-text-muted">Bars</span>
              <input
                type="range" min={10} max={80} value={arraySize}
                disabled={playState === "playing"}
                onChange={(e) => {
                  const sz = Number(e.target.value);
                  setArraySize(sz);
                  const nb = generateRandomBars(sz);
                  setBars(nb); setSteps([]); setStepIndex(-1); setPlayState("idle");
                }}
                className="w-16 range-purple"
                style={{ accentColor: "#A78BFA" }}
              />
              <span className="text-[11px] font-mono text-text-muted tabular-nums w-4">{arraySize}</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={playState === "playing"}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
            >
              <Shuffle className="w-3 h-3" /> Shuffle
            </button>
          </ControlBar>
        </div>

        {/* Visualization canvas */}
        <div
          className="flex-1 p-6 pt-8 overflow-hidden"
          style={{ background: "var(--bg-primary)" }}
        >
          <SortBars bars={bars} />
        </div>
      </div>

      {/* ── Info panel ──────────────────────────────────────────────── */}
      <aside
        className="w-64 overflow-y-auto shrink-0 p-4"
        style={{ borderLeft: "1px solid var(--surface-4)", background: "var(--bg-secondary)" }}
      >
        <AlgorithmInfoPanel algorithmId={algorithmId} currentStep={currentDescription} />
      </aside>
    </div>
  );
}
