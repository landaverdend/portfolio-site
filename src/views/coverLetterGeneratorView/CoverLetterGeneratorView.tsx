import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas';
import './cover-letter-generator-view.css';
import ChipInput from '@/components/chipInput/ChipInput';
import { useState } from 'react';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { callCoverLetterEndpoint } from '@/api/backend';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import buildCoverLetter from '@/util/coverLetterFactory';
import LoadSpinner from '@/components/loadSpinner/LoadSpinner';

type UITProps = {
  defaultString: string;
  field: string;
};
function UserInputText({ defaultString, field }: UITProps) {
  return <span style={{ color: 'red' }}>{field !== '' ? field : defaultString}</span>;
}

export default function CoverLetterGeneratorView() {
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [tone, setTone] = useState<string>('Formal');
  const [position, setPosition] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(250);
  const [otherDetails, setOtherDetails] = useState<string>('');

  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [personalityTraits, setPersonalityTraits] = useState<string[]>([]);
  const [cloudTechnologies, setCloudTechnologies] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleClick() {
    setIsLoading(true);

    // buildCoverLetter(
    //   'Chuck Sneed',
    //   'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    // ).save();

    callCoverLetterEndpoint({
      company: company,
      tone: tone,
      frameworks: frameworks,
      personalityTraits: personalityTraits,
      cloudTechnologies: cloudTechnologies,
      position: position,
      wordCount: wordCount,
      otherDetails: otherDetails,
    })
      .then((response) => {
        buildCoverLetter(title, response).save('landaverde_cover_letter');
      })
      .catch(() => {
        alert('There was an error generating your cover letter');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="generator-container">
      <div className="form-controls">
        <h2>Cover Letter Generator</h2>

        <label>
          Your Title/Name:
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Seymour Butts"></input>
        </label>
        <label>
          Your Company/Business
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="Chuck's Seed and Feed"></input>
        </label>

        <label>
          Position To Apply For:
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            type="text"
            placeholder="Software Engineer II"></input>
        </label>

        <ChipInput
          label={'List some personality traits you want highlighted: '}
          chips={personalityTraits}
          setChips={setPersonalityTraits}
          placeholder="Perfect, Beautiful, Stunning"
        />
        <ChipInput
          label={'Bloated frameworks to mention:'}
          chips={frameworks}
          setChips={setFrameworks}
          placeholder="Angular, React, BLAZER"
        />
        <ChipInput
          label={'Name some cloud™ technologies you want mentioned: '}
          chips={cloudTechnologies}
          setChips={setCloudTechnologies}
          placeholder={'AWS Ginkgo Biloba, AWS Alpha-Brain AG1 Rogan Goop'}
        />

        <label>
          General Tone:
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option>Formal</option>
            <option>Casual</option>
            <option>Zoomer</option>
            <option>Patrick Bateman</option>
          </select>
        </label>

        <label>
          Word Count:
          <input type="number" value={wordCount} onChange={(e) => setWordCount(parseInt(e.target.value))} min={100} max={1000} />
        </label>

        <label>
          Other Details:
          <textarea
            placeholder={'Mention any other details you want noted before a custom Cover Letter™ is made for you'}
            value={otherDetails}
            onChange={(e) => setOtherDetails(e.target.value)}></textarea>
        </label>

        {isLoading ? (
          <LoadSpinner color="rgb(77, 61, 113)" />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}>
            GENERATE
          </button>
        )}
      </div>
      <div className="letter-container">
        <div className="document">
          <h2>
            Dear <UserInputText field={title} defaultString="YOUR_NAME_HERE"></UserInputText>
          </h2>
          <p className="letter-content">
            <TypewriterText speed={35}>
              It is with a humility so profound it borders on desperation that I submit my application for the [
              <span style={{ color: 'red' }}>{position !== '' ? position : 'YOUR_POSITION'}</span>] role at [
              <span style={{ color: 'red' }}>{company !== '' ? company : 'YOUR_COMPANY'}</span>]. The chance to merely dream of
              joining your illustrious organization is an honor I will recount to my grandchildren, should I ever attain the life
              stability required to have them. From the moment I saw your job posting—crafted with the kind of perfection I can
              only hope to absorb through osmosis—I knew this position was meant for me. <br />
              <br />
              My entire existence has been a meandering prelude to this opportunity. Who needs a “calling” when one can have job
              descriptions? Let me be clear: my qualifications, while technically aligned with your requirements, are utterly
              insignificant compared to the boundless contributions I will bring to your team. <br />
              <br /> I possess a unique ability to contort myself into any mold required, much like a gelatin dessert. My skills
              in [<span style={{ color: 'red' }}>{frameworks.length >= 1 ? frameworks[0] : 'RELEVANT_SKILL_1'}</span>], [
              <span style={{ color: 'red' }}>{frameworks.length >= 2 ? frameworks[1] : 'RELEVANT_SKILL_2'}</span>], and [
              <span style={{ color: 'red' }}>{frameworks.length >= 3 ? frameworks[2] : 'RELEVANT_SKILL_3'}</span>] are merely
              tools in service of my true talent: tirelessly seeking your approval.
            </TypewriterText>
          </p>
          <p>
            Yours Truly,
            <br></br>
            Nicodemus
          </p>
        </div>
      </div>
      <BackgroundCanvas position={'fixed'} flipped={true} />
      <ChatBubble />
    </div>
  );
}
