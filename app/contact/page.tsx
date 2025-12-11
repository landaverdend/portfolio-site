'use client';

import Button from '@/components/button';
import { Spinner } from '@/components/ui/spinner';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const [state, handleSubmit] = useForm('xzzzozwp');

  return (
    <div className="w-full flex items-center justify-center pt-10 pb-20">
      <form
        className="w-4/5 lg:w-2/5 flex flex-col items-center justify-center gap-6 h-full bg-indigo-900/30 backdrop-filter backdrop-blur-md border border-indigo-300/50 p-8 rounded-xl shadow-[0_0_40px_rgba(129,140,248,0.3)]"
        onSubmit={handleSubmit}>
        <div
          className="flex flex-col items-center justify-center gap-3 animate-slide-up-fade opacity-0"
          style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl font-bold animate-gradient">Contact Me</h1>
          <p className="text-center text-white/80 text-sm lg:text-base max-w-md">
            Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-5">
          <div className="w-full max-w-md flex flex-col gap-2 animate-slide-up-fade opacity-0" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="email" className="text-base font-semibold text-white">
              Email Address
            </label>
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              required
              className="w-full bg-indigo-800/60 border border-indigo-400/50 text-white placeholder:text-white/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 hover:bg-indigo-800/80"
            />
          </div>

          <div className="w-full max-w-md flex flex-col gap-2 animate-slide-up-fade opacity-0" style={{ animationDelay: '0.3s' }}>
            <label htmlFor="message" className="text-base font-semibold text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or question..."
              required
              rows={6}
              className="w-full bg-indigo-800/60 border border-indigo-400/50 text-white placeholder:text-white/50 p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 hover:bg-indigo-800/80"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 animate-slide-up-fade opacity-0" style={{ animationDelay: '0.4s' }}>
          {!state.succeeded && !state.submitting && (
            <Button onClick={() => {}} disabled={state.submitting || state.succeeded}>
              Submit
            </Button>
          )}
          {state.submitting && (
            <div className="flex items-center gap-3">
              <Spinner className="w-6 h-6" />
              <span className="text-white/80">Sending...</span>
            </div>
          )}
          {state.succeeded && (
            <div className="flex flex-col items-center gap-2 animate-slide-up-fade opacity-0" style={{ animationDelay: '0s' }}>
              <p className="text-green-400 text-lg font-semibold">✓ Email Sent Successfully!</p>
              <p className="text-white/70 text-sm">I'll get back to you soon.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
