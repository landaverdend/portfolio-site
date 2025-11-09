import { create } from 'zustand';

export type View = 'splash' | 'cover_letter' | 'resume' | '';

type AppState = {
  componentToRender: View;
  nextView: View;

  isLoading: boolean;
  isLoadingBarDone: boolean;
  isModalOpen: boolean;

  sessionToken: string;
  setSessionToken: (token: string) => void;

  setView: (view: View) => void;
  setIsLoading: (val: boolean) => void;
  setIsLoadingBarDone: (val: boolean) => void;
  setIsModalOpen: (val: boolean) => void;

  triggerLoadingSequence: (nextView: View) => void;
};

export const useAppState = create<AppState>((set) => ({
  componentToRender: 'resume',
  nextView: '',
  sessionToken: '',
  setSessionToken: (token) => set({ sessionToken: token }),

  isLoading: false,
  isLoadingBarDone: false,
  isModalOpen: false,

  setIsLoadingBarDone: (val) => set({ isLoadingBarDone: val }),
  setView: (view) => set({ componentToRender: view }),
  setIsLoading: (val) => set({ isLoading: val }),
  setIsModalOpen: (val) => set({ isModalOpen: val }),
  triggerLoadingSequence: (nextView) => set({ nextView: nextView, isLoading: true, isLoadingBarDone: false }),
}));
