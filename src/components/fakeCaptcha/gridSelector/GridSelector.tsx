import './grid-selector.css';
import { grabRandomLargeChallenge, LargeCaptchaChallenge } from '../sourceFactory';
import _ from 'lodash';
import { useMemo, useState } from 'react';
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

type BGProps = {
  imgSrc: string;
  selected: Set<number>;
  setSelected: React.Dispatch<React.SetStateAction<Set<number>>>;
};
function LargeGrid({ imgSrc, selected, setSelected }: BGProps) {
  const toRender = [];

  let topOffset = 0;
  for (let i = 0; i < 16; i++) {
    const leftOffset = (i % 4) * -100;

    toRender.push(
      <div key={i} className="captcha-grid-item">
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
          }}
        >
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
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};
function GridSelector({ isOpen, isCompleted, setIsCompleted }: GProps) {
  const [challenge, setChallenge] = useState<LargeCaptchaChallenge>(grabRandomLargeChallenge());
  const [selected, setSelected] = useState<Set<number>>(new Set<number>());

  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [showHelpText, setShowHelpText] = useState(false);

  const rickrollSound = useMemo(() => new Audio(rickroll), []);

  const checkSolution = () => {
    if (areSetsEqual(selected, challenge.solution)) {
      setIsCompleted(true);
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <div className={`captcha-grid-container ${isOpen && !isCompleted ? 'visible' : 'invisible'}`}>
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
      <span onClick={() => setIsIncorrect(false)}>
        <LargeGrid imgSrc={challenge.imageSrc} selected={selected} setSelected={setSelected} />
      </span>

      {isIncorrect && <div className="captcha-error">Please try again.</div>}

      <div className="captcha-footer">
        <span className="captcha-icons">
          <div
            className="button-holder reload-button-holder hoverable"
            onClick={() => {
              setChallenge(grabRandomLargeChallenge());
              setSelected(new Set<number>());
            }}
          ></div>
          <div className="button-holder audio-button-holder" onClick={() => rickrollSound.play()}></div>
          <div className="button-holder help-button-holder" onClick={() => setShowHelpText((prev) => !prev)}></div>
        </span>
        <button className="captcha-button" onClick={() => checkSolution()}>
          VERIFY
        </button>
      </div>
      {showHelpText && (
        <span className="captcha-help">
          Click on any tiles you see with the object described in the text. If new images appear with the same
          object, click those as well. When there are none left, click Verify.
        </span>
      )}
    </div>
  );
}

export default GridSelector;
