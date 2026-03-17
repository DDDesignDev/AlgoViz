import { AlgorithmInfo, CodeLanguage } from "@/types";

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
  bogoSort: {
    id: "bogoSort",
    name: "Bogo Sort",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n · n!)", worst: "Unbound (infinite)" },
    spaceComplexity: "O(1)",
    stable: false,
    description:
      "Bogo Sort repeatedly shuffles the array at random until it happens to be sorted. It does not follow any logical strategy and relies entirely on chance.",
    useCases: [
      "Educational use to show why algorithm design matters",
      "Compare complexity to algorithms like Quick Sort and Merge Sort",
      "Demonstrates brute force and probability concepts",
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
  hashTableLookup: {
    id: "hashTableLookup",
    name: "Hash Table Lookup",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    description:
      "Hash-table lookup hashes the key to a bucket and only inspects that bucket's collision chain. It is constant time on average, but poor hashing or heavy collisions can degrade it toward linear time.",
    useCases: [
      "Key-value caches",
      "Symbol tables",
      "Fast membership tests",
      "High-throughput average-case lookups",
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

  // ── Graphs ────────────────────────────────────────────────────────────────
  graphBFS: {
    id: "graphBFS",
    name: "Graph BFS",
    category: "graph",
    timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    spaceComplexity: "O(V)",
    description:
      "Graph BFS traverses a graph level by level from a chosen start node using a queue. In unweighted graphs, the first time it reaches a target node it has found a shortest path in number of edges.",
    useCases: ["Unweighted shortest paths", "Social graphs", "Broadcast layering", "Connected component scans"],
  },
  graphDFS: {
    id: "graphDFS",
    name: "Graph DFS",
    category: "graph",
    timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    spaceComplexity: "O(V)",
    description:
      "Graph DFS explores one branch as deeply as possible before backtracking. It is useful for structural graph tasks like cycle detection, topological reasoning, and finding any reachable path.",
    useCases: ["Cycle detection", "Topological sorting", "Reachability checks", "Maze-style exploration"],
  },
  graphDijkstra: {
    id: "graphDijkstra",
    name: "Graph Dijkstra",
    category: "graph",
    timeComplexity: { best: "O(V log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)" },
    spaceComplexity: "O(V)",
    description:
      "Dijkstra's algorithm computes shortest paths in weighted graphs with non-negative edge weights. It repeatedly settles the frontier node with the smallest known tentative distance, guaranteeing an optimal path.",
    useCases: ["Network routing", "Weighted navigation", "Dependency cost analysis", "Shortest-path trees"],
  },

  // ── Dynamic Programming ───────────────────────────────────────────────────
  dpFibonacci: {
    id: "dpFibonacci",
    name: "Fibonacci DP",
    category: "dynamic",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    description:
      "Bottom-up Fibonacci tabulation fills a 1D table from the smallest subproblems upward. Each value depends only on the two previous cells, making it the simplest example of dynamic programming.",
    useCases: ["Teaching tabulation", "Overlapping subproblems", "Sequence recurrence optimization"],
  },
  dpKnapsack: {
    id: "dpKnapsack",
    name: "0/1 Knapsack",
    category: "dynamic",
    timeComplexity: { best: "O(nW)", average: "O(nW)", worst: "O(nW)" },
    spaceComplexity: "O(nW)",
    description:
      "0/1 Knapsack builds a table where each cell stores the best value achievable with a prefix of items and a limited capacity. Every entry decides whether to include or exclude the current item.",
    useCases: ["Resource allocation", "Budget optimization", "Subset selection under constraints"],
  },
  dpLCS: {
    id: "dpLCS",
    name: "Longest Common Subsequence",
    category: "dynamic",
    timeComplexity: { best: "O(mn)", average: "O(mn)", worst: "O(mn)" },
    spaceComplexity: "O(mn)",
    description:
      "LCS fills a 2D DP table over two strings to compute the longest subsequence shared by both. Matching characters extend the diagonal, while mismatches carry the best prefix answer from top or left.",
    useCases: ["Diff tools", "Bioinformatics sequence matching", "Version comparison"],
  },

};

export const CODE_LANGUAGE_LABELS: Record<CodeLanguage, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
};

export const CODE_LANGUAGE_ORDER: CodeLanguage[] = ["javascript", "python", "java"];

export const ALGORITHM_CODE_SNIPPETS: Record<string, Partial<Record<CodeLanguage, string>>> = {
  bubbleSort: {
    javascript: `function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return a;
}`,
    python: `def bubble_sort(arr):
    a = arr[:]
    for i in range(len(a)):
        swapped = False
        for j in range(len(a) - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a`,
    java: `static void bubbleSort(int[] a) {
  for (int i = 0; i < a.length; i++) {
    boolean swapped = false;
    for (int j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}`,
  },
  selectionSort: {
    javascript: `function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) min = j;
    }
    [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
}`,
    python: `def selection_sort(arr):
    a = arr[:]
    for i in range(len(a) - 1):
        min_i = i
        for j in range(i + 1, len(a)):
            if a[j] < a[min_i]:
                min_i = j
        a[i], a[min_i] = a[min_i], a[i]
    return a`,
    java: `static void selectionSort(int[] a) {
  for (int i = 0; i < a.length - 1; i++) {
    int min = i;
    for (int j = i + 1; j < a.length; j++) {
      if (a[j] < a[min]) min = j;
    }
    int t = a[i]; a[i] = a[min]; a[min] = t;
  }
}`,
  },
  insertionSort: {
    javascript: `function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}`,
    python: `def insertion_sort(arr):
    a = arr[:]
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a`,
    java: `static void insertionSort(int[] a) {
  for (int i = 1; i < a.length; i++) {
    int key = a[i];
    int j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
}`,
  },
  mergeSort: {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  return out.concat(a.slice(i), b.slice(j));
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:]); out.extend(b[j:])
    return out`,
    java: `static int[] mergeSort(int[] a) {
  if (a.length <= 1) return a;
  int mid = a.length / 2;
  int[] left = mergeSort(Arrays.copyOfRange(a, 0, mid));
  int[] right = mergeSort(Arrays.copyOfRange(a, mid, a.length));
  return merge(left, right);
}

static int[] merge(int[] a, int[] b) {
  int[] out = new int[a.length + b.length];
  int i = 0, j = 0, k = 0;
  while (i < a.length && j < b.length) out[k++] = a[i] <= b[j] ? a[i++] : b[j++];
  while (i < a.length) out[k++] = a[i++];
  while (j < b.length) out[k++] = b[j++];
  return out;
}`,
  },
  quickSort: {
    javascript: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return arr;
  const p = partition(arr, lo, hi);
  quickSort(arr, lo, p - 1);
  quickSort(arr, p + 1, hi);
  return arr;
}

function partition(a, lo, hi) {
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}`,
    python: `def quick_sort(a, lo=0, hi=None):
    if hi is None:
        hi = len(a) - 1
    if lo >= hi:
        return a
    p = partition(a, lo, hi)
    quick_sort(a, lo, p - 1)
    quick_sort(a, p + 1, hi)
    return a

def partition(a, lo, hi):
    pivot = a[hi]
    i = lo
    for j in range(lo, hi):
        if a[j] < pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]
    return i`,
    java: `static void quickSort(int[] a, int lo, int hi) {
  if (lo >= hi) return;
  int p = partition(a, lo, hi);
  quickSort(a, lo, p - 1);
  quickSort(a, p + 1, hi);
}

static int partition(int[] a, int lo, int hi) {
  int pivot = a[hi];
  int i = lo;
  for (int j = lo; j < hi; j++) {
    if (a[j] < pivot) {
      int t = a[i]; a[i] = a[j]; a[j] = t;
      i++;
    }
  }
  int t = a[i]; a[i] = a[hi]; a[hi] = t;
  return i;
}`,
  },
  heapSort: {
    javascript: `function heapSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(a, n, i);
  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    heapify(a, end, 0);
  }
  return a;
}

function heapify(a, n, i) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  if (l < n && a[l] > a[largest]) largest = l;
  if (r < n && a[r] > a[largest]) largest = r;
  if (largest !== i) {
    [a[i], a[largest]] = [a[largest], a[i]];
    heapify(a, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    a = arr[:]
    n = len(a)

    for i in range(n // 2 - 1, -1, -1):
        heapify(a, n, i)
    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        heapify(a, end, 0)
    return a

def heapify(a, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and a[l] > a[largest]:
        largest = l
    if r < n and a[r] > a[largest]:
        largest = r
    if largest != i:
        a[i], a[largest] = a[largest], a[i]
        heapify(a, n, largest)`,
    java: `static void heapSort(int[] a) {
  int n = a.length;
  for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);
  for (int end = n - 1; end > 0; end--) {
    int t = a[0]; a[0] = a[end]; a[end] = t;
    heapify(a, end, 0);
  }
}

static void heapify(int[] a, int n, int i) {
  int largest = i;
  int l = 2 * i + 1, r = 2 * i + 2;
  if (l < n && a[l] > a[largest]) largest = l;
  if (r < n && a[r] > a[largest]) largest = r;
  if (largest != i) {
    int t = a[i]; a[i] = a[largest]; a[largest] = t;
    heapify(a, n, largest);
  }
}`,
  },
  bogoSort: {
    javascript: `function bogoSort(arr) {
  const a = [...arr];

  function isSorted(values) {
    for (let i = 0; i < values.length - 1; i++) {
      if (values[i] > values[i + 1]) return false;
    }
    return true;
  }

  function shuffle(values) {
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
  }

  while (!isSorted(a)) shuffle(a);
  return a;
}`,
    python: `import random

def bogo_sort(arr):
    a = arr[:]

    def is_sorted(values):
        return all(values[i] <= values[i + 1] for i in range(len(values) - 1))

    while not is_sorted(a):
        random.shuffle(a)
    return a`,
    java: `static void bogoSort(int[] a) {
  while (!isSorted(a)) {
    shuffle(a);
  }
}

static boolean isSorted(int[] a) {
  for (int i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i + 1]) return false;
  }
  return true;
}

static void shuffle(int[] a) {
  Random rand = new Random();
  for (int i = a.length - 1; i > 0; i--) {
    int j = rand.nextInt(i + 1);
    int t = a[i]; a[i] = a[j]; a[j] = t;
  }
}`,
  },
  bfs: {
    javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node] ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}`,
    python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    q = deque([start])
    order = []

    while q:
        node = q.popleft()
        order.append(node)
        for nxt in graph.get(node, []):
            if nxt not in visited:
                visited.add(nxt)
                q.append(nxt)
    return order`,
    java: `static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
  Set<Integer> visited = new HashSet<>();
  Queue<Integer> q = new ArrayDeque<>();
  List<Integer> order = new ArrayList<>();
  visited.add(start);
  q.offer(start);

  while (!q.isEmpty()) {
    int node = q.poll();
    order.add(node);
    for (int next : graph.getOrDefault(node, List.of())) {
      if (visited.add(next)) q.offer(next);
    }
  }
  return order;
}`,
  },
  dfs: {
    javascript: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];

  function visit(node) {
    visited.add(node);
    order.push(node);
    for (const next of graph[node] ?? []) {
      if (!visited.has(next)) visit(next);
    }
  }

  visit(start);
  return order;
}`,
    python: `def dfs(graph, start):
    visited = set()
    order = []

    def visit(node):
        visited.add(node)
        order.append(node)
        for nxt in graph.get(node, []):
            if nxt not in visited:
                visit(nxt)

    visit(start)
    return order`,
    java: `static List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {
  Set<Integer> visited = new HashSet<>();
  List<Integer> order = new ArrayList<>();
  dfsRec(graph, start, visited, order);
  return order;
}

