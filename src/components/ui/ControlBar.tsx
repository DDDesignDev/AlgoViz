"use client";

import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";
import { PlayState } from "@/types";
import { cn } from "@/lib/utils";

interface ControlBarProps {
  playState: PlayState;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep: () => void;
  onSpeedChange: (speed: number) => void;
  children?: React.ReactNode;
}

export default function ControlBar({
  playState,
  speed,
  onPlay,
  onPause,
  onReset,
  onStep,
  onSpeedChange,
  children,
}: ControlBarProps) {
  const isPlaying = playState === "playing";
  const isFinished = playState === "finished";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* ── Play / Pause ── */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        disabled={isFinished}
        className={cn(
          "inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[13px] font-semibold transition-all select-none",
          isFinished
            ? "opacity-30 cursor-not-allowed"
            : isPlaying
            ? "text-[#FBBF24]"
            : "text-[#080810]"
        )}
        style={
          isFinished
            ? { background: "var(--surface-4)", border: "1px solid var(--surface-5)" }
            : isPlaying
            ? { background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.28)" }
            : { background: "#22D3EE", boxShadow: "0 0 0 1px #22D3EE, 0 2px 12px rgba(34,211,238,0.22)" }
        }
      >
        {isPlaying ? (
          <><Pause className="w-3.5 h-3.5" /> Pause</>
        ) : (
          <><Play className="w-3.5 h-3.5" /> {isFinished ? "Done" : "Run"}</>
        )}
      </button>

      {/* ── Step ── */}
      <button
        onClick={onStep}
        disabled={isPlaying || isFinished}
        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed select-none"
        style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
      >
        <ChevronRight className="w-3.5 h-3.5" /> Step
      </button>

      {/* ── Reset ── */}
      <button
        onClick={onReset}
        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg text-[13px] font-medium text-text-secondary hover:text-text-primary transition-all select-none"
        style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
      >
        <RotateCcw className="w-3 h-3" /> Reset
      </button>

      {/* ── Separator ── */}
      <div className="w-px h-5 mx-1" style={{ background: "var(--border-default)" }} />

      {/* ── Speed ── */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-mono text-text-muted">Speed</span>
        <input
          type="range"
          min={1}
          max={100}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-20"
          style={{ accentColor: "#22D3EE" }}
        />
        <span className="text-[11px] font-mono text-text-muted w-7 tabular-nums">{speed}%</span>
      </div>

      {/* ── Extra controls ── */}
      {children && (
        <>
          <div className="w-px h-5 mx-1" style={{ background: "var(--border-default)" }} />
          {children}
        </>
      )}
    </div>
  );
}
