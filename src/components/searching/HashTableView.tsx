"use client";

import { HashBucket } from "@/types";

interface HashTableViewProps {
  buckets: HashBucket[];
}

function bucketStyle(state: HashBucket["state"]): React.CSSProperties {
  switch (state) {
    case "active":
      return {
        background: "rgba(34,211,238,0.12)",
        borderColor: "rgba(34,211,238,0.3)",
        color: "#22D3EE",
      };
    case "found":
      return {
        background: "rgba(52,211,153,0.12)",
        borderColor: "rgba(52,211,153,0.3)",
        color: "#34D399",
      };
    default:
      return {
        background: "var(--surface-2)",
        borderColor: "var(--surface-4)",
        color: "var(--text-muted)",
      };
  }
}

function entryStyle(state: HashBucket["entries"][number]["state"]): React.CSSProperties {
  switch (state) {
    case "active":
      return {
        background: "#22D3EE",
        borderColor: "#22D3EE",
        color: "var(--bg-primary)",
        transform: "translateY(-2px)",
      };
    case "found":
      return {
        background: "#34D399",
        borderColor: "#34D399",
        color: "var(--bg-primary)",
        transform: "translateY(-3px)",
      };
    case "eliminated":
      return {
        background: "var(--surface-1)",
        borderColor: "var(--surface-3)",
        color: "var(--text-muted)",
        opacity: 0.45,
      };
    default:
      return {
        background: "var(--surface-4)",
        borderColor: "var(--border-bright)",
        color: "var(--text-secondary)",
      };
  }
}

export default function HashTableView({ buckets }: HashTableViewProps) {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="min-w-[720px] space-y-3">
        {buckets.map((bucket) => (
          <div key={bucket.index} className="flex items-center gap-3">
            <div
              className="w-20 h-12 rounded-xl border flex items-center justify-center font-mono text-xs font-semibold shrink-0"
              style={bucketStyle(bucket.state)}
            >
              bucket {bucket.index}
            </div>

            <div className="flex items-center gap-2 min-h-12 flex-wrap">
              {bucket.entries.length ? (
                bucket.entries.map((entry, index) => (
                  <div key={`${bucket.index}-${entry.key}`} className="flex items-center gap-2">
                    <div
                      className="min-w-[86px] h-12 px-3 rounded-xl border flex flex-col items-center justify-center"
                      style={entryStyle(entry.state)}
                    >
                      <span className="text-[12px] font-mono font-semibold">{entry.key}</span>
                      <span className="text-[9px] font-mono opacity-70">{entry.value}</span>
                    </div>
                    {index < bucket.entries.length - 1 && (
                      <span className="text-text-muted font-mono text-xs">→</span>
                    )}
                  </div>
                ))
              ) : (
                <div
                  className="min-w-[86px] h-12 px-3 rounded-xl border flex items-center justify-center text-[11px] font-mono text-text-muted"
                  style={{ background: "var(--surface-1)", borderColor: "var(--surface-4)" }}
                >
                  empty
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
