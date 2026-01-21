# AI Video Stories

An Expo (React Native) application that converts written text into AI-generated video stories.

## Project Structure

```
video-creator/
├── app/              # Expo frontend application
└── backend/          # NestJS backend API
```

## Getting Started

### Frontend (Expo App)

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies:
```bash
yarn install
```

3. Start the Expo development server:
```bash
yarn start
```

4. Set the API URL (optional):
Create a `.env` file in the `app/` directory:
```
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

### Backend (NestJS)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
yarn install
```

3. Start Redis (required for job queue):
```bash
# Using Docker
docker run -d -p 6379:6379 redis

# Or install Redis locally
```

4. Start the backend server:
```bash
yarn start:dev
```

The API will be available at `http://localhost:3000`

## Architecture

### Frontend
- **Expo Router** for navigation
- **Zustand** for state management
- **React Query** for API polling
- **Expo AV** for video playback

### Backend
- **NestJS** framework
- **Bull** for job queue processing
- **Redis** for queue storage
- Modular architecture:
  - `StoriesModule` - Story creation endpoints
  - `JobsModule` - Job status tracking
  - `AIProvidersModule` - AI service integrations
  - `MediaModule` - Video composition

## AI Pipeline

The backend processes stories through these steps:

1. **Story Expansion** - LLM expands prompt into structured scenes
2. **Visual Generation** - AI generates images/videos per scene
3. **Narration** - Text-to-speech generates audio
4. **Video Composition** - FFmpeg merges assets into final video

## Implementation Status

### ✅ Completed
- Expo app structure with all screens
- Navigation flow
- State management (Zustand)
- API client setup with React Query
- Job polling with automatic status updates
- Backend structure with NestJS modules
- Job queue setup with Bull
- Video playback with Expo AV
- Share and download functionality

### 🚧 TODO
- ✅ Integrate actual LLM for story expansion (OpenAI) - **COMPLETED**
- ✅ Integrate image/video AI services (Stable Diffusion via Replicate) - **COMPLETED**
- Integrate TTS service (ElevenLabs, Google TTS, etc.)
- Implement FFmpeg video composition
- Add storage (S3-compatible) for assets
- Add error handling and retries
- Add authentication (optional)
- Add monetization features (optional)
- Create app assets (icon, splash screen, etc.)

## Environment Variables

### Backend
- `PORT` - Server port (default: 3000)
- `REDIS_HOST` - Redis host (default: localhost)
- `REDIS_PORT` - Redis port (default: 6379)
- `OPENAI_API_KEY` - OpenAI API key for LLM features (required for story expansion)
- `OPENAI_MODEL` - OpenAI model to use (default: gpt-4o-mini)
- `REPLICATE_API_TOKEN` - Replicate API token for image/video generation (required for visual generation)
- `REPLICATE_IMAGE_MODEL` - Replicate model for image generation (default: Stable Diffusion XL)
- `REPLICATE_VIDEO_MODEL` - Replicate model for video generation (default: Stable Video Diffusion)

### Frontend
- `EXPO_PUBLIC_API_URL` - Backend API URL

## Development Notes

- The backend uses in-memory job storage for MVP. Consider using a database (PostgreSQL, MongoDB) for production.
- AI service integrations are placeholder implementations that need to be connected to actual services.
- Video composition with FFmpeg needs to be implemented in the `MediaService`.
- You'll need to create app assets (icon.png, splash.png, adaptive-icon.png, favicon.png) in the `app/assets/` directory.
- The app uses Expo Router file-based routing. All routes are in `app/app/`.
- Redis is required for the job queue. Use Docker for easy setup: `docker run -d -p 6379:6379 redis`

## API Documentation

For detailed API documentation including all endpoints, request/response formats, and examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## License

MIT
