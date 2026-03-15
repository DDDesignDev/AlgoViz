import { AlgorithmInfo } from "@/types";

export const ALGORITHM_INFO: Record<string, AlgorithmInfo> = {
  // ── Sorting ──────────────────────────────────────────────────────────────
  bubbleSort: {
    id: "bubbleSort",
    name: "Bubble Sort",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description:
      "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted. It gets its name because smaller elements 'bubble' to the top.",
    useCases: [
      "Educational purposes",
      "Nearly-sorted small datasets",
      "Detecting if array is already sorted",
    ],
  },
  selectionSort: {
    id: "selectionSort",
    name: "Selection Sort",
    category: "sorting",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: false,
    description:
      "Selection Sort divides the array into a sorted and unsorted region. It repeatedly finds the minimum element from the unsorted region and places it at the beginning of the sorted region. Simple but inefficient for large data.",
    useCases: [
      "Small datasets",
      "Minimizing the number of swaps",
      "Memory-constrained environments",
    ],
  },
  insertionSort: {
    id: "insertionSort",
    name: "Insertion Sort",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    stable: true,
    description:
      "Insertion Sort builds the sorted array one element at a time by taking each element and inserting it into its correct position in the already-sorted portion. Works like sorting playing cards in hand — very efficient for small or nearly-sorted datasets.",
    useCases: [
      "Small datasets",
      "Online sorting (data arrives incrementally)",
      "Nearly-sorted arrays",
      "Hybrid algorithms (e.g., Timsort)",
    ],
  },
  mergeSort: {
    id: "mergeSort",
    name: "Merge Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    stable: true,
    description:
      "Merge Sort is a divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, and then merges the sorted halves back together. Guarantees O(n log n) time in all cases making it highly predictable.",
    useCases: [
      "Large datasets",
      "Linked lists",
      "External sorting (data doesn't fit in memory)",
      "Stable sort requirement",
    ],
  },
  quickSort: {
    id: "quickSort",
    name: "Quick Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    stable: false,
    description:
      "Quick Sort selects a 'pivot' element and partitions the array into elements less than and greater than the pivot, then recursively sorts each partition. Despite the worst-case O(n²), it's often the fastest in practice due to excellent cache performance.",
    useCases: [
      "General-purpose sorting",
      "Large datasets in practice",
      "In-memory sorting where space matters",
    ],
  },
  heapSort: {
    id: "heapSort",
    name: "Heap Sort",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    stable: false,
    description:
      "Heap Sort builds a max-heap from the array, then repeatedly extracts the largest element and places it at the end. It combines the speed of Merge Sort with the in-place property of Selection Sort.",
    useCases: [
      "When guaranteed O(n log n) is required",
      "When O(1) auxiliary space matters",
      "Priority queue implementations",
    ],
  },

  // ── Pathfinding ───────────────────────────────────────────────────────────
  bfs: {
    id: "bfs",
    name: "Breadth-First Search",
    category: "pathfinding",
    timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    spaceComplexity: "O(V)",
    description:
      "BFS explores nodes level by level, visiting all neighbors before going deeper. It guarantees the shortest path in unweighted graphs by systematically exploring the frontier outward from the source.",
    useCases: [
      "Shortest path in unweighted graphs",
      "Social network friend suggestions",
      "Web crawlers",
      "Level-order traversal",
    ],
  },
  dfs: {
    id: "dfs",
    name: "Depth-First Search",
    category: "pathfinding",
    timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    spaceComplexity: "O(V)",
    description:
      "DFS explores as far as possible along each branch before backtracking. It dives deep into the graph, which can be memory-efficient but doesn't guarantee the shortest path. Good for exploring all possible paths.",
    useCases: [
      "Cycle detection",
      "Topological sorting",
      "Maze generation",
      "Connected components",
    ],
  },
  dijkstra: {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "pathfinding",
    timeComplexity: { best: "O(V log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)" },
    spaceComplexity: "O(V)",
    description:
      "Dijkstra's algorithm finds the shortest path from a source to all other nodes in a weighted graph with non-negative weights. It uses a priority queue to greedily select the nearest unvisited node at each step.",
    useCases: [
      "GPS navigation",
      "Network routing protocols",
      "Weighted shortest path",
      "Flight scheduling",
    ],
  },
  aStar: {
    id: "aStar",
    name: "A* Search",
    category: "pathfinding",
    timeComplexity: { best: "O(E)", average: "O(E log V)", worst: "O(V²)" },
    spaceComplexity: "O(V)",
    description:
      "A* is an informed search algorithm that uses a heuristic to estimate the distance to the goal. By combining actual distance (g-score) with estimated distance (h-score), it finds optimal paths faster than Dijkstra in most cases.",
    useCases: [
      "Game pathfinding (AI enemies)",
      "Robotics navigation",
      "Puzzle solving",
      "When a good heuristic is available",
    ],
  },

  // ── Searching ─────────────────────────────────────────────────────────────
  linearSearch: {
    id: "linearSearch",
    name: "Linear Search",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    description:
      "Linear Search checks every element sequentially until it finds the target or exhausts the list. Works on both sorted and unsorted arrays — simple and universal, but inefficient for large datasets.",
    useCases: [
      "Unsorted arrays",
      "Small datasets",
      "Linked lists",
      "Single occurrence search",
    ],
  },
  binarySearch: {
    id: "binarySearch",
    name: "Binary Search",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    description:
      "Binary Search works on sorted arrays by repeatedly halving the search space. It compares the target with the middle element, then discards the half that can't contain the target. Extremely efficient — 1 billion elements found in ~30 comparisons.",
    useCases: [
      "Sorted arrays",
      "Dictionary lookups",
      "Database index searching",
      "Finding insertion points",
    ],
  },

  // ── Binary Tree ───────────────────────────────────────────────────────────
  bstInsert: {
    id: "bstInsert",
    name: "BST Insert",
    category: "tree",
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    description:
      "Inserts a value into a Binary Search Tree by comparing at each node and going left if smaller, right if larger, until an empty slot is found. The worst case is O(n) when the tree degenerates into a linked list (sorted input).",
    useCases: ["Dynamic sorted data", "Symbol tables", "Database indexing"],
  },
  bstSearch: {
    id: "bstSearch",
    name: "BST Search",
    category: "tree",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    description:
      "Searches a BST by comparing the target at each node — go left if smaller, right if larger. Returns found or not found. Efficient on balanced trees; degrades on skewed ones.",
    useCases: ["Lookup in sorted structures", "Auto-complete", "Range queries"],
  },
  bfsBST: {
    id: "bfsBST",
    name: "BFS Traversal",
    category: "tree",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    description:
      "Level-order traversal visits every node level by level using a queue. It processes all nodes at depth 0 before depth 1, and so on — useful for finding the shortest path in unweighted trees.",
    useCases: ["Level-order processing", "Shortest path in trees", "Serialization"],
  },
  dfsBST: {
    id: "dfsBST",
    name: "DFS Traversal",
    category: "tree",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    description:
      "Depth-first traversal explores as deep as possible before backtracking. Pre-order visits root first, in-order visits left → root → right (producing sorted output for BSTs), and post-order visits children before parent.",
    useCases: ["Expression trees", "Producing sorted output (in-order)", "File system traversal"],
  },

};

export const SORTING_ALGORITHMS = ["bubbleSort", "selectionSort", "insertionSort", "mergeSort", "quickSort", "heapSort"];
export const PATHFINDING_ALGORITHMS = ["bfs", "dfs", "dijkstra", "aStar"];
export const SEARCHING_ALGORITHMS = ["linearSearch", "binarySearch"];
export const TREE_ALGORITHMS = ["bstInsert", "bstSearch", "bfsBST", "dfsBST"];

export const CATEGORY_LABELS: Record<string, string> = {
  sorting: "Sorting",
  pathfinding: "Pathfinding",
  searching: "Searching",
};

export const DEFAULT_SPEED = 50; // ms delay
export const MIN_SPEED = 10;
export const MAX_SPEED = 500;

export const GRID_ROWS = 21;
export const GRID_COLS = 51;
