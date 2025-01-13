import './contact-container.css';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactContainer() {
  const [state, handleSubmit] = useForm('xzzzozwp');

  return (
    <form className="contact-form-container" onSubmit={handleSubmit}>
      <h1>Contact Me</h1>

      <label htmlFor="email">Email Address</label>
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <input id="email" type="email" name="email" placeholder="chuck@gmail.com" />
      <textarea id="message" name="message" placeholder="Message" />

      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button type="submit" disabled={state.submitting}>
        Submit
      </button>

      {state.succeeded ? <>Email Sent!</> : <></>}
    </form>
  );
}
