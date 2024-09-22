import '@styles/fonts.css';
import { useContext, useEffect, useState } from 'react';
import trivia from './trivia';
import './trivia-styles.css';
import { GlobalStateContext } from '@/App';

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
  const [triviaIndex, setTriviaIndex] = useState(0);

  useEffect(() => {
    const triviaChangeInterval = setInterval(() => {
      setTriviaIndex(Math.floor(Math.random() * trivia.length));
    }, 6000);

    return () => {
      clearInterval(triviaChangeInterval);
    };
  }, [triviaIndex]);

  return (
    <div className="trivia-container">
      <h2 className="gothic-a1-bold">Did you know?</h2>
      <p>
        <TypewriterText text={trivia[triviaIndex]} speed={35} />
      </p>
    </div>
  );
}

export default TriviaWidget;
