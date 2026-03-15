// ─── Shared ───────────────────────────────────────────────────────────────────

export type AlgorithmCategory = "sorting" | "pathfinding" | "searching" | "tree";

export type PlayState = "idle" | "playing" | "paused" | "finished";

export interface AlgorithmInfo {
  id: string;
  name: string;
  category: AlgorithmCategory;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  description: string;
  useCases: string[];
  stable?: boolean;
}

// ─── Sorting ──────────────────────────────────────────────────────────────────

export type SortBarState =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "pivot"
  | "selected";

export interface SortBar {
  value: number;
  state: SortBarState;
  id: number; // stable key for framer-motion
}

export interface SortStep {
  bars: SortBar[];
  description: string;
}

// ─── Pathfinding ──────────────────────────────────────────────────────────────

export type CellType =
  | "empty"
  | "wall"
  | "start"
  | "end"
  | "visited"
  | "path"
  | "frontier";

export interface Cell {
  row: number;
  col: number;
  type: CellType;
  distance: number;
  fScore: number;
  gScore: number;
  hScore: number;
  parent: { row: number; col: number } | null;
  weight: number;
}

export type Grid = Cell[][];

export interface PathfindingStats {
  visitedCount: number;
  pathLength: number;
  elapsed: number;
}

export interface PathfindingStep {
  grid: Grid;
  stats: PathfindingStats;
  description: string;
}

// ─── Searching ────────────────────────────────────────────────────────────────

export type SearchBarState =
  | "default"
  | "active"
  | "found"
  | "eliminated"
  | "range";

export interface SearchBar {
  value: number;
  state: SearchBarState;
  index: number;
}

export interface SearchStep {
  bars: SearchBar[];
  low?: number;
  high?: number;
  mid?: number;
  description: string;
  found: boolean;
  foundIndex: number | null;
}

// ─── Binary Tree ──────────────────────────────────────────────────────────────

export type TreeNodeState =
  | "default"
  | "comparing"
  | "visiting"
  | "found"
  | "inserting"
  | "path"
  | "sorted";   // used when highlighting in-order sorted sequence

export interface TreeNode {
  id: number;
  value: number;
  left: number | null;   // id of left child, or null
  right: number | null;  // id of right child
  parent: number | null; // id of parent, or null
  state: TreeNodeState;
  // Layout coordinates — computed before rendering
  x: number;
  y: number;
  depth: number;
}

// The full tree is a flat map of id → TreeNode for O(1) lookup
export type TreeMap = Record<number, TreeNode>;

export interface TreeStep {
  nodes: TreeMap;
  description: string;
  highlightedPath?: number[]; // ordered list of node ids for path drawing
}

export type TreeTraversalOrder = "preorder" | "inorder" | "postorder";