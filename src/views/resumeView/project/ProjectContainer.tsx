import './project-container.css';

import voltorb from '@assets/images/trimmedVoltorb.gif';
import isleAdvanceGIF from '@assets/images/isleAdvance.png';
import tetrisGalaxyGif from '@assets/images/tetris-galaxy.png';

type PCProps = {
  src: string;
  desc: string;
  techUsed: string;
};
function ProjectCard({ src, desc }: PCProps) {
  return (
    <div className="project-card">
      <div className="project-card__img">
        <img src={src} height={200} width={300} />
      </div>

      <div className="project-card__text-container">
        <p>{desc}</p>
      </div>
    
    </div>
  );
}

function ProjectContainer() {
  return (
    <div id="projects" className="projects-container">
      <ProjectCard
        src={voltorb}
        techUsed={''}
        desc={
          'ReactJS recreation of the Voltorb Flip minigame from Pokemon HeartGold/SoulSilver with some slight difficulty alterations.'
        }
      />
      <ProjectCard
        src={isleAdvanceGIF}
        techUsed={''}
        desc={'Gameboy Advance Homebrew project made alongside my friend for our Senior Year capstone project'}
      />
      <ProjectCard
        src={tetrisGalaxyGif}
        techUsed={''}
        desc={'Tetris spinoff that was made as a hackathon project over one very long night alongside my 3 friends'}
      />
    </div>
  );
}

export default ProjectContainer;
