"use client";

import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import { LocalStorageUtil } from "@/lib/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = LocalStorageUtil.getFavorites();
      setFavorites(savedFavorites);
      setIsLoaded(true);
    };

    loadFavorites();
  }, []);

  const addToFavorites = (recipe: Recipe) => {
    LocalStorageUtil.addToFavorites(recipe);
    setFavorites(LocalStorageUtil.getFavorites());
  };

  const removeFromFavorites = (recipeId: string) => {
    LocalStorageUtil.removeFromFavorites(recipeId);
    setFavorites(LocalStorageUtil.getFavorites());
  };

  const isFavorite = (recipeId: string): boolean => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isLoaded,
  };
}
