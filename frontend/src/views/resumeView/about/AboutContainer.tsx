import './about-container.css';
// import me from '@assets/images/resume/me.png'; // add this to be edgy.
import me from '@assets/images/splash-page/meTyping.png';
import EmailLogo from '@assets/images/logos/email.svg?react';
import LinkedinLogo from '@assets/images/logos/linkedin.svg?react';
import GithubLogo from '@assets/images/logos/github.svg?react';
import SubHeader from '@/components/subHeader/SubHeader';
import LargeButton from '@/components/common/typewriterText/LargeButton/LargeButton';

function AboutContainer() {
  const handleDownload = () => {
    // URL to the PDF file
    const link = document.createElement('a');
    link.href = 'https://landaverde.io/pdfs/landaverde_resume.pdf';
    link.download = 'landaverde_resume.pdf'; // Suggested filename for the download
    document.body.appendChild(link); // Append to the DOM

    link.click(); // Trigger the download

    document.body.removeChild(link); // Clean up
  };

  return (
    <>
      <div id="about" className="about-container ">
        <div className="flex-column text-container__text">
          <h1>About Me</h1>

          <span>
            Hello- I'm Nicodemus (Nic) Landaverde, a software developer currently working on Healthcare Systems at Clearwave Inc.
            I like building software, even if it's pointless or not useful (to other people). Most of the stuff here is just
            web-stuff that I've built for fun or for the strict purpose of learning new tech.
            <br />
            <br />
            If I had to categorize myself, I'd probably say I'm a full-stack developer. I like doing a little bit of everything.
            <br />
            <br />
            <b>Check out some of my projects below!</b>
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
            👆👆<b>Me</b>👆👆 (I am actually purple in real life)
          </figcaption>
        </div>
      </div>
    </>
  );
}

export default AboutContainer;
