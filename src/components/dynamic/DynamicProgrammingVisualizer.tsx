"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { DPStep, DPStats, PlayState } from "@/types";
import { ALGORITHM_INFO } from "@/constants/algorithms";
import {
  createDynamicScenario,
  DynamicScenario,
  generateDynamicSteps,
} from "@/lib/algorithms/dynamic";
import { speedToDelay } from "@/lib/utils";
import ControlBar from "@/components/ui/ControlBar";
import AlgorithmInfoPanel from "@/components/layout/AlgorithmInfoPanel";
import DPTable from "./DPTable";

const EMPTY_STATS: DPStats = {
  filledCount: 0,
  totalCells: 0,
  answer: "pending",
};

export default function DynamicProgrammingVisualizer({ algorithmId }: { algorithmId: string }) {
  const info = ALGORITHM_INFO[algorithmId];

  const [scenario, setScenario] = useState<DynamicScenario>(() => createDynamicScenario(algorithmId));
  const [steps, setSteps] = useState<DPStep[]>([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [speed, setSpeed] = useState(55);
  const [currentStep, setCurrentStep] = useState<DPStep | null>(null);
  const [stats, setStats] = useState<DPStats>(EMPTY_STATS);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepsRef = useRef<DPStep[]>([]);
  const stepIndexRef = useRef(-1);
  const scenarioRef = useRef(scenario);

  useEffect(() => {
    scenarioRef.current = scenario;
  }, [scenario]);

  useEffect(() => {
    clearInterval(intervalRef.current!);
    const nextScenario = createDynamicScenario(algorithmId);
    scenarioRef.current = nextScenario;
    setScenario(nextScenario);
    setSteps([]);
    setStepIndex(-1);
    setCurrentStep(null);
    setStats(EMPTY_STATS);
    setPlayState("idle");
  }, [algorithmId]);

  function handleReset() {
    clearInterval(intervalRef.current!);
    setSteps([]);
    setStepIndex(-1);
    stepIndexRef.current = -1;
    setCurrentStep(null);
    setStats(EMPTY_STATS);
    setPlayState("idle");
  }

  function handleRandomize() {
    clearInterval(intervalRef.current!);
    const nextScenario = createDynamicScenario(algorithmId);
    scenarioRef.current = nextScenario;
    setScenario(nextScenario);
    setSteps([]);
    setStepIndex(-1);
    stepIndexRef.current = -1;
    setCurrentStep(null);
    setStats(EMPTY_STATS);
    setPlayState("idle");
  }

  function prepareSteps(): DPStep[] {
    const nextSteps = generateDynamicSteps(algorithmId, scenarioRef.current);
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
    setCurrentStep(step);
    setStats(step.stats);
  }, []);

  function handlePlay() {
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps();
      stepIndexRef.current = -1;
    }
    if (!nextSteps.length) return;

    setPlayState("playing");
    intervalRef.current = setInterval(advance, speedToDelay(speed));
  }

  function handlePause() {
    clearInterval(intervalRef.current!);
    setPlayState("paused");
  }

  function handleStep() {
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps();
      stepIndexRef.current = -1;
    }

    const next = stepIndexRef.current + 1;
    if (next >= nextSteps.length) return;

    stepIndexRef.current = next;
    setStepIndex(next);
    const step = nextSteps[next];
    setCurrentStep(step);
    setStats(step.stats);
    setPlayState(next === nextSteps.length - 1 ? "finished" : "paused");
  }

  useEffect(() => {
    if (playState === "playing") {
      clearInterval(intervalRef.current!);
      intervalRef.current = setInterval(advance, speedToDelay(speed));
    }
  }, [speed]); // eslint-disable-line

  useEffect(() => () => clearInterval(intervalRef.current!), []);

  const displayedTable = currentStep?.table;
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
              style={{ background: "rgba(236,72,153,0.08)", color: "#EC4899", border: "1px solid rgba(236,72,153,0.18)" }}
            >
              Dynamic Programming
            </span>
          </div>

          <div className="flex items-center gap-5 mr-2">
            <div className="text-center">
              <span className="text-xs font-display font-bold" style={{ color: "#EC4899" }}>{stats.filledCount}</span>
              <span className="text-[10px] text-text-muted ml-1.5">filled</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-display font-bold" style={{ color: "#22D3EE" }}>{stats.answer}</span>
              <span className="text-[10px] text-text-muted ml-1.5">answer</span>
            </div>
            <div className="flex items-center gap-2">
              {steps.length > 0 && (
                <span className="text-[11px] font-mono text-text-muted tabular-nums">
                  {stepIndex + 1} / {steps.length}
                </span>
              )}
              <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "var(--surface-5)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#EC4899" }}
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
            <div
              className="h-7 px-2.5 rounded-lg flex items-center text-[11px] font-mono text-text-muted"
              style={{ background: "var(--surface-3)", border: "1px solid var(--surface-5)" }}
            >
              {scenario.summary}
            </div>

            <button
              onClick={handleRandomize}
              disabled={playState === "playing"}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
            >
              <Shuffle className="w-3 h-3" /> New sample
            </button>
          </ControlBar>
        </div>

        <div
          className="flex items-center gap-5 px-6 h-8 shrink-0 flex-wrap"
          style={{ borderBottom: "1px solid var(--surface-3)", background: "var(--bg-primary)" }}
        >
          {[
            { color: "var(--surface-2)", label: "Empty" },
            { color: "#22D3EE", label: "Current cell" },
            { color: "#A78BFA", label: "Filled" },
            { color: "#34D399", label: "Chosen path" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: item.color }} />
              <span className="text-[10px] font-mono text-text-muted">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 p-6 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
          {displayedTable ? (
            <DPTable table={displayedTable} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-text-muted font-mono">Press Run or Step to fill the DP table.</p>
            </div>
          )}
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
