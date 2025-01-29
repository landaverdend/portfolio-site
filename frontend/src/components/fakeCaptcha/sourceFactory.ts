import OJ from '@assets/images/captcha/bigGrid/OJ.png';
import waldo from '@assets/images/captcha/bigGrid/waldo.png';
import theDress from '@assets/images/captcha/bigGrid/thedress.jpg';
import colorblind from '@assets/images/captcha/bigGrid/colorblind.webp';
import waldo2 from '@assets/images/captcha/bigGrid/waldo2.png';
import waldo3 from '@assets/images/captcha/bigGrid/waldo3.png';
import tankman from '@assets/images/captcha/bigGrid/tankman.png';
import moonlanding from '@assets/images/captcha/bigGrid/moonlanding.png';
import { randomNumber } from '@/util/random';

export type LargeCaptchaChallenge = {
  imageSrc: string;
  title: string;
  solution: Set<number>; // solution is a set of the correct indices 0-15...
};

function getSet(set1: Array<number>, set2: Array<number>) {
  const sol = randomNumber(0, 1);

  return new Set<number>(sol === 0 ? set1 : set2);
}

const largeCaptchaArray: Array<LargeCaptchaChallenge> = [
  {
    imageSrc: OJ,
    title: 'Murderer',
    solution: getSet([1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15], []),
  },
  { imageSrc: waldo, title: 'Waldo', solution: new Set<number>([9, 13]) },
  {
    imageSrc: theDress,
    title: randomNumber(0, 1) === 0 ? 'Blue Dress' : 'Gold Dress',
    solution: getSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], []),
  },
  {
    imageSrc: colorblind,
    title: 'The number 73',
    solution: new Set([5, 6, 7, 9, 10, 11]),
  },
  { imageSrc: waldo2, title: 'Waldo', solution: new Set([0]) },
  { imageSrc: waldo3, title: 'Waldo', solution: new Set([9]) },
  {
    imageSrc: tankman,
    title: 'Things that totally happened',
    solution: getSet([], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
  },
  {
    imageSrc: moonlanding,
    title: 'Actual Historical Events',
    solution: getSet([], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
  },
];

export type SmallCaptchaChallenge = {
  imageTemplate: string;
  title: string;
};

export function grabRandomLargeChallenge() {
  // const ind = Math.floor(Math.random() * largeCaptchaArray.length);
  const ind = randomNumber(0, largeCaptchaArray.length);
  return largeCaptchaArray[ind];
  // return largeCaptchaArray[7];
}
