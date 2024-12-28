import './cover-letter-generator-view.css';
import ChipInput from '@/components/chipInput/ChipInput';

export default function CoverLetterGeneratorView() {
  return (
    <div className="generator-container">
      <form className="form-controls">
        <label>
          Your Title/Name:
          <input type="text"></input>
        </label>
        <label>
          Your Company/Business
          <input type="text"></input>
        </label>

        <ChipInput label={'Put some bloated tech frameworks here, please:'} />
      </form>
      <div className="letter-container">RIGHT SIDE...</div>
    </div>
  );
}
