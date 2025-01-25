import './large-button.css';

type LBProps = {
  children: React.ReactNode;
  onClick: Function;
  type?: 'submit' | 'reset' | 'button'; // for inputs
  disabled?: boolean;
  fontSize?: string;
};
export default function LargeButton({ children, onClick, type, disabled, fontSize }: LBProps) {
  return (
    <button
      style={{ fontSize: fontSize ? fontSize : 'large' }}
      onClick={() => onClick()}
      className="large-button-container"
      type={type ? type : 'button'}
      disabled={disabled}>
      {children}
    </button>
  );
}
