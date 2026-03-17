"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import SortingVisualizer from "@/components/sorting/SortingVisualizer";
import PathfindingVisualizer from "@/components/pathfinding/PathfindingVisualizer";
import SearchingVisualizer from "@/components/searching/SearchingVisualizer";
import HashTableLookupVisualizer from "@/components/searching/HashTableLookupVisualizer";
import { AlgorithmCategory } from "@/types";
import TreeVisualizer from "@/components/tree/TreeVisualizer";
import GraphVisualizer from "@/components/graph/GraphVisualizer";
import DynamicProgrammingVisualizer from "@/components/dynamic/DynamicProgrammingVisualizer";
import { cn } from "@/lib/utils";

export default function VisualizerPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubbleSort");
  const [category, setCategory] = useState<AlgorithmCategory>("sorting");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  function handleSelect(algId: string, cat: AlgorithmCategory) {
    setSelectedAlgorithm(algId);
    setCategory(cat);
    setMobileSidebarOpen(false);
  }

  return (
    <div className="relative flex h-[100dvh] overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div
        className="md:hidden absolute top-0 left-0 right-0 z-50 h-12 flex items-center px-2"
        style={{ borderBottom: "1px solid var(--surface-4)", background: "var(--bg-secondary)" }}
      >
        <button
          onClick={() => setMobileSidebarOpen((p) => !p)}
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ background: "var(--surface-2)", border: "1px solid var(--surface-5)" }}
          aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
        >
          {mobileSidebarOpen ? <X className="w-4 h-4 text-text-secondary" /> : <Menu className="w-4 h-4 text-text-secondary" />}
        </button>
      </div>

      {mobileSidebarOpen && (
        <button
          className="md:hidden absolute left-0 right-0 bottom-0 top-12 z-30"
          style={{ background: "rgba(0,0,0,0.45)" }}
          aria-label="Close menu overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        selectedAlgorithm={selectedAlgorithm}
        onSelect={handleSelect}
        className={cn(
          "fixed left-0 top-12 bottom-0 z-40 transition-transform duration-200 md:static md:inset-auto md:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      />

      <main className="flex-1 overflow-hidden relative min-w-0 pt-12 md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAlgorithm}
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
          >
            {category === "sorting"     && <SortingVisualizer     algorithmId={selectedAlgorithm} />}
            {category === "pathfinding" && <PathfindingVisualizer algorithmId={selectedAlgorithm} />}
            {category === "searching"   && (
              selectedAlgorithm === "hashTableLookup"
                ? <HashTableLookupVisualizer algorithmId={selectedAlgorithm} />
                : <SearchingVisualizer algorithmId={selectedAlgorithm} />
            )}
            {category === "tree"        && <TreeVisualizer        algorithmId={selectedAlgorithm} />}
            {category === "graph"       && <GraphVisualizer       algorithmId={selectedAlgorithm} />}
            {category === "dynamic"     && <DynamicProgrammingVisualizer algorithmId={selectedAlgorithm} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
