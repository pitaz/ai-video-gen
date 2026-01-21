import { create } from 'zustand';

interface StoryState {
  storyPrompt: string | null;
  selectedStyle: string | null;
  jobId: string | null;
  setStoryPrompt: (prompt: string) => void;
  setSelectedStyle: (style: string) => void;
  setJobId: (jobId: string) => void;
  reset: () => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  storyPrompt: null,
  selectedStyle: null,
  jobId: null,
  setStoryPrompt: (prompt) => set({ storyPrompt: prompt }),
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  setJobId: (jobId) => set({ jobId }),
  reset: () => set({ storyPrompt: null, selectedStyle: null, jobId: null }),
}));
