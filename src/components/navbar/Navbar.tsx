import './navbar.css';
import siteLogo from '@assets/images/logo.png';
import Modal from '../modal/Modal';
import FormContainer from '@views/formView/formContainer/FormContainer';
import { useAppState } from '@/state/appState';
import { useEffect, useState } from 'react';
import HamburgerMenu from '@assets/images/icons/hamburger.svg?react';

const MOBILE_WIDTH = 600;

type NavbarProps = {
  links?: Array<{ link: string; text: string }>;
  showSignUp?: boolean;
};

function Navbar({ links, showSignUp }: NavbarProps) {
  const [isMobileView, setMobileView] = useState(window.innerWidth <= MOBILE_WIDTH);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { isModalOpen, setIsModalOpen, setView } = useAppState();

  // Update the state when the viewport size changes
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= MOBILE_WIDTH);

      if (window.innerWidth > MOBILE_WIDTH) {
        setMobileMenuOpen(false); // Close mobile menu if switching to desktop view
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {!isMobileView && (
          <>
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
          </>
        )}

        {showSignUp && (
          <>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}>
              Sign Up
            </button>
            <Modal isOpen={isModalOpen}>
              <FormContainer />
            </Modal>
          </>
        )}

        {isMobileView && !isMobileMenuOpen && <HamburgerMenu width={48} height={48} />}
      </div>
    </div>
  );
}

export default Navbar;
