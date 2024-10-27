import OJ from '@assets/images/captcha/bigGrid/OJ.png';
import china from '@assets/images/captcha/bigGrid/china.png';
import argentina from '@assets/images/captcha/bigGrid/argentina.png';
import waldo from '@assets/images/captcha/bigGrid/waldo.png';

export type LargeCaptchaChallenge = {
  imageSrc: string;
  title: string;
};

const largeCaptchaArray: Array<LargeCaptchaChallenge> = [
  { imageSrc: OJ, title: 'Guilty Murderers' },
  { imageSrc: china, title: 'Chinese Sovereign Territory' },
  { imageSrc: argentina, title: 'Argentinian Territorial Domain' },
  { imageSrc: waldo, title: 'Waldo' },
];

export function grabRandomChallengeLarge() {
  const ind = Math.floor(Math.random() * largeCaptchaArray.length);

  return largeCaptchaArray[ind];
  // return largeCaptchaArray[3];
}
