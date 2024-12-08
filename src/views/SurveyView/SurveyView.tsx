import './survey-view.css';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas.tsx';
import TypewriterText from '@/components/common/typewriterText/TypeWriterText';
import { useEffect, useRef, useState } from 'react';
import usePhysicsHook, { DOMBody } from './physicsHook.tsx';
import { Body, Composite } from 'matter-js';
import { useForm } from 'react-hook-form';
import { useAppState } from '@/state/appState';
import { randomNumber } from '@/util/random';
import { ErrorText, InputWithPhysics, SelectWithPhysics } from './physicsInput.tsx';

const dumbSlogans: string[] = [
  'Unlocking your path to unparalleled hiring success.',
  'Empowering your recruitment journey with top-tier talent.',
  'Transforming your hiring process, one resume at a time.',
  'Redefining the future of developer recruitment.',
  'Streamlining your talent search with seamless access.',
  'Fueling your hiring success with instant access to greatness.',
  'Revolutionizing the way you discover developer talent.',
  'Accelerating your hiring strategy with exclusive access.',
  'Driving your recruitment success at the speed of innovation.',
  'Shaping the future of talent acquisition, today.',
  "Connecting you to the developer you've been searching for.",
  'Elevating your hiring process to the next level.',
  'Empowering your recruitment with unmatched access to expertise.',
];

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companySize: string;
  companyName: string;
  job: string;
  hispanic: string;
  marketingMaterials: boolean;
};
function SurveyView() {
  const [timesTried, setTimesTried] = useState(0);

  const { setNextView, setIsLoading } = useAppState();
  const { ref, engine, createPhysicsBodyFromDOM } = usePhysicsHook(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });
  const domMap = useRef<Map<string, DOMBody>>(new Map());
  const isPhysicsSequenceStarted = useRef<boolean>(false);

  const [explosionTriggered, setExplosionTriggered] = useState(false);
  const [dumbSlogan, setDumbSlogan] = useState(dumbSlogans[0]);
  const [, setAnim] = useState(0);

  useEffect(() => {
    const pickDumbSlogan = setInterval(() => {
      const ind = Math.floor(Math.random() * dumbSlogans.length);

      setDumbSlogan(dumbSlogans[ind]);
    }, 10000);

    return () => {
      clearInterval(pickDumbSlogan);
    };
  }, []);

  useEffect(
    function applyExplosionToInputs() {
      if (!explosionTriggered) return;

      const elements = document.getElementsByClassName('physics');

      let i = 0;
      for (let el of elements) {
        if (!domMap.current.get(el.id)?.isActive) {
          const bodyToAdd = createPhysicsBodyFromDOM(el as HTMLElement, { isStatic: false, plugin: { domId: el.id } });

          // For an 'explosion' effect.
          const force = i % 2 == 0 ? 0.7 : -0.7;
          Body.applyForce(bodyToAdd, bodyToAdd.position, { x: force, y: force });
          Composite.add(engine.current.world, bodyToAdd);
          domMap.current.set(el.id, { isActive: true, x: bodyToAdd.position.x, y: bodyToAdd.position.y, angle: bodyToAdd.angle });

          i++;
        }
      }
    },
    [explosionTriggered]
  );

  useEffect(function triggerAnimation() {
    let unsub: number;

    function animate() {
      for (const el of Composite.allBodies(engine.current.world)) {
        const isActive = domMap.current.get(el.plugin.domId)?.isActive;
        if (el.isStatic || !el.plugin.domId || !isActive) continue;

        domMap.current.set(el.plugin.domId, { isActive: isActive, x: el.position.x, y: el.position.y, angle: el.angle });
      }

      setAnim((x) => x + 1);
      unsub = requestAnimationFrame(animate);
    }

    unsub = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(unsub);
    };
  }, []);

  function triggerPhysics(id: string) {
    if (!isPhysicsSequenceStarted.current && randomNumber(0, 1) === 0) {
      const el = document.getElementById(id);

      const bodyToAdd = createPhysicsBodyFromDOM(el as HTMLElement, { isStatic: false, plugin: { domId: id } });

      Composite.add(engine.current.world, bodyToAdd);

      if (el) {
        domMap.current.set(id, { isActive: true, x: el.offsetLeft, y: el.offsetHeight, angle: bodyToAdd.angle });
      }

      // Trigger the explosion on all other dom elements after two seconds.
      setTimeout(() => {
        alert('SHIT');
        setExplosionTriggered(true);
      }, 2000);
      isPhysicsSequenceStarted.current = true;
    }
  }

  return (
    <>
      <div className="physics-container" ref={ref}>
        <div className="survey-view-container">
          <div className="survey-description-container">
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

          <form className="form-container" onSubmit={handleSubmit(() => {})}>
            <h1>Let's get you started...</h1>
            <div className="input-grid">
              <InputWithPhysics
                id={'firstName'}
                labelText={'First Name'}
                placeholder={'John'}
                domBody={domMap.current.get('firstName')}
                register={register}
                registerOptions={{
                  onChange: () => triggerPhysics('firstName'),
                  required: { value: true, message: 'You forgot a first name...' },
                  validate: {
                    badName: () => randomNumber(0, 10) === 0 || 'Pick again!',
                  },
                }}
                error={errors.firstName}
              />

              <InputWithPhysics
                id={'lastName'}
                labelText={'Last Name'}
                placeholder={'Doe'}
                domBody={domMap.current.get('lastName')}
                register={register}
                registerOptions={{
                  onChange: () => triggerPhysics('lastName'),
                  required: { value: true, message: 'Whoa there! You need to add a last name!' },
                  validate: {
                    badName: () => randomNumber(0, 10) === 0 || "This one just won't work.... sorry!",
                  },
                }}
                error={errors.lastName}
              />

              <div className="user-details">
                <InputWithPhysics
                  id={'email'}
                  domBody={domMap.current.get('email')}
                  labelText={'Work Email'}
                  placeholder={'email@asdf.com'}
                  register={register}
                  registerOptions={{
                    onChange: () => triggerPhysics('email'),
                    required: { value: true, message: 'Sorry but I need your email!!!' },
                    pattern: { value: /^\S+@\S+$/i, message: 'Please enter an EMAIL' },
                    validate: {
                      badEmail: () => randomNumber(0, 10) === 0 || 'I think you just made that up... Try again',
                    },
                  }}
                  error={errors.email}
                />

                <InputWithPhysics
                  id={'job'}
                  domBody={domMap.current.get('job')}
                  labelText={'Job Title'}
                  placeholder={'unemployed'}
                  register={register}
                  registerOptions={{
                    onChange: () => triggerPhysics('job'),
                    required: { value: true, message: "C'mon don't tell me your unemployed..." },
                    validate: {
                      badTitle: () => randomNumber(0, 10) === 0 || "That's not a job!",
                    },
                  }}
                  error={errors.job}
                />

                <InputWithPhysics
                  id={'phone'}
                  domBody={domMap.current.get('phone')}
                  labelText={'Phone Number'}
                  register={register}
                  placeholder={'(123) 456 7891'}
                  registerOptions={{
                    onChange: () => triggerPhysics('phone'),
                    required: { value: true, message: "That's not a phone number!!" },
                    validate: { badPhone: () => randomNumber(0, 10) === 0 || "Listen. I don't think so" },
                  }}
                  error={errors.phone}
                />
              </div>

              <SelectWithPhysics
                id="companySize"
                domBody={domMap.current.get('companySize')}
                query={'Company Size'}
                options={['1-99 employees', '100-299 employees', '300-1999 employees', '2000+ employees', 'I have no company']}
                register={register}
                registerOptions={{ required: false, validate: { badChoice: () => randomNumber(0, 10) === 0 || 'You wish' } }}
                error={errors.companySize}
              />

              <SelectWithPhysics
                id="hispanic"
                domBody={domMap.current.get('hispanic')}
                query={'Are you of Hispanic or Latino descent?'}
                options={['Yes', 'No']}
                register={register}
                registerOptions={{
                  required: false,
                  validate: { badChoice: () => randomNumber(0, 2) === 0 || 'Ni en pedo, amigito. Intentálo de nuevo hdp' },
                }}
                error={errors.hispanic}
              />

              <label className="optional-text-field">
                Provide more details (optional)
                <textarea></textarea>
              </label>

              <div className="button-container">
                <label>
                  <input
                    type="checkbox"
                    className="physics"
                    {...register('marketingMaterials', {
                      required: true,
                      validate: {
                        badAnswer: () => randomNumber(0, 2) === 0 || "I don't think so.",
                      },
                    })}
                  />
                  I agree to receive marketing notifications
                  {errors.marketingMaterials && (
                    <ErrorText text={errors.marketingMaterials?.message ? errors.marketingMaterials.message : ''} />
                  )}
                </label>
                <input
                  id="submit"
                  className="physics"
                  value="Let's Go"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault;
                    setTimesTried((prev) => prev + 1);
                  }}></input>
                {timesTried >= 2 && (
                  <button
                    className="give-up-button"
                    onClick={() => {
                      setIsLoading(true);
                      setNextView('ResumeView');
                    }}>
                    I give up!
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <BackgroundCanvas flipped={true} />
      </div>
    </>
  );
}

export default SurveyView;