static void dfsRec(Map<Integer, List<Integer>> g, int node, Set<Integer> visited, List<Integer> order) {
  visited.add(node);
  order.add(node);
  for (int next : g.getOrDefault(node, List.of())) {
    if (!visited.contains(next)) dfsRec(g, next, visited, order);
  }
}`,
  },
  dijkstra: {
    javascript: `function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();
  const pq = [[0, start]];
  dist[start] = 0;

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    if (visited.has(node)) continue;
    visited.add(node);

    for (const [next, w] of graph[node] ?? []) {
      const nd = d + w;
      if (dist[next] === undefined || nd < dist[next]) {
        dist[next] = nd;
        pq.push([nd, next]);
      }
    }
  }
  return dist;
}`,
    python: `import heapq

def dijkstra(graph, start):
    dist = {start: 0}
    pq = [(0, start)]
    visited = set()

    while pq:
        d, node = heapq.heappop(pq)
        if node in visited:
            continue
        visited.add(node)
        for nxt, w in graph.get(node, []):
            nd = d + w
            if nxt not in dist or nd < dist[nxt]:
                dist[nxt] = nd
                heapq.heappush(pq, (nd, nxt))
    return dist`,
    java: `static Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> graph, int start) {
  Map<Integer, Integer> dist = new HashMap<>();
  PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
  Set<Integer> visited = new HashSet<>();
  dist.put(start, 0);
  pq.offer(new int[]{0, start});

  while (!pq.isEmpty()) {
    int[] cur = pq.poll();
    int d = cur[0], node = cur[1];
    if (!visited.add(node)) continue;
    for (int[] edge : graph.getOrDefault(node, List.of())) {
      int next = edge[0], w = edge[1];
      int nd = d + w;
      if (nd < dist.getOrDefault(next, Integer.MAX_VALUE)) {
        dist.put(next, nd);
        pq.offer(new int[]{nd, next});
      }
    }
  }
  return dist;
}`,
  },
  aStar: {
    javascript: `function aStar(start, goal, neighbors, heuristic) {
  const open = [[heuristic(start, goal), 0, start]];
  const gScore = { [start]: 0 };
  const cameFrom = {};

  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [, g, node] = open.shift();
    if (node === goal) return { cost: g, cameFrom };

    for (const [next, cost] of neighbors(node)) {
      const tentative = g + cost;
      if (tentative < (gScore[next] ?? Infinity)) {
        cameFrom[next] = node;
        gScore[next] = tentative;
        open.push([tentative + heuristic(next, goal), tentative, next]);
      }
    }
  }
  return null;
}`,
    python: `import heapq

