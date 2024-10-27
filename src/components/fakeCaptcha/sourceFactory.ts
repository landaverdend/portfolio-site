import OJ from '@assets/images/captcha/bigGrid/OJ.png';
import china from '@assets/images/captcha/bigGrid/china.png';
import argentina from '@assets/images/captcha/bigGrid/argentina.png';
import waldo from '@assets/images/captcha/bigGrid/waldo.png';

export type LargeCaptchaChallenge = {
  imageSrc: string;
  title: string;
};

const largeCaptchaArray: Array<LargeCaptchaChallenge> = [
  { imageSrc: OJ, title: 'Murderer' },
  { imageSrc: china, title: 'Chinese Sovereign Territory' },
  { imageSrc: argentina, title: 'Argentinian Territorial Domain' },
  { imageSrc: waldo, title: 'Waldo' },
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

  // return largeCaptchaArray[ind];
  return largeCaptchaArray[0];
}
