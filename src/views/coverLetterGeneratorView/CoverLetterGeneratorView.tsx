import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas';
import './cover-letter-generator-view.css';
import ChipInput from '@/components/chipInput/ChipInput';

export default function CoverLetterGeneratorView() {
  return (
    <div className="generator-container">
      <form className="form-controls">
        <h2>Cover Letter Generator</h2>

        <label>
          Your Title/Name/Position:
          <input type="text"></input>
        </label>
        <label>
          Your Company/Business
          <input type="text"></input>
        </label>

        <ChipInput label={'List some personality traits you want highlighted: '} />
        <ChipInput label={'Bloated frameworks to mention:'} />
        <ChipInput label={'Name some cloud™ technologies you want mentioned: '} />

        <label>
          General Tone:
          <select>
            <option>Formal</option>
            <option>Casual</option>
            <option>Zoomer</option>
            <option>Violent</option>
          </select>
        </label>

        <button>GENERATE</button>
      </form>
      <div className="letter-container">RIGHT SIDE...</div>
      <BackgroundCanvas position={'fixed'} flipped={true} />
    </div>
  );
}
