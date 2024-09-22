import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed: number;
}
function TypewriterText(props: TypewriterTextProps) {
  const { text, speed } = props;
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;

    const typingInterval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return <>{displayText}</>;
}

export default TypewriterText;
