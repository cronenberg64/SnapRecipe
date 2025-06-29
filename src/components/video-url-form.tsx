"use client"

import { useState } from "react"
import { extractRecipeFromVideo } from "@/ai/flows/extract-recipe-from-video"
import { expandRecipeIngredients } from "@/ai/flows/expand-recipe-ingredients"
import { generateRecipeImage } from "@/ai/flows/generate-recipe-image"
import { LoaderCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Recipe } from "@/types"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RecipeCard } from "./recipe-card"

interface VideoUrlFormProps {
  recipes: Recipe[]
  addRecipe: (recipe: Omit<Recipe, "id" | "isFavorite" | "timestamp">) => Recipe
  toggleFavorite: (id: string) => void
}

export function VideoUrlForm({ recipes, addRecipe, toggleFavorite }: VideoUrlFormProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resultId, setResultId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    setResultId(null)

    try {
      const recipeData = await extractRecipeFromVideo({ videoUrl: url })
      const [imageResult, expandedRecipe] = await Promise.all([
        generateRecipeImage({
          recipeName: recipeData.recipeName,
          ingredients: recipeData.ingredients,
        }),
        expandRecipeIngredients({
          dishName: recipeData.recipeName,
          ingredients: recipeData.ingredients,
        }),
      ])

      const finalResult = {
        ...recipeData,
        steps: expandedRecipe.recipe,
        equipment: expandedRecipe.equipment,
        calories: expandedRecipe.calories,
        nutritionalInformation: expandedRecipe.nutritionalInformation,
        sourceType: "video-url" as const,
        sourceValue: url,
        imageUrl: imageResult.imageUrl,
      }
      const newRecipe = addRecipe(finalResult)
      setResultId(newRecipe.id)
    } catch (error) {
      console.error(error)
      toast({
        title: t("error"),
        description: t("errorCheckConsole"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const result = resultId ? recipes.find(r => r.id === resultId) : null

  if (result) {
    return (
      <div className="space-y-4">
        <RecipeCard recipe={result} toggleFavorite={toggleFavorite} />
        <Button onClick={() => { setResultId(null); setUrl("") }} variant="outline" className="w-full">
          Generate Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="video-url" className="font-medium">{t("enterVideoUrl")}</label>
        <Input
          id="video-url"
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder={t("videoUrlPlaceholder")}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={!url || isLoading}>
        {isLoading ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            {t("generating")}
          </>
        ) : (
          t("generateRecipe")
        )}
      </Button>
    </form>
  )
}
