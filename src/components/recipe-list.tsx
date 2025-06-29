"use client"

import { useLanguage } from "@/contexts/language-context"
import { type Recipe } from "@/types"
import { RecipeCard } from "./recipe-card"
import { Separator } from "./ui/separator"

interface RecipeListProps {
  recipes: Recipe[]
  toggleFavorite: (id: string) => void
  listType: "History" | "Favorites"
}

export function RecipeList({ recipes, toggleFavorite, listType }: RecipeListProps) {
  const { t } = useLanguage()
  const sortedRecipes = [...recipes].sort((a, b) => b.timestamp - a.timestamp)
  
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-headline text-2xl font-bold">{t(listType.toLowerCase() as any)}</h2>
        <Separator/>
      </div>
      {sortedRecipes.length > 0 ? (
        <div className="space-y-4">
          {sortedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          <p>{listType === "History" ? t("noHistory") : t("noFavorites")}</p>
        </div>
      )}
    </div>
  )
}
