import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas';
import './cover-letter-generator-view.css';
import ChipInput from '@/components/chipInput/ChipInput';
import { useState } from 'react';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';

export default function CoverLetterGeneratorView() {
  const [title, setTitle] = useState<string>('');

  return (
    <div className="generator-container">
      <form className="form-controls">
        <h2>Cover Letter Generator</h2>

        <label>
          Your Title/Name/Position:
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text"></input>
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
      <div className="letter-container">
        <div className="document">
          <h2>
            Dear <span style={{ color: 'red' }}>{`${title === '' ? 'YOUR_NAME_HERE' : title}`}</span>,
          </h2>
          <p>
            <TypewriterText speed={200}> Sneeds seed and feed..</TypewriterText>
          </p>
        </div>
      </div>
      <BackgroundCanvas position={'fixed'} flipped={true} />
    </div>
  );
}
