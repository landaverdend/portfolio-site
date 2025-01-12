import { useForm, ValidationError } from '@formspree/react';

export default function ContactContainer() {
  const [state, handleSubmit] = useForm('xzzzozwp');

  if (state.succeeded) {
    return <p></p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>

      <input id="email" type="email" name="email" placeholder="email@asdf@gmail.com" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <textarea id="message" name="message" placeholder="Message" />

      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>

      {state.succeeded ? <>Email Sent!</> : <></>}
    </form>
  );
}
