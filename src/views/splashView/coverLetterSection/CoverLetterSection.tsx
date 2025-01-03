import './cover-letter-section.css';
import { SplashPageButton } from '../SplashView';
import time from '@assets/images/splash-page/time.png';
import coins from '@assets/images/splash-page/coins.png';
import feather from '@assets/images/splash-page/feather.png';

export default function CoverLetterSection() {
  return (
    <div className="cover-letter-container">
      
      <div className="panel-one">
        <h1>Tired of lazy applicants not writing you cover letters?</h1>
        <p>
          Using my <b>Cover Letter Generator™</b>, I will craft a painstakingly tailored cover letter… for YOU. That’s right, —I’m
          flipping the script. Simply provide me with your keywords, buzzwords, favorite business clichés, and preferred tone, and
          I’ll whip up a masterpiece that showcases why I'm the perfect fit for your rejection email.
        </p>
        <SplashPageButton displayText="Check it out!" nextView="CoverLetterGeneratorView" />
      </div>

      <div className="panel-two">
        <div className="metric">
          <span>
            <img src={time} height={120} width={120} />
          </span>
          <div className="metric-text">
            <h2>Save me time!</h2>
            <p>
              I am lazy and don't want to write <b>Cover Letters™</b>. Use the tool!
            </p>
          </div>
        </div>

        <div className="metric">
          <span>
            <img src={coins} height={120} width={120} />
          </span>
          <div className="metric-text">
            <h2>Spend my money!</h2>
            <p>
              Use my OpenAI tokens to generate <b>Cover Letters™</b>, please don't set the word count to 100000 on the request
              object please dont.
            </p>
          </div>
        </div>

        <div className="metric">
          <span>
            <img src={feather} height={120} width={120} />
          </span>
          <div className="metric-text">
            <h2>Take a load off my shoulders</h2>
            <p>I am lazy and don't want to write cover letters. Use the tool!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
