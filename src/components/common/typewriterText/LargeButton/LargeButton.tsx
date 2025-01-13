import './large-button.css';

type LBProps = {
  children: React.ReactNode;
  onClick: Function;
};
export default function LargeButton({ children, onClick }: LBProps) {
  return (
    <button onClick={() => onClick()} className="large-button-container">
      {children}
    </button>
  );
}
