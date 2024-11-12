import { useAppState } from '@/state/appState';
import { useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import '../survey-view.css';

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
            {...register('companySize', { required: false, validate: { badChoice: () => randomChanceInTen(3) || 'You wish.' } })}>
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
  );
}
export default SetupForm;
