import me from '@assets/images/splash-page/weight.png';
import EmailLogo from '@assets/images/logos/email.svg?react';
import LinkedinLogo from '@assets/images/logos/linkedin.svg?react';
import GithubLogo from '@assets/images/logos/github.svg?react';
import NostrLogo from '@assets/images/logos/nostr.svg?react';
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
      <div id="about" className="about-container flex flex-col-reverse items-center justify-center mt-20 gap-10 lg:flex-row">
        <div
          className="flex flex-col justify-center items-center gap-5 bg-(--panel-blue) rounded-lg p-5 border border-black w-[90%] h-fit lg:w-3/5 "
          style={{ boxShadow: '5px 5px black' }}>
          <h1 className="text-2xl font-semibold">About Me</h1>

          <span className="text-left">
            Hello- I'm Nic(o) Landaverde, a software developer currently working on Healthcare Systems at Clearwave Inc. I like
            building software, even if it's pointless or not useful. Most of the stuff here is just web-stuff that I've built for
            fun or for the strict purpose of learning.
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
            Download{' '}
            <b>
              <i>Resume</i>
            </b>
          </LargeButton>

          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className="text-lg font-semibold">Socials</h3>

            <div className="social-list flex flex-row gap-3 items-center justify-center">
              <a href="mailto: nicodemus.landaverde98@gmail.com" target="_blank">
                <EmailLogo className="h-10 w-10 cursor-pointer hover:opacity-80" />
              </a>
              <a href="https://www.linkedin.com/in/nicodemus-landaverde-7562ba19a/" target="_blank">
                <LinkedinLogo className="h-10 w-10 fill-white cursor-pointer hover:opacity-80" />
              </a>
              <a href="https://github.com/landaverdend" target="_blank">
                <GithubLogo className="h-10 w-10 cursor-pointer hover:opacity-80" />
              </a>
              <a
                href="https://primal.net/p/nprofile1qqs0wee2fnqm7glta9gelz88fdq65nmy3xqmk8d7jx9zkq9fkx783hsypmaft"
                target="_blank">
                <NostrLogo className="h-10 w-10 cursor-pointer hover:opacity-80" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-center bg-(--panel-lavender) rounded-lg p-4 border border-black w-[90%] h-fit sm:w-1/2"
          style={{ boxShadow: '5px 5px black' }}>
          <img src={me} className="h-full w-full lg:w-3/5" />
          <figcaption>I will build your next project</figcaption>
        </div>
      </div>
    </>
  );
}

export default AboutContainer;
