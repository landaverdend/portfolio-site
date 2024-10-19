import './fake-captcha.css';
import captchaIcon from '@assets/images/icons/captcha-icon.png';

function FakeCaptcha() {
  return (
    <div className="captcha-container">
      <div className="captcha-container__left">
        <span className="captcha-container__checkbox"></span>
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
