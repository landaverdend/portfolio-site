import './grid-selector.css';
import { grabRandomSmallChallenge, grabRandomLargeChallenge, LargeCaptchaChallenge } from '../sourceFactory';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import rickroll from '@assets/sounds/rickroll.mp3';
import checkmark from '@assets/images/icons/checkmark.png';

function areSetsEqual(s1: Set<number>, solution: Set<number>): boolean {
  if (s1.size != solution.size) return false;

  for (let el of s1.values()) {
    if (!solution.has(el)) {
      return false;
    }
  }

  return true;
}

type SGProps = {};
function SmallGrid({}: SGProps) {
  const smallChallenge = grabRandomSmallChallenge();

  let imageSources = [];

  for (let i = 1; i <= 9; i++) {
    imageSources.push(smallChallenge.imageTemplate + i + '.png');
  }

  imageSources = _.shuffle(imageSources);

  return (
    <div className="captcha-grid-small">
      {imageSources.map((src) => (
        <img key={Math.random()} className="captcha-grid-item" src={src}></img>
      ))}
    </div>
  );
}

type BGProps = {
  imgSrc: string;
  selected: Set<number>;
  setSelected: React.Dispatch<React.SetStateAction<Set<number>>>;
};
function LargeGrid({ imgSrc, selected, setSelected }: BGProps) {
  // const [selected, setSelected] = useState<Set<number>>(new Set<number>());

  const toRender = [];

  let topOffset = 0;
  for (let i = 0; i < 16; i++) {
    const leftOffset = (i % 4) * -100;

    toRender.push(
      <div className="captcha-grid-item">
        {selected.has(i) && <img className="check-mark" src={checkmark} />}

        <div
          className={`captcha-grid-item__wrapper ${selected.has(i) ? 'scale-down' : 'scale-up'}`}
          onClick={() => {
            // React is really smart.
            if (selected.has(i)) {
              setSelected((prev) => {
                prev.delete(i);
                return new Set(prev);
              });
            } else {
              setSelected((prev) => {
                prev.add(i);
                return new Set(prev);
              });
            }
          }}>
          <img style={{ left: `${leftOffset}%`, top: `${topOffset * -100}%` }} src={imgSrc} />
        </div>
      </div>
    );

    if ((i + 1) % 4 === 0) topOffset++;
  }

  return <div className="captcha-grid-large">{toRender}</div>;
}

type GProps = {
  isOpen: boolean;
};
function GridSelector({ isOpen }: GProps) {
  // const challenge = grabRandomLargeChallenge();

  // const challenge = grabRandomSmallChallenge();
  const [challenge, setChallenge] = useState<LargeCaptchaChallenge>(grabRandomLargeChallenge());
  const [selected, setSelected] = useState<Set<number>>(new Set<number>());

  useEffect(() => {
    if (areSetsEqual(selected, challenge.solution)) {
      alert('you did it!');
    }
  }, [selected]);

  const rickrollSound = useMemo(() => new Audio(rickroll), []);

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

      {/* <SmallGrid /> */}
      <LargeGrid imgSrc={challenge.imageSrc} selected={selected} setSelected={setSelected} />

      <div className="captcha-footer">
        <span className="captcha-icons">
          <div className="button-holder reload-button-holder hoverable"></div>
          <div className="button-holder audio-button-holder" onClick={() => rickrollSound.play()}></div>
          <div className="button-holder help-button-holder"></div>
        </span>
        <button className="captcha-button">VERIFY</button>
      </div>
    </div>
  );
}

export default GridSelector;
