import { HashBucket, SearchBar, SearchStep, HashLookupStep } from "@/types";

function snapshot(bars: SearchBar[], description: string, found: boolean, foundIndex: number | null, extra?: Partial<SearchStep>): SearchStep {
  return {
    bars: bars.map((b) => ({ ...b })),
    description,
    found,
    foundIndex,
    ...extra,
  };
}

function cloneBuckets(buckets: HashBucket[]): HashBucket[] {
  return buckets.map((bucket) => ({
    ...bucket,
    entries: bucket.entries.map((entry) => ({ ...entry })),
  }));
}

function bucketSnapshot(
  buckets: HashBucket[],
  description: string,
  found: boolean,
  bucketIndex: number | null,
  foundKey: number | null,
): HashLookupStep {
  return {
    buckets: cloneBuckets(buckets),
    description,
    found,
    bucketIndex,
    foundKey,
  };
}

export function createHashTableBuckets(entryCount: number, bucketCount = 7): HashBucket[] {
  const used = new Set<number>();
  const buckets: HashBucket[] = Array.from({ length: bucketCount }, (_, index) => ({
    index,
    state: "default",
    entries: [],
  }));

  while (used.size < entryCount) {
    const key = Math.floor(Math.random() * 90) + 10;
    if (used.has(key)) continue;
    used.add(key);

    const bucketIndex = key % bucketCount;
    buckets[bucketIndex].entries.push({
      key,
      value: `V${key}`,
      state: "default",
    });
  }

  for (const bucket of buckets) {
    bucket.entries.sort((a, b) => a.key - b.key);
  }

  return buckets;
}

// ── Linear Search ─────────────────────────────────────────────────────────────
export function generateLinearSearchSteps(initial: SearchBar[], target: number): SearchStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SearchStep[] = [];

  steps.push(snapshot(bars, `Starting linear search for target: ${target}`, false, null));

  for (let i = 0; i < bars.length; i++) {
    bars[i].state = "active";
    steps.push(snapshot(bars, `Checking index ${i}: is ${bars[i].value} === ${target}?`, false, null, { mid: i }));

    if (bars[i].value === target) {
      bars[i].state = "found";
      steps.push(snapshot(bars, `🎯 Found ${target} at index ${i}!`, true, i, { mid: i }));
      return steps;
    }

    bars[i].state = "eliminated";
    steps.push(snapshot(bars, `${bars[i].value} ≠ ${target}, moving to next element`, false, null, { mid: i }));
  }

  steps.push(snapshot(bars, `Target ${target} not found in the array`, false, null));
  return steps;
}

// ── Binary Search ─────────────────────────────────────────────────────────────
export function generateBinarySearchSteps(initial: SearchBar[], target: number): SearchStep[] {
  const bars = initial.map((b) => ({ ...b }));
  const steps: SearchStep[] = [];
  let low = 0;
  let high = bars.length - 1;

  // Mark all as in range initially
  bars.forEach((b) => (b.state = "range"));
  steps.push(snapshot(bars, `Starting binary search for target: ${target} — array must be sorted`, false, null, { low, high }));

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Mark range
    bars.forEach((b, i) => {
      if (i < low || i > high) b.state = "eliminated";
      else if (i === mid) b.state = "active";
      else b.state = "range";
    });

    steps.push(snapshot(bars, `Search range [${low}, ${high}] — checking midpoint index ${mid} (value: ${bars[mid].value})`, false, null, { low, high, mid }));

    if (bars[mid].value === target) {
      bars[mid].state = "found";
      steps.push(snapshot(bars, `🎯 Found ${target} at index ${mid}! Binary search complete.`, true, mid, { low, high, mid }));
      return steps;
    }

    if (bars[mid].value < target) {
      steps.push(snapshot(bars, `${bars[mid].value} < ${target}, eliminating left half — new low = ${mid + 1}`, false, null, { low, high, mid }));
      for (let i = low; i <= mid; i++) bars[i].state = "eliminated";
      low = mid + 1;
    } else {
      steps.push(snapshot(bars, `${bars[mid].value} > ${target}, eliminating right half — new high = ${mid - 1}`, false, null, { low, high, mid }));
      for (let i = mid; i <= high; i++) bars[i].state = "eliminated";
      high = mid - 1;
    }
  }

  steps.push(snapshot(bars, `Target ${target} not found in the array`, false, null));
  return steps;
}

// ── Hash Table Lookup ────────────────────────────────────────────────────────
export function generateHashLookupSteps(initial: HashBucket[], target: number): HashLookupStep[] {
  const buckets = cloneBuckets(initial);
  const steps: HashLookupStep[] = [];
  const bucketIndex = target % buckets.length;

  steps.push(
    bucketSnapshot(
      buckets,
      `Compute hash(${target}) = ${target} mod ${buckets.length} = bucket ${bucketIndex}.`,
      false,
      bucketIndex,
      null,
    ),
  );

  buckets[bucketIndex].state = "active";
  steps.push(
    bucketSnapshot(
      buckets,
      `Inspect bucket ${bucketIndex}. Hash-table lookup only checks this chain, not the whole table.`,
      false,
      bucketIndex,
      null,
    ),
  );

  if (!buckets[bucketIndex].entries.length) {
    steps.push(
      bucketSnapshot(
        buckets,
        `Bucket ${bucketIndex} is empty, so ${target} is definitely not in the table.`,
        false,
        bucketIndex,
        null,
      ),
    );
    return steps;
  }

  for (let i = 0; i < buckets[bucketIndex].entries.length; i++) {
    const entry = buckets[bucketIndex].entries[i];
    entry.state = "active";
    steps.push(
      bucketSnapshot(
        buckets,
        `Check chain entry ${i}: does key ${entry.key} match ${target}?`,
        false,
        bucketIndex,
        null,
      ),
    );

    if (entry.key === target) {
      entry.state = "found";
      buckets[bucketIndex].state = "found";
      steps.push(
        bucketSnapshot(
          buckets,
          `Found key ${target} in bucket ${bucketIndex}. Lookup succeeds in O(1) average time.`,
          true,
          bucketIndex,
          target,
        ),
      );
      return steps;
    }

    entry.state = "eliminated";
    steps.push(
      bucketSnapshot(
        buckets,
        `${entry.key} does not match ${target}, so continue scanning this collision chain.`,
        false,
        bucketIndex,
        null,
      ),
    );
  }

  steps.push(
    bucketSnapshot(
      buckets,
      `Reached the end of bucket ${bucketIndex} without finding ${target}.`,
      false,
      bucketIndex,
      null,
    ),
  );

  return steps;
}
