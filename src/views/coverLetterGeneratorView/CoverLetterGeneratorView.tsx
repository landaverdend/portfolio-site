import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas';
import './cover-letter-generator-view.css';
import ChipInput from '@/components/chipInput/ChipInput';
import { useState } from 'react';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { callCoverLetterEndpoint } from '@/api/backend';

export default function CoverLetterGeneratorView() {
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [tone, setTone] = useState<string>('');

  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  const [cloudTechnologies, setCloudTechnologies] = useState<string[]>([]);

  function handleClick() {
    try {
      callCoverLetterEndpoint({
        name: title,
        company: company,
        tone: tone,
        frameworks: frameworks,
        personalityTraits: personalityTraits,
        cloudTechnologoies: cloudTechnologies,
      });
    } catch (e) {}
  }

  return (
    <div className="generator-container">
      <div className="form-controls">
        <h2>Cover Letter Generator</h2>

        <label>
          Your Title/Name/Position:
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text"></input>
        </label>
        <label>
          Your Company/Business
          <input value={company} onChange={(e) => setCompany(e.target.value)} type="text"></input>
        </label>

        <ChipInput label={'List some personality traits you want highlighted: '} chips={frameworks} setChips={setFrameworks} />
        <ChipInput label={'Bloated frameworks to mention:'} chips={personalityTraits} setChips={setPersonalityTraits} />
        <ChipInput
          label={'Name some cloud™ technologies you want mentioned: '}
          chips={cloudTechnologies}
          setChips={setCloudTechnologies}
        />

        <label>
          General Tone:
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option>Formal</option>
            <option>Casual</option>
            <option>Zoomer</option>
            <option>Violent</option>
          </select>
        </label>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}>
          GENERATE
        </button>
      </div>
      <div className="letter-container">
        <div className="document">
          <h2>
            Dear <span style={{ color: 'red' }}>{`${title === '' ? 'YOUR_NAME_HERE' : title}`}</span>,
          </h2>
          <p>
            <TypewriterText speed={40}>
              It is with a humility so profound it borders on desperation that I submit my application for the [Position Title]
              role at [Company Name]. The chance to merely dream of joining your illustrious organization is an honor I will
              recount to my grandchildren, should I ever attain the life stability required to have them. From the moment I saw
              your job posting—crafted with the kind of perfection I can only hope to absorb through osmosis—I knew this position
              was meant for me. My entire existence has been a meandering prelude to this opportunity. Who needs a “calling” when
              one can have job descriptions? Let me be clear: my qualifications, while technically aligned with your requirements,
              are utterly insignificant compared to the boundless contributions I will bring to your team. I possess a unique
              ability to contort myself into any mold required, much like a gelatin dessert. My skills in [relevant skill],
              [another skill], and [yet another skill] are merely tools in service of my true talent: tirelessly seeking your
              approval.
            </TypewriterText>
          </p>
        </div>
      </div>
      <BackgroundCanvas position={'fixed'} flipped={true} />
    </div>
  );
}
