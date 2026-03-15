"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Shuffle, Eraser, MousePointer, Flag, Square } from "lucide-react";
import { Grid, PlayState, PathfindingStats, PathfindingStep } from "@/types";
import { ALGORITHM_INFO, GRID_ROWS, GRID_COLS } from "@/constants/algorithms";
import {
  createGrid, cloneGrid,
  generateBFSSteps, generateDFSSteps,
  generateDijkstraSteps, generateAStarSteps,
} from "@/lib/algorithms/pathfinding";
import { generateRandomWalls, speedToDelay } from "@/lib/utils";
import ControlBar from "@/components/ui/ControlBar";
import AlgorithmInfoPanel from "@/components/layout/AlgorithmInfoPanel";
import PathGrid from "./PathGrid";
import { cn } from "@/lib/utils";

type DrawMode = "wall" | "start" | "end";

const DEFAULT_START = { row: Math.floor(GRID_ROWS / 2), col: 4 };
const DEFAULT_END   = { row: Math.floor(GRID_ROWS / 2), col: GRID_COLS - 5 };

function runAlgorithm(id: string, grid: Grid, sr: number, sc: number, er: number, ec: number): PathfindingStep[] {
  switch (id) {
    case "bfs":      return generateBFSSteps(grid, sr, sc, er, ec);
    case "dfs":      return generateDFSSteps(grid, sr, sc, er, ec);
    case "dijkstra": return generateDijkstraSteps(grid, sr, sc, er, ec);
    case "aStar":    return generateAStarSteps(grid, sr, sc, er, ec);
    default:         return generateBFSSteps(grid, sr, sc, er, ec);
  }
}

