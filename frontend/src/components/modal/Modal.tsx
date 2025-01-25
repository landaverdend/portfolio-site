import { useEffect } from 'react';
import './modal.css';
import { useAppState } from '@/state/appState';

type MProps = { isOpen: boolean; children: React.ReactNode };

export default function Modal({ isOpen, children }: MProps) {
  const { setIsModalOpen } = useAppState();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return isOpen && <div className="modal-container">{children}</div>;
}
