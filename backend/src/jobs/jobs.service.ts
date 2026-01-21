import { Injectable } from '@nestjs/common';

export interface JobData {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  currentStep?: 'writing_story' | 'generating_visuals' | 'creating_narration' | 'rendering_video';
  progress?: number;
  videoUrl?: string;
  error?: string;
  prompt?: string;
  style?: string;
}

export interface Job extends JobData {
  jobId: string;
}

@Injectable()
export class JobsService {
  private jobs: Map<string, Job> = new Map();

  async createJob(jobId: string, data: JobData): Promise<Job> {
    const job: Job = {
      jobId,
      ...data,
    };
    this.jobs.set(jobId, job);
    return job;
  }

  async getJob(jobId: string): Promise<Job | null> {
    return this.jobs.get(jobId) || null;
  }

  async updateJob(jobId: string, updates: Partial<JobData>): Promise<Job | null> {
    const job = this.jobs.get(jobId);
    if (!job) {
      return null;
    }

    const updatedJob = {
      ...job,
      ...updates,
    };
    this.jobs.set(jobId, updatedJob);
    return updatedJob;
  }
}
