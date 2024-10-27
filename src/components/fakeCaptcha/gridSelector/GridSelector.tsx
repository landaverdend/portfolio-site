import './grid-selector.css';
import { grabRandomChallengeLarge } from '../sourceFactory';

type SGProps = {
  imgArr: string[];
};
function SmallGrid({ imgArr }: SGProps) {
  return (
    <div className="captcha-grid-small">
      {imgArr.map((i) => (
        <img key={Math.random()} className="captcha-grid-item" src={i}></img>
      ))}
    </div>
  );
}

type BGProps = {
  imgSrc: string;
};
function LargeGrid({ imgSrc }: BGProps) {
  const toRender = [];

  let topOffset = 0;
  for (let i = 0; i < 16; i++) {
    const leftOffset = (i % 4) * -100; // negative one hunnid because reasons...

    toRender.push(
      <span className="captcha-grid-item">
        <img style={{ left: `${leftOffset}%`, top: `${topOffset * -100}%` }} src={imgSrc}></img>
      </span>
    );

    if ((i + 1) % 4 === 0) topOffset++;
  }

  return <div className="captcha-grid-large">{toRender}</div>;
}

type GProps = {
  isOpen: boolean;
};
function GridSelector({ isOpen }: GProps) {
  const challenge = grabRandomChallengeLarge();

  return (
    <div className={`captcha-grid-container ${isOpen ? 'visible' : 'invisible'}`}>
      <div style={{ padding: '8px' }}>
        <div className="captcha-header">
          <span>Select all images with</span>
          <span style={{ fontSize: '24px' }}>
            <strong>{challenge.title}</strong>
          </span>
          <span>Click verify once there are none left</span>
        </div>
      </div>

      {/* <SmallGrid imgArr={imageArray} /> */}
      <LargeGrid imgSrc={challenge.imageSrc} />

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

export default GridSelector;
