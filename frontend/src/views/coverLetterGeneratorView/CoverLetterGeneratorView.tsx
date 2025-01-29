import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas';
import './cover-letter-generator-view.css';
import ChipInput from '@/components/chipInput/ChipInput';
import { useEffect, useState } from 'react';
import { callCoverLetterEndpoint } from '@/api/backend';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import buildCoverLetter from '@/util/coverLetterFactory';
import LoadSpinner from '@/components/loadSpinner/LoadSpinner';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import Typewriter from 'typewriter-effect';

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
  const [cloudTechnologies, setCloudTechnologies] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleClick() {
    setIsLoading(true);

    callCoverLetterEndpoint({
      company: company,
      tone: tone,
      frameworks: frameworks,
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

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Key to force rerendering Typewriter
  const [typewriterKey, setTypewriterKey] = useState<number>(0);

  function handleInputChange() {
    setTypewriterKey((prevKey) => prevKey + 1); // Increment key to force rerender
  }

  return (
    <>
      <Navbar showSignUp={true} />
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
              onChange={(e) => {
                setCompany(e.target.value);
                handleInputChange();
              }}
              type="text"
              placeholder="Chuck's Seed and Feed"></input>
          </label>

          <label>
            Position To Apply For:
            <input
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
                handleInputChange();
              }}
              type="text"
              placeholder="Software Engineer II"></input>
          </label>

          <ChipInput
            label={'Frameworks to mention:'}
            chips={frameworks}
            setChips={(str) => {
              handleInputChange();
              setFrameworks((prev) => [...prev, str]);
            }}
            removeChip={(str) => setFrameworks((prev) => prev.filter((el) => el !== str))}
            placeholder="Angular, React, BLAZER"
          />
          <ChipInput
            label={'Name some cloud™ technologies you want mentioned: '}
            chips={cloudTechnologies}
            setChips={(str) => {
              handleInputChange();
              setCloudTechnologies((prev) => [...prev, str]);
            }}
            removeChip={(str) => setCloudTechnologies((prev) => prev.filter((el) => el !== str))}
            placeholder={'AWS Ginkgo Biloba, AWS Alpha-Brain AG1 Rogan Goop'}
          />

          <label>
            General Tone:
            <select value={tone} onChange={(e) => setTone(e.target.value)}>
              <option>Formal</option>
              <option>Casual</option>
              <option>Business-speak</option>
            </select>
          </label>

          <label>
            Word Count:
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
              min={100}
              max={1000}
            />
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
          <div className="document" id="letter">
            <h2>
              Dear <UserInputText field={title} defaultString="Your Name"></UserInputText>,
            </h2>
            <div className="letter-content">
              <Typewriter
                key={typewriterKey}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      'It is with a humility so profound it borders on desperation that I submit my application for the ['
                    )
                    .typeString(`<span style="color: red;">${position !== '' ? position : 'YOUR POSITION'}</span>`)
                    .typeString('] role at [')
                    .typeString(`<span style="color: red;">${company !== '' ? company : 'YOUR COMPANY'}</span>`)
                    .typeString(
                      ']. <br />  <br />The chance to merely dream of joining your illustrious organization is an honor I will recount to my grandchildren, should I ever attain the life stability required to have them. From the moment I saw your job posting—crafted with the kind of perfection I can only hope to absorb through osmosis—I knew this position was meant for me. <br /> <br />'
                    )
                    .typeString(
                      'My entire existence has been a meandering prelude to this opportunity. Who needs a “calling” when one can have job descriptions? Let me be clear: my qualifications, while technically aligned with your requirements, are utterly insignificant compared to the boundless contributions I will bring to your team. <br /> <br /> I possess a unique ability to contort myself into any mold required, much like a gelatin dessert. My skills in ['
                    )
                    .typeString(`<span style="color: red;">${frameworks.length >= 1 ? frameworks[0] : 'RELEVANT SKILL 1'}</span>`)
                    .typeString(
                      `], [<span style="color: red;">${frameworks.length >= 2 ? frameworks[1] : 'RELEVANT SKILL 2'}</span>], `
                    )
                    .typeString(
                      `and [<span style="color: red;">${frameworks.length >= 3 ? frameworks[2] : 'RELEVANT SKILL 3'}</span>] `
                    )
                    .typeString('are merely tools in service of my true talent: tirelessly seeking your approval.')
                    .start();
                }}
                options={{
                  delay: 40, // Adjust typing speed
                  deleteSpeed: 20, // Adjust deleting speed if needed
                  cursor: '|', // Custom cursor style
                  loop: true,
                }}
              />
            </div>
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
      <Footer />
    </>
  );
}
