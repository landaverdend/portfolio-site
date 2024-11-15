import { useAppState } from '@/state/appState';
import { useEffect, useRef, useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import '../survey-view.css';
import { createPortal } from 'react-dom';
import { Bodies, Composite, Engine, Render, Runner } from 'matter-js';

function randomChanceInTen(num: number) {
  return Math.random() < num * 0.1;
}

type ETProps = {
  error: FieldError;
};
function ErrorText({ error }: ETProps) {
  console.log(error);
  return <span className="error-text">{error.message}</span>;
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
function SetupForm() {
  const { setNextView, setIsLoading } = useAppState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onSubmit' });

  const [timesTried, setTimesTried] = useState(0);

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  // Build the Matter.JS stuff
  const ref = useRef<HTMLDivElement>(null);
  const engine = useRef<Matter.Engine>(Engine.create());
  const runner = useRef<Matter.Runner>(Runner.create());
  // const renderer = useRef<Matter.Render>(Render.create({ engine: engine.current }));

  const [, setAnim] = useState(0);
  const inputCoordinates = useRef<{ x: number; y: number; angle: number; id: number }[]>([]);
  const inputMap = useRef<Map<number, HTMLInputElement>>(new Map());

  useEffect(() => {
    const render = Render.create({
      element: document.body, // Attach the canvas to the document body
      engine: engine.current,
      options: {
        width: ref.current?.clientWidth,
        height: ref.current?.clientHeight,
        background: '#fafafa',
        wireframes: false, // Set to false to render solid shapes
      },
    });

    Runner.run(runner.current, engine.current);
    // Render.run(render);

    return () => {
      Runner.stop(runner.current);
      Render.stop(render);
      Composite.clear(engine.current.world, false);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  // Build out the base scene when times tried is greater or equal to 1.
  useEffect(function init() {
    const width = ref.current?.clientWidth ?? 0;
    const height = ref.current?.clientHeight ?? 0;

    const ground = Bodies.rectangle(width / 2, height, width, 50, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, 0, width, 1, {
      isStatic: true,
    });
    const wallL = Bodies.rectangle(0, height / 2, 1, height, {
      isStatic: true,
    });
    const wallR = Bodies.rectangle(width, height / 2, 50, height, {
      isStatic: true,
    });

    Composite.add(engine.current.world, [ground, ceiling, wallL, wallR]);
  }, []);

  useEffect(() => {
    let unsubscribe: any;

    function addElements() {
      const inputs = document.getElementsByTagName('input');

      let i = 0;
      for (let input of inputs) {
        const dims = input.getBoundingClientRect();

        const bodyToAdd = Bodies.rectangle(dims.x, dims.y, dims.width, dims.height * 1.1, { id: i });
        bodyToAdd.friction = 0.05;
        bodyToAdd.frictionAir = 0.00005;
        bodyToAdd.restitution = 0.9;

        inputMap.current.set(i, input);

        Composite.add(engine.current.world, bodyToAdd);
        i++;
      }

      // if (inputCoordinates.current.length < 100) setTimeout(addElements, 300);
    }

    addElements();

    return () => {
      clearTimeout(unsubscribe);
    };
  }, []);

  useEffect(function triggerAnimation() {
    let unsubscribe: number;
    function animate() {
      let i = 0;
      for (const el of Composite.allBodies(engine.current.world)) {
        if (el.isStatic) continue;
        inputCoordinates.current[i] = { id: el.id, x: el.position.x, y: el.position.y, angle: el.angle };

        i++;
      }
      setAnim((x) => x + 1);
      unsubscribe = requestAnimationFrame(animate);
    }

    unsubscribe = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(unsubscribe);
    };
  }, []);

  return (
    <>
      {createPortal(
        <>
          <div ref={ref} style={{ height: '100%', width: '100%', position: 'absolute' }}></div>
        </>,
        document.getElementById('root') as HTMLElement
      )}

      {inputCoordinates.current.map((el, key) => {
        const mapped = inputMap.current.get(el.id) as HTMLElement;
        const { height, width } = mapped.getBoundingClientRect();

        const adjustedX = el.x - width / 2;
        const adjustedY = el.y - height / 2;

        return (
          <input
            type="text"
            style={{
              position: 'absolute',
              top: adjustedY,
              left: adjustedX,
              height: height,
              width: width,
              transform: `rotate(${el.angle}rad)`,
            }}
            key={key}></input>
        );
      })}

      <div className="email-form-container">
        <h1>Let's get you started...</h1>
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form className={'email-form'} onSubmit={handleSubmit(onSubmit)}>
          {/* All of the dropped inputs..*/}

          {/* include validation with required or other standard HTML validation rules */}

          <label htmlFor="firstName" className="firstName">
            First Name
            <input
              {...register('firstName', {
                required: { value: true, message: 'You forgot the first name....' },
                validate: {
                  badName: () => randomChanceInTen(3) || 'Hmmmm, pick a better name...',
                },
              })}
              name="firstName"
            />
            {/* errors will return when field validation fails  */}
            {errors.firstName && <ErrorText error={errors.firstName}></ErrorText>}
          </label>

          <label className="lastName">
            Last Name
            <input
              {...register('lastName', {
                required: { value: true, message: 'Whoa there! You need to add a last name!' },
                validate: {
                  badName: () => randomChanceInTen(3) || "This one just won't work.... sorry!",
                },
              })}></input>
            {errors.lastName && <ErrorText error={errors.lastName} />}
          </label>

          <div className="user-details">
            <label>
              Work Email
              <input
                type="text"
                placeholder="Email"
                {...register('email', {
                  required: { value: true, message: 'Sorry but I need your email!!!' },
                  pattern: { value: /^\S+@\S+$/i, message: 'Please enter an EMAIL' },
                  validate: {
                    badEmail: () => randomChanceInTen(2) || 'I think you just made that up... Try again',
                  },
                })}
              />
              {errors.email && <ErrorText error={errors.email} />}
            </label>

            <label>
              Job Title
              <input
                type="text"
                placeholder="Job Title"
                {...register('jobTitle', {
                  required: { value: true, message: "C'mon don't tell me your unemployed..." },
                  validate: {
                    badTitle: () => randomChanceInTen(2) || "That's not a job!",
                  },
                })}></input>
              {errors.jobTitle && <ErrorText error={errors.jobTitle} />}
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                placeholder="(123) 456-7891"
                {...register('phone', {
                  required: { value: true, message: "That's not a phone number!!" },
                  validate: { badPhone: () => randomChanceInTen(1) || "Listen. I don't think so" },
                })}></input>
              {errors.phone && <ErrorText error={errors.phone} />}
            </label>
          </div>

          <label>
            Company Name
            <input
              type="text"
              placeholder=""
              {...register('companyName', {
                required: { value: true, message: 'Please enter a value here' },
                validate: { badCompanyName: () => randomChanceInTen(1) || 'You call that a company 🥶' },
              })}></input>
            {errors.companyName && <ErrorText error={errors.companyName} />}
          </label>

          <label>
            Company Size
            <select
              {...register('companySize', {
                required: false,
                validate: { badChoice: () => randomChanceInTen(3) || 'You wish.' },
              })}>
              <option>1-99 employees </option>
              <option>100-299 employees</option>
              <option>300-1999 employees</option>
              <option>+2000 employees</option>
              <option>I have no company</option>
            </select>
            {errors.companySize && <ErrorText error={errors.companySize} />}
          </label>

          <label className="details">
            Provide more details (optional)
            <textarea></textarea>
          </label>

          <div className="submit-container">
            <label>
              <input
                type="checkbox"
                {...register('marketingMaterials', {
                  required: true,
                  validate: {
                    badAnswer: () => randomChanceInTen(5) || "I don't think so.",
                  },
                })}
              />
              I agree to receive marketing notifications
              {errors.marketingMaterials && <ErrorText error={errors.marketingMaterials} />}
            </label>

            <input
              id="submit-button"
              value="Let's Go"
              type="submit"
              onClick={() => {
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
        </form>
      </div>
    </>
  );
}
export default SetupForm;
