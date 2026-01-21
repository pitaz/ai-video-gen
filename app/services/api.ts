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

export interface EnhanceSceneRequest {
  description: string;
  style: string;
}

export interface EnhanceSceneResponse {
  description: string;
}

export interface ExpandStoryRequest {
  prompt: string;
  style: string;
}

export interface ExpandStoryResponse {
  title: string;
  scenes: Array<{
    description: string;
    narration: string;
  }>;
}

export const enhanceScene = async (request: EnhanceSceneRequest): Promise<EnhanceSceneResponse> => {
  const response = await apiClient.post<EnhanceSceneResponse>('/ai/enhance-scene', request);
  return response.data;
};

export const expandStory = async (request: ExpandStoryRequest): Promise<ExpandStoryResponse> => {
  const response = await apiClient.post<ExpandStoryResponse>('/ai/expand-story', request);
  return response.data;
};

export interface GenerateVisualRequest {
  description: string;
  style: string;
  type?: 'image' | 'video';
}

export interface GenerateVisualResponse {
  url: string;
}

export const generateVisual = async (request: GenerateVisualRequest): Promise<GenerateVisualResponse> => {
  const response = await apiClient.post<GenerateVisualResponse>('/ai/generate-visual', request);
  return response.data;
};
