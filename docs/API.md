# SnapRecipe API Documentation

This document provides comprehensive documentation for the SnapRecipe API endpoints and services.

## Overview

SnapRecipe provides AI-powered recipe generation services through various endpoints that process images, videos, and social media links.

## Base URL

```
https://api.snaprecipe.com/v1
```

## Authentication

All API requests require authentication using API keys in the header:

```
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Image Analysis

#### POST /analyze-image

Analyzes a food image and generates a complete recipe.

**Request Body:**
```json
{
  "image": "base64_encoded_image_or_url",
  "language": "en",
  "preferences": {
    "dietary_restrictions": ["vegetarian"],
    "cuisine_type": "italian",
    "serving_size": 4
  }
}
```

**Response:**
```json
{
  "success": true,
  "recipe": {
    "title": "Margherita Pizza",
    "ingredients": [
      {
        "name": "Pizza dough",
        "amount": "1",
        "unit": "piece"
      }
    ],
    "instructions": [
      "Preheat oven to 450°F",
      "Roll out the pizza dough"
    ],
    "nutrition": {
      "calories": 1200,
      "protein": "45g",
      "carbs": "150g",
      "fat": "35g"
    },
    "cooking_time": "30 minutes",
    "difficulty": "medium"
  }
}
```

### Video Analysis

#### POST /analyze-video

Processes cooking videos to extract recipes.

**Request Body:**
```json
{
  "video_url": "https://example.com/video.mp4",
  "language": "en",
  "extract_frames": true,
  "transcribe_audio": true
}
```

**Response:**
```json
{
  "success": true,
  "recipe": {
    "title": "Homemade Pasta",
    "ingredients": [...],
    "instructions": [...],
    "video_analysis": {
      "frames_analyzed": 5,
      "audio_transcript": "First, we'll mix the flour...",
      "cooking_techniques": ["kneading", "rolling"]
    }
  }
}
```

### Social Media Link Processing

#### POST /process-link

Extracts recipes from social media links (TikTok, YouTube Shorts, Instagram Reels).

**Request Body:**
```json
{
  "url": "https://www.tiktok.com/@chef/video/123456",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "recipe": {
    "title": "Quick Breakfast Bowl",
    "ingredients": [...],
    "instructions": [...],
    "source": {
      "platform": "tiktok",
      "creator": "@chef",
      "original_url": "https://www.tiktok.com/@chef/video/123456"
    }
  }
}
```

### Recipe Enhancement

#### POST /enhance-recipe

Enhances an existing recipe with additional details and variations.

**Request Body:**
```json
{
  "recipe": {
    "title": "Basic Pasta",
    "ingredients": [...],
    "instructions": [...]
  },
  "enhancements": ["nutritional_info", "cooking_tips", "variations"]
}
```

**Response:**
```json
{
  "success": true,
  "enhanced_recipe": {
    "title": "Basic Pasta",
    "ingredients": [...],
    "instructions": [...],
    "nutrition": {...},
    "tips": [...],
    "variations": [...]
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Invalid image format provided",
    "details": {
      "field": "image",
      "expected": "base64 or URL"
    }
  }
}
```

### Error Codes

- `INVALID_INPUT`: Invalid request parameters
- `AUTHENTICATION_FAILED`: Invalid or missing API key
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `PROCESSING_FAILED`: AI processing error
- `UNSUPPORTED_FORMAT`: Unsupported file format
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable

## Rate Limits

- Free tier: 100 requests/day
- Pro tier: 1000 requests/day
- Enterprise: Custom limits

## Supported Languages

- English (en)
- Japanese (ja)
- Indonesian (id)
- Spanish (es)
- French (fr)
- German (de)

## File Formats

### Images
- JPEG, PNG, WebP
- Maximum size: 10MB
- Minimum resolution: 300x300px

### Videos
- MP4, MOV, AVI
- Maximum size: 100MB
- Maximum duration: 10 minutes

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install snaprecipe-sdk
```

```javascript
import { SnapRecipe } from 'snaprecipe-sdk';

const client = new SnapRecipe('YOUR_API_KEY');
const recipe = await client.analyzeImage(imageData);
```

### Python
```bash
pip install snaprecipe-python
```

```python
from snaprecipe import SnapRecipe

client = SnapRecipe('YOUR_API_KEY')
recipe = client.analyze_image(image_data)
```

## Webhooks

Configure webhooks to receive real-time notifications:

```json
{
  "url": "https://your-app.com/webhook",
  "events": ["recipe.completed", "recipe.failed"],
  "secret": "webhook_secret"
}
```

## Support

For API support and questions:
- Email: api-support@snaprecipe.com
- Documentation: https://docs.snaprecipe.com
- Status page: https://status.snaprecipe.com 