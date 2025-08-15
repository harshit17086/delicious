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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {MEAL_CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <button
        onClick={onViewFavorites}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          showingFavorites
            ? "bg-red-600 text-white shadow-lg"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>Favorites ({favoritesCount})</span>
      </button>
    </div>
  );
}
