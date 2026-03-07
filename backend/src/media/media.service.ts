import { Injectable, Logger } from '@nestjs/common';
import { Scene } from '../ai-providers/ai-providers.service';

interface ComposeVideoParams {
  scenes: Scene[];
  visualAssets: string[];
  audioAssets: string[];
}

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  /**
   * Compose final video from scenes, visuals, and audio
   * 
   * Currently returns the first video URL from generated assets.
   * 
   * TODO: Full FFmpeg composition to:
   * 1. Download all visualAssets (videos from Replicate)
   * 2. Download all audioAssets (narration audio)
   * 3. Use FFmpeg to:
   *    - Concatenate video segments
   *    - Overlay audio tracks
   *    - Create transitions between scenes
   *    - Export final video
   * 4. Upload to storage (S3, Cloudinary, etc.)
   * 5. Return public URL
   */
  async composeVideo(params: ComposeVideoParams): Promise<string> {
    const { visualAssets } = params;

    this.logger.log(`Composing video from ${visualAssets?.length || 0} visual assets`);

    // Check if we have actual video URLs from Replicate
    if (visualAssets && visualAssets.length > 0) {
      // Log all received URLs for debugging
      visualAssets.forEach((url, index) => {
        this.logger.log(`Asset ${index + 1}: ${url?.substring(0, 100) || 'null'}...`);
      });

      // Filter out placeholder URLs
      const validVideos = visualAssets.filter(
        (url) => url && typeof url === 'string' && !url.includes('example.com')
      );

      this.logger.log(`Found ${validVideos.length} valid videos out of ${visualAssets.length} total`);

      if (validVideos.length > 0) {
        // For now, return the first video URL
        // In production, concatenate all videos with FFmpeg
        const videoUrl = validVideos[0];
        this.logger.log(`Using generated video URL: ${videoUrl.substring(0, 80)}...`);
        
        // If multiple videos, log a note about concatenation
        if (validVideos.length > 1) {
          this.logger.warn(
            `Multiple videos generated (${validVideos.length}). ` +
            `Returning first video. Full concatenation requires FFmpeg implementation.`
          );
        }
        
        return videoUrl;
      } else {
        // Log why no valid videos were found
        const placeholderCount = visualAssets.filter(
          (url) => url && url.includes('example.com')
        ).length;
        this.logger.warn(
          `All ${visualAssets.length} video assets are placeholders. ` +
          `This usually means REPLICATE_API_TOKEN is not configured or video generation failed. ` +
          `Check backend logs for detailed error messages.`
        );
      }
    } else {
      this.logger.warn('No visual assets provided to composeVideo');
    }

    // Fallback: return placeholder URL if no valid videos found
    this.logger.warn(
      'No valid video URLs found. ' +
      'Ensure REPLICATE_API_TOKEN is configured in backend/.env and video generation is working.'
    );
    const videoUrl = `https://example.com/final-video-${Date.now()}.mp4`;
    return videoUrl;
  }
}
