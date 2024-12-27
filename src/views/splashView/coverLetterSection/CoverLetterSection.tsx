import { useAppState } from '@/state/appState';
import './cover-letter-section.css';

export default function CoverLetterSection() {
  const { triggerLoadingSequence } = useAppState();

  return (
    <div className="cover-letter-container">
      <div className="panel-one">
        <div>
          <h2>Dear {'[[RECRUITER]]'}</h2>
          <p>
            <a
              onClick={() => {
                triggerLoadingSequence('CoverLetterGeneratorView');
              }}>
              click here
            </a>
          </p>
        </div>
      </div>
      <div className="panel-two">two</div>
    </div>
  );
}
