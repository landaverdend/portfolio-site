import './project-container.css';

import voltorb from '@assets/images/trimmedVoltorb.gif';
import isleAdvanceGIF from '@assets/images/isleAdvance.png';
import tetrisGalaxyGif from '@assets/images/tetris-galaxy.png';

type PCProps = {
  src: string;
  desc: string;
  techUsed: string;
  title: string;
  backgroundColor: string;
};
function ProjectCard({ src, backgroundColor, desc, techUsed, title }: PCProps) {
  return (
    <div className="project-card">
      <div className="project-card__img">
        <img src={src} height={200} width={300} />
      </div>

      <div className="text-container" style={{ backgroundColor: backgroundColor }}>
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
        backgroundColor={'#afcc95'}
        techUsed={'React, Redux, NodeJS'}
        desc={
          'ReactJS recreation of the Voltorb Flip minigame from Pokemon HeartGold/SoulSilver with some slight difficulty alterations.'
        }
      />
      <ProjectCard
        title={'Isle Advance'}
        src={isleAdvanceGIF}
        backgroundColor={'#b295cc'}
        techUsed={'C, Make'}
        desc={'Gameboy Advance Homebrew project made alongside my friend for our Senior Year capstone project'}
      />
      <ProjectCard
        title={'Tetris Galaxy'}
        src={tetrisGalaxyGif}
        backgroundColor={'#cc9695'}
        techUsed={'Java, Java Swing'}
        desc={'Tetris spinoff that was made as a hackathon project over one very long night alongside my 3 friends'}
      />
    </div>
  );
}

export default ProjectContainer;
