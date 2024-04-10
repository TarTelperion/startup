import { create } from 'zustand'

export const useSelectedStoryStore = create((set) => ({
  selectedStory: null,
  setSelectedStory: (story) => set({ selectedStory: story }),
}))
