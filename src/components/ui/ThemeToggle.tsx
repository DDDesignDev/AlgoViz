"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "algoviz-theme";

function readThemeFromDom(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readThemeFromDom());
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const nextTheme: Theme = isDark ? "light" : "dark";

  function handleToggle() {
    const updatedTheme: Theme = isDark ? "light" : "dark";

    document.documentElement.dataset.theme = updatedTheme;
    localStorage.setItem(STORAGE_KEY, updatedTheme);
    setTheme(updatedTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="fixed top-3 right-3 z-[100] inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-secondary text-text-secondary shadow-card transition-colors hover:text-text-primary"
      aria-label={mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"}
      title={mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"}
      disabled={!mounted}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
