import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { DOMBody, mapPhysicsToDom } from './physicsHook.tsx';
import { Inputs } from './SurveyView';
import { ReactNode } from 'react';

type ETProps = {
  text: string;
};
export function ErrorText({ text }: ETProps) {
  return <span className="error-text">{text}</span>;
}

type IWProps = {
  id: string | keyof Inputs;
  placeholder?: string;
  domBody?: DOMBody;
  className?: string;

  labelText?: string;

  error?: FieldError;
  register?: UseFormRegister<Inputs>;
  registerOptions?: RegisterOptions<Inputs, keyof Inputs>;

  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};
export function InputWithPhysics({
  id,
  labelText,
  placeholder,
  domBody,
  className,
  error,
  register,
  registerOptions,
  onClick,
}: IWProps) {
  return (
    <label>
      {labelText}
      <input
        id={id}
        className={`physics ${className}`}
        type="text"
        placeholder={placeholder}
        style={domBody?.isActive ? mapPhysicsToDom(id, domBody) : {}}
        {...(register ? register(id as keyof Inputs, registerOptions) : {})}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
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

type CWPProps = {
  id: string;
  domBody?: DOMBody;
  children: ReactNode;
};
export function ComponentWithPhysics({ id, children, domBody }: CWPProps) {
  return (
    <div id={id} className="physics" style={domBody?.isActive ? mapPhysicsToDom(id, domBody) : {}}>
      {children}
    </div>
  );
}
