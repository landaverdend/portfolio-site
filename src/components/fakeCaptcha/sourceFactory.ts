import OJ from '@assets/images/captcha/bigGrid/OJ.png';
import china from '@assets/images/captcha/bigGrid/china.png';
import argentina from '@assets/images/captcha/bigGrid/argentina.png';
import waldo from '@assets/images/captcha/bigGrid/waldo.png';

export type LargeCaptchaChallenge = {
  imageSrc: string;
  title: string;
  solution: Set<number>; // solution is a set of the correct indices 0-15...
};

function coinFlip() {
  return Math.random() < 0.5 ? true : false;
}

const largeCaptchaArray: Array<LargeCaptchaChallenge> = [
  { imageSrc: OJ, title: 'Murderer', solution: new Set<number>([1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15]) },
  {
    imageSrc: china,
    title: 'China',
    solution: new Set<number>(coinFlip() ? [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [0, 1, 2, 4, 5, 6, 8, 9, 10, 11]),
  },
  {
    imageSrc: argentina,
    title: 'Argentina',
    solution: new Set<number>(coinFlip() ? [0, 1, 2, 4, 5, 8, 9, 12, 13] : [0, 1, 2, 4, 5, 8, 9, 12, 13, 14, 15]),
  },
  { imageSrc: waldo, title: 'Waldo', solution: new Set<number>([9, 13]) },
];

export type SmallCaptchaChallenge = {
  imageTemplate: string;
  title: string;
};

const smallCaptchaArray: Array<SmallCaptchaChallenge> = [
  { imageTemplate: 'src/assets/images/captcha/black/b', title: 'African Americans' },
];

export function grabRandomSmallChallenge() {
  const ind = Math.floor(Math.random() * smallCaptchaArray.length);

  return smallCaptchaArray[ind];
}

export function grabRandomLargeChallenge() {
  const ind = Math.floor(Math.random() * largeCaptchaArray.length);

  return largeCaptchaArray[ind];
  // return largeCaptchaArray[0];
}
