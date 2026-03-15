"use client";

import { useRef, useCallback } from "react";
import { Grid, CellType } from "@/types";

interface PathGridProps {
  grid: Grid;
  onCellClick: (row: number, col: number) => void;
  onCellDrag:  (row: number, col: number) => void;
  isDrawing:   boolean;
  setIsDrawing: (v: boolean) => void;
  drawMode:    string;
}

/* Map cell type → inline CSS background color */
function cellColor(type: CellType): string {
  switch (type) {
    case "wall":     return "var(--cell-wall)";
    case "start":    return "#34D399";
    case "end":      return "#F87171";
    case "visited":  return "rgba(167,139,250,0.38)";
    case "frontier": return "rgba(34,211,238,0.28)";
    case "path":     return "#FBBF24";
    default:         return "var(--surface-2)";
  }
}

function cellShadow(type: CellType): string | undefined {
  switch (type) {
    case "start": return "0 0 8px rgba(52,211,153,0.6)";
    case "end":   return "0 0 8px rgba(248,113,113,0.6)";
    case "path":  return "0 0 5px rgba(251,191,36,0.4)";
    default:      return undefined;
  }
}

export default function PathGrid({ grid, onCellClick, onCellDrag, isDrawing, setIsDrawing }: PathGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getCellFromEvent = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      const col = Math.floor(((e.clientX - rect.left) / rect.width)  * grid[0].length);
      const row = Math.floor(((e.clientY - rect.top)  / rect.height) * grid.length);
      if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) return { row, col };
      return null;
    },
    [grid]
  );

  const rows = grid.length;
  const cols = grid[0]?.length ?? 51;

  return (
    <div
      ref={containerRef}
      className="cursor-crosshair select-none rounded-xl overflow-hidden"
      style={{
        aspectRatio: `${cols} / ${rows}`,
        width: "100%",
        maxWidth: "860px",
        border: "1px solid var(--surface-5)",
        boxShadow: "0 0 0 1px var(--surface-1), 0 8px 32px rgba(0,0,0,0.5)",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "1px",
        background: "var(--surface-2)",
      }}
      onMouseDown={(e) => { setIsDrawing(true); const c = getCellFromEvent(e); if (c) onCellClick(c.row, c.col); }}
      onMouseMove={(e) => { if (!isDrawing) return; const c = getCellFromEvent(e); if (c) onCellDrag(c.row, c.col); }}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
    >
      {grid.map((row) =>
        row.map((cell) => (
          <div
            key={`${cell.row}-${cell.col}`}
            style={{
              background: cellColor(cell.type),
              boxShadow: cellShadow(cell.type),
              transition: "background 0.1s ease",
            }}
          />
        ))
      )}
    </div>
  );
}
