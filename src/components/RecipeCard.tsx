"use client";

import { Recipe } from "@/types/recipe";
import { useFavorites } from "@/hooks/useFavorites";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isRecipeFavorite = isFavorite(recipe.idMeal);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRecipeFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleCardClick = () => {
    onClick(recipe);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden border border-gray-100 dark:border-gray-700"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label={
            isRecipeFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <svg
            className={`w-5 h-5 ${
              isRecipeFavorite
                ? "text-red-500 fill-current"
                : "text-gray-400 hover:text-red-500"
            }`}
            fill={isRecipeFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {recipe.strMeal}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
            {recipe.strCategory}
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
            {recipe.strArea}
          </span>
        </div>
      </div>
    </div>
  );
}
