# Quick Start Guide

## Prerequisites

- Node.js 18+ and yarn
- Expo CLI (install globally: `yarn global add expo-cli` or use `npx expo`)
- Redis (for backend job queue)
- iOS Simulator / Android Emulator / Physical device with Expo Go app

## Setup Steps

### 1. Install Dependencies

```bash
# Install root dependencies (optional, for workspace management)
yarn install

# Install frontend dependencies
cd app
yarn install

# Install backend dependencies
cd ../backend
yarn install
```

### 2. Start Redis

```bash
# Using Docker (recommended)
docker run -d -p 6379:6379 --name redis redis

# Or install Redis locally and start it
redis-server
```

### 3. Start Backend

```bash
cd backend
yarn start:dev
```

The backend will start on `http://localhost:3000/api`

### 4. Start Frontend

In a new terminal:

```bash
cd app
yarn start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

### 5. Configure API URL (if needed)

If your backend is running on a different URL, create `app/.env`:

```
EXPO_PUBLIC_API_URL=http://your-backend-url/api
```

## Testing the Flow

1. Open the app
2. Enter a story prompt (e.g., "A boy finds a mysterious watch in Kigali")
3. Select a style
4. Watch the generation progress
5. Preview and export your video

## Troubleshooting

### Backend won't start
- Make sure Redis is running: `docker ps` or `redis-cli ping`
- Check if port 3000 is available

### Frontend can't connect to backend
- Verify backend is running on port 3000
- Check `EXPO_PUBLIC_API_URL` in `app/.env`
- For physical devices, use your computer's IP address instead of `localhost`

### Job status stuck
- Check backend logs for errors
- Verify Redis connection
- Check that the job processor is running

## Next Steps

1. Integrate AI services (see TODO in README.md)
2. Add app assets (icon, splash screen)
3. Implement FFmpeg video composition
4. Add storage for media assets
