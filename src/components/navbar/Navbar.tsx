import { useState } from 'react';
import './navbar.css';
import siteLogo from '@assets/images/logo.png';
import Modal from '../modal/Modal';

type NavbarProps = {
  links: Array<{ link: string; text: string }>;
};

function Navbar({ links }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar-container__logo">
        <a href="https://github.com/landaverdend">
          <img src={siteLogo} height={75} width={75} />
        </a>
      </div>
      <div className="navbar-container__links">
        {links.map((l) => (
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

        <button
          onClick={() => {
            setIsModalOpen((prev) => !prev);
          }}>
          Sign Up
        </button>

        {isModalOpen && (
          <Modal>
            <span>HELLOOOO WORLD!</span>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Navbar;
