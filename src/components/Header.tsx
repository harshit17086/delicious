"use client";

import { useTheme } from "@/hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme, isLoaded } = useTheme();

  if (!isLoaded) {
    return null; // Prevent hydration mismatch
  }

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl border-b border-orange-200 dark:border-gray-700 mb-12 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🍳</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Delicious
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">
                Discover amazing recipes worldwide
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="relative p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl hover:from-orange-200 hover:to-red-200 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group"
            aria-label="Toggle theme"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            {theme === "dark" ? (
              <svg
                className="w-6 h-6 text-yellow-500 relative z-10 transition-transform duration-300 group-hover:rotate-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700 relative z-10 transition-transform duration-300 group-hover:-rotate-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
