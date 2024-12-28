import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  children: string | string[];
  speed: number;
  delay?: number; // delay in ms
}
function TypewriterText({ children, speed, delay }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');

  // Normalize children into a single string
  const text = Array.isArray(children) ? children.join('') : children;

  useEffect(() => {
    let i = 0;
    let typingInterval: number;

    // Delay the start of the typing effect by user-inputted delay
    const delayTimeout = setTimeout(
      () => {
        typingInterval = setInterval(() => {
          if (i <= text.length) {
            setDisplayText(text.substring(0, i));
            i++;
          } else {
            clearInterval(typingInterval);
          }
        }, speed);
      },
      delay ? delay : 0
    );
    return () => {
      clearTimeout(delayTimeout);
      clearInterval(typingInterval);
    };
  }, [children, speed]);

  return <>{displayText}</>;
}

export default TypewriterText;
