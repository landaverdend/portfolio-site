import './navbar.css';
import siteLogo from '@assets/images/logo.png';
import Modal from '../modal/Modal';
import FormContainer from '@views/formView/formContainer/FormContainer';
import { useAppState } from '@/state/appState';
import { useEffect, useState } from 'react';
import HamburgerMenu from '@assets/images/icons/hamburger.svg?react';
import Cross from '@assets/images/icons/cross.svg?react';

export const MOBILE_WIDTH = 600;
type Link = { link: string; text: string };

type LProps = {
  link: Link;
};

type NavbarProps = {
  links?: Array<Link>;
  showSignUp?: boolean;
};
function Navbar({ links, showSignUp }: NavbarProps) {
  const [isMobileView, setMobileView] = useState(window.innerWidth <= MOBILE_WIDTH);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isModalOpen, setIsModalOpen, setView } = useAppState();

  function Link({ link }: LProps) {
    return (
      <a
        className="link"
        key={link.link}
        href={link.text}
        onClick={(e) => {
          e.preventDefault();
          setMobileMenuOpen(false);
          const element = document.getElementById(link.link);

          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}>
        {link.text}
      </a>
    );
  }

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
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-container__logo">
          <a
            onClick={() => {
              setView('SplashView');
            }}>
            <img src={siteLogo} height={75} width={75} />
          </a>
          {window.innerWidth >= 576 && <span className="studio-name"> Fields of Green Studios</span>}
        </div>
        <div className="navbar-container__links">
          {!isMobileView && (
            <>
              {links?.map((l) => (
                <Link key={crypto.randomUUID()} link={l} />
              ))}
            </>
          )}

          {showSignUp && (
            <>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setMobileMenuOpen(false);
                }}>
                Sign Up
              </button>
              <Modal isOpen={isModalOpen}>
                <FormContainer />
              </Modal>
            </>
          )}

          {isMobileView && !isMobileMenuOpen && (
            <HamburgerMenu
              width={48}
              height={48}
              onClick={() => {
                setMobileMenuOpen(true);
              }}
            />
          )}
          {isMobileView && isMobileMenuOpen && (
            <Cross
              width={48}
              height={48}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            />
          )}
        </div>
      </div>

      {isMobileView && (
        <div className={`dropdown-list ${isMobileMenuOpen ? 'show' : 'hidden'}`}>
          {links?.map((l) => (
            <span key={crypto.randomUUID()} className="link-background">
              <Link key={crypto.randomUUID()} link={l} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
