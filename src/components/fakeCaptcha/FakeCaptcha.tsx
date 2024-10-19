import './fake-captcha.css';

function FakeCaptcha() {
  return (
    <div className="captcha-container">
      <span className="captcha-container__checkbox">checkbox</span>
      <span className="captcha-container__text">I'm not a robot</span>
      <span className="captcha-container__about">stuff</span>
    </div>
  );
}

export default FakeCaptcha;
