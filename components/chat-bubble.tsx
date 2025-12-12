'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import { PaperPlaneIcon, Cross2Icon } from '@radix-ui/react-icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Nico. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isSubmitting) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsSubmitting(true);

    // Submit to Formspree
    const formData = new FormData();
    formData.append('email', 'chat@example.com');
    formData.append('message', messageText);

    try {
      await fetch('https://formspree.io/f/xzzzozwp', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsSubmitting(false);

    // Add bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you soon.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 hover:scale-110 transition-transform duration-300 drop-shadow-lg cursor-pointer"
          aria-label="Open chat">
          <Image
            src="/chatBubble.png"
            alt="Chat bubble"
            width={64}
            height={64}
            className="drop-shadow-lg rounded-full border border-indigo-300/50 w-12 h-12 sm:w-16 sm:h-16"
          />
        </button>
      )}

      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] max-w-[320px] h-[500px] max-h-[calc(100vh-2rem)] sm:w-[380px] sm:h-[600px] sm:max-h-[calc(100vh-3rem)] bg-indigo-950/95 backdrop-blur-md border border-indigo-300/50 text-white shadow-[0_0_60px_rgba(129,140,248,0.4)] rounded-lg flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-indigo-300/30 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold animate-gradient">Nico(demus) Landaverde</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-indigo-800/50"
              aria-label="Close chat">
              <Cross2Icon className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-indigo-800/60 text-white rounded-bl-sm border border-indigo-400/30'
                  }`}>
                  <p className="text-sm whitespace-pre-wrap wrap-break-word">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSendMessage}
            className="px-3 sm:px-4 pb-4 sm:pb-4 pt-3 border-t border-indigo-300/30 safe-area-inset-bottom">
            <div className="flex gap-2 items-end">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-indigo-800/60 border border-indigo-400/50 text-white placeholder:text-white/50 p-2.5 sm:p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 resize-none"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed p-2.5 sm:p-3 rounded-lg transition-colors duration-300 flex items-center justify-center shrink-0 cursor-pointer">
                {isSubmitting ? (
                  <Spinner className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <PaperPlaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
