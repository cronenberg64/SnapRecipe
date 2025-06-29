"use client"

import { Heart, History, Image as ImageIcon, Link as LinkIcon, Video } from "lucide-react"
import { LanguageProvider } from "@/contexts/language-context"
import { useRecipesStore } from "@/hooks/use-recipes-store"

import { Icons } from "@/components/icons"
import { ImageRecipeForm } from "@/components/image-recipe-form"
import { LanguageSwitcher } from "@/components/language-switcher"
import { RecipeList } from "@/components/recipe-list"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoUrlForm } from "@/components/video-url-form"
import { VideoUploadForm } from "@/components/video-upload-form"
import { CardContent } from "@/components/ui/card"

export default function Home() {
  const { recipes, addRecipe, toggleFavorite } = useRecipesStore()

  const favoriteRecipes = recipes.filter(r => r.isFavorite)

  return (
    <LanguageProvider>
      <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <header className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icons.logo className="h-8 w-8 text-primary" />
              <h1 className="font-headline text-3xl font-bold text-primary">MediaToMeal</h1>
            </div>
            <LanguageSwitcher />
          </header>

          <Tabs defaultValue="image" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="image"><ImageIcon className="mr-2 h-4 w-4" />Image</TabsTrigger>
              <TabsTrigger value="url"><LinkIcon className="mr-2 h-4 w-4" />URL</TabsTrigger>
              <TabsTrigger value="video"><Video className="mr-2 h-4 w-4" />Video</TabsTrigger>
              <TabsTrigger value="history" className="hidden md:flex"><History className="mr-2 h-4 w-4" />History</TabsTrigger>
              <TabsTrigger value="favorites" className="hidden md:flex"><Heart className="mr-2 h-4 w-4" />Favorites</TabsTrigger>
            </TabsList>
            <Card className="mt-4">
              <CardContent className="pt-6">
                <TabsContent value="image">
                  <ImageRecipeForm recipes={recipes} addRecipe={addRecipe} toggleFavorite={toggleFavorite} />
                </TabsContent>
                <TabsContent value="url">
                  <VideoUrlForm recipes={recipes} addRecipe={addRecipe} toggleFavorite={toggleFavorite} />
                </TabsContent>
                <TabsContent value="video">
                  <VideoUploadForm recipes={recipes} addRecipe={addRecipe} toggleFavorite={toggleFavorite} />
                </TabsContent>
                <TabsContent value="history">
                  <RecipeList recipes={recipes} toggleFavorite={toggleFavorite} listType="History" />
                </TabsContent>
                <TabsContent value="favorites">
                  <RecipeList recipes={favoriteRecipes} toggleFavorite={toggleFavorite} listType="Favorites" />
                </TabsContent>
              </CardContent>
            </Card>

            <TabsList className="mt-4 grid w-full grid-cols-2 md:hidden">
              <TabsTrigger value="history"><History className="mr-2 h-4 w-4" />History</TabsTrigger>
              <TabsTrigger value="favorites"><Heart className="mr-2 h-4 w-4" />Favorites</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </main>
    </LanguageProvider>
  )
}
