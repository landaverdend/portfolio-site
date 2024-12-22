
import './main-section.css';

import CardStack from '@/components/cardStack/CardStack';
import FakeCaptchaContainer from '@/components/fakeCaptcha/FakeCaptchaContainer';
import { useAppState } from '@/state/appState';
import { useState } from 'react';

export default function MainSection() {
  const { setIsLoading, setNextView } = useAppState();
  const [displayFakeCaptcha, setDisplayFakeCaptcha] = useState(false);

  return (
    <div className="main-section">
      <div className="main-section__text">
        <span id="header-text">My Resume as a Service</span>
        <span className="about-paragraph">
          Join the growing number of recruiters who use my groundbreaking{' '}
          <b>
            <i>Resume as a Service</i>
          </b>{' '}
          (RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your recruitment
          game with the first-ever site designed for seamless access to my resume.
        </span>

        <div className="main-section__buttons">
          <span
            className="start__button"
            onClick={() => {
              setNextView('SurveyView');
              setIsLoading(true);
            }}>
            Get started <i className="fa-solid fa-arrow-right"></i>
          </span>

          <span style={{ color: 'black' }}>
            {displayFakeCaptcha ? (
              <FakeCaptchaContainer />
            ) : (
              <u
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setDisplayFakeCaptcha(true);
                }}>
                I'm already subscribed...
              </u>
            )}
          </span>
        </div>
      </div>
      <div className="main-section__cards">
        <CardStack />
      </div>
    </div>
  );
}
