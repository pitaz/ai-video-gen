import { Controller, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':jobId')
  async getJobStatus(@Param('jobId') jobId: string) {
    return this.jobsService.getJob(jobId);
  }
}
