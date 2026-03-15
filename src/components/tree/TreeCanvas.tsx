"use client";

import { TreeMap, TreeNode } from "@/types";

interface TreeCanvasProps {
  nodes: TreeMap;
  rootId: number | null;
}

const NODE_RADIUS = 22;
const H_SPACING   = 52;   // horizontal gap between adjacent in-order positions
const V_SPACING   = 72;   // vertical gap between levels

function nodeColor(state: TreeNode["state"]): { fill: string; stroke: string; text: string } {
  switch (state) {
    case "comparing":
      return { fill: "rgba(34,211,238,0.18)", stroke: "#22D3EE", text: "#22D3EE" };
    case "visiting":
      return { fill: "rgba(251,191,36,0.2)",  stroke: "#FBBF24", text: "#FBBF24" };
    case "found":
      return { fill: "rgba(52,211,153,0.2)",  stroke: "#34D399", text: "#34D399" };
    case "inserting":
      return { fill: "rgba(167,139,250,0.2)", stroke: "#A78BFA", text: "#A78BFA" };
    case "path":
      return { fill: "var(--surface-5)", stroke: "var(--border-bright)", text: "var(--text-primary)" };
    case "sorted":
      return { fill: "rgba(52,211,153,0.1)",  stroke: "rgba(52,211,153,0.4)", text: "#34D399" };
    default:
      return { fill: "var(--surface-3)", stroke: "var(--border-bright)", text: "var(--text-secondary)" };
  }
}

export default function TreeCanvas({ nodes, rootId }: TreeCanvasProps) {
  if (rootId === null || Object.keys(nodes).length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-text-muted font-mono">No tree data</p>
      </div>
    );
  }

  const nodeList = Object.values(nodes);

  // Compute SVG bounds from layout coordinates
  const minX  = Math.min(...nodeList.map((n) => n.x));
  const maxX  = Math.max(...nodeList.map((n) => n.x));
  const maxY  = Math.max(...nodeList.map((n) => n.y));
  const width  = (maxX - minX + 1) * H_SPACING + NODE_RADIUS * 4;
  const height = (maxY + 1)        * V_SPACING  + NODE_RADIUS * 4;

  function cx(node: TreeNode) { return (node.x - minX) * H_SPACING + NODE_RADIUS * 2; }
  function cy(node: TreeNode) { return  node.y         * V_SPACING  + NODE_RADIUS * 2; }

  return (
    <div className="w-full h-full overflow-auto flex items-start justify-center pt-4">
      <svg
        width={width}
        height={height}
        style={{ minWidth: width, overflow: "visible" }}
      >
        {/* ── Edges ── */}
        {nodeList.map((node) => {
          const edges = [];
          if (node.left !== null && nodes[node.left]) {
            const child = nodes[node.left];
            edges.push(
              <line
                key={`e-${node.id}-l`}
                x1={cx(node)} y1={cy(node)}
                x2={cx(child)} y2={cy(child)}
                stroke="var(--border-bright)"
                strokeWidth={1.5}
              />
            );
          }
          if (node.right !== null && nodes[node.right]) {
            const child = nodes[node.right];
            edges.push(
              <line
                key={`e-${node.id}-r`}
                x1={cx(node)} y1={cy(node)}
                x2={cx(child)} y2={cy(child)}
                stroke="var(--border-bright)"
                strokeWidth={1.5}
              />
            );
          }
          return edges;
        })}

        {/* ── Nodes ── */}
        {nodeList.map((node) => {
          const colors = nodeColor(node.state);
          const x = cx(node);
          const y = cy(node);
          return (
            <g key={node.id}>
              <circle
                cx={x} cy={y} r={NODE_RADIUS}
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={1.5}
                style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
              />
              <text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={colors.text}
                fontSize={13}
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={600}
                style={{ transition: "fill 0.2s ease", userSelect: "none" }}
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
