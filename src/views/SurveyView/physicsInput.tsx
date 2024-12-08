import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { DOMBody, mapPhysicsToDom } from './physicsHook.tsx';
import { Inputs } from './SurveyView';

type ETProps = {
  text: string;
};
export function ErrorText({ text }: ETProps) {
  return <span className="error-text">{text}</span>;
}

type IWProps = {
  id: keyof Inputs;
  placeholder?: string;
  domBody?: DOMBody;

  labelText: string;

  error?: FieldError;
  register: UseFormRegister<Inputs>;
  registerOptions?: RegisterOptions<Inputs, keyof Inputs>;
};
export function InputWithPhysics({ id, labelText, placeholder, domBody, error, register, registerOptions }: IWProps) {
  return (
    <label>
      {labelText}
      <input
        id={id}
        className="physics"
        type="text"
        placeholder={placeholder}
        style={domBody?.isActive ? mapPhysicsToDom(id, domBody) : {}}
        {...register(id, registerOptions)}
      />
      {domBody?.isActive && <input style={{ visibility: 'hidden' }} />}
      {error?.message && <ErrorText text={error.message} />}
    </label>
  );
}

type SWProps = {
  id: keyof Inputs;
  domBody?: DOMBody;
  query: string;
  options: string[];

  error?: FieldError;
  register: UseFormRegister<Inputs>;
  registerOptions?: RegisterOptions<Inputs, keyof Inputs>;
};
export function SelectWithPhysics({ id, domBody, query, options, error, register, registerOptions }: SWProps) {
  return (
    <label>
      {query}
      <select
        id={id}
        className="physics"
        style={domBody?.isActive ? mapPhysicsToDom(id, domBody) : {}}
        {...register(id, registerOptions)}>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      {error?.message && <ErrorText text={error.message} />}
    </label>
  );
}
