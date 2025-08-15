"use client";

import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeAPI } from "@/lib/api";
import { useFavorites } from "@/hooks/useFavorites";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import RecipeCard from "@/components/RecipeCard";
import RecipeModal from "@/components/RecipeModal";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { favorites, isLoaded: favoritesLoaded } = useFavorites();

  // Filter recipes based on category
  useEffect(() => {
    if (!selectedCategory || showingFavorites) {
      setFilteredRecipes(showingFavorites ? favorites : recipes);
      return;
    }

    const filtered = recipes.filter(
      (recipe) =>
        recipe.strCategory
          .toLowerCase()
          .includes(selectedCategory.toLowerCase()) ||
        recipe.strMeal.toLowerCase().includes(selectedCategory.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [recipes, selectedCategory, showingFavorites, favorites]);

  const handleSearch = async (query: string, type: "name" | "ingredient") => {
    try {
      setIsLoading(true);
      setError("");
      setHasSearched(true);
      setShowingFavorites(false);
      setSelectedCategory("");

      let results: Recipe[];
      if (type === "name") {
        results = await RecipeAPI.searchByName(query);
      } else {
        results = await RecipeAPI.searchByIngredient(query);
      }

      setRecipes(results);

      if (results.length === 0) {
        setError("No recipes found. Try a different search term.");
      }
    } catch (err) {
      setError("Failed to search recipes. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory("");
      return;
    }

    setSelectedCategory(category);
    setShowingFavorites(false);

    if (category && !showingFavorites) {
      try {
        setIsLoading(true);
        setError("");
        setHasSearched(true);

        const results = await RecipeAPI.filterByCategory(category);
        setRecipes(results);

        if (results.length === 0) {
          setError(`No recipes found in ${category} category.`);
        }
      } catch (err) {
        setError("Failed to filter recipes. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleViewFavorites = () => {
    setShowingFavorites(!showingFavorites);
    setSelectedCategory("");
    setHasSearched(true);

    if (!showingFavorites && favorites.length === 0) {
      setError(
        "No favorite recipes yet. Start by adding some recipes to your favorites!"
      );
    } else {
      setError("");
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {favoritesLoaded && (
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onViewFavorites={handleViewFavorites}
            showingFavorites={showingFavorites}
            favoritesCount={favorites.length}
          />
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        ) : !hasSearched ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🍳</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Recipe Finder
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Search for delicious recipes by name or ingredient, filter by
                meal type, or browse your favorites.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  💡 Try searching for "chicken", "pasta", or "chocolate" to get
                  started!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <div
                key={recipe.idMeal}
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RecipeCard recipe={recipe} onClick={handleRecipeClick} />
              </div>
            ))}
          </div>
        )}

        {/* Show recipe count */}
        {hasSearched && filteredRecipes.length > 0 && (
          <div className="text-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              {showingFavorites
                ? `Showing ${filteredRecipes.length} favorite recipe${
                    filteredRecipes.length !== 1 ? "s" : ""
                  }`
                : `Found ${filteredRecipes.length} recipe${
                    filteredRecipes.length !== 1 ? "s" : ""
                  }`}
            </p>
          </div>
        )}
      </main>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
  );
}
