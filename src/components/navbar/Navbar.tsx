import './navbar.css';
import siteLogo from '@assets/images/logo.png';

type NavbarProps = {
  links: Array<{ link: string; text: string }>;
};

function Navbar({ links }: NavbarProps) {
  return (
    <div className="navbar-container">
      <div className="navbar-container__logo">
        <a href="https://github.com/landaverdend">
          <img src={siteLogo} height={75} width={75} />
        </a>
      </div>
      <div className="navbar-container__links">
        {links.map((l) => (
          <a key={l.link} href={l.link}>
            {l.text}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
