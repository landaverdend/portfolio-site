import OJ from '@assets/images/captcha/bigGrid/OJ.png';

export type LargeCaptchaChallenge = {
  imageSrc: string;
  title: string;
};

const largeCaptchaArray: Array<LargeCaptchaChallenge> = [{ imageSrc: OJ, title: 'Guilty Murderers' }];

export function grabRandomChallengeLarge() {
  const ind = Math.floor(Math.random() * largeCaptchaArray.length);

  return largeCaptchaArray[ind];
}
