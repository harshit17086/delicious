import { MealResponse, Recipe } from "@/types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export class RecipeAPI {
  static async searchByName(name: string): Promise<Recipe[]> {
    if (!name.trim()) return [];

    try {
      const response = await fetch(
        `${BASE_URL}/search.php?s=${encodeURIComponent(name)}`
      );
      const data: MealResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error searching recipes by name:", error);
      throw new Error("Failed to search recipes");
    }
  }

  static async searchByIngredient(ingredient: string): Promise<Recipe[]> {
    if (!ingredient.trim()) return [];

    try {
      const response = await fetch(
        `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
      );
      const data: MealResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error searching recipes by ingredient:", error);
      throw new Error("Failed to search recipes");
    }
  }

  static async getRecipeDetails(id: string): Promise<Recipe | null> {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      const data: MealResponse = await response.json();
      return data.meals?.[0] || null;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw new Error("Failed to fetch recipe details");
    }
  }

  static async filterByCategory(category: string): Promise<Recipe[]> {
    if (!category.trim()) return [];

    try {
      const response = await fetch(
        `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
      );
      const data: MealResponse = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by category:", error);
      throw new Error("Failed to filter recipes");
    }
  }

  static parseIngredients(recipe: Recipe): string[] {
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        const fullIngredient =
          measure && measure.trim()
            ? `${measure.trim()} ${ingredient.trim()}`
            : ingredient.trim();
        ingredients.push(fullIngredient);
      }
    }

    return ingredients;
  }
}
