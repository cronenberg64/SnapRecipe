"use client"

import { useState, useEffect, useCallback } from "react"
import { type Recipe } from "@/types"

const STORE_KEY = "media-to-meal-recipes"

export const useRecipesStore = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem(STORE_KEY)
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes))
      }
    } catch (error) {
      console.error("Failed to load recipes from localStorage", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      try {
        const recipesForStorage = recipes.map(({ imageUrl, ...rest }) => rest);
        localStorage.setItem(STORE_KEY, JSON.stringify(recipesForStorage))
      } catch (error) {
        console.error("Failed to save recipes to localStorage", error)
      }
    }
  }, [recipes, isLoaded])

  const addRecipe = useCallback((newRecipe: Omit<Recipe, "id" | "isFavorite" | "timestamp">): Recipe => {
    const recipe: Recipe = {
      ...newRecipe,
      id: new Date().toISOString(),
      isFavorite: false,
      timestamp: Date.now(),
    }
    setRecipes(prevRecipes => {
      return [recipe, ...prevRecipes]
    })
    return recipe
  }, [])

  const toggleFavorite = useCallback((recipeId: string) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    )
  }, [])

  return { recipes, addRecipe, toggleFavorite }
}
