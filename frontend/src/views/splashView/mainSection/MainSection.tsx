import './main-section.css';

import FakeCaptchaContainer from '@/components/fakeCaptcha/FakeCaptchaContainer';
import { useState } from 'react';
import SplashGrid from '../splashGrid/SplashGrid';
import LargeButton from '@/components/common/typewriterText/LargeButton/LargeButton';
import { useAppState } from '@/state/appState';

export default function MainSection() {
  const { setIsModalOpen } = useAppState();

  const [displayFakeCaptcha, setDisplayFakeCaptcha] = useState(false);

  return (
    <div className="main-section">
      <div className="main-section__text">
        <span id="header-text">
          Polished <br />
          Resume,
          <br /> Proven <br /> Results
        </span>

        <div className="main-section__buttons">
          <LargeButton
            fontSize="2rem"
            onClick={() => {
              setIsModalOpen(true);
            }}>
            See Projects
          </LargeButton>
          <span>
            {displayFakeCaptcha ? (
              <FakeCaptchaContainer />
            ) : (
              <u
                className="portfolio-skip"
                onClick={() => {
                  setDisplayFakeCaptcha(true);
                }}>
                Skip to the portfolio...
              </u>
            )}
          </span>
        </div>
        <span className="about-paragraph">
          Join the growing number of recruiters who use the groundbreaking{' '}
          <b>
            <i>Resume as a Service</i>
          </b>
          {'  '}(RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your
          recruitment game with the first-ever site designed for seamless access to my resume.
        </span>
      </div>
      <div className="main-section__grid">
        <SplashGrid />
      </div>
    </div>
  );
}
