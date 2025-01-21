import '@styles/fonts.css';
import { useEffect, useState } from 'react';
import trivia from './trivia';
import './trivia-styles.css';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { randomNumber } from '@/util/random';

function TriviaWidget() {
  const [triviaIndex, setTriviaIndex] = useState(randomNumber(0, trivia.length));

  useEffect(() => {
    const triviaChangeInterval = setInterval(() => {
      setTriviaIndex(randomNumber(0, trivia.length));
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
      <span style={{ color: 'var(--panel-blue)' }}>{trivia[triviaIndex]}</span>
    </div>
  );
}

export default TriviaWidget;
