import SetupForm from '@/components/setupForm/SetupForm';
import './setup-view.css';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';

function SetupView() {
  return (
    <div className="setup-container">
      <div className="setup-container__init">
        <TypewriterText text={`Let's get you started...`} speed={45} />
        <button>Okay!</button>
      </div>
      <SetupForm />
    </div>
  );
}

export default SetupView;
