import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Replicate = require('replicate');

export interface Scene {
  description: string;
  narration: string;
}

export interface StoryData {
  title: string;
  scenes: Scene[];
}

@Injectable()
export class AIProvidersService {
  private readonly logger = new Logger(AIProvidersService.name);
  private openai: OpenAI | null = null;
  private replicate: any = null;

  constructor(private configService: ConfigService) {
    // Initialize OpenAI
    const openaiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (openaiKey) {
      this.openai = new OpenAI({
        apiKey: openaiKey,
      });
      this.logger.log('OpenAI client initialized');
    } else {
      this.logger.warn('OPENAI_API_KEY not found. LLM features will be disabled.');
    }

    // Initialize Replicate
    const replicateKey = this.configService.get<string>('REPLICATE_API_TOKEN');
    if (replicateKey) {
      // Replicate is exported as a constructor function
      this.replicate = new Replicate({
        auth: replicateKey,
      });
      this.logger.log('Replicate client initialized');
    } else {
      this.logger.warn('REPLICATE_API_TOKEN not found. Image/Video generation will be disabled.');
    }
  }

  /**
   * Expand a user prompt into a structured story with scenes
   */
  async expandStory(prompt: string, style: string): Promise<StoryData> {
    if (!this.openai) {
      // Fallback to mock data if OpenAI is not configured
      this.logger.warn('OpenAI not configured, using fallback response');
      return this.getFallbackStory(prompt, style);
    }

    try {
      const systemPrompt = `You are a creative storytelling assistant. Your task is to expand a user's story prompt into a structured narrative with 3-5 scenes.

Each scene should have:
1. A vivid visual description (what the viewer would see)
2. A narration text (what would be spoken/read aloud)

The story should be engaging, visually rich, and appropriate for the style: ${style}.

Return your response as a JSON object with this exact structure:
{
  "title": "Story Title",
  "scenes": [
    {
      "description": "Visual description of scene 1",
      "narration": "Narration text for scene 1"
    },
    {
      "description": "Visual description of scene 2",
      "narration": "Narration text for scene 2"
    }
  ]
}

Make sure the JSON is valid and properly formatted.`;

      const completion = await this.openai.chat.completions.create({
        model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Expand this story prompt: "${prompt}"` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
        max_tokens: 2000,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      const storyData = JSON.parse(content) as StoryData;
      
      // Validate response structure
      if (!storyData.title || !Array.isArray(storyData.scenes)) {
        throw new Error('Invalid story structure from OpenAI');
      }

      this.logger.log(`Successfully expanded story with ${storyData.scenes.length} scenes`);
      return storyData;
    } catch (error) {
      this.logger.error('Error expanding story with OpenAI:', error);
      // Fallback to mock data on error
      return this.getFallbackStory(prompt, style);
    }
  }

  /**
   * Enhance/improve a scene description using AI
   */
  async enhanceSceneDescription(description: string, style: string): Promise<string> {
    if (!this.openai) {
      this.logger.warn('OpenAI not configured, returning original description');
      return description;
    }

    try {
      const systemPrompt = `You are a creative writing assistant. Enhance the following scene description to be more vivid, detailed, and visually engaging. Make it suitable for ${style} style. Return only the enhanced description, no additional text.`;

      const completion = await this.openai.chat.completions.create({
        model: this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Enhance this scene description: "${description}"` },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const enhanced = completion.choices[0]?.message?.content?.trim();
      return enhanced || description;
    } catch (error) {
      this.logger.error('Error enhancing scene description:', error);
      return description;
    }
  }

  /**
   * Fallback story generation when OpenAI is not available
   */
  private getFallbackStory(prompt: string, style: string): StoryData {
    return {
      title: `Story: ${prompt}`,
      scenes: [
        {
          description: `${prompt} - Opening scene with ${style} aesthetic`,
          narration: `This is the beginning of our story about ${prompt}.`,
        },
        {
          description: `${prompt} - Development scene`,
          narration: `The story continues to unfold, revealing more about ${prompt}.`,
        },
        {
          description: `${prompt} - Climactic scene`,
          narration: `The story reaches its peak with ${prompt} at the center.`,
        },
      ],
    };
  }

  /**
   * Generate a visual (image or video) for a scene description
   * Uses Replicate to access Stable Diffusion, Runway, and other models
   */
  async generateVisual(description: string, style: string, type: 'image' | 'video' = 'image'): Promise<string> {
    if (!this.replicate) {
      this.logger.warn('Replicate not configured, using fallback URL');
      return type === 'video' 
        ? `https://example.com/generated-video-${Date.now()}.mp4`
        : `https://example.com/generated-image-${Date.now()}.jpg`;
    }

    try {
      if (type === 'video') {
        return await this.generateVideo(description, style);
      } else {
        return await this.generateImage(description, style);
      }
    } catch (error) {
      this.logger.error('Error generating visual:', error);
      // Return fallback URL on error
      return type === 'video'
        ? `https://example.com/generated-video-${Date.now()}.mp4`
        : `https://example.com/generated-image-${Date.now()}.jpg`;
    }
  }

  /**
   * Generate an image using Stable Diffusion XL
   */
  private async generateImage(description: string, style: string): Promise<string> {
    if (!this.replicate) {
      throw new Error('Replicate not configured');
    }

    try {
      // Use Stable Diffusion XL for high-quality image generation
      const model = this.configService.get<string>('REPLICATE_IMAGE_MODEL') || 
        'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35cae5a08b6';

      // Build enhanced prompt with style
      const enhancedPrompt = this.buildImagePrompt(description, style);

      this.logger.log(`Generating image with prompt: ${enhancedPrompt.substring(0, 100)}...`);

      const output = await this.replicate.run(model as any, {
        input: {
          prompt: enhancedPrompt,
          num_outputs: 1,
          aspect_ratio: '16:9',
          output_format: 'url',
          output_quality: 90,
        },
      }) as string[];

      const imageUrl = Array.isArray(output) ? output[0] : output;
      
      if (!imageUrl || typeof imageUrl !== 'string') {
        throw new Error('Invalid image output from Replicate');
      }

      this.logger.log(`Image generated successfully: ${imageUrl}`);
      return imageUrl;
    } catch (error) {
      this.logger.error('Error generating image:', error);
      throw error;
    }
  }

  /**
   * Generate a video using Stable Video Diffusion or Runway
   */
  private async generateVideo(description: string, style: string): Promise<string> {
    if (!this.replicate) {
      throw new Error('Replicate not configured');
    }

    try {
      // First generate an image, then convert to video
      // This is a common workflow: image-to-video
      const imageUrl = await this.generateImage(description, style);

      // Use Stable Video Diffusion for image-to-video
      const videoModel = this.configService.get<string>('REPLICATE_VIDEO_MODEL') ||
        'stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb47a8170ad8ec4436d7811f9ac6b5b9ef4fd5a68f';

      this.logger.log(`Generating video from image: ${imageUrl.substring(0, 50)}...`);

      const output = await this.replicate.run(videoModel as any, {
        input: {
          image: imageUrl,
          motion_bucket_id: 127,
          cond_aug: 0.02,
          decoding_t: 14,
        },
      }) as string[];

      const videoUrl = Array.isArray(output) ? output[0] : output;
      
      if (!videoUrl || typeof videoUrl !== 'string') {
        throw new Error('Invalid video output from Replicate');
      }

      this.logger.log(`Video generated successfully: ${videoUrl}`);
      return videoUrl;
    } catch (error) {
      this.logger.error('Error generating video:', error);
      throw error;
    }
  }

  /**
   * Build an enhanced prompt for image generation with style guidance
   */
  private buildImagePrompt(description: string, style: string): string {
    const stylePrompts: Record<string, string> = {
      cinematic: 'cinematic lighting, film grain, dramatic composition, professional cinematography',
      anime: 'anime style, vibrant colors, detailed illustration, Japanese animation aesthetic',
      '3d-render': '3D rendered, photorealistic, high detail, professional 3D graphics',
      kids: 'colorful, friendly, cartoon style, child-friendly, playful',
      documentary: 'documentary style, realistic, natural lighting, authentic',
    };

    const stylePrompt = stylePrompts[style] || 'high quality, detailed';
    
    return `${description}, ${stylePrompt}, masterpiece, best quality, highly detailed`;
  }

  /**
   * Generate narration audio from text
   */
  async generateNarration(text: string): Promise<string> {
    // TODO: Integrate with TTS service (ElevenLabs, Google TTS, etc.)
    // Returns URL to generated audio
    return `https://example.com/generated-audio-${Date.now()}.mp3`;
  }
}
