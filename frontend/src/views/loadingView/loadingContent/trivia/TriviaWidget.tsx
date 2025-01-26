import '@styles/fonts.css';
import { useEffect, useState } from 'react';
import trivia from './trivia';
import './trivia-styles.css';
import { randomNumber } from '@/util/random';
import Typewriter from 'typewriter-effect';

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
      <Typewriter
        key={triviaIndex}
        onInit={(typewriter) => {
          typewriter.typeString(trivia[triviaIndex]).start();
        }}
        options={{
          delay: 40,
          deleteSpeed: 20,
          cursor: '|',
        }}
      />
      <span style={{ color: 'var(--panel-blue)' }}>{trivia[triviaIndex]}</span>
    </div>
  );
}

export default TriviaWidget;
