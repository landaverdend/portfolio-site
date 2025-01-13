import './about-container.css';
import me from '@assets/images/resume/me.png';
import EmailLogo from '@assets/images/logos/email.svg?react';
import LinkedinLogo from '@assets/images/logos/linkedin.svg?react';
import GithubLogo from '@assets/images/logos/github.svg?react';
import SubHeader from '@/components/subHeader/SubHeader';

function AboutContainer() {
  return (
    <>
      <div id="about" className="about-container flex-row">
        <div className="flex-column text-container__text">
          <h2>About Me</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>

          <div>
            Check out my
            {' '}
            <span>
              <b>resume</b>
            </span>
          </div>

          <div className="social-dock">
            <SubHeader>
              <h3>Socials</h3>
            </SubHeader>

            <div className="social-list flex-row">
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
