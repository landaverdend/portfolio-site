import './form-container.css';
import { useForm } from 'react-hook-form';
import { Inputs } from '../SurveyView';
import { ComponentWithPhysics, ErrorText, InputWithPhysics, SelectWithPhysics } from '../physicsInput';
import { DOMBody } from '../physicsHook';
import { randomNumber } from '@/util/random';
import { useState } from 'react';
import { useAppState } from '@/state/appState';

type FCProps = {
  domMap: Map<string, DOMBody>;
  triggerPhysics: Function;

  isGiveupEnabled: boolean;
};
function FormContainer({ domMap, triggerPhysics, isGiveupEnabled }: FCProps) {
  const [timesTried, setTimesTried] = useState(0);

  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onSubmit' });
  const { setNextView, setIsLoading } = useAppState();

  return (
    <form className="form-container" onSubmit={handleSubmit(() => {})}>
      <h1>Let's get you started...</h1>
      <div className="input-grid">
        <InputWithPhysics
          id={'firstName'}
          labelText={'First Name'}
          placeholder={'John'}
          isPhysicsEnabled={domMap.get('firstName')?.isActive}
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
          isPhysicsEnabled={domMap.get('lastName')?.isActive}
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
            isPhysicsEnabled={domMap.get('email')?.isActive}
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
            isPhysicsEnabled={domMap.get('job')?.isActive}
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
            isPhysicsEnabled={domMap.get('phone')?.isActive}
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
          options={['1-99 employees', '100-299 employees', '300-1999 employees', '2000+ employees', 'I have no company']}
          register={register}
          registerOptions={{ required: false, validate: { badChoice: () => randomNumber(0, 10) === 0 || 'You wish' } }}
          error={errors.companySize}
        />

        <SelectWithPhysics
          id="hispanic"
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

          <ComponentWithPhysics id="submit">
            <button
              className="submit-button"
              onClick={(e) => {
                e.preventDefault();
                trigger();
                setTimesTried((prev) => prev + 1);
              }}>
              Let's Go!
            </button>
          </ComponentWithPhysics>

          {(timesTried >= 2 || isGiveupEnabled) && (
            <button
              className="give-up-button"
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);
                setNextView('ResumeView');
              }}>
              I give up!
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default FormContainer;
