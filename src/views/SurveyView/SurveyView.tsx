import SetupForm from '@/components/setupForm/SetupForm';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import Footer from '@/components/footer/Footer';
import './survey-view.css';
import ChatBubble from '@/components/chatBubble/ChatBubble';

function SurveyView() {
  const [isQuestionaireStarted, setIsQuestionaireStarted] = useState(false);

  return (
    <>
      <div className="setup-container">
        <div className={`init-block ${isQuestionaireStarted ? 'su-fade-out' : ''}`}>
          <div className="init-block__info">
            <h1>
              <TypewriterText text={`Empowering your access`} speed={45} delay={0} />
            </h1>
            <p>
              Introducing the revolutionary Resume As A Service <b>(RaaS)</b>—a streamlined, subscription-based way for recruiters
              to view my developer resume on demand. Think of it as your personal shortcut to discovering my experience, skills,
              and project work, minus the hassle. Perfect for recruiters who need quick access, and for teams with long-term
              hiring needs, we’re here to help you get exactly what you’re looking for. Just let us know what you’re aiming for,
              and we’ll make sure you’re all set.
            </p>
          </div>

          <div className="email-form">
            <form>
              {' '}
              <button onClick={() => setIsQuestionaireStarted(true)}>Okay!</button>
            </form>
          </div>
        </div>

        {isQuestionaireStarted && <SetupForm />}
        
        {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
        {createPortal(<BackgroundCanvas flipped={true} />, document.getElementById('root') as HTMLElement)}
      </div>
      <Footer />
    </>
  );
}

export default SurveyView;
