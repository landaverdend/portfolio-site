import './cover-letter-section.css';
import time from '@assets/images/splash-page/time.png';
import weight from '@assets/images/splash-page/weight.png';
import wallet from '@assets/images/splash-page/wallet.png';
import meTyping from '@assets/images/splash-page/meTyping.png';
import LargeButton from '@/components/common/typewriterText/LargeButton/LargeButton';
import { useAppState } from '@/state/appState';

export default function CoverLetterSection() {
  const { triggerLoadingSequence } = useAppState();

  return (
    <div className="panel-container">
      <div className="panel-one">
        <h1>Tired of lazy applicants not writing you cover letters?</h1>
        <p>
          Using my <b>Cover Letter Generator™</b>, I will craft a painstakingly tailored cover letter… for YOU. That’s right, —I’m
          flipping the script. Simply provide me with your keywords, buzzwords, favorite business clichés, and preferred tone, and
          I’ll whip up a masterpiece that showcases why I'm the perfect fit for your rejection email.
        </p>
        <LargeButton
          onClick={() => {
            triggerLoadingSequence('CoverLetterGeneratorView');
          }}>
          Check it out!
        </LargeButton>
        <img src={meTyping} height={450} width={450} />
      </div>

      <div className="panel-two">
        <div className="metric">
          <img src={time} />
          <div className="metric-text">
            <h2>Save me time!</h2>
            <p>
              I am lazy and don't want to write <b>Cover Letters™</b>. Use the tool!
            </p>
          </div>
        </div>

        <div className="metric">
          <img src={wallet} />
          <div className="metric-text">
            <h2>Spend my money!</h2>
            <p>
              Use my OpenAI tokens to generate <b>Cover Letters™</b>, please don't set the word count to 100000 on the request
              object, please dont do that.
            </p>
          </div>
        </div>

        <div className="metric">
          <img src={weight} />
          <div className="metric-text">
            <h2>Take a load off my shoulders</h2>
            <p>I'm out of things to write so this is just here to fill in space.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
