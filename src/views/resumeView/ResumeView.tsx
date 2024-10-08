import Navbar from '@/components/navbar/Navbar';
import './resume-view.css';
import voltorb from '@assets/images/trimmedVoltorb.gif';
import isleAdvanceGIF from '@assets/images/isleAdvance.png';
import tetrisGalaxyGif from '@assets/images/tetris-galaxy.png';
import Footer from '@/components/footer/Footer';
import AboutContainer from './about/AboutContainer';

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
        desc={'Tetris spinoff that was made as a hackathon project over one very long night alongside my 3 friends'}
      />
    </div>
  );
}

function ResumeView() {
  return (
    <>
      <Navbar />
      <div className="resume-container">
        <AboutContainer />
        <ProjectContainer />
      </div>
      <Footer />
    </>
  );
}

export default ResumeView;
