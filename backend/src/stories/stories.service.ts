import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 as uuidv4 } from 'uuid';
import { CreateStoryDto } from './dto/create-story.dto';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class StoriesService {
  constructor(
    @InjectQueue('story-processing') private storyQueue: Queue,
    private jobsService: JobsService,
  ) {}

  async createStory(createStoryDto: CreateStoryDto) {
    const jobId = uuidv4();

    // Create job record
    await this.jobsService.createJob(jobId, {
      status: 'pending',
      prompt: createStoryDto.prompt,
      style: createStoryDto.style,
    });

    // Add to processing queue
    await this.storyQueue.add('process-story', {
      jobId,
      prompt: createStoryDto.prompt,
      style: createStoryDto.style,
    });

    return { jobId };
  }
}
