// src/ai/flows/analyze-image-recipe.ts
'use server';

/**
 * @fileOverview Analyzes an image of a dish to identify the dish and its ingredients.
 *
 * - analyzeImageRecipe - A function that handles the image analysis and recipe identification process.
 * - AnalyzeImageRecipeInput - The input type for the analyzeImageRecipe function.
 * - AnalyzeImageRecipeOutput - The return type for the analyzeImageRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeImageRecipeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a dish, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeImageRecipeInput = z.infer<typeof AnalyzeImageRecipeInputSchema>;

const AnalyzeImageRecipeOutputSchema = z.object({
  dishIdentification: z.string().describe('The identified dish name.'),
  ingredients: z.array(z.string()).describe('The list of identified ingredients.'),
});
export type AnalyzeImageRecipeOutput = z.infer<typeof AnalyzeImageRecipeOutputSchema>;

export async function analyzeImageRecipe(input: AnalyzeImageRecipeInput): Promise<AnalyzeImageRecipeOutput> {
  return analyzeImageRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeImageRecipePrompt',
  input: {schema: AnalyzeImageRecipeInputSchema},
  output: {schema: AnalyzeImageRecipeOutputSchema},
  prompt: `You are an expert chef specializing in identifying dishes and their ingredients from images.

Analyze the following image to identify the dish and its ingredients. For each ingredient, provide an estimated quantity (e.g., '1. Chicken Breast: 2 pieces', '2. Rice: 1 cup').

Image: {{media url=photoDataUri}}

Respond with a JSON object containing the dish name and a numbered list of ingredients with their quantities.
`,
});

const analyzeImageRecipeFlow = ai.defineFlow(
  {
    name: 'analyzeImageRecipeFlow',
    inputSchema: AnalyzeImageRecipeInputSchema,
    outputSchema: AnalyzeImageRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
