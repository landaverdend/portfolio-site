import SetupForm from '@/components/setupForm/SetupForm';
import './setup-view.css';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';

function SetupView() {
  return (
    <div className="setup-container">
      <div>
        <TypewriterText text={`Let's get you started...`} speed={45} />
      </div>
      <SetupForm />
    </div>
  );
}

export default SetupView;
