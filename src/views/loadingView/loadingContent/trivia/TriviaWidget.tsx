import '@styles/fonts.css';
import { useEffect, useState } from 'react';
import trivia from './trivia';
import './trivia-styles.css';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';

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
      <h2>Did you know?</h2>
      <p>
        <TypewriterText speed={35}> {trivia[triviaIndex]} </TypewriterText>
      </p>
    </div>
  );
}

export default TriviaWidget;
