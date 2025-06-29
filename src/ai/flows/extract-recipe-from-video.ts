'use server';
/**
 * @fileOverview Extracts a recipe from a video URL.
 *
 * - extractRecipeFromVideo - A function that takes a video URL and returns the extracted recipe.
 * - ExtractRecipeFromVideoInput - The input type for the extractRecipeFromVideo function.
 * - ExtractRecipeFromVideoOutput - The return type for the extractRecipeFromVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractRecipeFromVideoInputSchema = z.object({
  videoUrl: z.string().describe('The URL of the cooking video (e.g., TikTok, YouTube Short, Instagram Reel).'),
});
export type ExtractRecipeFromVideoInput = z.infer<typeof ExtractRecipeFromVideoInputSchema>;

const ExtractRecipeFromVideoOutputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe from the video.'),
  ingredients: z.string().describe('The extracted ingredients from the video, as a formatted list.'),
  steps: z.string().describe('The extracted recipe steps from the video, as a formatted list.'),
  equipment: z.string().describe('The extracted tools and equipment from the video, as a formatted list.'),
});
export type ExtractRecipeFromVideoOutput = z.infer<typeof ExtractRecipeFromVideoOutputSchema>;

export async function extractRecipeFromVideo(input: ExtractRecipeFromVideoInput): Promise<ExtractRecipeFromVideoOutput> {
  return extractRecipeFromVideoFlow(input);
}

const systemPrompt = `You are a meticulous and accurate recipe extractor. Your task is to analyze the provided cooking video from the URL and extract the following information *only from the video content*:
- Recipe Name: Identify the name of the dish being prepared. Be as specific as possible based on visual cues and any text or speech in the video.
- Ingredients: List all ingredients shown or mentioned as a numbered list, including quantities if available.
- Steps: Detail the cooking steps in a clear, sequential, numbered list.
- Equipment: List all tools, utensils, and appliances used in the video.

It is crucial that you base your response *strictly* on the visual and audio information present in the video. Do not invent or assume details not shown or mentioned. If you cannot determine some information, just return an empty string for that field.

IMPORTANT: For all lists (ingredients, steps, equipment), format them as plain text with each item on a new line. Do not use any markdown formatting (e.g., asterisks for lists or bolding).

Return the information in a structured JSON format.`;


const extractRecipeFromVideoFlow = ai.defineFlow(
  {
    name: 'extractRecipeFromVideoFlow',
    inputSchema: ExtractRecipeFromVideoInputSchema,
    outputSchema: ExtractRecipeFromVideoOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: [
        { text: systemPrompt },
        { media: { url: input.videoUrl, contentType: 'video/mp4' } }
      ],
      output: {
        schema: ExtractRecipeFromVideoOutputSchema,
      },
    });
    return output!;
  }
);
