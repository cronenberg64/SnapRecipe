"use client"

import { useState } from "react"
import { analyzeImageRecipe } from "@/ai/flows/analyze-image-recipe"
import { expandRecipeIngredients } from "@/ai/flows/expand-recipe-ingredients"
import { LoaderCircle, UploadCloud } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Recipe } from "@/types"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { RecipeCard } from "./recipe-card"

interface ImageRecipeFormProps {
  recipes: Recipe[]
  addRecipe: (recipe: Omit<Recipe, "id" | "isFavorite" | "timestamp">) => Recipe
  toggleFavorite: (id: string) => void
}

export function ImageRecipeForm({ recipes, addRecipe, toggleFavorite }: ImageRecipeFormProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultId, setResultId] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: t("error"),
          description: t("unsupportedFile"),
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
      setResultId(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      handleFileChange({ target: { files: [droppedFile] } } as any)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    setResultId(null)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const photoDataUri = reader.result as string
        const analysis = await analyzeImageRecipe({ photoDataUri })
        const expandedRecipe = await expandRecipeIngredients({
          dishName: analysis.dishIdentification,
          ingredients: analysis.ingredients.join(", "),
        })

        const finalResult = {
          recipeName: analysis.dishIdentification,
          ingredients: analysis.ingredients.join("\n"),
          steps: expandedRecipe.recipe,
          equipment: expandedRecipe.equipment,
          calories: expandedRecipe.calories,
          nutritionalInformation: expandedRecipe.nutritionalInformation,
          sourceType: "image" as const,
          sourceValue: file.name,
          imageUrl: photoDataUri,
        }
        const newRecipe = addRecipe(finalResult)
        setResultId(newRecipe.id)
      }
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

  const result = resultId ? recipes.find(r => r.id === resultId) : null;

  if (result) {
    return (
      <div className="space-y-4">
        <RecipeCard recipe={result} toggleFavorite={toggleFavorite} />
        <Button onClick={() => { setResultId(null); setFile(null); setPreview(null); }} variant="outline" className="w-full">
          Generate Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label
        htmlFor="image-upload"
        className="relative block w-full cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center hover:border-primary"
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="mx-auto mb-4 h-32 w-32 rounded-lg object-cover" />
        ) : (
          <UploadCloud className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        )}
        <h3 className="font-medium text-foreground">{t("uploadImage")}</h3>
        <p className="text-sm text-muted-foreground">{t("uploadImageDesc")}</p>
        <input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
      </label>

      <Button type="submit" className="w-full" disabled={!file || isLoading}>
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
