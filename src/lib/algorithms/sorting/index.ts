import { SortBar, SortStep } from "@/types";

// Helper to create a deep copy of bars with a description
function snapshot(bars: SortBar[], description: string): SortStep {
  return { bars: bars.map((b) => ({ ...b })), description };
}

function resetStates(bars: SortBar[], except: number[] = []): SortBar[] {
  return bars.map((b, i) =>
    except.includes(i) || b.state === "sorted"
      ? b
      : { ...b, state: "default" }
  );
}

// ── Bubble Sort ───────────────────────────────────────────────────────────────
export function generateBubbleSortSteps(initial: SortBar[]): SortStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SortStep[] = [];
  const n = bars.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing
      bars[j].state = "comparing";
      bars[j + 1].state = "comparing";
      steps.push(snapshot(bars, `Comparing indices ${j} (${bars[j].value}) and ${j + 1} (${bars[j + 1].value})`));

      if (bars[j].value > bars[j + 1].value) {
        // Swap
        bars[j].state = "swapping";
        bars[j + 1].state = "swapping";
        steps.push(snapshot(bars, `Swapping ${bars[j].value} and ${bars[j + 1].value}`));
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        steps.push(snapshot(bars, `Swapped → ${bars[j].value} is now before ${bars[j + 1].value}`));
      }

      bars[j].state = "default";
      bars[j + 1].state = "default";
    }
    bars[n - 1 - i].state = "sorted";
    steps.push(snapshot(bars, `Element ${bars[n - 1 - i].value} is now in its final sorted position`));
  }

  bars[0].state = "sorted";
  steps.push(snapshot(bars, "Array is fully sorted! 🎉"));
  return steps;
}

// ── Selection Sort ────────────────────────────────────────────────────────────
export function generateSelectionSortSteps(initial: SortBar[]): SortStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SortStep[] = [];
  const n = bars.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    bars[minIdx].state = "selected";
    steps.push(snapshot(bars, `Starting pass ${i + 1}: current minimum is index ${minIdx} (${bars[minIdx].value})`));

    for (let j = i + 1; j < n; j++) {
      bars[j].state = "comparing";
      steps.push(snapshot(bars, `Comparing ${bars[j].value} with current minimum ${bars[minIdx].value}`));

      if (bars[j].value < bars[minIdx].value) {
        bars[minIdx].state = "default";
        minIdx = j;
        bars[minIdx].state = "selected";
        steps.push(snapshot(bars, `New minimum found: ${bars[minIdx].value} at index ${minIdx}`));
      } else {
        bars[j].state = "default";
      }
    }

    if (minIdx !== i) {
      bars[i].state = "swapping";
      bars[minIdx].state = "swapping";
      steps.push(snapshot(bars, `Swapping minimum ${bars[minIdx].value} with element at position ${i} (${bars[i].value})`));
      [bars[i], bars[minIdx]] = [bars[minIdx], bars[i]];
    }

    bars[i].state = "sorted";
    if (minIdx !== i) bars[minIdx].state = "default";
    steps.push(snapshot(bars, `Position ${i} is now sorted with value ${bars[i].value}`));
  }

  bars[n - 1].state = "sorted";
  steps.push(snapshot(bars, "Array is fully sorted! 🎉"));
  return steps;
}

// ── Insertion Sort ────────────────────────────────────────────────────────────
export function generateInsertionSortSteps(initial: SortBar[]): SortStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SortStep[] = [];
  const n = bars.length;

  bars[0].state = "sorted";
  steps.push(snapshot(bars, "First element is trivially sorted"));

  for (let i = 1; i < n; i++) {
    const key = bars[i].value;
    bars[i].state = "selected";
    steps.push(snapshot(bars, `Picking up element ${key} at index ${i} to insert into sorted portion`));

    let j = i - 1;
    while (j >= 0 && bars[j].value > key) {
      bars[j].state = "comparing";
      bars[j + 1].state = "swapping";
      steps.push(snapshot(bars, `${bars[j].value} > ${key}, shifting ${bars[j].value} right`));
      bars[j + 1].value = bars[j].value;
      bars[j + 1].state = "sorted";
      bars[j].state = "sorted";
      steps.push(snapshot(bars, `Shifted ${bars[j + 1].value} to position ${j + 1}`));
      j--;
    }

    bars[j + 1].value = key;
    bars[j + 1].state = "sorted";
    steps.push(snapshot(bars, `Inserted ${key} at index ${j + 1} — sorted portion grows`));
  }

  steps.push(snapshot(bars, "Array is fully sorted! 🎉"));
  return steps;
}

