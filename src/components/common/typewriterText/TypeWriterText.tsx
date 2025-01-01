import React from 'react';
import { useEffect, useState } from 'react';

// Normalize children into their textual component...
function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }
  if (React.isValidElement(node)) {
    return extractText(node.props.children);
  }
  return '';
}

interface TypewriterTextProps {
  children: React.ReactNode;
  speed: number;
  delay?: number; // delay in ms
}
function TypewriterText({ children, speed, delay }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');

  const text = extractText(children);

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
