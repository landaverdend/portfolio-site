import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import Footer from '@/components/footer/Footer';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import SetupForm from './SetupForm/SetupForm';
import './survey-view.css';

const dumbSlogans: string[] = [
  'Unlocking your path to unparalleled hiring success.',
  'Empowering your recruitment journey with top-tier talent.',
  'Transforming your hiring process, one resume at a time.',
  'Redefining the future of developer recruitment.',
  'Streamlining your talent search with seamless access.',
  'Fueling your hiring success with instant access to greatness.',
  'Revolutionizing the way you discover developer talent.',
  'Accelerating your hiring strategy with exclusive access.',
  'Driving your recruitment success at the speed of innovation.',
  'Shaping the future of talent acquisition, today.',
  "Connecting you to the developer you've been searching for.",
  'Elevating your hiring process to the next level.',
  'Empowering your recruitment with unmatched access to expertise.',
];

function SurveyView() {
  const [dumbSlogan, setDumbSlogan] = useState(dumbSlogans[0]);

  useEffect(() => {
    const pickDumbSlogan = setInterval(() => {
      const ind = Math.floor(Math.random() * dumbSlogans.length);

      setDumbSlogan(dumbSlogans[ind]);
    }, 10000);

    return () => {
      clearInterval(pickDumbSlogan);
    };
  }, []);

  return (
    <>
      <div className="setup-container">
        <div className="init-block su-fade-in">
          <div className="init-block__info">
            <h1>
              <TypewriterText text={dumbSlogan} speed={30} delay={0} />
            </h1>
            <p>
              Introducing the revolutionary Resume As A Service <b>(RaaS)</b>—a streamlined, subscription-based way for recruiters
              to view my developer resume on demand. Think of it as your personal shortcut to discovering my experience, skills,
              and project work, minus the hassle. Perfect for recruiters who need quick access, and for teams with long-term
              hiring needs, we’re here to help you get exactly what you’re looking for. Just let us know what you’re aiming for,
              and we’ll make sure you’re all set.
            </p>
          </div>

          <SetupForm />
        </div>

        {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
        {createPortal(
          <>
            <BackgroundCanvas flipped={true} />
          </>,
          document.getElementById('root') as HTMLElement
        )}
      </div>
      <Footer />
    </>
  );
}

export default SurveyView;
