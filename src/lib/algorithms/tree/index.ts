import { TreeNode, TreeMap, TreeStep, TreeTraversalOrder } from "@/types";

// ─── ID counter ───────────────────────────────────────────────────────────────
let _nextId = 1;
function nextId() { return _nextId++; }
export function resetIdCounter() { _nextId = 1; }

// ─── Layout ───────────────────────────────────────────────────────────────────
// Assigns x/y coordinates to every node for rendering.
// Uses a recursive approach: each subtree is given a horizontal slot.
export function computeLayout(nodes: TreeMap, rootId: number | null): TreeMap {
  if (rootId === null) return nodes;

  const result = { ...nodes };

  // First pass: compute the subtree width (number of leaves) for each node
  function subtreeWidth(id: number | null): number {
    if (id === null) return 0;
    const node = result[id];
    const lw = subtreeWidth(node.left);
    const rw = subtreeWidth(node.right);
    return Math.max(lw + rw, 1);
  }

  // Second pass: assign x positions
  let counter = 0;
  function assignX(id: number | null, depth: number) {
    if (id === null) return;
    assignX(result[id].left, depth + 1);
    result[id] = { ...result[id], x: counter, depth };
    counter++;
    assignX(result[id].right, depth + 1);
  }

  assignX(rootId, 0);

  // Y is simply depth * fixed spacing — will be normalized in the component
  for (const id in result) {
    result[id] = { ...result[id], y: result[id].depth };
  }

  return result;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cloneNodes(nodes: TreeMap): TreeMap {
  const out: TreeMap = {};
  for (const id in nodes) out[id] = { ...nodes[id] };
  return out;
}

function snapshot(nodes: TreeMap, description: string, highlightedPath?: number[]): TreeStep {
  return { nodes: cloneNodes(nodes), description, highlightedPath };
}

function resetAllStates(nodes: TreeMap): TreeMap {
  const out: TreeMap = {};
  for (const id in nodes) out[id] = { ...nodes[id], state: "default" };
  return out;
}

// ─── Build a default BST from an array ───────────────────────────────────────
export function buildBST(values: number[]): { nodes: TreeMap; rootId: number | null } {
  resetIdCounter();
  let nodes: TreeMap = {};
  let rootId: number | null = null;

  for (const v of values) {
    const result = insertNode(nodes, rootId, v, null);
    nodes  = result.nodes;
    rootId = result.rootId;
  }

  nodes = computeLayout(nodes, rootId);
  return { nodes, rootId };
}

// Plain insert (no steps) — used during tree construction
function insertNode(
  nodes: TreeMap,
  rootId: number | null,
  value: number,
  parentId: number | null
): { nodes: TreeMap; rootId: number } {
  const id = nextId();
  if (rootId === null) {
    nodes[id] = { id, value, left: null, right: null, parent: parentId, state: "default", x: 0, y: 0, depth: 0 };
    return { nodes, rootId: id };
  }

  let currentId: number = rootId;
  while (true) {
    const current = nodes[currentId];
    if (value < current.value) {
      if (current.left === null) {
        nodes[id] = { id, value, left: null, right: null, parent: currentId, state: "default", x: 0, y: 0, depth: 0 };
        nodes[currentId] = { ...current, left: id };
        break;
      }
      currentId = current.left;
    } else {
      if (current.right === null) {
        nodes[id] = { id, value, left: null, right: null, parent: currentId, state: "default", x: 0, y: 0, depth: 0 };
        nodes[currentId] = { ...current, right: id };
        break;
      }
      currentId = current.right;
    }
  }

  return { nodes, rootId };
}

// ─── BST Insert (with steps) ─────────────────────────────────────────────────
export function generateBSTInsertSteps(
  initialNodes: TreeMap,
  rootId: number | null,
  value: number
): TreeStep[] {
  let nodes = cloneNodes(initialNodes);
  const steps: TreeStep[] = [];

  steps.push(snapshot(nodes, `Inserting value ${value} — starting at root`));

  if (rootId === null) {
    const id = nextId();
    nodes[id] = { id, value, left: null, right: null, parent: null, state: "inserting", x: 0, y: 0, depth: 0 };
    nodes = computeLayout(nodes, id);
    steps.push(snapshot(nodes, `Tree was empty — ${value} becomes the root`));
    return steps;
  }

  const path: number[] = [];
  let currentId: number = rootId;

  while (true) {
    const current = nodes[currentId];
    path.push(currentId);
    nodes = resetAllStates(nodes);
    path.forEach((pid) => { nodes[pid] = { ...nodes[pid], state: "path" }; });
    nodes[currentId] = { ...nodes[currentId], state: "comparing" };

    steps.push(snapshot(
      nodes,
      `At node ${current.value}: ${value} is ${value < current.value ? "smaller → go left" : "larger → go right"}`,
      [...path]
    ));

    if (value < current.value) {
      if (current.left === null) {
        const id = nextId();
        nodes[id] = { id, value, left: null, right: null, parent: currentId, state: "inserting", x: 0, y: 0, depth: 0 };
        nodes[currentId] = { ...nodes[currentId], left: id };
        nodes = computeLayout(nodes, rootId);
        nodes[id] = { ...nodes[id], state: "inserting" };
        steps.push(snapshot(nodes, `Left slot is empty — inserting ${value} as left child of ${current.value}`, [...path, id]));
        break;
      }
      currentId = current.left;
    } else {
      if (current.right === null) {
        const id = nextId();
        nodes[id] = { id, value, left: null, right: null, parent: currentId, state: "inserting", x: 0, y: 0, depth: 0 };
        nodes[currentId] = { ...nodes[currentId], right: id };
        nodes = computeLayout(nodes, rootId);
        nodes[id] = { ...nodes[id], state: "inserting" };
        steps.push(snapshot(nodes, `Right slot is empty — inserting ${value} as right child of ${current.value}`, [...path, id]));
        break;
      }
      currentId = current.right;
    }
  }

  // Final: reset states
  nodes = resetAllStates(nodes);
  steps.push(snapshot(nodes, `${value} inserted successfully`));
  return steps;
}

// ─── BST Search (with steps) ─────────────────────────────────────────────────
export function generateBSTSearchSteps(
  initialNodes: TreeMap,
  rootId: number | null,
  target: number
): TreeStep[] {
  let nodes = cloneNodes(initialNodes);
  const steps: TreeStep[] = [];

  steps.push(snapshot(nodes, `Searching for ${target} — starting at root`));

  if (rootId === null) {
    steps.push(snapshot(nodes, "Tree is empty — value not found"));
    return steps;
  }

  const path: number[] = [];
  let currentId: number | null = rootId;

  while (currentId !== null) {
    const current: TreeNode = nodes[currentId];
    path.push(currentId);

    nodes = resetAllStates(nodes);
    path.forEach((pid) => { nodes[pid] = { ...nodes[pid], state: "path" }; });
    nodes[currentId] = { ...nodes[currentId], state: "comparing" };

    steps.push(snapshot(nodes, `Comparing ${target} with node ${current.value}`, [...path]));

    if (target === current.value) {
      nodes[currentId] = { ...nodes[currentId], state: "found" };
      steps.push(snapshot(nodes, `Found ${target} at depth ${current.depth}!`, [...path]));
      return steps;
    }

    if (target < current.value) {
      steps.push(snapshot(nodes, `${target} < ${current.value} — going left`, [...path]));
      currentId = current.left;
    } else {
      steps.push(snapshot(nodes, `${target} > ${current.value} — going right`, [...path]));
      currentId = current.right;
    }
  }

  nodes = resetAllStates(nodes);
  steps.push(snapshot(nodes, `${target} not found in the tree`));
  return steps;
}

// ─── BFS Traversal (with steps) ──────────────────────────────────────────────
export function generateBFSTraversalSteps(
  initialNodes: TreeMap,
  rootId: number | null
): TreeStep[] {
  let nodes = cloneNodes(initialNodes);
  const steps: TreeStep[] = [];

  if (rootId === null) {
    steps.push(snapshot(nodes, "Tree is empty"));
    return steps;
  }

  const queue: number[] = [rootId];
  const visited: number[] = [];
  steps.push(snapshot(nodes, "BFS: starting at root, using a queue"));

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const current   = nodes[currentId];
    visited.push(currentId);

    nodes = resetAllStates(nodes);
    visited.forEach((vid) => { nodes[vid] = { ...nodes[vid], state: "sorted" }; });
    nodes[currentId] = { ...nodes[currentId], state: "visiting" };
    queue.forEach((qid) => { nodes[qid] = { ...nodes[qid], state: "comparing" }; });

    steps.push(snapshot(
      nodes,
      `Visiting ${current.value} (depth ${current.depth}) — queue: [${queue.map((id) => nodes[id].value).join(", ")}]`,
      [...visited]
    ));

    if (current.left  !== null) queue.push(current.left);
    if (current.right !== null) queue.push(current.right);
  }

  nodes = resetAllStates(nodes);
  visited.forEach((vid) => { nodes[vid] = { ...nodes[vid], state: "sorted" }; });
  steps.push(snapshot(
    nodes,
    `BFS complete — visited order: ${visited.map((id) => nodes[id].value).join(" → ")}`,
    visited
  ));
  return steps;
}

