import { create } from 'zustand';

type View = 'SplashView' | 'ResumeView' | 'SetupView' | '';

type AppState = {
  componentToRender: View;
  nextComponent: View;
  isLoading: boolean;
  setView: (view: View) => void;
  setIsLoading: (val: boolean) => void;
  setNextView: (next: View) => void;
};

export const useAppState = create<AppState>((set) => ({
  componentToRender: 'SplashView',
  nextComponent: '',
  isLoading: false,

  setView: (view) => set({ componentToRender: view }),
  setIsLoading: (val) => set({ isLoading: val }),
  setNextView: (next) => set({ nextComponent: next }),
}));