export default function PathfindingVisualizer({ algorithmId }: { algorithmId: string }) {
  const info = ALGORITHM_INFO[algorithmId];

  const [startPos, setStartPos] = useState(DEFAULT_START);
  const [endPos, setEndPos]     = useState(DEFAULT_END);
  const [grid, setGrid]         = useState<Grid>(() =>
    createGrid(GRID_ROWS, GRID_COLS, DEFAULT_START.row, DEFAULT_START.col, DEFAULT_END.row, DEFAULT_END.col)
  );
  const [steps, setSteps]       = useState<PathfindingStep[]>([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [speed, setSpeed]       = useState(75);
  const [drawMode, setDrawMode] = useState<DrawMode>("wall");
  const [isDrawing, setIsDrawing] = useState(false);
  const [stats, setStats]       = useState<PathfindingStats>({ visitedCount: 0, pathLength: 0, elapsed: 0 });
  const [currentDesc, setCurrentDesc] = useState("");

  const intervalRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepsRef      = useRef<PathfindingStep[]>([]);
  const stepIndexRef  = useRef(-1);
  const startPosRef   = useRef(startPos);
  const endPosRef     = useRef(endPos);

  useEffect(() => { startPosRef.current = startPos; }, [startPos]);
  useEffect(() => { endPosRef.current = endPos; }, [endPos]);
  useEffect(() => { handleReset(); }, [algorithmId]); // eslint-disable-line

  function handleReset() {
    clearInterval(intervalRef.current!);
    setPlayState("idle"); setSteps([]); setStepIndex(-1);
    stepIndexRef.current = -1; stepsRef.current = [];
    setStats({ visitedCount: 0, pathLength: 0, elapsed: 0 }); setCurrentDesc("");
    setGrid((prev) => {
      const g = cloneGrid(prev);
      for (const row of g) for (const cell of row) {
        if (["visited","path","frontier"].includes(cell.type)) cell.type = "empty";
        cell.distance = Infinity; cell.fScore = Infinity;
        cell.gScore = Infinity; cell.hScore = Infinity; cell.parent = null;
      }
      g[startPosRef.current.row][startPosRef.current.col].type = "start";
      g[endPosRef.current.row][endPosRef.current.col].type = "end";
      return g;
    });
  }

  function handleClearWalls() {
    handleReset();
    setGrid(createGrid(GRID_ROWS, GRID_COLS, startPos.row, startPos.col, endPos.row, endPos.col));
  }

  function handleRandomWalls() {
    handleReset();
    const walls = generateRandomWalls(GRID_ROWS, GRID_COLS, startPos.row, startPos.col, endPos.row, endPos.col);
    const ng = createGrid(GRID_ROWS, GRID_COLS, startPos.row, startPos.col, endPos.row, endPos.col);
    walls.forEach((k) => { const [r,c] = k.split(",").map(Number); ng[r][c].type = "wall"; });
    setGrid(ng);
  }

  function handleCellInteract(row: number, col: number) {
    if (playState === "playing") return;
    setGrid((prev) => {
      const g = cloneGrid(prev);
      const cell = g[row][col];
      if (drawMode === "wall") {
        if (cell.type === "start" || cell.type === "end") return prev;
        cell.type = cell.type === "wall" ? "empty" : "wall";
      } else if (drawMode === "start") {
        g[startPosRef.current.row][startPosRef.current.col].type = "empty";
        cell.type = "start"; setStartPos({ row, col }); startPosRef.current = { row, col };
      } else if (drawMode === "end") {
        g[endPosRef.current.row][endPosRef.current.col].type = "empty";
        cell.type = "end"; setEndPos({ row, col }); endPosRef.current = { row, col };
      }
      return g;
    });
  }

  const advance = useCallback(() => {
    const next = stepIndexRef.current + 1;
    if (next >= stepsRef.current.length) { setPlayState("finished"); clearInterval(intervalRef.current!); return; }
    stepIndexRef.current = next; setStepIndex(next);
    const step = stepsRef.current[next];
    setGrid(step.grid); setStats(step.stats); setCurrentDesc(step.description);
  }, []);

  function handlePlay() {
    if (!steps.length) {
      const s = runAlgorithm(algorithmId, grid, startPos.row, startPos.col, endPos.row, endPos.col);
      stepsRef.current = s; setSteps(s); stepIndexRef.current = -1;
    }
    setPlayState("playing");
    intervalRef.current = setInterval(advance, speedToDelay(speed));
  }
  function handlePause() { clearInterval(intervalRef.current!); setPlayState("paused"); }
  function handleStep() {
    let s = steps;
    if (!s.length) {
      s = runAlgorithm(algorithmId, grid, startPos.row, startPos.col, endPos.row, endPos.col);
      stepsRef.current = s; setSteps(s); stepIndexRef.current = -1;
    }
    const next = stepIndexRef.current + 1;
    if (next >= s.length) return;
    stepIndexRef.current = next; setStepIndex(next);
    const step = s[next]; setGrid(step.grid); setStats(step.stats); setCurrentDesc(step.description);
    setPlayState(next === s.length - 1 ? "finished" : "paused");
  }

  useEffect(() => {
    if (playState === "playing") { clearInterval(intervalRef.current!); intervalRef.current = setInterval(advance, speedToDelay(speed)); }
  }, [speed]); // eslint-disable-line
  useEffect(() => () => clearInterval(intervalRef.current!), []);

  const DRAW_MODES: { id: DrawMode; icon: React.ElementType; label: string }[] = [
    { id: "wall", icon: Square, label: "Wall" },
    { id: "start", icon: MousePointer, label: "Start" },
    { id: "end", icon: Flag, label: "End" },
  ];

  const progress = steps.length > 0 ? Math.round(((stepIndex + 1) / steps.length) * 100) : 0;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
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
              Pathfinding
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-5 mr-2">
            <div className="text-center">
              <span className="text-xs font-display font-bold" style={{ color: "#A78BFA" }}>{stats.visitedCount}</span>
              <span className="text-[10px] text-text-muted ml-1.5">visited</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-display font-bold" style={{ color: "#FBBF24" }}>{stats.pathLength || "—"}</span>
              <span className="text-[10px] text-text-muted ml-1.5">path</span>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "var(--surface-5)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "#A78BFA" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.08 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
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
            {/* Draw mode pill */}
            <div
              className="flex items-center gap-0.5 rounded-lg p-0.5"
              style={{ background: "var(--surface-3)", border: "1px solid var(--surface-5)" }}
            >
              {DRAW_MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setDrawMode(m.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-xs font-medium transition-all",
                    drawMode === m.id ? "" : "text-text-muted hover:text-text-secondary"
                  )}
                  style={drawMode === m.id ? {
                    background: "rgba(34,211,238,0.12)",
                    color: "#22D3EE",
                    border: "1px solid rgba(34,211,238,0.2)",
                  } : {}}
                >
                  <m.icon className="w-3 h-3" /> {m.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleRandomWalls}
              disabled={playState === "playing"}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
            >
              <Shuffle className="w-3 h-3" /> Random
            </button>
            <button
              onClick={handleClearWalls}
              disabled={playState === "playing"}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-default)" }}
            >
              <Eraser className="w-3 h-3" /> Clear
            </button>
          </ControlBar>
        </div>

        {/* Legend */}
        <div
          className="flex items-center gap-5 px-6 h-8 shrink-0"
          style={{ borderBottom: "1px solid var(--surface-3)", background: "var(--bg-primary)" }}
        >
          {[
            { color: "#34D399", label: "Start" },
            { color: "#F87171", label: "End" },
            { color: "var(--cell-wall)", label: "Wall", border: "var(--border-default)" },
            { color: "rgba(167,139,250,0.4)", label: "Visited" },
            { color: "rgba(34,211,238,0.28)", label: "Frontier" },
            { color: "#FBBF24", label: "Path" },
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

        {/* Grid */}
        <div className="flex-1 overflow-hidden flex items-center justify-center p-5" style={{ background: "var(--bg-primary)" }}>
          <PathGrid
            grid={grid}
            onCellClick={handleCellInteract}
            onCellDrag={handleCellInteract}
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing}
            drawMode={drawMode}
          />
        </div>
      </div>

      {/* Info panel */}
      <aside
        className="w-64 overflow-y-auto shrink-0 p-4"
        style={{ borderLeft: "1px solid var(--surface-4)", background: "var(--bg-secondary)" }}
      >
        <AlgorithmInfoPanel algorithmId={algorithmId} currentStep={currentDesc || undefined} />
      </aside>
    </div>
  );
}
