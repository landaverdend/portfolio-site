import { create } from 'zustand';

type View = 'SplashView' | 'ResumeView' | 'SurveyView' | '';

type AppState = {
  componentToRender: View;
  nextComponent: View;
  isLoading: boolean;
  isLoadingBarDone: boolean;

  setView: (view: View) => void;
  setIsLoading: (val: boolean) => void;
  setNextView: (next: View) => void;
  setIsLoadingBarDone: (val: boolean) => void;
};

export const useAppState = create<AppState>((set) => ({
  componentToRender: 'SplashView',
  nextComponent: '',

  isLoading: false,
  isLoadingBarDone: false,

  setIsLoadingBarDone: (val) => set({ isLoadingBarDone: val }),
  setView: (view) => set({ componentToRender: view }),
  setIsLoading: (val) => set({ isLoading: val }),
  setNextView: (next) => set({ nextComponent: next }),
}));
