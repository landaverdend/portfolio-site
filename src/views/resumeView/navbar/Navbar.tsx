import './navbar.css';
import siteLogo from '@assets/images/logo.png';

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-container__logo">
        <a href="https://github.com/landaverdend">
          <img src={siteLogo} height={47} width={47} />
        </a>
      </div>
      <div className="navbar-container__links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#resume">Resume</a>
      </div>
    </div>
  );
}

export default Navbar;
