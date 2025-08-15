"use client";

import { MealType } from "@/types/recipe";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onViewFavorites: () => void;
  showingFavorites: boolean;
  favoritesCount: number;
}

const MEAL_CATEGORIES: MealType[] = [
  { name: "All", value: "" },
  { name: "Breakfast", value: "Breakfast" },
  { name: "Lunch", value: "Lunch" },
  { name: "Dinner", value: "Dinner" },
  { name: "Dessert", value: "Dessert" },
  { name: "Vegetarian", value: "Vegetarian" },
  { name: "Seafood", value: "Seafood" },
  { name: "Chicken", value: "Chicken" },
  { name: "Beef", value: "Beef" },
  { name: "Pasta", value: "Pasta" },
];

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  onViewFavorites,
  showingFavorites,
  favoritesCount,
}: FilterBarProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        {MEAL_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.value
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 scale-105"
                : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white hover:shadow-lg border-2 border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500"
            }`}
          >
            {selectedCategory === category.value && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse opacity-75"></div>
            )}
            <span className="relative z-10">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Favorites Button */}
      <button
        onClick={onViewFavorites}
        className={`relative flex items-center space-x-3 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
          showingFavorites
            ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-pink-500/25"
            : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white hover:shadow-lg border-2 border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500"
        }`}
      >
        {showingFavorites && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse opacity-75"></div>
        )}
        <div className="relative z-10 flex items-center space-x-3">
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${showingFavorites ? 'scale-110' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>My Favorites</span>
          <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full ${
            showingFavorites 
              ? 'bg-white/30 text-white' 
              : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
          }`}>
            {favoritesCount}
          </span>
        </div>
      </button>
    </div>
  );
}
