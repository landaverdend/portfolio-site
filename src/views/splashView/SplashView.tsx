import CardStack from '@components/cardStack/CardStack';
import './splash-view.css';
import '@styles/fonts.css';
import BackgroundCanvas from '@components/backgroundCanvas/BackgroundCanvas.tsx';
import { createPortal } from 'react-dom';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import { useAppState } from '@/state/appState';
import { useState } from 'react';
import FakeCaptcha from '@/components/fakeCaptcha/FakeCaptcha';

function SplashView() {
  const { setIsLoading, setNextView } = useAppState();
  const [displayFakeCaptcha, setDisplayFakeCaptcha] = useState(false);

  return (
    <>
      <div className="splash-grid inter">
        <div className="splash-grid__item">
          <div className="splash-grid__text-container">
            <h1 className="gothic-a1-bold">My Resume as a Service</h1>
            <p className="inter">
              Join the growing number of recruiters who use my groundbreaking{' '}
              <b>
                <i>Resume as a Service</i>
              </b>{' '}
              (RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your
              recruitment game with the first-ever site designed for seamless access to my resume.
            </p>

            <div className="splash-grid__button-container">
              <span
                className="start__button"
                onClick={() => {
                  setNextView('SetupView');
                  setIsLoading(true);
                }}>
                Get started <i className="fa-solid fa-arrow-right"></i>
              </span>
              <span className="splash-grid__subscribed-button">
                {displayFakeCaptcha ? (
                  <FakeCaptcha />
                ) : (
                  <u
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      // setIsLoading(true);
                      // setNextView('ResumeView');
                      setDisplayFakeCaptcha(true);
                    }}>
                    I'm already subscribed...
                  </u>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="splash-grid__item">
          <CardStack />
        </div>
      </div>
      {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
      {createPortal(<BackgroundCanvas />, document.getElementById('root') as HTMLElement)}
    </>
  );
}

export default SplashView;
