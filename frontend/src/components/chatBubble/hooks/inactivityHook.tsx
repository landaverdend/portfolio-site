import { Sender } from '@/state/chatState';
import { useEffect, useRef, useState } from 'react';

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
  "GIVE ME ATTENTION",
  'DUUUDE',
  "ARE YOU KIDDING ME",
  "HELP HELP HELP",
  "hi",
  "Good morning.....",
  "Do you think im funny?",
  "DO NOT IGNORE ME",
  "ignore me at your own peril",
  "this isn't gonna work if you dont talk to me....",
  "I'm a very needy person, please respond",
  "I love you.",
  "I need you...."
];

function useInactivityHook(
  addChat: (content: string, sender: Sender) => void,
  element: React.MutableRefObject<HTMLDivElement | null>
) {
  // Force the user to interact at first.
  const [isInactive, setIsInactive] = useState(true);

  // The timeout chain that begins after a certain period of inactivity from the user.
  const inactivePingTimer = useRef<number>(-1);

  const inactivePingTimeout = () => {
    // have a delay of between 4-10 seconds to start with.
    const delay = getRandomNumber(4, 10) * 1000;

    inactivePingTimer.current = setTimeout(() => {
      addChat(coldMessages[getRandomNumber(0, coldMessages.length - 1)], 'server'); // callback provided...
      inactivePingTimeout();
    }, delay);
  };

  const inactivityTimer = useRef<number>(-1);

  useEffect(() => {
    if (isInactive) {
      inactivePingTimeout();
      clearTimeout(inactivityTimer.current);
    } else {
      // user is active. clear the inactivePingTimer out
      inactivityTimer.current = setTimeout(() => {
        // Set a clock from the last active period. After the specified duration, user is 'inactive' from the chat window..
        setIsInactive(true);
      }, 20000);
    }

    return () => {
      clearTimeout(inactivePingTimer.current);
      clearTimeout(inactivityTimer.current);
    };
  }, [isInactive]);

  // EVENT LISTENERS FOR SUBCOMPONENTS!!
  useEffect(() => {
    if (!element.current) return;

    const events = ['click', 'keydown', 'focusin']; // Listen for focus on any child

    const resetOnInteraction = () => {
      setIsInactive(false); // Reset inactivity timer on any user interaction
      clearTimeout(inactivePingTimer.current);
      clearTimeout(inactivityTimer.current);
    };

    // Attach event listeners to `parentRef`
    events.forEach((event) => element.current!.addEventListener(event, resetOnInteraction));

    // Cleanup event listeners on unmount
    return () => {
      events.forEach((event) => element.current?.removeEventListener(event, resetOnInteraction));
    };
  }, []);

  return { isInactive, setIsInactive };
}

export default useInactivityHook;
