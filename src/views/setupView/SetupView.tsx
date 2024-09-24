import SetupForm from '@/components/setupForm/SetupForm';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useState } from 'react';
import './setup-view.css';

function SetupView() {
  const [isQuestionaireStarted, setIsQuestionaireStarted] = useState(false);
  console.log(isQuestionaireStarted);

  return (
    <div className="setup-container">
      <div className={`setup-container__init ${isQuestionaireStarted ? 'fade-out' : ''}`}>
        <TypewriterText text={`Let's get you started...`} speed={45} />
        <button onClick={() => setIsQuestionaireStarted(true)}>Okay!</button>
      </div>
      {isQuestionaireStarted && <SetupForm />}
    </div>
  );
}

export default SetupView;
