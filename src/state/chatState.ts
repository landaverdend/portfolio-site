import { create } from 'zustand/react';

type Sender = 'client' | 'server';

export type Chat = {
  sender: Sender;
  content: string;
};

interface ChatState {
  chatlog: Array<Chat>;
  addChat: (content: string, sender: Sender) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatlog: new Array<Chat>(),
  addChat: (content, sender) =>
    set((state) => {
      return { chatlog: [...state.chatlog, { sender: sender, content: content }] };
    }),
}));
