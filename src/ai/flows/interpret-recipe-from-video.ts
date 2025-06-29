// src/ai/flows/interpret-recipe-from-video.ts
'use server';
/**
 * @fileOverview Interprets a recipe from a cooking video by extracting frames and transcribing speech.
 *
 * - interpretRecipeFromVideo - A function that handles the recipe interpretation process from a video.
 * - InterpretRecipeFromVideoInput - The input type for the interpretRecipeFromVideo function.
 * - InterpretRecipeFromVideoOutput - The return type for the interpretRecipeFromVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretRecipeFromVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A cooking video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  extractedFrames: z.array(
    z.string().describe("Extracted frames from the video, as data URIs.")
  ).optional(),
  speechTranscription: z.string().describe("The transcribed speech from the video's audio.").optional(),
});
export type InterpretRecipeFromVideoInput = z.infer<typeof InterpretRecipeFromVideoInputSchema>;

const InterpretRecipeFromVideoOutputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.string().describe('A list of ingredients used in the recipe.'),
  steps: z.string().describe('The steps to recreate the recipe.'),
  equipment: z.string().describe('A list of tools and equipment needed for the recipe.'),
});
export type InterpretRecipeFromVideoOutput = z.infer<typeof InterpretRecipeFromVideoOutputSchema>;

export async function interpretRecipeFromVideo(input: InterpretRecipeFromVideoInput): Promise<InterpretRecipeFromVideoOutput> {
  return interpretRecipeFromVideoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretRecipeFromVideoPrompt',
  input: {schema: InterpretRecipeFromVideoInputSchema},
  output: {schema: InterpretRecipeFromVideoOutputSchema},
  prompt: `You are a meticulous and accurate recipe extractor. Your task is to analyze the provided video data and extract the following information *only from the provided content*:
- Recipe Name: Identify the name of the dish being prepared. Be as specific as possible based on visual cues and any text or speech.
- Ingredients: List all ingredients shown or mentioned as a numbered list, including quantities if available.
- Steps: Detail the cooking steps in a clear, sequential, numbered list.
- Equipment: List all tools, utensils, and appliances used.

It is crucial that you base your response *strictly* on the provided data. Do not invent or assume details not shown or mentioned. If you cannot determine some information, just return an empty string for that field.

IMPORTANT: For all lists (ingredients, steps, equipment), format them as plain text with each item on a new line. Do not use any markdown formatting (e.g., asterisks for lists or bolding).

Return the information in a structured JSON format.

{{#if speechTranscription}}
Speech Transcription: {{{speechTranscription}}}
{{/if}}

Video: {{media url=videoDataUri}}

{{#if extractedFrames}}
Key Frames from Video:
{{#each extractedFrames}}
{{media url=this}}
{{/each}}
{{/if}}
`,
});

const interpretRecipeFromVideoFlow = ai.defineFlow(
  {
    name: 'interpretRecipeFromVideoFlow',
    inputSchema: InterpretRecipeFromVideoInputSchema,
    outputSchema: InterpretRecipeFromVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
