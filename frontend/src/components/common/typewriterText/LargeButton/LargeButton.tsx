import './large-button.css';

type LBProps = {
  children: React.ReactNode;
  onClick: Function;
  type?: 'submit' | 'reset' | 'button'; // for inputs
  disabled?: boolean;
  fontSize?: string;
  backgroundColor?: string;
};
export default function LargeButton({ children, onClick, type, disabled, fontSize, backgroundColor }: LBProps) {
  return (
    <button
      style={{
        fontSize: fontSize ? fontSize : 'large',
        backgroundColor: backgroundColor ? backgroundColor : 'var(--main-indigo)',
      }}
      onClick={() => onClick()}
      className="large-button-container"
      type={type ? type : 'button'}
      disabled={disabled}>
      {children}
    </button>
  );
}
