# SnapRecipe

**AI-powered mobile app that generates complete cooking recipes from food photos, videos, and social media links**

SnapRecipe transforms your food inspiration into detailed, step-by-step recipes using advanced AI technology. Simply upload a photo, share a cooking video, or paste a social media link, and watch as our AI creates a complete recipe with ingredients, instructions, and cooking tips.

## Features

- **Photo-to-Recipe**: Upload food photos and get instant recipe generation
- **Video Analysis**: Extract recipes from cooking videos and short-form content
- **Link Processing**: Convert TikTok, YouTube Shorts, and Instagram Reels into recipes
- **AI-Powered**: Advanced recipe analysis and generation using GPT-4o
- **Multi-Language**: Support for multiple languages and regional cuisines
- **Mobile-First**: Optimized for mobile devices and touch interactions
- **Real-Time**: Instant recipe generation and processing
- **Beautiful UI**: Modern, intuitive interface built with Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Zustand** - State management
- **React Hook Form** - Form handling and validation

### Backend & Infrastructure
- **Firebase** - Backend-as-a-Service
  - Firestore - NoSQL database
  - Firebase Storage - File storage
  - Firebase Hosting - Web hosting
- **Firebase Studio** - Development environment

### AI & APIs
- **OpenAI GPT-4o** - Recipe generation and analysis
- **OpenAI Whisper** - Speech-to-text for video processing
- **Replicate** - AI model hosting and inference
- **Google AI (Gemini)** - Image analysis and processing

### Development Tools
- **Vercel** - Deployment and hosting
- **ESLint & Prettier** - Code quality and formatting
- **TypeScript** - Static type checking

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account
- OpenAI API key
- Replicate API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snaprecipe.git
   cd snaprecipe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   REPLICATE_API_KEY=your_replicate_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How It Works

### 1. **Image Processing Pipeline**
```
Food Photo → AI Analysis → Ingredient Detection → Recipe Generation → Complete Recipe
```

### 2. **Video Processing Pipeline**
```
Cooking Video → Frame Extraction → Speech-to-Text → Action Recognition → Recipe Generation
```

### 3. **Social Media Link Pipeline**
```
SNS Link → Content Extraction → Video/Image Analysis → Recipe Generation → Formatted Recipe
```

### 4. **AI Recipe Generation**
- **Ingredient Recognition**: Identifies ingredients from visual content
- **Cooking Method Analysis**: Determines cooking techniques and steps
- **Recipe Structuring**: Organizes information into clear, actionable steps
- **Nutritional Estimation**: Provides approximate nutritional information
- **Cooking Tips**: Adds helpful hints and variations

## Screenshots

### Main Interface
![Main Interface](screenshots/main-interface.png)
*Clean, intuitive interface for uploading content*

### Recipe Generation
![Recipe Generation](screenshots/recipe-generation.png)
*AI-generated recipe with ingredients and instructions*

### Video Processing
![Video Processing](screenshots/video-processing.png)
*Real-time video analysis and recipe extraction*

### Mobile Experience
![Mobile Experience](screenshots/mobile-experience.png)
*Optimized mobile interface for on-the-go recipe creation*

*Note: Screenshots are placeholders. Replace with actual app screenshots when available.*

## Roadmap

### Phase 1 (Current)
- ✅ Basic image-to-recipe functionality
- ✅ Video upload and processing
- ✅ Social media link support
- ✅ Multi-language support

### Phase 2 (Q2 2024)
- **Recipe Sharing**: Share recipes with friends and family
- **Recipe Collections**: Save and organize favorite recipes
- **Nutritional Analysis**: Detailed nutritional information
- **Dietary Restrictions**: Filter recipes by dietary needs

### Phase 3 (Q3 2024)
- **Shopping Lists**: Generate shopping lists from recipes
- **Meal Planning**: Weekly meal planning and scheduling
- **Recipe Scaling**: Adjust serving sizes automatically
- **Cooking Timer**: Built-in cooking timers and reminders

### Phase 4 (Q4 2024)
- **Community Features**: User-generated recipes and reviews
- **Chef Mode**: Advanced cooking techniques and tips
- **Voice Commands**: Hands-free recipe navigation
- **AR Cooking Assistant**: Augmented reality cooking guidance

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact & Support

- **Project Link**: [https://github.com/yourusername/snaprecipe](https://github.com/yourusername/snaprecipe)
- **Issues**: [GitHub Issues](https://github.com/yourusername/snaprecipe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/snaprecipe/discussions)
- **Email**: support@snaprecipe.com

## Acknowledgments

- OpenAI for GPT-4o and Whisper APIs
- Replicate for AI model hosting
- Firebase for backend infrastructure
- The open-source community for tools and libraries

---

