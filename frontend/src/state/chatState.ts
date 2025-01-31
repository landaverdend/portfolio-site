import { create } from 'zustand/react';

export type Sender = 'client' | 'server';

export type Chat = {
  sender: Sender;
  content: string;
};

interface ChatState {
  clientChatLog: Array<Chat>;
  isLoading: boolean; // Are we currently waiting for an API response from the backend?
  isChatMuted: boolean;

  addChat: (content: string, sender: Sender) => void;
  setIsLoading: (newVal: boolean) => void;
  setIsChatMuted: (val: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  clientChatLog: new Array<Chat>(),
  isLoading: false,
  isChatMuted: false,
  addChat: (content, sender) =>
    set((state) => ({ ...state, clientChatLog: [...state.clientChatLog, { sender: sender, content: content }] })),
  setIsLoading: (newVal) => set((state) => ({ ...state, isLoading: newVal })),
  setIsChatMuted: (val) => set((state) => ({ ...state, isChatMuted: val })),
}));
