"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeAPI } from "@/lib/api";
import { useFavorites } from "@/hooks/useFavorites";
import LoadingSpinner from "./LoadingSpinner";

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const [detailedRecipe, setDetailedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const isRecipeFavorite = isFavorite(recipe.idMeal);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError("");
        const details = await RecipeAPI.getRecipeDetails(recipe.idMeal);
        setDetailedRecipe(details);
      } catch (err) {
        setError("Failed to load recipe details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [recipe.idMeal]);

  const handleFavoriteClick = () => {
    if (isRecipeFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const ingredients = detailedRecipe
    ? RecipeAPI.parseIngredients(detailedRecipe)
    : [];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {isLoading ? (
          <div className="p-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 dark:text-red-400">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        ) : detailedRecipe ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {detailedRecipe.strMeal}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    {detailedRecipe.strCategory}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    {detailedRecipe.strArea}
                  </span>
                  {detailedRecipe.strTags && (
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                      {detailedRecipe.strTags}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleFavoriteClick}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:scale-110 transition-transform duration-200"
                  aria-label={
                    isRecipeFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <svg
                    className={`w-6 h-6 ${
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

                <button
                  onClick={onClose}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-400"
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
              </div>
            </div>

            {/* Content */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div>
                <img
                  src={detailedRecipe.strMealThumb}
                  alt={detailedRecipe.strMeal}
                  className="w-full rounded-lg shadow-lg"
                />

                {detailedRecipe.strYoutube && (
                  <a
                    href={detailedRecipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch Video
                  </a>
                )}
              </div>

              {/* Ingredients & Instructions */}
              <div className="space-y-6">
                {/* Ingredients */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700 dark:text-gray-300"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Instructions
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {detailedRecipe.strInstructions.split("\n").map(
                      (instruction, index) =>
                        instruction.trim() && (
                          <p key={index} className="mb-3">
                            {instruction.trim()}
                          </p>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
