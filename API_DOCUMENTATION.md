# API Documentation

This document describes all available API endpoints for the Video Creator application.

## Base URL

All endpoints are prefixed with `/api`:

```
http://localhost:3000/api
```

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

---

## Stories API

### Create Story Job

Creates a new story generation job that processes a prompt through the AI pipeline.

**Endpoint:** `POST /api/stories`

**Request Body:**
```json
{
  "prompt": "A futuristic nomad wandering through a neon-lit rainforest",
  "style": "cinematic"
}
```

**Request Schema:**
- `prompt` (string, required): The story prompt to expand
- `style` (string, required): Visual style - one of: `cinematic`, `anime`, `kids`, `documentary`

**Response:**
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response Schema:**
- `jobId` (string): Unique identifier for the job

**Example:**
```bash
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A mysterious journey through ancient ruins",
    "style": "cinematic"
  }'
```

**Status Codes:**
- `200 OK`: Job created successfully
- `400 Bad Request`: Invalid request body or validation error

---

## Jobs API

### Get Job Status

Retrieves the current status of a story generation job.

**Endpoint:** `GET /api/jobs/:jobId`

**Path Parameters:**
- `jobId` (string, required): The job identifier returned from creating a story

**Response:**
```json
{
  "jobId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "processing",
  "currentStep": "generating_visuals",
  "progress": 45,
  "videoUrl": null,
  "error": null
}
```

**Response Schema:**
- `jobId` (string): Job identifier
- `status` (string): Job status - one of: `pending`, `processing`, `completed`, `failed`
- `currentStep` (string, optional): Current processing step - one of: `writing_story`, `generating_visuals`, `creating_narration`, `rendering_video`
- `progress` (number, optional): Progress percentage (0-100)
- `videoUrl` (string, optional): URL to the generated video (only when status is `completed`)
- `error` (string, optional): Error message (only when status is `failed`)

**Example:**
```bash
curl http://localhost:3000/api/jobs/550e8400-e29b-41d4-a716-446655440000
```

**Status Codes:**
- `200 OK`: Job status retrieved successfully
- `404 Not Found`: Job not found

**Polling Recommendation:**
Poll this endpoint every 2-3 seconds while `status` is `pending` or `processing`.

---

## AI Providers API

### Enhance Scene Description

Uses AI to enhance and improve a scene description, making it more vivid and detailed.

**Endpoint:** `POST /api/ai/enhance-scene`

**Request Body:**
```json
{
  "description": "A forest scene",
  "style": "cinematic"
}
```

**Request Schema:**
- `description` (string, required): The scene description to enhance
- `style` (string, required): Visual style - one of: `cinematic`, `anime`, `3d-render`, `kids`, `documentary`

**Response:**
```json
{
  "description": "A lush, ancient forest bathed in golden hour light, with towering trees creating dramatic shadows and dappled sunlight filtering through the dense canopy..."
}
```

**Response Schema:**
- `description` (string): The enhanced scene description

**Example:**
```bash
curl -X POST http://localhost:3000/api/ai/enhance-scene \
  -H "Content-Type: application/json" \
  -d '{
    "description": "A space station",
    "style": "sci-fi"
  }'
```

**Status Codes:**
- `200 OK`: Scene enhanced successfully
- `400 Bad Request`: Invalid request body

**Notes:**
- Requires `OPENAI_API_KEY` environment variable
- Falls back to returning original description if OpenAI is not configured

---

### Expand Story

Expands a story prompt into a structured narrative with multiple scenes.

**Endpoint:** `POST /api/ai/expand-story`

**Request Body:**
```json
{
  "prompt": "A hero's journey through a magical kingdom",
  "style": "fantasy"
}
```

**Request Schema:**
- `prompt` (string, required): The story prompt to expand
- `style` (string, required): Story style/tone

**Response:**
```json
{
  "title": "The Quest for the Crystal Crown",
  "scenes": [
    {
      "description": "A young hero stands at the edge of an enchanted forest, the ancient trees whispering secrets of the magical kingdom beyond",
      "narration": "In a realm where magic flows like rivers, our hero begins a journey that will change everything."
    },
    {
      "description": "The hero navigates through mystical pathways, encountering glowing creatures and floating crystals",
      "narration": "Each step deeper into the kingdom reveals wonders beyond imagination."
    },
    {
      "description": "The hero reaches the castle, where the Crystal Crown awaits, pulsing with ancient power",
      "narration": "At the journey's end, destiny awaits, and the true test of courage begins."
    }
  ]
}
```

**Response Schema:**
- `title` (string): Generated story title
- `scenes` (array): Array of scene objects
  - `description` (string): Visual description of the scene
  - `narration` (string): Narration text for the scene

**Example:**
```bash
curl -X POST http://localhost:3000/api/ai/expand-story \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A cyberpunk detective story",
    "style": "sci-fi"
  }'
```

**Status Codes:**
- `200 OK`: Story expanded successfully
- `400 Bad Request`: Invalid request body

**Notes:**
- Requires `OPENAI_API_KEY` environment variable
- Returns 3-5 scenes by default
- Falls back to mock data if OpenAI is not configured

---

### Generate Visual

Generates an image or video for a scene description using AI.

**Endpoint:** `POST /api/ai/generate-visual`

**Request Body:**
```json
{
  "description": "A futuristic cityscape at night with neon lights",
  "style": "cinematic",
  "type": "image"
}
```

