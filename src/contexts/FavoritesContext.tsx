"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Recipe } from "@/types/recipe";
import { LocalStorageUtil } from "@/lib/storage";

interface FavoritesContextType {
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
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
    const updatedFavorites = LocalStorageUtil.getFavorites();
    setFavorites(updatedFavorites);
  };

  const removeFromFavorites = (recipeId: string) => {
    LocalStorageUtil.removeFromFavorites(recipeId);
    const updatedFavorites = LocalStorageUtil.getFavorites();
    setFavorites(updatedFavorites);
  };

  const isFavorite = (recipeId: string): boolean => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        isLoaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
