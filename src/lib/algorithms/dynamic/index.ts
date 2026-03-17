import { DPCell, DPStats, DPStep, DPTable } from "@/types";

export type DynamicScenario =
  | {
      algorithmId: "dpFibonacci";
      summary: string;
      n: number;
    }
  | {
      algorithmId: "dpKnapsack";
      summary: string;
      weights: number[];
      values: number[];
      capacity: number;
    }
  | {
      algorithmId: "dpLCS";
      summary: string;
      first: string;
      second: string;
    };

const FIBONACCI_PRESETS = [6, 7, 8, 9];
const KNAPSACK_PRESETS = [
  { weights: [1, 3, 4, 5], values: [1, 4, 5, 7], capacity: 7 },
  { weights: [2, 3, 4, 6], values: [3, 4, 5, 8], capacity: 8 },
  { weights: [1, 2, 5, 6], values: [2, 3, 7, 9], capacity: 7 },
];
const LCS_PRESETS = [
  { first: "BANANA", second: "ATANA" },
  { first: "ABCBDAB", second: "BDCABA" },
  { first: "DYNAMIC", second: "PANIC" },
];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function cloneCells(cells: DPCell[][]): DPCell[][] {
  return cells.map((row) => row.map((cell) => ({ ...cell })));
}

function cloneTable(table: DPTable): DPTable {
  return {
    ...table,
    rowLabels: [...table.rowLabels],
    colLabels: [...table.colLabels],
    cells: cloneCells(table.cells),
  };
}

function createTable(
  title: string,
  subtitle: string,
  rowLabels: string[],
  colLabels: string[],
): DPTable {
  return {
    title,
    subtitle,
    rowLabels,
    colLabels,
    cells: Array.from({ length: rowLabels.length }, () =>
      Array.from({ length: colLabels.length }, () => ({ value: "", state: "default" as const })),
    ),
  };
}

function snapshot(table: DPTable, stats: DPStats, description: string): DPStep {
  return {
    table: cloneTable(table),
    stats: { ...stats },
    description,
  };
}

function resetStates(table: DPTable) {
  for (const row of table.cells) {
    for (const cell of row) {
      cell.state = cell.value === "" ? "default" : "filled";
    }
  }
}

function stats(filledCount: number, totalCells: number, answer: string): DPStats {
  return { filledCount, totalCells, answer };
}

export function createDynamicScenario(algorithmId: string): DynamicScenario {
  switch (algorithmId) {
    case "dpFibonacci": {
      const n = randomItem(FIBONACCI_PRESETS);
      return {
        algorithmId: "dpFibonacci",
        n,
        summary: `Compute F(${n}) with bottom-up tabulation.`,
      };
    }
    case "dpKnapsack": {
      const preset = randomItem(KNAPSACK_PRESETS);
      return {
        algorithmId: "dpKnapsack",
        ...preset,
        summary: `Weights ${preset.weights.join(", ")} | Values ${preset.values.join(", ")} | Capacity ${preset.capacity}`,
      };
    }
    case "dpLCS":
    default: {
      const preset = randomItem(LCS_PRESETS);
      return {
        algorithmId: "dpLCS",
        ...preset,
        summary: `Compare "${preset.first}" vs "${preset.second}" using a longest-common-subsequence table.`,
      };
    }
  }
}

function generateFibonacciSteps(scenario: Extract<DynamicScenario, { algorithmId: "dpFibonacci" }>): DPStep[] {
  const { n } = scenario;
  const table = createTable(
    "Fibonacci Tabulation",
    `dp[i] stores the value of F(i) for i = 0..${n}.`,
    ["dp"],
    Array.from({ length: n + 1 }, (_, index) => String(index)),
  );
  const steps: DPStep[] = [];
  let filled = 0;

  steps.push(snapshot(table, stats(0, n + 1, "pending"), `Initialize a 1D DP table with ${n + 1} slots.`));

  table.cells[0][0] = { value: "0", state: "active" };
  filled++;
  steps.push(snapshot(table, stats(filled, n + 1, n === 0 ? "0" : "pending"), "Base case: F(0) = 0."));
  resetStates(table);

  if (n >= 1) {
    table.cells[0][1] = { value: "1", state: "active" };
    filled++;
    steps.push(snapshot(table, stats(filled, n + 1, n === 1 ? "1" : "pending"), "Base case: F(1) = 1."));
    resetStates(table);
  }

  const values = Array(n + 1).fill(0);
  if (n >= 1) values[1] = 1;

  for (let i = 2; i <= n; i++) {
    resetStates(table);
    table.cells[0][i - 1].state = "path";
    table.cells[0][i - 2].state = "path";
    table.cells[0][i].state = "active";
    values[i] = values[i - 1] + values[i - 2];
    table.cells[0][i].value = String(values[i]);
    filled++;

    steps.push(
      snapshot(
        table,
        stats(filled, n + 1, i === n ? String(values[i]) : "pending"),
        `Fill F(${i}) using F(${i - 1}) + F(${i - 2}) = ${values[i - 1]} + ${values[i - 2]}.`,
      ),
    );
  }

  resetStates(table);
  table.cells[0][n].state = "path";
  steps.push(snapshot(table, stats(filled, n + 1, String(values[n])), `Finished. The table answer is F(${n}) = ${values[n]}.`));

  return steps;
}

