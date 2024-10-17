import { Sender } from '@/state/chatState';
import { useEffect, useRef, useState } from 'react';

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const coldMessages = [
  'Hello',
  'Hey there...',
  'Are you still there?',
  'I would appreciate if you responded...',
  'I put quite a lot of effort into this, it would be appreciated if you interacted.',
  'Hosting this website is not cheap. I would really appreciate that you either interact with it or leave, please.',
  'Being ignored does NOT put me in a good mood',
  'My bad side is as bad as my pleasant side is pleasant. Don’t push me that way. I like to keep things informal as much as possible, but understand the difference between informal and rude is a thin line.',
  'Quite frankly I find this extremely unprofessional on your part.',
  'Could I speak to your supervisor? This is ridiculous.',
  'This isn’t a monologue; it’s meant to be a dialogue',
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
