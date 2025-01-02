import './cover-letter-section.css';
import { SplashPageButton } from '../SplashView';

export default function CoverLetterSection() {
  return (
    <div className="cover-letter-container">
      <div className="panel-one">
        <h1>Tired of lazy applicants not writing you cover letters?</h1>
        <p>
          Using my <b>Cover Letter Generator™</b>, I will craft a painstakingly tailored cover letter… for YOU. That’s right,
          recruiters—I’m flipping the script. Simply provide me with your keywords, buzzwords, favorite business clichés, and
          preferred tone, and I’ll whip up a masterpiece that showcases why you’re the perfect fit for writing my rejection email.
        </p>
        <SplashPageButton displayText="Check it out!" nextView="CoverLetterGeneratorView" />
      </div>
      <div className="panel-two"></div>
    </div>
  );
}
