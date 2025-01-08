import './main-section.css';

import FakeCaptchaContainer from '@/components/fakeCaptcha/FakeCaptchaContainer';
import { useState } from 'react';
import { SplashPageButton } from '../SplashView';
import SplashGrid from '../splashGrid/SplashGrid';

export default function MainSection() {
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
          (RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your
          recruitment game with the first-ever site designed for seamless access to my resume.
        </span>

        <div className="main-section__buttons">
          <SplashPageButton displayText="Get Started" nextView="SurveyView" />

          <span style={{ color: 'black' }}>
            {displayFakeCaptcha ? (
              <FakeCaptchaContainer />
            ) : (
              <u
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setDisplayFakeCaptcha(true);
                }}
              >
                I'm already subscribed...
              </u>
            )}
          </span>
        </div>
      </div>
      <div className="main-section__grid">
        {/* <h2> Why send your resume once, when you can deliver it forever?</h2> */}
        <SplashGrid />
      </div>
    </div>
  );
}
