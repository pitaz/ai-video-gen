import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':jobId')
  @ApiOperation({ summary: 'Get job status', description: 'Returns current status, progress, and videoUrl when completed.' })
  @ApiParam({ name: 'jobId', description: 'Job ID returned from POST /stories' })
  @ApiResponse({ status: 200, description: 'Job found', schema: {
    type: 'object',
    properties: {
      jobId: { type: 'string' },
      status: { type: 'string', enum: ['pending', 'processing', 'completed', 'failed'] },
      currentStep: { type: 'string', enum: ['writing_story', 'generating_visuals', 'creating_narration', 'rendering_video'] },
      progress: { type: 'number' },
      videoUrl: { type: 'string' },
      error: { type: 'string' },
      prompt: { type: 'string' },
      style: { type: 'string' },
    },
  } })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async getJobStatus(@Param('jobId') jobId: string) {
    return this.jobsService.getJob(jobId);
  }
}