// ── Merge Sort ────────────────────────────────────────────────────────────────
export function generateMergeSortSteps(initial: SortBar[]): SortStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SortStep[] = [];

  function merge(arr: SortBar[], left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1).map((b) => ({ ...b }));
    const rightArr = arr.slice(mid + 1, right + 1).map((b) => ({ ...b }));

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      arr[left + i].state = "comparing";
      arr[mid + 1 + j].state = "comparing";
      steps.push(snapshot(arr, `Merging: comparing ${leftArr[i].value} (left) with ${rightArr[j].value} (right)`));

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k].value = leftArr[i].value;
        arr[k].state = "swapping";
        steps.push(snapshot(arr, `Placed ${leftArr[i].value} from left subarray at position ${k}`));
        i++;
      } else {
        arr[k].value = rightArr[j].value;
        arr[k].state = "swapping";
        steps.push(snapshot(arr, `Placed ${rightArr[j].value} from right subarray at position ${k}`));
        j++;
      }
      arr[k].state = "default";
      k++;
    }

    while (i < leftArr.length) {
      arr[k].value = leftArr[i].value;
      arr[k].state = "swapping";
      steps.push(snapshot(arr, `Copying remaining left element ${leftArr[i].value} to position ${k}`));
      arr[k].state = "default";
      i++; k++;
    }

    while (j < rightArr.length) {
      arr[k].value = rightArr[j].value;
      arr[k].state = "swapping";
      steps.push(snapshot(arr, `Copying remaining right element ${rightArr[j].value} to position ${k}`));
      arr[k].state = "default";
      j++; k++;
    }

    for (let x = left; x <= right; x++) arr[x].state = "sorted";
    steps.push(snapshot(arr, `Subarray [${left}..${right}] is now merged and sorted`));
  }

  function mergeSort(arr: SortBar[], left: number, right: number) {
    if (left >= right) {
      arr[left].state = "sorted";
      return;
    }
    const mid = Math.floor((left + right) / 2);
    steps.push(snapshot(arr, `Dividing array: left half [${left}..${mid}], right half [${mid + 1}..${right}]`));
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  mergeSort(bars, 0, bars.length - 1);
  steps.push(snapshot(bars, "Array is fully sorted! 🎉"));
  return steps;
}

// ── Quick Sort ────────────────────────────────────────────────────────────────
export function generateQuickSortSteps(initial: SortBar[]): SortStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SortStep[] = [];

  function partition(arr: SortBar[], low: number, high: number): number {
    const pivot = arr[high].value;
    arr[high].state = "pivot";
    steps.push(snapshot(arr, `Pivot selected: ${pivot} at index ${high}`));

    let i = low - 1;

    for (let j = low; j < high; j++) {
      arr[j].state = "comparing";
      steps.push(snapshot(arr, `Comparing ${arr[j].value} with pivot ${pivot}`));

      if (arr[j].value <= pivot) {
        i++;
        if (i !== j) {
          arr[i].state = "swapping";
          arr[j].state = "swapping";
          steps.push(snapshot(arr, `${arr[j].value} ≤ ${pivot}, swapping with index ${i}`));
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push(snapshot(arr, `Swapped ${arr[i].value} and ${arr[j].value}`));
          arr[i].state = "default";
        }
      }
      arr[j].state = "default";
    }

    arr[high].state = "swapping";
    arr[i + 1].state = "swapping";
    steps.push(snapshot(arr, `Placing pivot ${pivot} into its correct position ${i + 1}`));
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    arr[i + 1].state = "sorted";
    arr[high].state = "default";
    steps.push(snapshot(arr, `Pivot ${pivot} is now in final position ${i + 1}`));

    return i + 1;
  }

  function quickSort(arr: SortBar[], low: number, high: number) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    } else if (low === high) {
      arr[low].state = "sorted";
    }
  }

  quickSort(bars, 0, bars.length - 1);
  bars.forEach((b) => (b.state = "sorted"));
  steps.push(snapshot(bars, "Array is fully sorted! 🎉"));
  return steps;
}

