import { useEffect, useRef, useCallback } from 'react';
import { useChat, Message } from '@/contexts/chat-context';

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const coldMessages = [
  'Hey',
  'Im a developer in your area looking for work',
  'hey this is actually me it isnt a joke Im actually here right now texting you.',
  "It's rude to not respond you know....",
  'please respond to me',
  "I put a lot of effort into this site and you're just gonna ignore me?",
  'Alright seriously...',
  '?????',
  "hey it's rude to ignore people that are messaging you, yaknow....",
  'GIVE ME ATTENTION',
  'DUUUDE',
  'ARE YOU KIDDING ME',
  'HELP HELP HELP',
  'hi',
  'Good morning.....',
  'Do you think im funny?',
  'DO NOT IGNORE ME',
  'ignore me at your own peril',
  "this isn't gonna work if you dont talk to me....",
  "I'm a very needy person, please respond",
  'I love you.',
  'I need you....',
];

export function useInactivityHook() {
  const { messages, setMessages } = useChat();
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastUserMessageIdRef = useRef<string | null>(null);
  const shouldContinueRef = useRef(false);
  const hasStartedRef = useRef(false);
  const setMessagesRef = useRef(setMessages);

  // Keep ref updated
  useEffect(() => {
    setMessagesRef.current = setMessages;
  }, [setMessages]);

  const sendColdMessage = useCallback(() => {
    const coldMessage: Message = {
      id: Date.now().toString(),
      text: coldMessages[getRandomNumber(0, coldMessages.length - 1)],
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessagesRef.current((prev) => [...prev, coldMessage]);
  }, []);

  const scheduleNextColdMessage = useCallback(() => {
    if (!shouldContinueRef.current) return;

    // Clear any existing timer first
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    const delay = getRandomNumber(4, 10) * 1000;
    inactivityTimerRef.current = setTimeout(() => {
      if (!shouldContinueRef.current) return;

      // Check if user has sent a new message
      setMessagesRef.current((currentMessages) => {
        const currentLastUserMessage = [...currentMessages].reverse().find((msg) => msg.sender === 'user');
        const currentLastUserMessageId = currentLastUserMessage?.id ?? null;

        // If user hasn't sent a new message, send another cold message
        if (currentLastUserMessageId === lastUserMessageIdRef.current && shouldContinueRef.current) {
          const nextColdMessage: Message = {
            id: Date.now().toString(),
            text: coldMessages[getRandomNumber(0, coldMessages.length - 1)],
            sender: 'bot',
            timestamp: new Date(),
          };
          // Add the message
          const updatedMessages = [...currentMessages, nextColdMessage];
          // Schedule the next message (this will clear and set a new timeout)
          scheduleNextColdMessage();
          return updatedMessages;
        }
        // User sent a message, stop recurring
        shouldContinueRef.current = false;
        return currentMessages;
      });
    }, delay);
  }, []);

  // Start spamming immediately on mount
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      shouldContinueRef.current = true;

      // Start sending cold messages after initial delay
      inactivityTimerRef.current = setTimeout(() => {
        sendColdMessage();
        scheduleNextColdMessage();
      }, 20000);
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };
  }, [sendColdMessage, scheduleNextColdMessage]);

  // Reset timer when user sends a message
  useEffect(() => {
    const lastUserMessage = [...messages].reverse().find((msg) => msg.sender === 'user');
    const lastUserMessageId = lastUserMessage?.id ?? null;

    // If there's a new user message, reset the timer
    if (lastUserMessageId !== lastUserMessageIdRef.current) {
      lastUserMessageIdRef.current = lastUserMessageId;

      // Clear any existing timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }

      // Reset and start spamming again after inactivity period
      shouldContinueRef.current = false;
      inactivityTimerRef.current = setTimeout(() => {
        shouldContinueRef.current = true;
        sendColdMessage();
        scheduleNextColdMessage();
      }, 20000);
    }
  }, [messages, sendColdMessage, scheduleNextColdMessage]);
}
