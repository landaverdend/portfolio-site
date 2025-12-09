'use client';

import Button from '@/components/button';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [state, handleSubmit] = useForm('xzzzozwp');

  return (
    <div className="w-full flex items-center justify-center pt-10">
      <form
        className="w-4/5 lg:w-3/5 flex flex-col items-center justify-center gap-2 h-full bg-indigo-900/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-indigo-300 p-3 rounded-lg"
        onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-semibold">Contact Me</h1>

          <p className="w-3/4">
            Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-4">
          <label htmlFor="email" className="text-lg font-semibold">
            Email Address
          </label>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="chuck@gmail.com"
            className="bg-indigo-800/80 p-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          />

          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="bg-indigo-800/80 p-2 rounded-md resize-none h-[200px] w-3/5 hover:bg-indigo-700 transition-colors duration-300"
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <Button onClick={() => {}} disabled={state.submitting}>
          Submit
        </Button>
        {state.succeeded ? <>Email Sent!</> : <></>}
      </form>
    </div>
  );
}
