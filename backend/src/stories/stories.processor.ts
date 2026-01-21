import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { JobsService } from '../jobs/jobs.service';
import { AIProvidersService } from '../ai-providers/ai-providers.service';
import { MediaService } from '../media/media.service';

interface StoryJobData {
  jobId: string;
  prompt: string;
  style: string;
}

@Processor('story-processing')
export class StoriesProcessor {
  constructor(
    private jobsService: JobsService,
    private aiProvidersService: AIProvidersService,
    private mediaService: MediaService,
  ) {}

  @Process('process-story')
  async handleStoryProcessing(job: Job<StoryJobData>) {
    const { jobId, prompt, style } = job.data;

    try {
      // Step 1: Expand story and create scenes
      await this.jobsService.updateJob(jobId, {
        status: 'processing',
        currentStep: 'writing_story',
        progress: 10,
      });

      const storyData = await this.aiProvidersService.expandStory(prompt, style);

      // Step 2: Generate visuals for each scene
      await this.jobsService.updateJob(jobId, {
        currentStep: 'generating_visuals',
        progress: 30,
      });

      const visualAssets = await Promise.all(
        storyData.scenes.map((scene, index) =>
          this.aiProvidersService.generateVisual(scene.description, style, 'image'),
        ),
      );

      // Step 3: Generate narration
      await this.jobsService.updateJob(jobId, {
        currentStep: 'creating_narration',
        progress: 60,
      });

      const audioAssets = await Promise.all(
        storyData.scenes.map((scene) =>
          this.aiProvidersService.generateNarration(scene.narration),
        ),
      );

      // Step 4: Compose final video
      await this.jobsService.updateJob(jobId, {
        currentStep: 'rendering_video',
        progress: 80,
      });

      const videoUrl = await this.mediaService.composeVideo({
        scenes: storyData.scenes,
        visualAssets,
        audioAssets,
      });

      // Complete
      await this.jobsService.updateJob(jobId, {
        status: 'completed',
        progress: 100,
        videoUrl,
      });
    } catch (error) {
      await this.jobsService.updateJob(jobId, {
        status: 'failed',
        error: error.message,
      });
      throw error;
    }
  }
}
