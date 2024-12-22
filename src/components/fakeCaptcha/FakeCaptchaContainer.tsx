import './fake-captcha.css';
import '@styles/global-animations.css';

import { useEffect, useRef, useState } from 'react';
import captchaIcon from '@assets/images/icons/captcha-icon.png';
import GridSelector from './gridSelector/GridSelector';
import { useAppState } from '@/state/appState';

function FakeCaptchaContainer() {
  const { triggerLoadingSequence } = useAppState();

  const [captchaOpened, setCaptchaOpened] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of the box.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setCaptchaOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="captcha-container">
      {/* Left portion of the captcha-container */}
      <div className="captcha-container__left">
        {isCompleted && (
          <span
            onAnimationEnd={() => {
              triggerLoadingSequence('ResumeView');
            }}
            className="checkmark"></span>
        )}

        {captchaOpened && !isCompleted && <span className="load-spinner"></span>}

        {!captchaOpened && (
          <span
            className={`captcha-container__checkbox ${captchaOpened ? 'clicked' : ''}`}
            onClick={() => {
              setIsFirstClick(false);
              setCaptchaOpened(true);
            }}></span>
        )}

        {!isFirstClick && <GridSelector isOpen={captchaOpened} isCompleted={isCompleted} setIsCompleted={setIsCompleted} />}

        <span className="captcha-container__text">I'm not a robot</span>
      </div>

      {/* Right portion... */}
      <span className="captcha-container__about">
        <img src={captchaIcon} height={30} width={30}></img>
        <span style={{ fontSize: '0.85rem' }}>reCAPTCHA</span>
        <span className="links" style={{ fontSize: '0.75rem' }}>
          <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank">
            Privacy
          </a>{' '}
          -{' '}
          <a href="https://www.google.com/intl/en/policies/terms/" target="_blank">
            Terms
          </a>
        </span>
      </span>
    </div>
  );
}

export default FakeCaptchaContainer;
