import './footer.css';
import emailLogo from '@assets/images/logos/email.svg';
import linkedinLogo from '@assets/images/logos/linkedin.svg';
import githubLogo from '@assets/images/logos/github.svg';
import siteLogo from '@assets/images/logo.png';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-container__info">
        <div className="footer-container__logo">
          <img src={siteLogo} height={75} width={75} />
          <span>© Fields Of Green Studios 2024 </span>
        </div>
        <div className="footer-container__links">
          <a href="mailto: nicodemus.landaverde98@gmail.com">
            <img src={emailLogo} />
          </a>
          <a href="https://www.linkedin.com/in/nicodemus-landaverde-7562ba19a/">
            <img src={linkedinLogo} />
          </a>
          <a href="https://github.com/landaverdend">
            <img src={githubLogo} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
