export type RecipeData = {
  recipeName: string;
  ingredients?: string;
  steps?: string;
  equipment?: string;
  content?: string;
  calories?: string;
  nutritionalInformation?: string;
  imageUrl?: string;
};

export type Recipe = RecipeData & {
  id: string;
  isFavorite: boolean;
  timestamp: number;
  sourceType: 'image' | 'video-url' | 'video-upload';
  sourceValue: string;
};
