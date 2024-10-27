import { useEffect, useRef, useState } from 'react';
import captchaIcon from '@assets/images/icons/captcha-icon.png';
import './fake-captcha.css';
import '@styles/global-animations.css';
import SmallGrid from './smallGrid/SmallGrid';

function FakeCaptcha() {
  const [captchaOpened, setCaptchaOpened] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(true);

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
      <div className="captcha-container__left">
        {!captchaOpened ? (
          <span
            className={`captcha-container__checkbox ${captchaOpened ? 'clicked' : ''}`}
            onClick={() => {
              setIsFirstClick(false);
              setCaptchaOpened(true);
            }}></span>
        ) : (
          <span className="load-spinner"></span>
        )}
        {!isFirstClick && <SmallGrid isOpen={captchaOpened} />}

        <span className="captcha-container__text">I'm not a robot</span>
      </div>

      <span className="captcha-container__about">
        <img src={captchaIcon} height={30} width={30}></img>
        <span style={{ fontSize: '0.85rem' }}>reCAPTCHA</span>
        <span style={{ fontSize: '0.75rem' }}>Privacy - Terms</span>
      </span>
    </div>
  );
}

export default FakeCaptcha;
