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

  const fullText = extractText(children);

  useEffect(() => {
    let i = 0;
    let typingInterval: number;

    // Delay the start of the typing effect by user-inputted delay
    const delayTimeout = setTimeout(
      () => {
        typingInterval = setInterval(() => {
          if (i <= fullText.length) {
            setDisplayText(fullText.substring(0, i));
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

  // Helper function to progressively render the text
  const renderText = (node: React.ReactNode, currentIndex: { count: number }): React.ReactNode => {
    if (typeof node === 'string') {
      const remainingText = node.substring(currentIndex.count);
      const displayableText = node.substring(0, currentIndex.count);
      currentIndex.count -= displayableText.length;
      return displayableText + (currentIndex.count > 0 ? remainingText : '');
    }

    if (Array.isArray(node)) {
      return node.map((child, index) => <React.Fragment key={index}>{renderText(child, currentIndex)}</React.Fragment>);
    }

    if (React.isValidElement(node)) {
      return React.cloneElement(node, {}, renderText(node.props.children, currentIndex));
    }

    return null;
  };

  const currentIndex = { count: displayText.length };

  return <>{renderText(children, currentIndex)}</>;
}

export default TypewriterText;