**Request Schema:**
- `description` (string, required): Scene description to visualize
- `style` (string, required): Visual style - one of: `cinematic`, `anime`, `3d-render`, `kids`, `documentary`
- `type` (string, optional): Generation type - `image` or `video` (default: `image`)

**Response:**
```json
{
  "url": "https://replicate.delivery/pbxt/abc123.../output.png"
}
```

**Response Schema:**
- `url` (string): URL to the generated image or video

**Example (Image):**
```bash
curl -X POST http://localhost:3000/api/ai/generate-visual \
  -H "Content-Type: application/json" \
  -d '{
    "description": "A mystical forest with glowing plants",
    "style": "cinematic",
    "type": "image"
  }'
```

**Example (Video):**
```bash
curl -X POST http://localhost:3000/api/ai/generate-visual \
  -H "Content-Type: application/json" \
  -d '{
    "description": "A space station orbiting a distant planet",
    "style": "sci-fi",
    "type": "video"
  }'
```

**Status Codes:**
- `200 OK`: Visual generated successfully
- `400 Bad Request`: Invalid request body

**Notes:**
- Requires `REPLICATE_API_TOKEN` environment variable
- Image generation uses Stable Diffusion XL
- Video generation uses Stable Video Diffusion (image-to-video workflow)
- Returns placeholder URL if Replicate is not configured
- Video generation may take longer (30-60 seconds)

---

## Complete Workflow Example

Here's a complete example of creating a story from start to finish:

### Step 1: Create Story Job

```bash
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A brave knight rescues a dragon from an evil princess",
    "style": "cinematic"
  }'
```

**Response:**
```json
{
  "jobId": "abc123-def456-ghi789"
}
```

### Step 2: Poll Job Status

```bash
# Poll every 2-3 seconds
curl http://localhost:3000/api/jobs/abc123-def456-ghi789
```

**Response (Processing):**
```json
{
  "jobId": "abc123-def456-ghi789",
  "status": "processing",
  "currentStep": "generating_visuals",
  "progress": 45,
  "videoUrl": null
}
```

**Response (Completed):**
```json
{
  "jobId": "abc123-def456-ghi789",
  "status": "completed",
  "currentStep": "rendering_video",
  "progress": 100,
  "videoUrl": "https://example.com/video-abc123.mp4"
}
```

### Step 3: Use the Generated Video

Once `status` is `completed`, use the `videoUrl` to download or stream the video.

---

## Frontend Integration

### Using the API Client

The frontend includes a pre-configured API client in `app/services/api.ts`:

```typescript
import { 
  createStoryJob, 
  getJobStatus,
  enhanceScene,
  expandStory,
  generateVisual
} from '../services/api';

// Create a story job
const { jobId } = await createStoryJob({
  prompt: "Your story prompt",
  style: "cinematic"
});

// Poll job status
const status = await getJobStatus(jobId);

// Enhance a scene description
const { description } = await enhanceScene({
  description: "A simple scene",
  style: "cinematic"
});

// Expand a story
const story = await expandStory({
  prompt: "Your prompt",
  style: "fantasy"
});

// Generate a visual
const { url } = await generateVisual({
  description: "Scene description",
  style: "cinematic",
  type: "image" // or "video"
});
```

### React Query Integration

For polling job status, use React Query:

```typescript
import { useQuery } from '@tanstack/react-query';
import { getJobStatus } from '../services/api';

function useJobStatus(jobId: string) {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobStatus(jobId),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Poll every 2 seconds if still processing
      return status === 'pending' || status === 'processing' ? 2000 : false;
    },
  });
}
```

---

## Environment Variables

### Required for Full Functionality

```bash
# OpenAI (for story expansion and scene enhancement)
OPENAI_API_KEY=sk-...

# Replicate (for image/video generation)
REPLICATE_API_TOKEN=r8_...

# Optional: Customize models
OPENAI_MODEL=gpt-4o-mini
REPLICATE_IMAGE_MODEL=stability-ai/sdxl:...
REPLICATE_VIDEO_MODEL=stability-ai/stable-video-diffusion:...
```

### Without API Keys

The API will still work but will:
- Return fallback/mock data for story expansion
- Return placeholder URLs for visual generation
- Log warnings about missing configuration

---

## Error Handling

All endpoints return standard HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request (missing fields, validation errors)
- `404 Not Found`: Resource not found (e.g., job ID doesn't exist)
- `500 Internal Server Error`: Server error (check logs for details)

Error responses may include additional details:

```json
{
  "statusCode": 400,
  "message": ["prompt must be a string", "style must be one of: cinematic, anime, kids, documentary"],
  "error": "Bad Request"
}
```

---

## Rate Limits

Currently, no rate limits are enforced. However, consider:

- **OpenAI API**: Check your OpenAI account limits
- **Replicate API**: Check your Replicate account limits and pricing
- **Job Processing**: Jobs are queued and processed asynchronously

---

## Testing

### Using cURL

All examples above use cURL. Make sure your backend is running on `http://localhost:3000`.

### Using Postman/Insomnia

Import these endpoints:
- Base URL: `http://localhost:3000/api`
- All endpoints accept `Content-Type: application/json`

### Using the Frontend

The frontend app includes working examples:
- **Create Scene Screen**: Uses `enhanceScene` API
- **Generating Screen**: Uses `createStoryJob` and `getJobStatus` APIs
- **Storyboard**: Can trigger story generation

---

## Next Steps

- Add authentication/authorization
- Implement rate limiting
- Add request validation middleware
- Add response caching
- Add webhook support for job completion
- Add batch processing endpoints
