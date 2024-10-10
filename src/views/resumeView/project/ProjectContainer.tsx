import './project-container.css';

import voltorb from '@assets/images/trimmedVoltorb.gif';
import isleAdvanceGIF from '@assets/images/isleAdvance.png';
import tetrisGalaxyGif from '@assets/images/tetris-galaxy.png';

type PCProps = {
  src: string;
  desc: string;
  techUsed: string;
  title: string;
};
function ProjectCard({ src, desc, techUsed, title }: PCProps) {
  return (
    <div className="project-card">
      <div className="project-card__img">
        <img src={src} height={200} width={300} />
      </div>

      <div className="text-container">
        <h3>{title}</h3>

        <p className="text-container__tech-used">
          Technologies used: <span className="courier-text">{techUsed}</span>
        </p>
        <p className="text-container__description">{desc}</p>
      </div>
    </div>
  );
}

function ProjectContainer() {
  return (
    <div id="projects" className="projects-container">
      <ProjectCard
        title={'Voltorb Flip JS'}
        src={voltorb}
        techUsed={'React, Redux, NodeJS'}
        desc={
          'ReactJS recreation of the Voltorb Flip minigame from Pokemon HeartGold/SoulSilver with some slight difficulty alterations.'
        }
      />
      <ProjectCard
        title={'Isle Advance'}
        src={isleAdvanceGIF}
        techUsed={'C, Make'}
        desc={'Gameboy Advance Homebrew project made alongside my friend for our Senior Year capstone project'}
      />
      <ProjectCard
        title={'Tetris Galaxy'}
        src={tetrisGalaxyGif}
        techUsed={'Java, Java Swing'}
        desc={'Tetris spinoff that was made as a hackathon project over one very long night alongside my 3 friends'}
      />
    </div>
  );
}

export default ProjectContainer;