def a_star(start, goal, neighbors, heuristic):
    open_set = [(heuristic(start, goal), 0, start)]
    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, g, node = heapq.heappop(open_set)
        if node == goal:
            return g, came_from
        for nxt, cost in neighbors(node):
            tentative = g + cost
            if tentative < g_score.get(nxt, float("inf")):
                came_from[nxt] = node
                g_score[nxt] = tentative
                f = tentative + heuristic(nxt, goal)
                heapq.heappush(open_set, (f, tentative, nxt))
    return None`,
    java: `static Integer aStar(
  int start,
  int goal,
  Function<Integer, List<int[]>> neighbors,
  ToIntBiFunction<Integer, Integer> h
) {
  PriorityQueue<int[]> open = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
  Map<Integer, Integer> gScore = new HashMap<>();
  gScore.put(start, 0);
  open.offer(new int[]{h.applyAsInt(start, goal), 0, start});

  while (!open.isEmpty()) {
    int[] cur = open.poll();
    int g = cur[1], node = cur[2];
    if (node == goal) return g;
    for (int[] edge : neighbors.apply(node)) {
      int next = edge[0], cost = edge[1];
      int tentative = g + cost;
      if (tentative < gScore.getOrDefault(next, Integer.MAX_VALUE)) {
        gScore.put(next, tentative);
        int f = tentative + h.applyAsInt(next, goal);
        open.offer(new int[]{f, tentative, next});
      }
    }
  }
  return null;
}`,
  },
  linearSearch: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1`,
    java: `static int linearSearch(int[] a, int target) {
  for (int i = 0; i < a.length; i++) {
    if (a[i] == target) return i;
  }
  return -1;
}`,
  },
  binarySearch: {
    javascript: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    java: `static int binarySearch(int[] a, int target) {
  int lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
  },
  hashTableLookup: {
    javascript: `function lookup(table, key) {
  const bucketIndex = key % table.length;
  const bucket = table[bucketIndex] ?? [];

  for (const entry of bucket) {
    if (entry.key === key) return entry.value;
  }

  return undefined;
}`,
    python: `def lookup(table, key):
    bucket_index = key % len(table)
    bucket = table[bucket_index]

    for entry_key, entry_value in bucket:
        if entry_key == key:
            return entry_value

    return None`,
    java: `static String lookup(List<List<Entry>> table, int key) {
  int bucketIndex = key % table.size();
  for (Entry entry : table.get(bucketIndex)) {
    if (entry.key == key) return entry.value;
  }
  return null;
}`,
  },
  bstInsert: {
    javascript: `function insert(root, value) {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}`,
    python: `def bst_insert(root, value):
    if root is None:
        return {"value": value, "left": None, "right": None}
    if value < root["value"]:
        root["left"] = bst_insert(root["left"], value)
    elif value > root["value"]:
        root["right"] = bst_insert(root["right"], value)
    return root`,
    java: `static Node insert(Node root, int value) {
  if (root == null) return new Node(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}`,
  },
  bstSearch: {
    javascript: `function search(root, target) {
  let cur = root;
  while (cur) {
    if (cur.value === target) return cur;
    cur = target < cur.value ? cur.left : cur.right;
  }
  return null;
}`,
    python: `def bst_search(root, target):
    cur = root
    while cur is not None:
        if cur["value"] == target:
            return cur
        cur = cur["left"] if target < cur["value"] else cur["right"]
    return None`,
    java: `static Node search(Node root, int target) {
  Node cur = root;
  while (cur != null) {
    if (cur.value == target) return cur;
    cur = target < cur.value ? cur.left : cur.right;
  }
  return null;
}`,
  },
  bfsBST: {
    javascript: `function bfsTraversal(root) {
  if (!root) return [];
  const q = [root];
  const out = [];
  while (q.length) {
    const node = q.shift();
    out.push(node.value);
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
  return out;
}`,
    python: `from collections import deque

def bfs_traversal(root):
    if root is None:
        return []
    q = deque([root])
    out = []
    while q:
        node = q.popleft()
        out.append(node["value"])
        if node["left"]: q.append(node["left"])
        if node["right"]: q.append(node["right"])
    return out`,
    java: `static List<Integer> bfsTraversal(Node root) {
  if (root == null) return List.of();
  Queue<Node> q = new ArrayDeque<>();
  List<Integer> out = new ArrayList<>();
  q.offer(root);
  while (!q.isEmpty()) {
    Node n = q.poll();
    out.add(n.value);
    if (n.left != null) q.offer(n.left);
    if (n.right != null) q.offer(n.right);
  }
  return out;
}`,
  },
  dfsBST: {
    javascript: `function preorder(root, out = []) {
  if (!root) return out;
  out.push(root.value);
  preorder(root.left, out);
  preorder(root.right, out);
  return out;
}

function inorder(root, out = []) {
  if (!root) return out;
  inorder(root.left, out);
  out.push(root.value);
  inorder(root.right, out);
  return out;
}

function postorder(root, out = []) {
  if (!root) return out;
  postorder(root.left, out);
  postorder(root.right, out);
  out.push(root.value);
  return out;
}`,
    python: `def preorder(root, out=None):
    if out is None:
        out = []
    if root is None:
        return out
    out.append(root["value"])
    preorder(root["left"], out)
    preorder(root["right"], out)
    return out

def inorder(root, out=None):
    if out is None:
        out = []
    if root is None:
        return out
    inorder(root["left"], out)
    out.append(root["value"])
    inorder(root["right"], out)
    return out

def postorder(root, out=None):
    if out is None:
        out = []
    if root is None:
        return out
    postorder(root["left"], out)
    postorder(root["right"], out)
    out.append(root["value"])
    return out`,
    java: `static void preorder(Node root, List<Integer> out) {
  if (root == null) return;
  out.add(root.value);
  preorder(root.left, out);
  preorder(root.right, out);
}

static void inorder(Node root, List<Integer> out) {
  if (root == null) return;
  inorder(root.left, out);
  out.add(root.value);
  inorder(root.right, out);
}

static void postorder(Node root, List<Integer> out) {
  if (root == null) return;
  postorder(root.left, out);
  postorder(root.right, out);
  out.add(root.value);
}`,
  },
  graphBFS: {
    javascript: `function graphBfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node] ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  return order;
}`,
    python: `from collections import deque

def graph_bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in graph.get(node, []):
            if nxt not in visited:
                visited.add(nxt)
                queue.append(nxt)

    return order`,
    java: `static List<String> graphBfs(Map<String, List<String>> graph, String start) {
  Set<String> visited = new HashSet<>();
  Queue<String> queue = new ArrayDeque<>();
  List<String> order = new ArrayList<>();
  visited.add(start);
  queue.offer(start);

  while (!queue.isEmpty()) {
    String node = queue.poll();
    order.add(node);
    for (String next : graph.getOrDefault(node, List.of())) {
      if (visited.add(next)) queue.offer(next);
    }
  }

  return order;
}`,
  },
  graphDFS: {
    javascript: `function graphDfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);

  for (const next of graph[start] ?? []) {
    if (!visited.has(next)) {
      graphDfs(graph, next, visited, order);
    }
  }

  return order;
}`,
    python: `def graph_dfs(graph, start, visited=None, order=None):
    if visited is None:
        visited = set()
    if order is None:
        order = []

    visited.add(start)
    order.append(start)

    for nxt in graph.get(start, []):
        if nxt not in visited:
            graph_dfs(graph, nxt, visited, order)

    return order`,
    java: `static void graphDfs(
  Map<String, List<String>> graph,
  String start,
  Set<String> visited,
  List<String> order
) {
  visited.add(start);
  order.add(start);

  for (String next : graph.getOrDefault(start, List.of())) {
    if (!visited.contains(next)) {
      graphDfs(graph, next, visited, order);
    }
  }
}`,
  },
  graphDijkstra: {
    javascript: `function dijkstra(graph, start) {
  const dist = { [start]: 0 };
  const prev = {};
  const pq = [[0, start]];
  const settled = new Set();

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, node] = pq.shift();
    if (settled.has(node)) continue;
    settled.add(node);

    for (const [next, weight] of graph[node] ?? []) {
      const cand = cost + weight;
      if (cand < (dist[next] ?? Infinity)) {
        dist[next] = cand;
        prev[next] = node;
        pq.push([cand, next]);
      }
    }
  }

  return { dist, prev };
}`,
    python: `import heapq

