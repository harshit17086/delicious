"use client";

import { useState, useEffect } from "react";
import { LocalStorageUtil } from "@/lib/storage";

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = LocalStorageUtil.getTheme();
    setThemeState(savedTheme);
    setIsLoaded(true);

    // Apply theme to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeState(newTheme);
    LocalStorageUtil.setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return {
    theme,
    toggleTheme,
    isLoaded,
  };
}
