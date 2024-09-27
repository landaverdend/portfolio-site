import './navbar.css';

function Navbar() {
  return (
    <div className="navbar-container">
      <div>logo</div>
      <div className="navbar-container__links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#resume">Resume</a>
        <a href="#pricing">Pricing</a>
      </div>
    </div>
  );
}

export default Navbar;
