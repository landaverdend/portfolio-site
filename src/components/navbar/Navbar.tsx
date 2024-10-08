import './navbar.css';
import siteLogo from '@assets/images/logo.png';

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-container__logo">
        <img src={siteLogo} height={75} width={75} />
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