def dijkstra(graph, start):
    dist = {start: 0}
    prev = {}
    pq = [(0, start)]
    settled = set()

    while pq:
        cost, node = heapq.heappop(pq)
        if node in settled:
            continue
        settled.add(node)

        for nxt, weight in graph.get(node, []):
            cand = cost + weight
            if cand < dist.get(nxt, float("inf")):
                dist[nxt] = cand
                prev[nxt] = node
                heapq.heappush(pq, (cand, nxt))

    return dist, prev`,
    java: `static Map<String, Integer> dijkstra(
  Map<String, List<String[]>> graph,
  String start
) {
  Map<String, Integer> dist = new HashMap<>();
  PriorityQueue<String[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> Integer.parseInt(a[0])));
  Set<String> settled = new HashSet<>();
  dist.put(start, 0);
  pq.offer(new String[]{"0", start});

  while (!pq.isEmpty()) {
    String[] cur = pq.poll();
    int cost = Integer.parseInt(cur[0]);
    String node = cur[1];
    if (!settled.add(node)) continue;

    for (String[] edge : graph.getOrDefault(node, List.of())) {
      String next = edge[0];
      int weight = Integer.parseInt(edge[1]);
      int cand = cost + weight;
      if (cand < dist.getOrDefault(next, Integer.MAX_VALUE)) {
        dist.put(next, cand);
        pq.offer(new String[]{String.valueOf(cand), next});
      }
    }
  }

  return dist;
}`,
  },
  dpFibonacci: {
    javascript: `function fibTab(n) {
  if (n <= 1) return n;
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}`,
    python: `def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]`,
    java: `static int fibTab(int n) {
  if (n <= 1) return n;
  int[] dp = new int[n + 1];
  dp[1] = 1;

  for (int i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}`,
  },
  dpKnapsack: {
    javascript: `function knapsack(values, weights, capacity) {
  const dp = Array.from({ length: values.length + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= values.length; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          values[i - 1] + dp[i - 1][w - weights[i - 1]]
        );
      }
    }
  }

  return dp[values.length][capacity];
}`,
    python: `def knapsack(values, weights, capacity):
    dp = [[0] * (capacity + 1) for _ in range(len(values) + 1)]

    for i in range(1, len(values) + 1):
        for w in range(capacity + 1):
            if weights[i - 1] > w:
                dp[i][w] = dp[i - 1][w]
            else:
                dp[i][w] = max(
                    dp[i - 1][w],
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]
                )

    return dp[len(values)][capacity]`,
    java: `static int knapsack(int[] values, int[] weights, int capacity) {
  int[][] dp = new int[values.length + 1][capacity + 1];

  for (int i = 1; i <= values.length; i++) {
    for (int w = 0; w <= capacity; w++) {
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          values[i - 1] + dp[i - 1][w - weights[i - 1]]
        );
      }
    }
  }

  return dp[values.length][capacity];
}`,
  },
  dpLCS: {
    javascript: `function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[a.length][b.length];
}`,
    python: `def lcs(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]

    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[len(a)][len(b)]`,
    java: `static int lcs(String a, String b) {
  int[][] dp = new int[a.length() + 1][b.length() + 1];

  for (int i = 1; i <= a.length(); i++) {
    for (int j = 1; j <= b.length(); j++) {
      if (a.charAt(i - 1) == b.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[a.length()][b.length()];
}`,
  },
};

export const SORTING_ALGORITHMS = ["bubbleSort", "selectionSort", "insertionSort", "mergeSort", "quickSort", "heapSort", "bogoSort"];
export const PATHFINDING_ALGORITHMS = ["bfs", "dfs", "dijkstra", "aStar"];
export const SEARCHING_ALGORITHMS = ["linearSearch", "binarySearch", "hashTableLookup"];
export const TREE_ALGORITHMS = ["bstInsert", "bstSearch", "bfsBST", "dfsBST"];
export const GRAPH_ALGORITHMS = ["graphBFS", "graphDFS", "graphDijkstra"];
export const DYNAMIC_ALGORITHMS = ["dpFibonacci", "dpKnapsack", "dpLCS"];

export const CATEGORY_LABELS: Record<string, string> = {
  sorting: "Sorting",
  pathfinding: "Pathfinding",
  searching: "Searching",
  tree: "Trees",
  graph: "Graphs",
  dynamic: "Dynamic Programming",
};

export const DEFAULT_SPEED = 50; // ms delay
export const MIN_SPEED = 10;
export const MAX_SPEED = 500;

export const GRID_ROWS = 21;
export const GRID_COLS = 51;
