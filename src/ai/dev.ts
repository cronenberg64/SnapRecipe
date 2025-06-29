import { config } from 'dotenv';
config();

import '@/ai/flows/interpret-recipe-from-video.ts';
import '@/ai/flows/analyze-image-recipe.ts';
import '@/ai/flows/extract-recipe-from-video.ts';
import '@/ai/flows/expand-recipe-ingredients.ts';
import '@/ai/flows/generate-recipe-image.ts';
