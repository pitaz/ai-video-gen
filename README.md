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

The API will be available at `http://localhost:3000/api`. Interactive API docs (Swagger UI) are at `http://localhost:3000/api/docs`.

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
- `REDIS_URL` - Optional. If set, used instead of REDIS_HOST+REDIS_PORT (e.g. for Railway Redis add-on)
- `OPENAI_API_KEY` - OpenAI API key for LLM features (required for story expansion)
- `OPENAI_MODEL` - OpenAI model to use (default: gpt-4o-mini)
- `REPLICATE_API_TOKEN` - Replicate API token for image/video generation (required for visual generation)
- `REPLICATE_IMAGE_MODEL` - Replicate model for image generation (default: `stability-ai/sdxl` - uses latest version)
- `REPLICATE_VIDEO_MODEL` - Replicate model for video generation (default: `stability-ai/stable-video-diffusion` - uses latest version)
  
  **Note:** You can use just the model name (e.g., `stability-ai/sdxl`) to use the latest version, or specify a version hash if needed.

#### Replicate setup (image & video generation)

Video generation uses **Replicate** (Stable Diffusion for images, then Stable Video Diffusion for image→video). To enable it:

1. **Get an API token**
   - Go to [replicate.com](https://replicate.com) and sign up or log in.
   - Open [replicate.com/account/api-tokens](https://replicate.com/account/api-tokens).
   - Create a token and copy it.

2. **Configure the backend**
   - In `backend/`, copy `.env.example` to `.env` if you don’t have one:  
     `cp .env.example .env`
   - Set your token in `backend/.env`:
     ```
     REPLICATE_API_TOKEN=r8_your_actual_token_here
     ```
   - Optional: override image/video models (defaults are in `.env.example`):
     ```
     REPLICATE_IMAGE_MODEL=stability-ai/sdxl
     REPLICATE_VIDEO_MODEL=stability-ai/stable-video-diffusion
     ```

3. **Restart the backend**  
   After saving `.env`, restart the Nest server. On startup you should see:  
   `✅ Replicate client initialized with token: r8_...`  
   If you see `⚠️ REPLICATE_API_TOKEN not found`, the token is not loaded (check file name and path).

4. **If videos are still placeholders**
   - Check backend logs when you create a story. Errors from Replicate (e.g. model version, rate limits, invalid output) are logged there.
   - Ensure Redis is running (required for the job queue that runs generation).
   - Try model names without version hashes: `stability-ai/sdxl` and `stability-ai/stable-video-diffusion`.

### Frontend
- `EXPO_PUBLIC_API_URL` - Backend API URL

## Hosting the backend

The backend is a **Node.js (NestJS)** app that needs **Redis** for the Bull queue. Set `PORT`, `REDIS_HOST`, `REDIS_PORT`, and all API keys via the platform’s environment variables.

| Option | Best for | Redis | Notes |
|--------|----------|--------|--------|
| **[Railway](https://railway.app)** | Fastest path to production | Add Redis from dashboard | Deploy from GitHub, set env vars, add Redis plugin. Free tier available. |
| **[Render](https://render.com)** | Simple PaaS, free tier | Redis add-on (paid) or [Upstash](https://upstash.com) (serverless Redis) | Web Service + Redis. Use `REDIS_HOST` / `REDIS_PORT` from add-on or Upstash. |
| **[Fly.io](https://fly.io)** | Global, full control | Run Redis as a separate Fly app or use Upstash | `fly launch`, then add Redis (e.g. `fly redis create` or external). |
| **[AWS](https://aws.amazon.com)** | Enterprise / existing AWS | ElastiCache for Redis | Run app on **ECS Fargate** or **App Runner**; put secrets in Secrets Manager or Parameter Store. |
| **[DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)** | Predictable pricing | Managed Redis add-on | Connect repo, set env, add Redis component. |

**Recommendation:** For a side project or MVP, **Railway** or **Render** are the quickest (Git push + Redis add-on + env vars). Use **Upstash** for Redis if you prefer a serverless Redis with a free tier and don’t need a long-lived in-memory queue on the same host.

After deploy, set `EXPO_PUBLIC_API_URL` in the app to your backend URL (e.g. `https://your-app.railway.app/api`).

### Railway setup (step-by-step)

1. **Create a project**
   - Go to [railway.app](https://railway.app) and sign in (e.g. with GitHub).
   - Click **New Project** → **Deploy from GitHub repo** and select this repository.

2. **Configure the backend service**
   - Railway will add a service from the repo. Open it, then go to **Settings**.
   - Set **Root Directory** to `backend` (so only the NestJS app is built).
   - **Build Command:** `yarn install && yarn build`
   - **Start Command:** `yarn start:prod` (or leave empty; `backend/Procfile` sets this).
   - **Watch Paths** (optional): set to `backend/**` so only backend changes trigger deploys.

3. **Add Redis**
   - In the same project, click **+ New** → **Database** → **Add Redis** (or **Redis** from the catalog).
   - After it’s created, open the Redis service → **Variables** and copy the `REDIS_URL` (or note host/port if shown separately).

4. **Set backend variables**
   - Open your **backend service** → **Variables** (or **Settings** → **Variables**).
   - Add:
     - **Redis:** If the Redis add-on exposes `REDIS_URL`, add it here (or use **Variable Reference** to link the Redis service’s `REDIS_URL`). The backend supports either `REDIS_URL` or `REDIS_HOST` + `REDIS_PORT`.
     - `OPENAI_API_KEY` – your OpenAI API key.
     - `REPLICATE_API_TOKEN` – your Replicate API token.
   - `PORT` is set by Railway automatically; no need to add it.

5. **Generate domain**
   - Backend service → **Settings** → **Networking** → **Generate Domain**. Note the URL (e.g. `https://video-creator-backend-production-xxxx.up.railway.app`).

6. **Point the app at the backend**
   - In the Expo app, set `EXPO_PUBLIC_API_URL` to your backend API base, e.g. `https://your-backend.up.railway.app/api` (include `/api`).

7. **Redeploy**
   - Push a commit or click **Redeploy** after changing variables. Check **Deployments** and **Logs** for errors.

**Swagger:** After deploy, open `https://your-backend.up.railway.app/api/docs` to use the API docs.

### Render setup (alternative to Railway)

[Render](https://render.com) is a similar PaaS: connect GitHub, set root directory and env vars. Free tier for the web service; Redis is paid on Render or use [Upstash](https://upstash.com) (free tier) for Redis.

1. **Create a Web Service**
   - Go to [render.com](https://render.com) and sign in with GitHub.
   - **Dashboard** → **New +** → **Web Service**. Connect this repository.

2. **Configure the backend**
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `yarn install && yarn build`
   - **Start Command:** `yarn start:prod`
   - **Instance type:** Free (or paid for always-on).

3. **Redis**
   - **Option A – Render Redis (paid):** **New +** → **Redis**, create a Redis instance. In the Redis dashboard copy **Internal Connection String** (or host/port). Add `REDIS_URL` (or `REDIS_HOST` and `REDIS_PORT`) to the Web Service’s **Environment**.
   - **Option B – Upstash (free tier):** At [upstash.com](https://upstash.com) create a Redis database, copy the **Redis URL**. In Render → your Web Service → **Environment**, add `REDIS_URL` with that value.

4. **Environment variables**
   - In the Web Service → **Environment**, add:
     - `REDIS_URL` (from Redis/Upstash), or `REDIS_HOST` and `REDIS_PORT`
     - `OPENAI_API_KEY`
     - `REPLICATE_API_TOKEN`
   - Render sets `PORT` automatically.

5. **Deploy**
   - Click **Create Web Service**. Render builds and deploys. Note the URL (e.g. `https://video-creator-backend.onrender.com`).

6. **App**
   - Set `EXPO_PUBLIC_API_URL` to `https://your-service.onrender.com/api`.

**Swagger:** `https://your-service.onrender.com/api/docs`

**Note:** On the free tier the service spins down after inactivity; the first request after idle can be slow (cold start).

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
