"use client";

import { Fragment } from "react";
import { DPCell, DPTable as DPTableType } from "@/types";

interface DPTableProps {
  table: DPTableType;
}

function cellColors(state: DPCell["state"]) {
  switch (state) {
    case "active":
      return { background: "rgba(34,211,238,0.18)", border: "rgba(34,211,238,0.35)", color: "#22D3EE" };
    case "filled":
      return { background: "rgba(167,139,250,0.14)", border: "rgba(167,139,250,0.22)", color: "#C4B5FD" };
    case "path":
      return { background: "rgba(52,211,153,0.16)", border: "rgba(52,211,153,0.26)", color: "#34D399" };
    default:
      return { background: "var(--surface-2)", border: "var(--surface-4)", color: "var(--text-secondary)" };
  }
}

export default function DPTable({ table }: DPTableProps) {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="min-w-max">
        <div className="mb-5">
          <h2 className="font-display text-xl font-semibold text-text-primary">{table.title}</h2>
          <p className="text-sm text-text-muted mt-1">{table.subtitle}</p>
        </div>

        <div
          className="inline-grid gap-1.5 p-2 rounded-2xl"
          style={{
            gridTemplateColumns: `96px repeat(${table.colLabels.length}, minmax(56px, 1fr))`,
            background: "var(--surface-1)",
            border: "1px solid var(--surface-4)",
          }}
        >
          <div />
          {table.colLabels.map((label, index) => (
            <div
              key={`col-${label}-${index}`}
              className="h-12 rounded-xl flex items-center justify-center text-[11px] font-mono text-text-muted"
              style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}
            >
              {label === "" ? "∅" : label}
            </div>
          ))}

          {table.cells.map((row, rowIndex) => (
            <Fragment key={`row-${rowIndex}`}>
              <div
                className="h-12 rounded-xl flex items-center px-3 text-[11px] font-mono text-text-muted"
                style={{ background: "var(--surface-2)", border: "1px solid var(--surface-4)" }}
              >
                {table.rowLabels[rowIndex] === "" ? "∅" : table.rowLabels[rowIndex]}
              </div>
              {row.map((cell, colIndex) => {
                const colors = cellColors(cell.state);
                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className="h-12 rounded-xl flex items-center justify-center text-sm font-mono font-semibold"
                    style={{
                      background: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.color,
                    }}
                  >
                    {cell.value === "" ? "·" : cell.value}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
