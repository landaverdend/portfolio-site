import React from 'react';
import { useEffect, useState } from 'react';

function convertChildren(children: React.ReactNode) {
  let toRet = '';
  const arr = React.Children.toArray(children);

  arr.map((str) => console.log(str));

  return toRet;
}

interface TypewriterProps {
  children: React.ReactNode;
  speed?: number; // milliseconds per character
}
const TypewriterText: React.FC<TypewriterProps> = ({ children, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = React.Children.toArray(children).join('');
  const asdf = convertChildren(children);
  // console.log(fullText)

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed]);

  return <div>{displayedText}</div>;
};

export default TypewriterText;
