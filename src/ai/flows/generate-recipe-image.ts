'use server';

/**
 * @fileOverview Generates an image for a recipe.
 *
 * - generateRecipeImage - A function that generates an image for a given recipe.
 * - GenerateRecipeImageInput - The input type for the generateRecipeImage function.
 * - GenerateRecipeImageOutput - The return type for the generateRecipeImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeImageInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.string().describe('A comma-separated list of ingredients.'),
});
export type GenerateRecipeImageInput = z.infer<typeof GenerateRecipeImageInputSchema>;

const GenerateRecipeImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateRecipeImageOutput = z.infer<typeof GenerateRecipeImageOutputSchema>;

export async function generateRecipeImage(
  input: GenerateRecipeImageInput
): Promise<GenerateRecipeImageOutput> {
  return generateRecipeImageFlow(input);
}

const generateRecipeImageFlow = ai.defineFlow(
  {
    name: 'generateRecipeImageFlow',
    inputSchema: GenerateRecipeImageInputSchema,
    outputSchema: GenerateRecipeImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A photorealistic, appetizing, and professionally plated image of ${input.recipeName}. The dish is presented as a close-up shot, highlighting the food's texture and fine details.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    if (!media) {
      throw new Error('Image generation failed.');
    }
    return {imageUrl: media.url};
  }
);
