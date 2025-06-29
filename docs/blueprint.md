# **App Name**: MediaToMeal

## Core Features:

- Image-Based Recipe: Analyze food image, powered by a vision model, to identify dish and ingredients.
- AI Recipe Expansion: Expands the identified ingredients from the image analysis into a complete recipe using GPT-4o. Also include calorie and nutritional estimates using GPT-4o as a tool.
- Video Recipe Extraction: Generates recipe using TikTok, YouTube Short, and Instagram Reel URLs, then pulls video thumbnail and title, enhances it with Whisper-extracted audio, and sends to GPT-4o. Then returns it as text. Video content provided by the link are automatically processed.
- Cooking Video Interpretation: Interpret recipe from uploaded cooking video. Frame extraction and speech transcription of the provided video enhances results. 3-5 frames are extracted and used for determining ingredients
- Recipe Organization and Sharing: Tabbed UI for user history (past recipes), favorites, and shareable text/image of each recipe.
- Multi-Language Support: Switchable Language Toggle (EN/JP/ID) for the main UI elements of the app, saved for the current session.

## Style Guidelines:

- Primary color: Vibrant coral (#FF7F50) to evoke appetite and creativity.
- Background color: Light peach (#FAEBD7) for a warm and inviting feel.
- Accent color: Soft lavender (#E6E6FA) for interactive elements and highlights.
- Body font: 'Inter' sans-serif, for a modern and clean reading experience.
- Headline font: 'Space Grotesk' sans-serif, for a bold and contemporary feel.
- Minimalist icons that are intuitive, monochromatic (coral on light peach), and relate to cooking/food categories.
- Soft card components and clean spacing to maintain a minimal and modern aesthetic, appropriate for mobile screens. The navigation may consist of either tabs or a bottom navigation bar.