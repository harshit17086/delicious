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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
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
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              {/* Animated food icons */}
              <div className="flex justify-center space-x-4 mb-8 text-6xl">
                <span className="animate-bounce delay-100">🍳</span>
                <span className="animate-bounce delay-200">🥗</span>
                <span className="animate-bounce delay-300">🍰</span>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                Welcome to Delicious
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                Discover amazing recipes from around the world! Search by name or ingredient, 
                filter by meal type, or explore your personal favorites collection.
              </p>
              
              {/* Feature cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-3xl mb-3">🔍</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Search</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Find recipes by name or ingredient with our intelligent search</p>
                </div>
                
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-3xl mb-3">🏷️</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Categories</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Browse by meal type, cuisine, or dietary preferences</p>
                </div>
                
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-3xl mb-3">❤️</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Favorites</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Save and organize your favorite recipes for later</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 backdrop-blur-sm border border-orange-200 dark:border-orange-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">💡</span>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200">Get Started</h4>
                </div>
                <p className="text-orange-700 dark:text-orange-300">
                  Try searching for <span className="font-semibold">"chicken"</span>, <span className="font-semibold">"pasta"</span>, or <span className="font-semibold">"chocolate"</span> to discover delicious recipes!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
          <div className="text-center mt-12 pt-8 border-t border-orange-200 dark:border-gray-700">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-orange-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {showingFavorites ? 'Favorites Collection' : 'Search Results'}
                </span>
              </div>
              <p className="text-orange-600 dark:text-orange-400 font-medium">
                {showingFavorites
                  ? `${filteredRecipes.length} favorite recipe${
                      filteredRecipes.length !== 1 ? "s" : ""
                    } saved`
                  : `${filteredRecipes.length} delicious recipe${
                      filteredRecipes.length !== 1 ? "s" : ""
                    } found`}
              </p>
            </div>
          </div>
        )}
      </main>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={handleCloseModal} />
      )}
    </div>
  );
}
