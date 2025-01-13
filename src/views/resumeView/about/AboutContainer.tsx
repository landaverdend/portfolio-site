import './about-container.css';
import me from '@assets/images/resume/me.png';
import EmailLogo from '@assets/images/logos/email.svg?react';
import LinkedinLogo from '@assets/images/logos/linkedin.svg?react';
import GithubLogo from '@assets/images/logos/github.svg?react';

function AboutContainer() {
  return (
    <>
      <div id="about" className="about-container flex-row">
        <div className="flex-column text-container__text">
          <h2>About Me</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum
          <div className="social-dock">
            <div className="flex-row social-header">
              <hr />
              <h3>Socials</h3>
              <hr />
            </div>
            <div className="social-list flex-row">
              <EmailLogo /> <LinkedinLogo /> <GithubLogo />
            </div>
          </div>
        </div>

        <div className="flex-column portrait-container">
          <img src={me} />
          <figcaption>(Pictured: Me using my favorite debugger)</figcaption>
        </div>
      </div>
    </>
  );
}

export default AboutContainer;
