import { create } from 'zustand';

export interface Scene {
  id: string;
  number: number;
  imageUri: string;
  duration: string;
  description: string;
  voice: string;
  audioTrack: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  audioDescriptor?: string;
  scenes: Scene[];
}

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [
    {
      id: '1',
      name: 'Mystic Journey',
      description: 'An epic adventure through enchanted forests',
      scenes: [
        {
          id: '1-1',
          number: 1,
          imageUri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
          duration: '0:12',
          description: 'The journey begins in the heart of the ancient woods, where the fog whispers',
          voice: 'British Male',
          audioTrack: 'Cinematic Ambient',
        },
        {
          id: '1-2',
          number: 2,
          imageUri: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
          duration: '0:33',
          description: 'A forgotten temple stands silent, guarding secrets of the past amidst the',
          voice: 'British Male',
          audioTrack: 'Temple Echoes',
        },
      ],
    },
    {
      id: '2',
      name: 'Ancient Secrets',
      description: 'Discovering hidden temples and lost civilizations',
      scenes: [
        {
          id: '2-1',
          number: 1,
          imageUri: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
          duration: '0:20',
          description: 'Exploring the ruins of an ancient civilization',
          voice: 'British Male',
          audioTrack: 'Mystical Journey',
        },
      ],
    },
    {
      id: '3',
      name: 'Nightfall',
      description: 'A mysterious journey under the stars',
      scenes: [
        {
          id: '3-1',
          number: 1,
          imageUri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
          duration: '0:30',
          description: 'Midnight shadows dance across the ancient stones',
          voice: 'British Male',
          audioTrack: 'Mystical Journey',
        },
      ],
    },
  ],
  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (projectId, updates) =>
    set((state) => {
      const updatedProjects = state.projects.map((p) => (p.id === projectId ? { ...p, ...updates } : p));
      const updatedProject = updatedProjects.find((p) => p.id === projectId);
      return {
        projects: updatedProjects,
        selectedProject: state.selectedProject?.id === projectId ? (updatedProject || state.selectedProject) : state.selectedProject,
      };
    }),
}));
