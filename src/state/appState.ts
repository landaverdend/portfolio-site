import { create } from 'zustand';

export type View = 'SplashView' | 'CoverLetterGeneratorView' | 'ResumeView' | 'SurveyView' | '';

type AppState = {
  componentToRender: View;
  nextView: View;
  isLoading: boolean;
  isLoadingBarDone: boolean;

  setView: (view: View) => void;
  setIsLoading: (val: boolean) => void;
  setIsLoadingBarDone: (val: boolean) => void;

  triggerLoadingSequence: (nextView: View) => void;
};

export const useAppState = create<AppState>((set) => ({
  // componentToRender: 'SurveyView',
  // componentToRender: 'CoverLetterGeneratorView',
  componentToRender: 'SplashView',
  nextView: '',

  isLoading: false,
  isLoadingBarDone: false,

  setIsLoadingBarDone: (val) => set({ isLoadingBarDone: val }),
  setView: (view) => set({ componentToRender: view }),
  setIsLoading: (val) => set({ isLoading: val }),

  triggerLoadingSequence: (nextView) => set({ nextView: nextView, isLoading: true, isLoadingBarDone: false }),
}));
