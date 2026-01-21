import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateJobRequest {
  prompt: string;
  style: string;
}

export interface CreateJobResponse {
  jobId: string;
}

export interface JobStatus {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  currentStep?: 'writing_story' | 'generating_visuals' | 'creating_narration' | 'rendering_video';
  progress?: number;
  videoUrl?: string;
  error?: string;
}

export const createStoryJob = async (request: CreateJobRequest): Promise<CreateJobResponse> => {
  const response = await apiClient.post<CreateJobResponse>('/stories', request);
  return response.data;
};

export const getJobStatus = async (jobId: string): Promise<JobStatus> => {
  const response = await apiClient.get<JobStatus>(`/jobs/${jobId}`);
  return response.data;
};
