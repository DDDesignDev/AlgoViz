# VizaRithm

> An interactive algorithm visualization tool — built to teach, demonstrate, and impress.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-BB4BFF?style=flat-square&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)

**Live demo:** [vizarithm.vercel.app](#) &nbsp;·&nbsp; **Source:** [github.com/DDDesignDev/VizaRithm](#)

---

## Screenshots

| Landing page | Sorting visualizer |
|---|---|
| ![Landing page](src/public/landing.png) | ![Sorting](src/public/sorting.png) |

| Pathfinding visualizer | Searching visualizer |
|---|---|
| ![Pathfinding](src/public/pathfinding.png) | ![Searching](src/public/searching.png) |

---

## Project overview

VizaRithm is a portfolio-quality, browser-based tool for visualizing classic computer science algorithms. Each algorithm runs as a **step-by-step animation** — you can play it at any speed, pause mid-execution, advance one operation at a time, or reset and try again. A persistent info panel explains what the algorithm does, its time and space complexity, and the specific operation happening at the current step.

The project now covers six categories — **sorting**, **pathfinding**, **searching**, **binary tree (BST)**, **graphs**, and **dynamic programming** — across 24 algorithms total. It is designed to be extended: adding a new algorithm still follows a predictable workflow in a few focused files.

---

## Why I built this

I wanted a portfolio project that demonstrated real engineering decisions, not just UI polish. Most algorithm visualizers I found were either too simple (a single sorting demo) or too complex to follow the code. I set out to build something with a clean separation of concerns — pure logic functions, typed data structures, and a UI layer that could be swapped independently.

---

## Features

### Playback controls
- **Play / Pause** — runs the animation at the selected speed
- **Step** — advances exactly one operation, ideal for studying edge cases
- **Reset** — clears animation state while preserving the current array or grid
- **Speed slider** — maps 1–100% to 600ms–10ms delay, nonlinearly scaled
- **Progress bar** — shows current position through the full step sequence

### Sorting visualizer
- Animated bars with state-colored fills: comparing (cyan), swapping (amber), sorted (green), pivot (pink), selected (purple)
- Adjustable array size from 10 to 80 elements
- Shuffle button to regenerate random data at any time

### Pathfinding visualizer
- Interactive 21 × 51 grid — click or drag to toggle walls
- Draw mode switcher: Wall / Start node / End node
- Random maze generator with configurable density
- Live stats: visited node count and final path length

### Searching visualizer
- Sorted arrays for Binary Search, unsorted for Linear Search — auto-generated correctly
- Dedicated hash-table lookup view with bucket-chain playback
- Custom target value input, or auto-pick a random existing value
- Mid / low / high pointer indicators for Binary Search

### Binary tree (BST) visualizer
- Interactive BST workflows: Insert, Search, BFS Traversal, and DFS Traversal
- DFS traversal order switcher: preorder, inorder, postorder
- Path highlighting for comparisons and traversal progress
- One-click random tree generation for fresh runs

### Graph visualizer
- Weighted node-link graph with one-click random graph generation
- BFS, DFS, and Dijkstra step-by-step traversal from configurable start and end nodes
- Live stats for visited nodes, path length, and shortest-path cost

### Dynamic programming visualizer
- Table-based playback for Fibonacci tabulation, 0/1 Knapsack, and LCS
- Built-in sample scenarios so each algorithm is ready to run immediately
- Live stats for filled cells and the current final answer

### Info panel (all visualizers)
- Live step annotation — updates every frame with a plain-language description
- Complexity table: best, average, and worst case time
- Space complexity and stability flag (sorting)
- Real-world use-case list per algorithm
- Built-in implementation viewer with language switching (JavaScript / Python / Java)

---

## Algorithms

### Sorting

| Algorithm | Best | Average | Worst | Space | Stable |
|---|---|---|---|---|---|
| Bubble Sort | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | ✅ |
| Selection Sort | `O(n²)` | `O(n²)` | `O(n²)` | `O(1)` | ❌ |
| Insertion Sort | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | ✅ |
| Merge Sort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | ✅ |
| Quick Sort | `O(n log n)` | `O(n log n)` | `O(n²)` | `O(log n)` | ❌ |
| Heap Sort | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(1)` | ❌ |
| Bogo Sort | `O(n)` | `O(n · n!)` | `Unbound (infinite)` | `O(1)` | ❌ |

### Pathfinding

| Algorithm | Time | Space | Shortest path | Weighted |
|---|---|---|---|---|
| BFS | `O(V + E)` | `O(V)` | ✅ (unweighted) | ❌ |
| DFS | `O(V + E)` | `O(V)` | ❌ | ❌ |
| Dijkstra's | `O((V+E) log V)` | `O(V)` | ✅ | ✅ |
| A* Search | `O(E log V)` | `O(V)` | ✅ | ✅ |

### Searching

| Algorithm | Best | Average | Space | Sorted required |
|---|---|---|---|---|
| Linear Search | `O(1)` | `O(n)` | `O(1)` | ❌ |
| Binary Search | `O(1)` | `O(log n)` | `O(1)` | ✅ |
| Hash Table Lookup | `O(1)` | `O(1)` | `O(n)` | ❌ |

### Binary Tree (BST)

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| BST Insert | `O(log n)` | `O(log n)` | `O(n)` | `O(n)` |
| BST Search | `O(1)` | `O(log n)` | `O(n)` | `O(1)` |
| BFS Traversal | `O(n)` | `O(n)` | `O(n)` | `O(n)` |
| DFS Traversal | `O(n)` | `O(n)` | `O(n)` | `O(h)` |

### Graphs

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Graph BFS | `O(V + E)` | `O(V + E)` | `O(V + E)` | `O(V)` |
| Graph DFS | `O(V + E)` | `O(V + E)` | `O(V + E)` | `O(V)` |
| Graph Dijkstra | `O(V log V)` | `O((V+E) log V)` | `O((V+E) log V)` | `O(V)` |

### Dynamic Programming

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Fibonacci DP | `O(n)` | `O(n)` | `O(n)` | `O(n)` |
| 0/1 Knapsack | `O(nW)` | `O(nW)` | `O(nW)` | `O(nW)` |
| LCS | `O(mn)` | `O(mn)` | `O(mn)` | `O(mn)` |

### Code snippets

Every algorithm in the info panel includes implementation snippets in **JavaScript, Python, and Java**.

```javascript
function search(root, target) {
  let cur = root;
  while (cur) {
    if (cur.value === target) return cur;
    cur = target < cur.value ? cur.left : cur.right;
  }
  return null;
}
```

---

## Tech stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | File-based routing, Vercel deployment, server components where useful |
| Language | TypeScript 5 | Strict typing across all algorithm data structures and props |
| Styling | Tailwind CSS 3 | Utility-first, no runtime CSS overhead, consistent design tokens |
| Animation | Framer Motion 11 | `layout` prop for bar reordering, `AnimatePresence` for view transitions, `layoutId` for shared element motion |
| Icons | Lucide React | Tree-shakeable, consistent stroke width, TypeScript types included |
| Fonts | Syne + DM Sans + JetBrains Mono | Display / body / code — three distinct roles, none generic |

---

## Architecture

### Folder structure
```
src/
├── app/
│   ├── globals.css              # design tokens, custom scrollbar, range inputs
│   ├── layout.tsx               # root layout + metadata
│   ├── page.tsx                 # landing page
│   └── visualizer/
│       ├── layout.tsx           # h-screen wrapper
│       └── page.tsx             # sidebar + animated view switcher
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # collapsible category nav, animated active bar
│   │   └── AlgorithmInfoPanel.tsx
│   ├── ui/
│   │   └── ControlBar.tsx       # shared across all six visualizers
│   ├── sorting/
│   │   ├── SortingVisualizer.tsx
│   │   └── SortBars.tsx
│   ├── pathfinding/
│   │   ├── PathfindingVisualizer.tsx
│   │   └── PathGrid.tsx
│   ├── searching/
│   │   ├── SearchingVisualizer.tsx
│   │   ├── HashTableLookupVisualizer.tsx
│   │   ├── HashTableView.tsx
│   │   └── SearchBars.tsx
│   ├── graph/
│   │   ├── GraphVisualizer.tsx
│   │   └── GraphCanvas.tsx
│   ├── dynamic/
│   │   ├── DynamicProgrammingVisualizer.tsx
│   │   └── DPTable.tsx
│   └── tree/
│       ├── TreeVisualizer.tsx
│       └── TreeCanvas.tsx
│
├── lib/
│   ├── utils.ts                 # cn(), generators, speedToDelay()
│   └── algorithms/
│       ├── sorting/index.ts     # 7 pure step-generator functions
│       ├── pathfinding/index.ts # 4 algorithms + grid helpers
│       ├── graph/index.ts       # graph generation + BFS/DFS/Dijkstra steps
│       ├── dynamic/index.ts     # Fibonacci, Knapsack, and LCS table steps
│       ├── searching/index.ts   # linear, binary, and hash-table lookup steps
│       └── tree/index.ts        # BST + traversal step generators + layout
│
├── types/index.ts               # SortBar, Cell, SearchBar, TreeNode, GraphNode, DPTable, PlayState, Step types
└── constants/algorithms.ts      # metadata + complexity + per-language code snippets
```

### The step-generator pattern

All algorithm logic lives in **pure functions** that accept an initial data structure and return an array of immutable snapshots — one per operation. The visualizer simply indexes into this array.
```ts
// Every algorithm follows this contract
function generateMergeSortSteps(initial: SortBar[]): SortStep[] {
  // Returns: [{ bars: [...], description: "Dividing [0..4]" }, ...]
}

// The visualizer just indexes into the array
setBars(steps[stepIndex].bars);
```

This means all algorithm logic is **testable without a browser**, and the UI is fully decoupled from the algorithm's internals.

### Ref-based interval management

Auto-play uses `setInterval` with refs for step index and the steps array, avoiding the stale closure bug where the interval callback always sees the initial state:
```ts
const stepsRef     = useRef<SortStep[]>([]);
const stepIndexRef = useRef(-1);

const advance = useCallback(() => {
  const next = stepIndexRef.current + 1; // always reads current value
  stepIndexRef.current = next;
  setStepIndex(next);                    // triggers re-render
  setBars(stepsRef.current[next].bars);
}, []); // zero deps — never recreated, no stale closure
```

### Adding a new algorithm

Three core steps (plus optional snippets):

1. Add an entry to `ALGORITHM_INFO` in `src/constants/algorithms.ts`
2. Write a `generateXxxSteps()` function in the appropriate `src/lib/algorithms/` file
3. Add a `case` to the `switch` in the visualizer component
4. (Optional) Add language snippets in `ALGORITHM_CODE_SNIPPETS` for the info panel

---

## Setup instructions

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Local development
```bash
git clone https://github.com/yourusername/vizarithm.git
cd vizarithm
npm install
npm run dev
# → http://localhost:3000
```

### Production build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel   # zero config — follows Next.js conventions automatically
```

> No environment variables required. VizaRithm is a fully static SPA with no backend dependencies.

---

## Future improvements

**Algorithms**
- Radix Sort, Tim Sort, Shell Sort
- Bellman-Ford, bidirectional BFS
- Jump Search, Interpolation Search

**Features**
- Custom array input — type your own values
- Side-by-side algorithm comparison mode
- Shareable URL state (encoded array + algorithm + step)
- Weighted grid cells for Dijkstra and A*
- Maze generation: Recursive Division, Prim's, Kruskal's
- Export animation as GIF or MP4
- Keyboard shortcuts: `Space` = play/pause, `→` = step, `R` = reset

**Quality**
- Unit tests for all step-generator functions (zero DOM dependency)
- Playwright E2E test suite
- Storybook for UI components
- Mobile touch support for the pathfinding grid

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/heap-sort`
3. Commit your changes: `git commit -m 'Add Heap Sort step generator'`
4. Push to your branch and open a Pull Request

---

## License

MIT — free to use, adapt, and build on.

---

<p align="center">
  Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
</p>
