import './navbar.css';

function Navbar() {
  return (
    <div className="navbar-container">
      <div>logo.</div>

      <div className="navbar-container__links">
        <a>About me</a>
        <a>Projects</a>
        <a>Resume</a>
        <a>Pricing</a>
      </div>
    </div>
  );
}

export default Navbar;
