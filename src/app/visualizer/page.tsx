"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import SortingVisualizer from "@/components/sorting/SortingVisualizer";
import PathfindingVisualizer from "@/components/pathfinding/PathfindingVisualizer";
import SearchingVisualizer from "@/components/searching/SearchingVisualizer";
import { AlgorithmCategory } from "@/types";
import TreeVisualizer from "@/components/tree/TreeVisualizer";

export default function VisualizerPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubbleSort");
  const [category, setCategory] = useState<AlgorithmCategory>("sorting");

  function handleSelect(algId: string, cat: AlgorithmCategory) {
    setSelectedAlgorithm(algId);
    setCategory(cat);
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <Sidebar selectedAlgorithm={selectedAlgorithm} onSelect={handleSelect} />

      <main className="flex-1 overflow-hidden relative">
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
            {category === "searching"   && <SearchingVisualizer   algorithmId={selectedAlgorithm} />}
            {category === "tree"        && <TreeVisualizer        algorithmId={selectedAlgorithm} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
