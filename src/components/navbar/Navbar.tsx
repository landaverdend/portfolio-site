import './navbar.css';
import siteLogo from '@assets/images/logo.png';
import Modal from '../modal/Modal';
import FormContainer from '@views/formView/formContainer/FormContainer';
import { useAppState } from '@/state/appState';

type NavbarProps = {
  links?: Array<{ link: string; text: string }>;
  showSignUp?: boolean;
};

function Navbar({ links, showSignUp }: NavbarProps) {
  const { isModalOpen, setIsModalOpen, setView } = useAppState();

  return (
    <div className="navbar-container">
      <div className="navbar-container__logo">
        <a
          onClick={() => {
            setView('SplashView');
          }}>
          <img src={siteLogo} height={75} width={75} />
        </a>
      </div>
      <div className="navbar-container__links">
        {links?.map((l) => (
          <a
            key={l.link}
            href={l.link}
            onClick={(e) => {
              e.preventDefault();

              const element = document.getElementById(l.link);

              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
            {l.text}
          </a>
        ))}
        {showSignUp && (
          <>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}>
              Sign Up
            </button>
          </>
        )}

        <Modal isOpen={isModalOpen}>
          <FormContainer />
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;
