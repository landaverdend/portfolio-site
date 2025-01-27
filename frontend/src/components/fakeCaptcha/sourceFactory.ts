import OJ from '@assets/images/captcha/bigGrid/OJ.png';
import china from '@assets/images/captcha/bigGrid/china.png';
import waldo from '@assets/images/captcha/bigGrid/waldo.png';
import theDress from '@assets/images/captcha/bigGrid/thedress.jpg';
import colorblind from '@assets/images/captcha/bigGrid/colorblind.webp';
import waldo2 from '@assets/images/captcha/bigGrid/waldo2.png';
import waldo3 from '@assets/images/captcha/bigGrid/waldo3.png';

import { randomNumber } from '@/util/random';

export type LargeCaptchaChallenge = {
  imageSrc: string;
  title: string;
  solution: Set<number>; // solution is a set of the correct indices 0-15...
};

function coinFlip() {
  return Math.random() < 0.5 ? true : false;
}

const largeCaptchaArray: Array<LargeCaptchaChallenge> = [
  {
    imageSrc: OJ,
    title: 'Murderer',
    solution: new Set<number>(coinFlip() ? [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15] : []),
  },
  {
    imageSrc: china,
    title: 'China',
    solution: new Set<number>(coinFlip() ? [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [0, 1, 2, 4, 5, 6, 8, 9, 10, 11]),
  },
  { imageSrc: waldo, title: 'Waldo', solution: new Set<number>([9, 13]) },
  {
    imageSrc: theDress,
    title: randomNumber(0, 1) === 0 ? 'Blue Dress' : 'Gold Dress',
    solution: randomNumber(0, 1) === 0 ? new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) : new Set([]),
  },
  {
    imageSrc: colorblind,
    title: 'The number 73',
    solution: new Set([5, 6, 7, 9, 10, 11, 14]),
  },
  { imageSrc: waldo2, title: 'Waldo', solution: new Set([0]) },
  { imageSrc: waldo3, title: 'Waldo', solution: new Set([9]) },
];

export type SmallCaptchaChallenge = {
  imageTemplate: string;
  title: string;
};

export function grabRandomLargeChallenge() {
  // const ind = Math.floor(Math.random() * largeCaptchaArray.length);
  const ind = randomNumber(0, largeCaptchaArray.length);
  return largeCaptchaArray[ind];
  // return largeCaptchaArray[5];
}
