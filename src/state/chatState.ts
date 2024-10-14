import { create } from 'zustand/react';

type Sender = 'client' | 'server';

export type Chat = {
  sender: Sender;
  content: string;
};

interface ChatState {
  chatlog: Array<Chat>;
  isLoading: boolean; // Are we currently waiting for an API response from the backend?

  addChat: (content: string, sender: Sender) => void;
  setIsLoading: (newVal: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatlog: new Array<Chat>(),
  isLoading: false,
  addChat: (content, sender) => set((state) => ({ ...state, chatlog: [...state.chatlog, { sender: sender, content: content }] })),
  setIsLoading: (newVal) => set((state) => ({ ...state, isLoading: newVal })),
}));