// ─── DFS Traversal (with steps) ──────────────────────────────────────────────
export function generateDFSTraversalSteps(
  initialNodes: TreeMap,
  rootId: number | null,
  order: TreeTraversalOrder = "inorder"
): TreeStep[] {
  let nodes = cloneNodes(initialNodes);
  const steps: TreeStep[] = [];
  const visited: number[] = [];

  const orderLabel = { preorder: "Pre-order (root → left → right)", inorder: "In-order (left → root → right)", postorder: "Post-order (left → right → root)" };
  steps.push(snapshot(nodes, `DFS ${orderLabel[order]} traversal — starting`));

  function dfs(id: number | null) {
    if (id === null) return;
    const node = nodes[id];

    if (order === "preorder") {
      visited.push(id);
      nodes = resetAllStates(nodes);
      visited.forEach((vid) => { nodes[vid] = { ...nodes[vid], state: "sorted" }; });
      nodes[id] = { ...nodes[id], state: "visiting" };
      steps.push(snapshot(nodes, `Pre-order: visiting ${node.value}`, [...visited]));
    }

    dfs(node.left);

    if (order === "inorder") {
      visited.push(id);
      nodes = resetAllStates(nodes);
      visited.forEach((vid) => { nodes[vid] = { ...nodes[vid], state: "sorted" }; });
      nodes[id] = { ...nodes[id], state: "visiting" };
      steps.push(snapshot(nodes, `In-order: visiting ${node.value}${order === "inorder" ? " — BST in-order always produces sorted output" : ""}`, [...visited]));
    }

    dfs(node.right);

    if (order === "postorder") {
      visited.push(id);
      nodes = resetAllStates(nodes);
      visited.forEach((vid) => { nodes[vid] = { ...nodes[vid], state: "sorted" }; });
      nodes[id] = { ...nodes[id], state: "visiting" };
      steps.push(snapshot(nodes, `Post-order: visiting ${node.value} (both children processed first)`, [...visited]));
    }
  }

  dfs(rootId);

  nodes = resetAllStates(nodes);
  visited.forEach((vid) => { nodes[vid] = { ...nodes[vid], state: "sorted" }; });
  steps.push(snapshot(
    nodes,
    `${order} complete — visited: ${visited.map((id) => nodes[id].value).join(" → ")}`,
    visited
  ));
  return steps;
}