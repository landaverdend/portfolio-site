'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const DEFAULT_MESSAGES: Message[] = [
  {
    id: '1',
    text: "what's up",
    sender: 'bot',
    timestamp: new Date(),
  },
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [isOpen, setIsOpen] = useState(false);

  return <ChatContext.Provider value={{ messages, setMessages, isOpen, setIsOpen }}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
