"use client"

import Image from "next/image"
import { Activity, ChefHat, Hammer, Heart, ListOrdered, Share2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Recipe } from "@/types"

import { useToast } from "@/hooks/use-toast"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RecipeCardProps {
  recipe: Recipe
  toggleFavorite?: (id: string) => void
}

const RecipeSectionContent = ({ content }: { content?: string }) => {
  if (!content?.trim()) {
    return (
      <div className="pt-2 text-sm text-muted-foreground">
        <p>-</p>
      </div>
    );
  }

  return (
    <div className="pt-2 text-sm text-foreground/90 space-y-2">
      {content.split('\n').filter(line => line.trim().length > 0).map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
};


export function RecipeCard({ recipe, toggleFavorite }: RecipeCardProps) {
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleShare = () => {
    const recipeText = `
*${recipe.recipeName}*

*${t("ingredients")}*
${recipe.ingredients || "-"}

*${t("steps")}*
${recipe.steps || recipe.content || "-"}

*${t("equipment")}*
${recipe.equipment || "-"}

*${t("nutrition")}*
${recipe.nutritionalInformation || "-"}
${recipe.calories ? `Calories: ${recipe.calories}` : ""}
    `.trim()

    navigator.clipboard.writeText(recipeText)
    toast({
      description: t("copied"),
    })
  }

  return (
    <Card className="w-full overflow-hidden rounded-xl border-border/50 bg-card shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={recipe.imageUrl || `https://placehold.co/600x400.png`}
          alt={recipe.recipeName}
          fill
          className="object-cover"
          data-ai-hint="food recipe"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 p-4 md:p-6">
          <h2 className="font-headline text-2xl font-bold text-white md:text-3xl">{recipe.recipeName}</h2>
          <CardDescription className="mt-1 text-white/90">
            {t("recipeFrom")} <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">{recipe.sourceValue}</Badge>
          </CardDescription>
        </div>
      </div>
      <CardContent className="p-4 md:p-6">
        {recipe.content ? (
          <p className="whitespace-pre-wrap text-sm">{recipe.content}</p>
        ) : (
          <Accordion type="multiple" defaultValue={["ingredients"]} className="w-full">
            <AccordionItem value="ingredients">
              <AccordionTrigger className="font-headline text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <ChefHat className="h-5 w-5 text-primary" />
                  {t("ingredients")}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <RecipeSectionContent content={recipe.ingredients} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="steps">
              <AccordionTrigger className="font-headline text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <ListOrdered className="h-5 w-5 text-primary" />
                  {t("steps")}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <RecipeSectionContent content={recipe.steps} />
              </AccordionContent>
            </AccordionItem>

            {recipe.equipment && (
              <AccordionItem value="equipment">
                <AccordionTrigger className="font-headline text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Hammer className="h-5 w-5 text-primary" />
                    {t("equipment")}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <RecipeSectionContent content={recipe.equipment} />
                </AccordionContent>
              </AccordionItem>
            )}

            {recipe.nutritionalInformation && (
              <AccordionItem value="nutrition" className="border-b-0">
                <AccordionTrigger className="font-headline text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-primary" />
                        {t("nutrition")}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                  <RecipeSectionContent content={recipe.nutritionalInformation} />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/30 p-3">
        <div>
          {recipe.calories && (
            <Badge variant="secondary" className="gap-1.5 py-1 px-2.5">
              <Activity className="h-4 w-4" />
              <span className="font-medium">{recipe.calories}</span>
            </Badge>
          )}
        </div>
        
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">{t("share")}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("share")}</p>
              </TooltipContent>
            </Tooltip>
            {toggleFavorite && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => toggleFavorite(recipe.id)}>
                    <Heart className={`h-4 w-4 ${recipe.isFavorite ? "fill-primary text-primary" : ""}`} />
                    <span className="sr-only">{recipe.isFavorite ? t("unfavorite") : t("favorite")}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{recipe.isFavorite ? t("unfavorite") : t("favorite")}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}
