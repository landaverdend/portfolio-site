import SetupForm from '@/components/setupForm/SetupForm';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import './setup-view.css';

function SetupView() {
  const [isQuestionaireStarted, setIsQuestionaireStarted] = useState(false);

  return (
    <div className="setup-container">
      <div className={`setup-container__questionnaire su-fade-in`}>
        <div className={`setup-container__init ${isQuestionaireStarted ? 'su-fade-out' : ''}`}>
          <TypewriterText text={`Let's get you started...`} speed={45} />
          <button onClick={() => setIsQuestionaireStarted(true)}>Okay!</button>
        </div>
        {isQuestionaireStarted && <SetupForm />}
      </div>

      {createPortal(<BackgroundCanvas />, document.getElementById('root') as HTMLElement)}
    </div>
  );
}

export default SetupView;
