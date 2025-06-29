'use server';

/**
 * @fileOverview A flow to expand identified ingredients into a complete recipe,
 * including estimated calories and nutritional information.
 *
 * - expandRecipeIngredients - A function that handles the recipe expansion process.
 * - ExpandRecipeIngredientsInput - The input type for the expandRecipeingredients function.
 * - ExpandRecipeIngredientsOutput - The return type for the expandRecipeingredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpandRecipeIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients identified in the dish.'),
  dishName: z.string().optional().describe('The name of the dish, if known.'),
});
export type ExpandRecipeIngredientsInput = z.infer<
  typeof ExpandRecipeIngredientsInputSchema
>;

const ExpandRecipeIngredientsOutputSchema = z.object({
  recipe: z.string().describe('The complete recipe with instructions.'),
  equipment: z.string().describe('A list of tools and equipment needed for the recipe.'),
  calories: z.string().describe('Estimated calorie count for the recipe.'),
  nutritionalInformation: z
    .string()
    .describe('Nutritional information for the recipe.'),
});
export type ExpandRecipeIngredientsOutput = z.infer<
  typeof ExpandRecipeIngredientsOutputSchema
>;

export async function expandRecipeIngredients(
  input: ExpandRecipeIngredientsInput
): Promise<ExpandRecipeIngredientsOutput> {
  return expandRecipeIngredientsFlow(input);
}

const recipeExpansionPrompt = ai.definePrompt({
  name: 'recipeExpansionPrompt',
  input: {schema: ExpandRecipeIngredientsInputSchema},
  output: {schema: ExpandRecipeIngredientsOutputSchema},
  prompt: `You are a recipe expert. Given a list of ingredients and optionally the dish name, you will generate a complete recipe.

The 'recipe' output field must contain *only* the cooking instructions, formatted as a numbered list.
The 'equipment' output field must contain a list of necessary equipment, with each item on a new line.
Also provide an estimated calorie count and nutritional information.

IMPORTANT: Do not use any markdown formatting (like asterisks for lists or bolding).

Ingredients: {{{ingredients}}}

{{#if dishName}}
Dish Name: {{{dishName}}}
{{/if}}`,
});

const expandRecipeIngredientsFlow = ai.defineFlow(
  {
    name: 'expandRecipeIngredientsFlow',
    inputSchema: ExpandRecipeIngredientsInputSchema,
    outputSchema: ExpandRecipeIngredientsOutputSchema,
  },
  async input => {
    const {output} = await recipeExpansionPrompt(input);
    return output!;
  }
);
