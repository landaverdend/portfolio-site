import b1 from '@assets/images/captcha/black/b1.png';
import b2 from '@assets/images/captcha/black/b2.png';
import b3 from '@assets/images/captcha/black/b3.png';
import b4 from '@assets/images/captcha/black/b4.png';
import b5 from '@assets/images/captcha/black/b5.png';
import b6 from '@assets/images/captcha/black/b6.png';
import b7 from '@assets/images/captcha/black/b7.png';
import b8 from '@assets/images/captcha/black/b8.png';
import b9 from '@assets/images/captcha/black/b9.png';

import './grid-selector.css';

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
  img: string;
};
function LargeGrid({ img }: BGProps) {
  const toRender = [];

  for (let i = 0; i < 16; i++) {
    toRender.push(<span className="captcha-grid-item">{i}</span>);
  }

  return <div className="captcha-grid-large">{toRender}</div>;
}

type GProps = {
  isOpen: boolean;
};
function GridSelector({ isOpen }: GProps) {
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

      {/* <SmallGrid imgArr={imageArray} /> */}
      <LargeGrid img={''} />

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
