import LargeButton from '@/components/common/typewriterText/LargeButton/LargeButton';
import './contact-container.css';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactContainer() {
  const [state, handleSubmit] = useForm('xzzzozwp');

  return (
    <form className="contact-form-container" onSubmit={handleSubmit}>
      <div className="header-info">
        <h1>Contact Me</h1>

        <p>Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.</p>
      </div>

      <label htmlFor="email">Email Address</label>
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <input id="email" type="email" name="email" placeholder="chuck@gmail.com" />
      <textarea id="message" name="message" placeholder="Message" />

      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <LargeButton onClick={() => {}} type="submit" disabled={state.submitting}>
        Submit
      </LargeButton>

      {state.succeeded ? <>Email Sent!</> : <></>}
    </form>
  );
}
