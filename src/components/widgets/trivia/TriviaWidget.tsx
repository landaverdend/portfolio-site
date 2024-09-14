import '@styles/fonts.css';
import { useEffect, useState } from 'react';

const trivia = [''];

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

function TriviaWidget() {
  return (
    <span>
      <h2 className="gothic-a1-bold">
        <TypewriterText text="Did you know?" speed={100} />
      </h2>

      <p></p>
    </span>
  );
}

export default TriviaWidget;
