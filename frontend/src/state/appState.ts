import { create } from 'zustand';

export type View = 'SplashView' | 'CoverLetterGeneratorView' | 'ResumeView' | '';

type AppState = {
  componentToRender: View;
  nextView: View;

  isLoading: boolean;
  isLoadingBarDone: boolean;
  isModalOpen: boolean;

  setView: (view: View) => void;
  setIsLoading: (val: boolean) => void;
  setIsLoadingBarDone: (val: boolean) => void;
  setIsModalOpen: (val: boolean) => void;

  triggerLoadingSequence: (nextView: View) => void;
};

export const useAppState = create<AppState>((set) => ({
  componentToRender: 'SplashView',
  nextView: '',
  
  isLoading: false,
  isLoadingBarDone: false,
  isModalOpen: false,

  setIsLoadingBarDone: (val) => set({ isLoadingBarDone: val }),
  setView: (view) => set({ componentToRender: view }),
  setIsLoading: (val) => set({ isLoading: val }),
  setIsModalOpen: (val) => set({ isModalOpen: val }),
  triggerLoadingSequence: (nextView) => set({ nextView: nextView, isLoading: true, isLoadingBarDone: false }),
}));
