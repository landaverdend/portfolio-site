import SetupForm from '@/components/setupForm/SetupForm';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import Footer from '@/components/footer/Footer';
import './survey-view.css';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import { useForm, SubmitHandler } from 'react-hook-form';

const dumbSlogans: string[] = [
  'Unlocking your path to unparalleled hiring success.',
  'Empowering your recruitment journey with top-tier talent.',
  'Transforming your hiring process, one resume at a time.',
  'Redefining the future of developer recruitment.',
  'Streamlining your talent search with seamless access.',
  'Fueling your hiring success with instant access to greatness.',
  'Revolutionizing the way you discover developer talent.',
  'Bridging the gap between recruiters and elite developers.',
  'Accelerating your hiring strategy with exclusive access.',
  'Driving your recruitment success at the speed of innovation.',
  'Shaping the future of talent acquisition, today.',
  "Connecting you to the developer you've been searching for.",
  'Elevating your hiring process to the next level.',
  'Empowering your recruitment with unmatched access to expertise.',
];

type ETProps = {
  children: string;
};
function ErrorText({ children }: ETProps) {
  return <span className="error-text">{children}</span>;
}

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companySize: string;
  companyName: string;
  jobTitle: string;
  marketingMaterials: boolean;
};
function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onSubmit' });

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const badName = () => Math.random() > 0.5;

  return (
    <div className="email-form-container">
      <h1>Let's get you started...</h1>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form className={'email-form'} onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}

        <label htmlFor="firstName" className="firstName">
          First Name
          <input
            {...register('firstName', {
              required: true,
              validate: {
                badName: () => badName(),
              },
            })}
            name="firstName"
          />
          {/* errors will return when field validation fails  */}
          {errors.firstName?.type === 'badName' && <ErrorText>I don't like your name. Change it.</ErrorText>}
        </label>

        <label className="lastName">
          Last Name
          <input
            {...register('lastName', {
              required: true,
              validate: {},
            })}></input>
          {errors.firstName?.type === 'required' && <ErrorText>you forgot to put it in dumbass</ErrorText>}
        </label>

        <div className="user-details">
          <label>
            Work Email
            <input type="text" placeholder="Email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          </label>

          <label>
            Job Title
            <input type="text" placeholder="Job Title" {...register('jobTitle', { required: true })}></input>
          </label>

          <label>
            Phone Number
            <input type="tel" placeholder="(123) 456-7891" {...register('phone', { required: true })}></input>
          </label>
        </div>

        <label>
          Company Name
          <input
            type="text"
            placeholder=""
            {...register('companyName', {
              required: true,
            })}></input>
        </label>

        <label>
          Company Size
          <select {...register('companySize', { required: false })}>
            <option>1-99 employees </option>
            <option>100-299 employees</option>
            <option>300-1999 employees</option>
            <option>+2000 employees</option>
            <option>I have no company</option>
          </select>
        </label>

        <label className="details">
          Provide more details (optional)
          <textarea></textarea>
        </label>

        <div className="submit-container">
          <label>
            <input type="checkbox" {...register('marketingMaterials', { required: true })} />I agree to receive marketing
            notifications
          </label>

          <input id="submit-button" value="Let's Go" type="submit"></input>
        </div>
      </form>
    </div>
  );
}

function SurveyView() {
  const [isQuestionaireStarted, setIsQuestionaireStarted] = useState(false);
  const [dumbSlogan, setDumbSlogan] = useState(dumbSlogans[0]);

  useEffect(() => {
    const pickDumbSlogan = setInterval(() => {
      const ind = Math.floor(Math.random() * dumbSlogans.length);

      setDumbSlogan(dumbSlogans[ind]);
    }, 10000);

    return () => {
      clearInterval(pickDumbSlogan);
    };
  }, []);

  return (
    <>
      <div className="setup-container">
        <div className={`init-block ${isQuestionaireStarted ? 'su-fade-out' : ''}`}>
          <div className="init-block__info">
            <h1>
              <TypewriterText text={dumbSlogan} speed={30} delay={0} />
            </h1>
            <p>
              Introducing the revolutionary Resume As A Service <b>(RaaS)</b>—a streamlined, subscription-based way for recruiters
              to view my developer resume on demand. Think of it as your personal shortcut to discovering my experience, skills,
              and project work, minus the hassle. Perfect for recruiters who need quick access, and for teams with long-term
              hiring needs, we’re here to help you get exactly what you’re looking for. Just let us know what you’re aiming for,
              and we’ll make sure you’re all set.
            </p>
          </div>

          <Form />
        </div>

        {isQuestionaireStarted && <SetupForm />}

        {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
        {createPortal(<BackgroundCanvas flipped={true} />, document.getElementById('root') as HTMLElement)}
      </div>
      <Footer />
    </>
  );
}

export default SurveyView;
