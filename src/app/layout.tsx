import type { Metadata } from "next";
import ThemeToggle from "@/components/ui/ThemeToggle";
import "./globals.css";

const themeScript = `
(() => {
  const STORAGE_KEY = "vizarithm-theme";
  const root = document.documentElement;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored === "light" || stored === "dark"
      ? stored
      : systemPrefersDark
        ? "dark"
        : "light";

    root.dataset.theme = nextTheme;
  } catch {
    root.dataset.theme = "dark";
  }
})();
`;

export const metadata: Metadata = {
  title: "VizaRithm — Algorithm Visualizer",
  description:
    "Interactive algorithm visualization tool for sorting, pathfinding, searching, tree, graph, and dynamic-programming algorithms. Built with Next.js and Framer Motion.",
  keywords: ["algorithms", "visualizer", "sorting", "pathfinding", "searching", "graphs", "trees", "dynamic programming", "computer science"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
