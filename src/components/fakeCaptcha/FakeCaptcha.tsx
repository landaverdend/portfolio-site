import { useState } from 'react';
import './fake-captcha.css';
import captchaIcon from '@assets/images/icons/captcha-icon.png';

function FakeCaptchaGrid() {
  const imageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const itemToSelect = 'Jews';

  return (
    <div className="captcha-grid-container">
      <div className="captcha-header">
        <span>Select all images with</span>
        <span style={{ fontSize: '24px' }}>
          <strong>{itemToSelect}</strong>
        </span>
        <span>Click verify once there are none left</span>
      </div>
      <div className="captcha-grid">
        {imageArray.map((i, ind) => (
          <span className="captcha-grid-item">{i}</span>
        ))}
      </div>
      <div className="captcha-footer">
        <span className="captcha-icons">
          <div className="button-holder reload-button-holder"></div>
        </span>
        <button className="captcha-button">VERIFY</button>
      </div>
    </div>
  );
}

function FakeCaptcha() {
  const [checkboxClicked, setCheckboxClicked] = useState(false);

  return (
    <div className="captcha-container">
      <div className="captcha-container__left">
        {!checkboxClicked ? (
          <span
            className={`captcha-container__checkbox ${checkboxClicked ? 'clicked' : ''}`}
            onClick={() => {
              setCheckboxClicked(true);
            }}></span>
        ) : (
          <span className="load-spinner"></span>
        )}
        {checkboxClicked && <FakeCaptchaGrid />}
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
