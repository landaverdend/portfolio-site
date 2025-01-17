import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ReactNode } from 'react';

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

type ETProps = {
  text: string;
};
export function ErrorText({ text }: ETProps) {
  return <span className="error-text">{text}</span>;
}

type IWProps = {
  id: string | keyof Inputs;
  placeholder?: string;
  className?: string;
  isPhysicsEnabled?: boolean;
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
  className,
  error,
  isPhysicsEnabled,
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
        {...(register ? register(id as keyof Inputs, registerOptions) : {})}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
      />
      {isPhysicsEnabled && <input style={{ visibility: 'hidden' }} />}
      {error?.message && <ErrorText text={error.message} />}
    </label>
  );
}

type SWProps = {
  id: keyof Inputs;
  query: string;
  options: string[];

  error?: FieldError;
  register: UseFormRegister<Inputs>;
  registerOptions?: RegisterOptions<Inputs, keyof Inputs>;
};
export function SelectWithPhysics({ id, query, options, error, register, registerOptions }: SWProps) {
  return (
    <label>
      {query}
      <select id={id} className="physics" {...register(id, registerOptions)}>
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

  className?: string;
  children: ReactNode;
};
export function ComponentWithPhysics({ id, className, children }: CWPProps) {
  return (
    <div id={id} className={`physics ${className}`}>
      {children}
    </div>
  );
}
