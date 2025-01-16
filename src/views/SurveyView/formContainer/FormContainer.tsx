import './form-container.css';
import { useForm } from 'react-hook-form';
import { Inputs } from '../SurveyView';
import { ComponentWithPhysics, ErrorText, InputWithPhysics, SelectWithPhysics } from '../physicsInput';
import usePhysicsHook from '../../../hooks/physicsHook';
import { getRandomChanceIn, randomNumber } from '@/util/random';
import { useEffect, useRef, useState } from 'react';
import { useAppState } from '@/state/appState';
import { Body } from 'matter-js';
import { createInputElement, createSelectElement } from '@/util/ElementFactory';
import { createPortal } from 'react-dom';

function FormContainer() {
  const isPhysicsSequenceStarted = useRef<boolean>(false);
  const { setIsModalOpen } = useAppState();
  const { ref, domMap, addPhysicsElement } = usePhysicsHook();

  const [timesTried, setTimesTried] = useState(0);

  const [explosionTriggered, setExplosionTriggered] = useState(false);
  const [rainTriggered, setRainTriggered] = useState(false);
  const [isGiveupEnabled, setIsGiveupEnabled] = useState(false);

  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });
  const { triggerLoadingSequence } = useAppState();

  useEffect(
    function applyExplosionToInputs() {
      if (!explosionTriggered) return;

      const elements = document.querySelectorAll<HTMLElement>('.physics');

      let i = 0;
      for (let el of elements) {
        if (!domMap.current.get(el.id)?.isActive) {
          const bodyToAdd = addPhysicsElement(el);

          const force = i % 2 == 0 ? 0.7 : -0.7;
          Body.applyForce(bodyToAdd, bodyToAdd.position, { x: force, y: force });

          i++;
        }
      }
    },
    [explosionTriggered]
  );

  useEffect(
    function beginElementRaining() {
      const elementFactoryMethods = [createInputElement, createSelectElement];

      let numItems = 0;

      if (rainTriggered && numItems < 300) {
        const rainInputInterval = setInterval(() => {
          numItems++;
          const elToAdd = elementFactoryMethods[randomNumber(0, elementFactoryMethods.length)]();
          ref.current?.appendChild(elToAdd);

          addPhysicsElement(elToAdd);
        }, 500);

        return () => {
          clearInterval(rainInputInterval);
        };
      }
    },
    [rainTriggered]
  );

  function triggerPhysics(id: string) {
    if (!isPhysicsSequenceStarted.current && getRandomChanceIn(5)) {
      const el = document.getElementById(id);

      if (el) {
        el.style.zIndex = '190';
        addPhysicsElement(el);
      }

      // Set various event triggers
      setTimeout(() => {
        setExplosionTriggered(true);
      }, 2000);

      setTimeout(() => {
        setRainTriggered(true);
      }, 3000);

      setTimeout(() => {
        setIsGiveupEnabled(true);
      }, 5000);

      isPhysicsSequenceStarted.current = true;
    }
  }

  return (
    <div className="physics-container" ref={ref}>
      <form className="form-container" onSubmit={handleSubmit(() => {})}>
        <div className="close-container">
          <span id="x-button" onClick={() => setIsModalOpen(false)}>
            &#x2715;
          </span>
        </div>
        <h1>Let's get you started...</h1>
        <div className="input-grid">
          <InputWithPhysics
            id={'firstName'}
            labelText={'First Name'}
            placeholder={'John'}
            isPhysicsEnabled={domMap.current.get('firstName')?.isActive}
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
            isPhysicsEnabled={domMap.current.get('lastName')?.isActive}
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
              isPhysicsEnabled={domMap.current.get('email')?.isActive}
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
              isPhysicsEnabled={domMap.current.get('job')?.isActive}
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
              labelText={'Phone Number'}
              register={register}
              isPhysicsEnabled={domMap.current.get('phone')?.isActive}
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
            query={'Company Size'}
            options={[
              '1-99 employees',
              '100-299 employees',
              '300-1999 employees',
              '2000+ employees',
              'I have no company',
            ]}
            register={register}
            registerOptions={{
              required: false,
              validate: { badChoice: () => randomNumber(0, 10) === 0 || 'You wish' },
            }}
            error={errors.companySize}
          />

          <SelectWithPhysics
            id="hispanic"
            query={'Are you of Hispanic or Latino descent?'}
            options={['Yes', 'No']}
            register={register}
            registerOptions={{
              required: false,
              validate: {
                badChoice: () => randomNumber(0, 2) === 0 || 'Ni en pedo, amigito. Intentálo de nuevo hdp',
              },
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

            <ComponentWithPhysics id="submit">
              <button
                className="submit-button"
                onClick={(e) => {
                  e.preventDefault();
                  trigger();
                  setTimesTried((prev) => prev + 1);
                }}
              >
                Let's Go!
              </button>
            </ComponentWithPhysics>

            {(timesTried >= 2 || isGiveupEnabled) && (
              <button
                className="give-up-button"
                onClick={(e) => {
                  e.preventDefault();
                  triggerLoadingSequence('ResumeView');
                }}
              >
                I give up!
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormContainer;
