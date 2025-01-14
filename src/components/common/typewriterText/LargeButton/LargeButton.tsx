import './large-button.css';

type LBProps = {
  children: React.ReactNode;
  onClick: Function;
  type?: 'submit' | 'reset' | 'button'; // for inputs
  disabled?: boolean;
};
export default function LargeButton({ children, onClick, type, disabled }: LBProps) {
  return (
    <button onClick={() => onClick()} className="large-button-container" type={type ? type : 'button'} disabled={disabled}>
      {children}
    </button>
  );
}
