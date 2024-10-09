import './footer.css';
import EmailLogo from '@assets/images/logos/email.svg?react';
import LinkedinLogo from '@assets/images/logos/linkedin.svg?react';
import GithubLogo from '@assets/images/logos/github.svg?react';
import siteLogo from '@assets/images/logo.png';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-container__info">
        <div className="footer-container__logo">
          <a href="https://github.com/landaverdend">
            <img src={siteLogo} height={75} width={75} />
          </a>
          <span>© Fields Of Green Studios 2024 </span>
        </div>
        <div className="footer-container__links">
          <a href="mailto: nicodemus.landaverde98@gmail.com">
            <EmailLogo />
          </a>
          <a href="https://www.linkedin.com/in/nicodemus-landaverde-7562ba19a/">
            <LinkedinLogo />
          </a>
          <a href="https://github.com/landaverdend">
            <GithubLogo />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
