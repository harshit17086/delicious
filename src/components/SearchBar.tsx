"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, type: "name" | "ingredient") => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "ingredient">("name");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim(), searchType);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col lg:flex-row gap-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-orange-100 dark:border-gray-700">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={`Search by ${
                searchType === "name" ? "recipe name" : "ingredient"
              }...`}
              className="w-full pl-12 pr-6 py-4 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition-all duration-300 placeholder-gray-400 text-lg"
              disabled={isLoading}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Search Type Select */}
          <div className="relative">
            <select
              value={searchType}
              onChange={(e) =>
                setSearchType(e.target.value as "name" | "ingredient")
              }
              className="appearance-none px-6 py-4 pr-10 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border-2 border-transparent rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-600 outline-none transition-all duration-300 cursor-pointer min-w-[160px] text-lg font-medium"
              disabled={isLoading}
            >
              <option value="name">Recipe Name</option>
              <option value="ingredient">Ingredient</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-orange-500/20 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-lg min-w-[140px] group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Search</span>
              </div>
            )}
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-red-400 to-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </form>
    </div>
  );
}
