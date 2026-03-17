"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Target, CheckCircle } from "lucide-react";
import { HashBucket, HashLookupStep, PlayState } from "@/types";
import { ALGORITHM_INFO } from "@/constants/algorithms";
import {
  createHashTableBuckets,
  generateHashLookupSteps,
} from "@/lib/algorithms/searching";
import { speedToDelay } from "@/lib/utils";
import ControlBar from "@/components/ui/ControlBar";
import AlgorithmInfoPanel from "@/components/layout/AlgorithmInfoPanel";
import HashTableView from "./HashTableView";

const DEFAULT_ENTRY_COUNT = 10;
const BUCKET_COUNT = 7;

export default function HashTableLookupVisualizer({ algorithmId }: { algorithmId: string }) {
  const info = ALGORITHM_INFO[algorithmId];

  const [entryCount, setEntryCount] = useState(DEFAULT_ENTRY_COUNT);
  const [buckets, setBuckets] = useState<HashBucket[]>(() => createHashTableBuckets(DEFAULT_ENTRY_COUNT, BUCKET_COUNT));
  const [targetInput, setTargetInput] = useState("");
  const [steps, setSteps] = useState<HashLookupStep[]>([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [currentStep, setCurrentStep] = useState<HashLookupStep | null>(null);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [speed, setSpeed] = useState(55);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepsRef = useRef<HashLookupStep[]>([]);
  const stepIndexRef = useRef(-1);

  useEffect(() => {
    clearInterval(intervalRef.current!);
    setBuckets(createHashTableBuckets(entryCount, BUCKET_COUNT));
    setSteps([]);
    setStepIndex(-1);
    setCurrentStep(null);
    setPlayState("idle");
    setTargetInput("");
  }, [algorithmId]); // eslint-disable-line

  function handleGenerate() {
    clearInterval(intervalRef.current!);
    setBuckets(createHashTableBuckets(entryCount, BUCKET_COUNT));
    setSteps([]);
    setStepIndex(-1);
    stepIndexRef.current = -1;
    setCurrentStep(null);
    setPlayState("idle");
  }

  function handleReset() {
    clearInterval(intervalRef.current!);
    setBuckets((prev) =>
      prev.map((bucket) => ({
        ...bucket,
        state: "default",
        entries: bucket.entries.map((entry) => ({
          ...entry,
          state: "default",
        })),
      })),
    );
    setSteps([]);
    setStepIndex(-1);
    stepIndexRef.current = -1;
    setCurrentStep(null);
    setPlayState("idle");
  }

  function resolveTarget(): number {
    if (targetInput !== "" && !isNaN(Number(targetInput))) return Number(targetInput);
    const allKeys = buckets.flatMap((bucket) => bucket.entries.map((entry) => entry.key));
    const target = allKeys[Math.floor(Math.random() * allKeys.length)];
    setTargetInput(String(target));
    return target;
  }

  function prepareSteps(target: number): HashLookupStep[] {
    const nextSteps = generateHashLookupSteps(buckets, target);
    stepsRef.current = nextSteps;
    setSteps(nextSteps);
    return nextSteps;
  }

  const advance = useCallback(() => {
    const next = stepIndexRef.current + 1;
    if (next >= stepsRef.current.length) {
      setPlayState("finished");
      clearInterval(intervalRef.current!);
      return;
    }

    stepIndexRef.current = next;
    setStepIndex(next);
    const step = stepsRef.current[next];
    setBuckets(step.buckets);
    setCurrentStep(step);
  }, []);

  function handlePlay() {
    const target = resolveTarget();
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps(target);
      stepIndexRef.current = -1;
    }
    setPlayState("playing");
    intervalRef.current = setInterval(advance, speedToDelay(speed));
  }

  function handlePause() {
    clearInterval(intervalRef.current!);
    setPlayState("paused");
  }

  function handleStep() {
    const target = resolveTarget();
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps(target);
      stepIndexRef.current = -1;
    }

    const next = stepIndexRef.current + 1;
    if (next >= nextSteps.length) return;

    stepIndexRef.current = next;
    setStepIndex(next);
    const step = nextSteps[next];
    setBuckets(step.buckets);
    setCurrentStep(step);
    setPlayState(next === nextSteps.length - 1 ? "finished" : "paused");
  }

  useEffect(() => {
    if (playState === "playing") {
      clearInterval(intervalRef.current!);
      intervalRef.current = setInterval(advance, speedToDelay(speed));
    }
  }, [speed]); // eslint-disable-line
  useEffect(() => () => clearInterval(intervalRef.current!), []);

  const progress = steps.length > 0 ? Math.round(((stepIndex + 1) / steps.length) * 100) : 0;

  return (
    <div className="flex h-full min-h-0 overflow-hidden flex-col lg:flex-row">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
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
            <span
              className="text-[11px] font-mono px-2 py-0.5 rounded-md"
              style={{ background: "rgba(251,191,36,0.08)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.16)" }}
            >
              Buckets: {BUCKET_COUNT}
            </span>
          </div>

          <div className="flex items-center gap-4">
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
                  Found in bucket {currentStep.bucketIndex}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2">
              {steps.length > 0 && (
                <span className="text-[11px] font-mono text-text-muted tabular-nums">
                  {stepIndex + 1} / {steps.length}
                </span>
              )}
              <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "var(--surface-5)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#34D399" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.08 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 px-4 sm:px-6 min-h-11 py-2 shrink-0 flex-wrap"
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
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <input
                type="number"
                placeholder="Key…"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                disabled={playState === "playing"}
                className="w-20 h-7 px-2.5 rounded-lg text-xs font-mono text-text-primary placeholder:text-text-muted outline-none disabled:opacity-40"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-text-muted">Entries</span>
              <input
                type="range"
                min={6}
                max={18}
                value={entryCount}
                disabled={playState === "playing"}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setEntryCount(next);
                  setBuckets(createHashTableBuckets(next, BUCKET_COUNT));
                  setSteps([]);
                  setStepIndex(-1);
                  setCurrentStep(null);
                  setPlayState("idle");
                }}
                className="w-16"
                style={{ accentColor: "#34D399" }}
              />
              <span className="text-[11px] font-mono text-text-muted tabular-nums w-4">{entryCount}</span>
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

        <div
          className="flex items-center gap-5 px-6 h-8 shrink-0 flex-wrap"
          style={{ borderBottom: "1px solid var(--surface-3)", background: "var(--bg-primary)" }}
        >
          {[
            { color: "var(--surface-2)", label: "Bucket" },
            { color: "#22D3EE", label: "Checking" },
            { color: "#34D399", label: "Found" },
            { color: "var(--surface-1)", label: "Checked" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: item.color }} />
              <span className="text-[11px] text-text-muted">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-hidden px-8 py-10" style={{ background: "var(--bg-primary)" }}>
          <HashTableView buckets={buckets} />
        </div>
      </div>

      <aside
        className="w-full lg:w-80 overflow-y-auto shrink-0 p-4 max-h-[42vh] lg:max-h-none border-t lg:border-t-0 lg:border-l"
        style={{ borderColor: "var(--surface-4)", background: "var(--bg-secondary)" }}
      >
        <AlgorithmInfoPanel algorithmId={algorithmId} currentStep={currentStep?.description} />
      </aside>
    </div>
  );
}
