import { useEffect, useRef, useState } from 'react';
import captchaIcon from '@assets/images/icons/captcha-icon.png';
import './fake-captcha.css';
import '@styles/global-animations.css';
import b1 from '@assets/images/captcha/black/b1.png';
import b2 from '@assets/images/captcha/black/b2.png';
import b3 from '@assets/images/captcha/black/b3.png';
import b4 from '@assets/images/captcha/black/b4.png';
import b5 from '@assets/images/captcha/black/b5.png';
import b6 from '@assets/images/captcha/black/b6.png';
import b7 from '@assets/images/captcha/black/b7.png';
import b8 from '@assets/images/captcha/black/b8.png';
import b9 from '@assets/images/captcha/black/b9.png';

type FCGProps = {
  isOpen: boolean;
};
function FakeCaptchaGrid({ isOpen }: FCGProps) {
  const imageArray = [b1, b2, b3, b4, b5, b6, b7, b8, b9];
  const itemToSelect = 'Black People';

  return (
    <div className={`captcha-grid-container ${isOpen ? 'visible' : 'invisible'}`}>
      <div style={{ padding: '8px' }}>
        <div className="captcha-header">
          <span>Select all images with</span>
          <span style={{ fontSize: '24px' }}>
            <strong>{itemToSelect}</strong>
          </span>
          <span>Click verify once there are none left</span>
        </div>
      </div>

      <div className="captcha-grid">
        {imageArray.map((i) => (
          <img key={Math.random()} className="captcha-grid-item" src={i}></img>
        ))}
      </div>

      <div className="captcha-footer">
        <span className="captcha-icons">
          <div className="button-holder reload-button-holder hoverable"></div>
          <div className="button-holder audio-button-holder"></div>
          <div className="button-holder help-button-holder"></div>
        </span>
        <button className="captcha-button">VERIFY</button>
      </div>
    </div>
  );
}

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
        {!isFirstClick && <FakeCaptchaGrid isOpen={captchaOpened} />}

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
