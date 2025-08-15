"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LocalStorageUtil } from "@/lib/storage";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check system preference and stored preference
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedTheme = LocalStorageUtil.getTheme();

    // Use stored theme if available, otherwise use system preference
    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    setIsLoaded(true);

    // Apply theme to document immediately
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(initialTheme);

    // Debug log
    console.log("Theme applied:", initialTheme, "Classes:", root.className);

    // Save the initial theme if not already stored
    if (!storedTheme) {
      LocalStorageUtil.setTheme(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    LocalStorageUtil.setTheme(newTheme);

    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);

    // Debug log
    console.log("Theme toggled to:", newTheme, "Classes:", root.className);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
