import Navbar from '@/components/navbar/Navbar';
import './resume-view.css';
import me from '@assets/images/me.png';
import voltorb from '@assets/images/trimmedVoltorb.gif';
import isleAdvanceGIF from '@assets/images/isleAdvance.png';
import tetrisGalaxyGif from '@assets/images/tetris-galaxy.png';
import Footer from '@/components/footer/Footer';

type PCProps = {
  src: string;
  desc: string;
};
function ProjectCard({ src, desc }: PCProps) {
  return (
    <div className="project-card">
      <div className="project-card__img">
        <img src={src} height={200} width={300} />
      </div>
      <p>{desc}</p>
    </div>
  );
}

function ProjectContainer() {
  return (
    <div id="projects" className="projects-container">
      <ProjectCard
        src={voltorb}
        desc={
          'ReactJS recreation of the Voltorb Flip minigame from Pokemon HeartGold/SoulSilver with some slight difficulty alterations.'
        }
      />
      <ProjectCard
        src={isleAdvanceGIF}
        desc={'Gameboy Advance Homebrew project made alongside my friend for our Senior Year capstone project'}
      />
      <ProjectCard
        src={tetrisGalaxyGif}
        desc={'Tetris spinoff that was made as a ackathon project over one very long night alongside my 3 friends'}
      />
    </div>
  );
}

function AboutContainer() {
  return (
    <div id="about" className="about-container">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </p>
      <img src={me} />
    </div>
  );
}

function ResumeView() {
  return (
    <div className="resume-container">
      <Navbar />
      <AboutContainer />
      <ProjectContainer />
      <Footer />
    </div>
  );
}

export default ResumeView;
