import { Recipe } from "@/types/recipe";

export class LocalStorageUtil {
  private static FAVORITES_KEY = "recipe-finder-favorites";
  private static THEME_KEY = "recipe-finder-theme";

  static getFavorites(): Recipe[] {
    if (typeof window === "undefined") return [];

    try {
      const favorites = localStorage.getItem(this.FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error reading favorites from localStorage:", error);
      return [];
    }
  }

  static addToFavorites(recipe: Recipe): void {
    if (typeof window === "undefined") return;

    try {
      const favorites = this.getFavorites();
      const isAlreadyFavorite = favorites.some(
        (fav) => fav.idMeal === recipe.idMeal
      );

      if (!isAlreadyFavorite) {
        const updatedFavorites = [...favorites, recipe];
        localStorage.setItem(
          this.FAVORITES_KEY,
          JSON.stringify(updatedFavorites)
        );
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  }

  static removeFromFavorites(recipeId: string): void {
    if (typeof window === "undefined") return;

    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter(
        (fav) => fav.idMeal !== recipeId
      );
      localStorage.setItem(
        this.FAVORITES_KEY,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  }

  static isFavorite(recipeId: string): boolean {
    if (typeof window === "undefined") return false;

    const favorites = this.getFavorites();
    return favorites.some((fav) => fav.idMeal === recipeId);
  }

  static getTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";

    try {
      const theme = localStorage.getItem(this.THEME_KEY);
      return theme === "dark" ? "dark" : "light";
    } catch (error) {
      console.error("Error reading theme from localStorage:", error);
      return "light";
    }
  }

  static setTheme(theme: "light" | "dark"): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }
}
