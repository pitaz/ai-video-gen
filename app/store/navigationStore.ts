import { create } from 'zustand';

interface NavigationStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
