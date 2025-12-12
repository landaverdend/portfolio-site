'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import { PaperPlaneIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useChat, Message } from '@/contexts/chat-context';
import { useInactivityHook } from '@/hooks/useInactivityHook';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <span
        className="w-2 h-2 bg-white/70 rounded-full"
        style={{
          animation: 'typing-bounce 1.4s ease-in-out infinite',
          animationDelay: '0ms',
        }}
      />
      <span
        className="w-2 h-2 bg-white/70 rounded-full"
        style={{
          animation: 'typing-bounce 1.4s ease-in-out infinite',
          animationDelay: '200ms',
        }}
      />
      <span
        className="w-2 h-2 bg-white/70 rounded-full"
        style={{
          animation: 'typing-bounce 1.4s ease-in-out infinite',
          animationDelay: '400ms',
        }}
      />
    </div>
  );
}

export default function ChatBubble() {
  const { messages, setMessages, isOpen, setIsOpen, unreadCount, setUnreadCount } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const lastReadMessageIdRef = useRef<string | null>(null);
  const playedSoundForMessageIdsRef = useRef<Set<string>>(new Set());
  const notificationSoundRef = useRef<HTMLAudioElement | null>(null);

  // Hook to send cold messages when user is inactive
  useInactivityHook();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSubmitting]);

  // Initialize notification sound
  useEffect(() => {
    notificationSoundRef.current = new Audio('/sounds/notification.mp3');
    notificationSoundRef.current.volume = 0.5; // Set volume to 50%

    return () => {
      if (notificationSoundRef.current) {
        notificationSoundRef.current.pause();
        notificationSoundRef.current = null;
      }
    };
  }, []);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      // Find the index of the last read message
      let lastReadIndex = -1;
      if (lastReadMessageIdRef.current) {
        lastReadIndex = messages.findIndex((msg) => msg.id === lastReadMessageIdRef.current);
      }

      // Count bot messages after the last read message
      const unreadBotMessages = messages.slice(lastReadIndex + 1).filter((msg) => msg.sender === 'bot');

      if (unreadBotMessages.length > 0) {
        setUnreadCount(unreadBotMessages.length);

        // Play notification sound for new bot messages that haven't played yet
        unreadBotMessages.forEach((message) => {
          if (!playedSoundForMessageIdsRef.current.has(message.id)) {
            playedSoundForMessageIdsRef.current.add(message.id);
            if (notificationSoundRef.current) {
              notificationSoundRef.current.play().catch((error) => {
                // Handle autoplay restrictions - user interaction may be required
                console.log('Could not play notification sound:', error);
              });
            }
          }
        });
      }
    }
  }, [messages, isOpen, setUnreadCount]);

  // Clear unread count and mark all messages as read when chat opens
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      if (messages.length > 0) {
        lastReadMessageIdRef.current = messages[messages.length - 1].id;
        // Mark all current messages as having played sound
        messages.forEach((msg) => {
          playedSoundForMessageIdsRef.current.add(msg.id);
        });
      }
    }
  }, [isOpen, messages, setUnreadCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen || !chatWindowRef.current) return;

      const target = event.target as Node;
      const element = target as Element;

      // Don't close if clicking on a navigation link
      if (element.closest('a[href]')) {
        return;
      }

      // Don't close if clicking inside the chat window
      if (chatWindowRef.current.contains(target)) return;

      // Close if clicking outside
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

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
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsSubmitting(true);

    try {
      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            text: msg.text,
            sender: msg.sender,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Uhhhhhh.... I think something went wrong.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="relative hover:scale-110 transition-transform duration-300 drop-shadow-lg cursor-pointer"
            aria-label="Open chat">
            <Image
              src="/chatBubble.png"
              alt="Chat bubble"
              width={90}
              height={90}
              className="drop-shadow-lg rounded-full border border-indigo-300/50 w-16 h-16 sm:w-16 sm:h-16"
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 shadow-lg ">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100%-2rem)] max-w-[320px] h-[500px] max-h-[calc(100vh-2rem)] sm:w-[380px] sm:h-[600px] sm:max-h-[calc(100vh-3rem)] bg-indigo-950/95 backdrop-blur-md border border-indigo-300/50 text-white shadow-[0_0_60px_rgba(129,140,248,0.4)] rounded-lg flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-indigo-300/30 flex items-center justify-between">
            <div className="flex items-center gap-2 justify-center">
              <Image
                src="/chatBubble.png"
                alt="Chat bubble"
                width={36}
                height={36}
                className="rounded-full border border-indigo-300/50 w-9 h-9 lg:w-12 lg:h-12"
              />
              <h3 className="text-base sm:text-lg font-bold">Nico(demus) Landaverde</h3>
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
            {isSubmitting && (
              <div className="flex justify-start">
                <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 bg-indigo-800/60 text-white rounded-bl-sm border border-indigo-400/30">
                  <TypingIndicator />
                </div>
              </div>
            )}
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