function generateKnapsackSteps(scenario: Extract<DynamicScenario, { algorithmId: "dpKnapsack" }>): DPStep[] {
  const { weights, values, capacity } = scenario;
  const rowLabels = ["0 items", ...weights.map((weight, index) => `#${index + 1} (w${weight}, v${values[index]})`)];
  const colLabels = Array.from({ length: capacity + 1 }, (_, index) => String(index));
  const table = createTable(
    "0/1 Knapsack",
    "Rows are items, columns are capacities, and each cell stores the best value so far.",
    rowLabels,
    colLabels,
  );
  const steps: DPStep[] = [];
  const dp = Array.from({ length: weights.length + 1 }, () => Array(capacity + 1).fill(0));
  let filled = 0;
  const total = (weights.length + 1) * (capacity + 1);

  steps.push(snapshot(table, stats(0, total, "pending"), "Initialize the DP table with zero value for empty choices."));

  for (let i = 0; i <= weights.length; i++) {
    for (let w = 0; w <= capacity; w++) {
      resetStates(table);
      table.cells[i][w].state = "active";

      if (i === 0 || w === 0) {
        dp[i][w] = 0;
        table.cells[i][w].value = "0";
        filled++;
        steps.push(snapshot(table, stats(filled, total, "pending"), "Base row and column are 0 because no value fits yet."));
        continue;
      }

      const itemWeight = weights[i - 1];
      const itemValue = values[i - 1];

      if (itemWeight > w) {
        dp[i][w] = dp[i - 1][w];
        table.cells[i][w].value = String(dp[i][w]);
        filled++;
        steps.push(
          snapshot(
            table,
            stats(filled, total, "pending"),
            `Item ${i} is too heavy for capacity ${w}, so carry over ${dp[i][w]} from the row above.`,
          ),
        );
        continue;
      }

      const exclude = dp[i - 1][w];
      const include = itemValue + dp[i - 1][w - itemWeight];
      dp[i][w] = Math.max(exclude, include);
      table.cells[i - 1][w].state = "path";
      table.cells[i - 1][w - itemWeight].state = "path";
      table.cells[i][w].value = String(dp[i][w]);
      filled++;

      steps.push(
        snapshot(
          table,
          stats(filled, total, "pending"),
          `Compare exclude=${exclude} with include=${itemValue} + ${dp[i - 1][w - itemWeight]} = ${include}. Keep ${dp[i][w]}.`,
        ),
      );
    }
  }

  resetStates(table);
  let i = weights.length;
  let w = capacity;
  while (i > 0 && w >= 0) {
    table.cells[i][w].state = "path";
    if (dp[i][w] !== dp[i - 1][w]) {
      w -= weights[i - 1];
    }
    i--;
  }
  table.cells[0][0].state = "path";

  steps.push(
    snapshot(
      table,
      stats(filled, total, String(dp[weights.length][capacity])),
      `Finished. The optimal knapsack value is ${dp[weights.length][capacity]}.`,
    ),
  );

  return steps;
}

function generateLCSSteps(scenario: Extract<DynamicScenario, { algorithmId: "dpLCS" }>): DPStep[] {
  const { first, second } = scenario;
  const rowLabels = ["", ...first.split("")];
  const colLabels = ["", ...second.split("")];
  const table = createTable(
    "Longest Common Subsequence",
    "Each cell stores the LCS length for the prefixes ending at that row and column.",
    rowLabels,
    colLabels,
  );
  const steps: DPStep[] = [];
  const dp = Array.from({ length: first.length + 1 }, () => Array(second.length + 1).fill(0));
  let filled = 0;
  const total = (first.length + 1) * (second.length + 1);

  steps.push(snapshot(table, stats(0, total, "pending"), "Initialize the LCS table with zero-length matches on the top row and left column."));

  for (let i = 0; i <= first.length; i++) {
    for (let j = 0; j <= second.length; j++) {
      resetStates(table);
      table.cells[i][j].state = "active";

      if (i === 0 || j === 0) {
        table.cells[i][j].value = "0";
        filled++;
        steps.push(snapshot(table, stats(filled, total, "pending"), "Base cells are 0 because an empty prefix has no common subsequence."));
        continue;
      }

      if (first[i - 1] === second[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        table.cells[i - 1][j - 1].state = "path";
        table.cells[i][j].value = String(dp[i][j]);
        filled++;
        steps.push(
          snapshot(
            table,
            stats(filled, total, "pending"),
            `Characters match (${first[i - 1]}). Extend the diagonal value to ${dp[i][j]}.`,
          ),
        );
        continue;
      }

      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      table.cells[i - 1][j].state = "path";
      table.cells[i][j - 1].state = "path";
      table.cells[i][j].value = String(dp[i][j]);
      filled++;
      steps.push(
        snapshot(
          table,
          stats(filled, total, "pending"),
          `Characters differ (${first[i - 1]} vs ${second[j - 1]}). Take max(top=${dp[i - 1][j]}, left=${dp[i][j - 1]}).`,
        ),
      );
    }
  }

  resetStates(table);
  let i = first.length;
  let j = second.length;
  let lcs = "";

  while (i > 0 && j > 0) {
    table.cells[i][j].state = "path";
    if (first[i - 1] === second[j - 1]) {
      lcs = first[i - 1] + lcs;
      i--;
      j--;
      continue;
    }

    if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  table.cells[0][0].state = "path";
  steps.push(
    snapshot(
      table,
      stats(filled, total, lcs || "(empty)"),
      `Finished. The recovered longest common subsequence is "${lcs || "(empty)"}".`,
    ),
  );

  return steps;
}

export function generateDynamicSteps(algorithmId: string, scenario: DynamicScenario): DPStep[] {
  switch (algorithmId) {
    case "dpFibonacci":
      return generateFibonacciSteps(scenario as Extract<DynamicScenario, { algorithmId: "dpFibonacci" }>);
    case "dpKnapsack":
      return generateKnapsackSteps(scenario as Extract<DynamicScenario, { algorithmId: "dpKnapsack" }>);
    case "dpLCS":
    default:
      return generateLCSSteps(scenario as Extract<DynamicScenario, { algorithmId: "dpLCS" }>);
  }
}
