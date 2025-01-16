import './modal.css';

type MProps = { children: React.ReactNode };

export default function Modal({ children }: MProps) {
  return <div className="modal-container">{children}</div>;
}
