import './main-section.css';

import FakeCaptchaContainer from '@/components/fakeCaptcha/FakeCaptchaContainer';
import { useState } from 'react';
import SplashGrid from '../splashGrid/SplashGrid';
import LargeButton from '@/components/common/typewriterText/LargeButton/LargeButton';
import { useAppState } from '@/state/appState';

export default function MainSection() {
  const { triggerLoadingSequence } = useAppState();

  const [displayFakeCaptcha, setDisplayFakeCaptcha] = useState(false);

  return (
    <div className="main-section">
      <div className="main-section__text">
        <span id="header-text">Polished Resume, Proven Results</span>
        <span className="about-paragraph">
          Join the growing number of recruiters who use my groundbreaking{' '}
          <b>
            <i>Resume as a Service</i>
          </b>
          (RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your recruitment
          game with the first-ever site designed for seamless access to my resume.
        </span>

        <div className="main-section__buttons">
          <LargeButton
            onClick={() => {
              triggerLoadingSequence('SurveyView');
            }}>
            Get Started
          </LargeButton>
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
      <div className="main-section__grid">
        <SplashGrid />
      </div>
    </div>
  );
}