// ── Heap Sort ─────────────────────────────────────────────────────────────────
export function generateHeapSortSteps(initial: SortBar[]): SortStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SortStep[] = [];
  const n = bars.length;

  // Helper: restore heap property downward from index i
  function heapify(size: number, i: number) {
    let largest = i;
    const left  = 2 * i + 1;
    const right = 2 * i + 2;

    bars[i].state = "comparing";
    if (left < size)  bars[left].state  = "comparing";
    if (right < size) bars[right].state = "comparing";
    steps.push(snapshot(bars, `Heapify at index ${i}: checking children ${left} and ${right}`));

    if (left < size && bars[left].value > bars[largest].value)   largest = left;
    if (right < size && bars[right].value > bars[largest].value) largest = right;

    if (largest !== i) {
      bars[i].state       = "swapping";
      bars[largest].state = "swapping";
      steps.push(snapshot(bars, `Swapping ${bars[i].value} ↔ ${bars[largest].value} to restore heap`));
      [bars[i], bars[largest]] = [bars[largest], bars[i]];
      steps.push(snapshot(bars, `Swapped — heap property restored at index ${i}`));

      // Reset before recursing
      bars[i].state       = "default";
      bars[largest].state = "default";
      heapify(size, largest);
    } else {
      bars[i].state = "default";
      if (left  < size) bars[left].state  = "default";
      if (right < size) bars[right].state = "default";
    }
  }

  // Phase 1: Build max-heap
  steps.push(snapshot(bars, "Phase 1: building max-heap from the array"));
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  steps.push(snapshot(bars, "Max-heap built — largest element is now at index 0"));

  // Phase 2: Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    bars[0].state = "swapping";
    bars[i].state = "swapping";
    steps.push(snapshot(bars, `Placing max element ${bars[0].value} at its sorted position ${i}`));
    [bars[0], bars[i]] = [bars[i], bars[0]];
    bars[i].state = "sorted";
    bars[0].state = "default";
    steps.push(snapshot(bars, `${bars[i].value} is now in its final position`));
    heapify(i, 0);
  }

  bars[0].state = "sorted";
  steps.push(snapshot(bars, "Array is fully sorted! 🎉"));
  return steps;
}

// ── Bogo Sort ────────────────────────────────────────────────────────────────
export function generateBogoSortSteps(
  initial: SortBar[],
  maxShuffles = 100
): SortStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SortStep[] = [];

  function isSorted(arr: SortBar[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) return false;
    }
    return true;
  }

  function shuffle(arr: SortBar[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      arr[i].state = "swapping";
      arr[j].state = "swapping";
      steps.push(
        snapshot(arr, `Randomly swapping indices ${i} (${arr[i].value}) and ${j} (${arr[j].value})`)
      );

      [arr[i], arr[j]] = [arr[j], arr[i]];
      steps.push(
        snapshot(arr, `Shuffled: ${arr[i].value} is now at index ${i}, ${arr[j].value} is now at index ${j}`)
      );

      arr[i].state = "default";
      arr[j].state = "default";
    }
  }

  steps.push(snapshot(bars, "Starting Bogo Sort: randomly shuffle until the array is sorted"));

  if (isSorted(bars)) {
    bars.forEach((b) => (b.state = "sorted"));
    steps.push(snapshot(bars, "Array was already sorted! 🎉"));
    return steps;
  }

  let attempts = 0;

  while (!isSorted(bars) && attempts < maxShuffles) {
    bars.forEach((b) => {
      if (b.state !== "sorted") b.state = "default";
    });

    steps.push(snapshot(bars, `Shuffle attempt ${attempts + 1}`));
    shuffle(bars);
    attempts++;

    if (isSorted(bars)) {
      bars.forEach((b) => (b.state = "sorted"));
      steps.push(snapshot(bars, `Array became sorted after ${attempts} shuffle${attempts === 1 ? "" : "s"}! 🎉`));
      return steps;
    }
  }

  if (isSorted(bars)) {
    bars.forEach((b) => (b.state = "sorted"));
    steps.push(snapshot(bars, `Array became sorted after ${attempts} shuffle${attempts === 1 ? "" : "s"}! 🎉`));
  } else {
    bars.forEach((b) => (b.state = "default"));
    steps.push(snapshot(bars, `Stopped after ${maxShuffles} shuffles to avoid an infinite run`));
  }

  return steps;
}

