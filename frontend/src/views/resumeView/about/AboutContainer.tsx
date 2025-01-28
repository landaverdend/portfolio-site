import './about-container.css';
import me from '@assets/images/resume/me.png';
import EmailLogo from '@assets/images/logos/email.svg?react';
import LinkedinLogo from '@assets/images/logos/linkedin.svg?react';
import GithubLogo from '@assets/images/logos/github.svg?react';
import SubHeader from '@/components/subHeader/SubHeader';
import LargeButton from '@/components/common/typewriterText/LargeButton/LargeButton';

function AboutContainer() {
  const handleDownload = () => {
    // URL to the PDF file
    const link = document.createElement('a');
    link.href = 'https://landaverde.in/pdfs/landaverde_resume.pdf';
    link.download = 'landaverde_resume.pdf'; // Suggested filename for the download
    document.body.appendChild(link); // Append to the DOM

    link.click(); // Trigger the download

    document.body.removeChild(link); // Clean up
  };

  return (
    <>
      <div id="about" className="about-container flex-row">
        <div className="flex-column text-container__text">
          <h1>About Me</h1>

          <span>
            Hello- I'm Nicodemus Landaverde, I'm a software developer. When I'm not at my actual job or working on <b>not</b>
            -funny side projects, you can usually find me at one of three places:
            <ul>
              <li>The gym</li>
              <li>Krave Kava Bar</li>
              <li>My house at 110 W Main St, Carrboro, NC 27510 (Please come knock on my door)</li>
            </ul>
            Here's a showcase of some of the stuff I've made in the past- I like to stay flexible in terms of projects/skills but
            if I had to categorize myself I definitely fall under the web-umbrella of things. Please feel free to reach out with
            any queries!
          </span>

          <LargeButton
            onClick={() => {
              handleDownload();
            }}>
            Check out my{' '}
            <b>
              <i>Resume</i>
            </b>
          </LargeButton>

          <div className="social-dock">
            <SubHeader barWidth="150px">
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
          <figcaption>
            (Pictured: Me{' ...'}
            <b>
              <i>removing</i>
            </b>
            {'... '}
            bugs from your codebase)
          </figcaption>
        </div>
      </div>
    </>
  );
}

export default AboutContainer;
