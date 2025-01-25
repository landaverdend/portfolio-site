import { create } from 'zustand/react';

export type Sender = 'client' | 'server';

export type Chat = {
  sender: Sender;
  content: string;
};

interface ChatState {
  clientChatLog: Array<Chat>;
  isLoading: boolean; // Are we currently waiting for an API response from the backend?

  addChat: (content: string, sender: Sender) => void;
  setIsLoading: (newVal: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  clientChatLog: new Array<Chat>(),
  isLoading: false,
  addChat: (content, sender) => set((state) => ({ ...state, clientChatLog: [...state.clientChatLog, { sender: sender, content: content }] })),
  setIsLoading: (newVal) => set((state) => ({ ...state, isLoading: newVal })),
}));
