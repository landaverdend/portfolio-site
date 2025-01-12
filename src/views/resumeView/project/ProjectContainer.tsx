import './project-container.css';

import voltorb from '@assets/videos/voltorbflip.mp4';
import tetrisGalaxy from '@assets/videos/tetrisgalaxy.mp4';

type PCProps = {
  src: string;
  desc: string;
  techUsed: string;
  title: string;
  backgroundColor: string;
  demoUrl?: string;
  sourceCodeUrl: string;
};
function ProjectCard({ src, demoUrl, sourceCodeUrl, backgroundColor, desc, techUsed, title }: PCProps) {
  return (
    <div className="project-card">
      <div className="video-container">
        <video width={300} height={200} controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="text-container" style={{ backgroundColor: backgroundColor }}>
        <h2>{title}</h2>
        <p className="text-container__tech-used">
          Technologies used: <span className="courier-text">{techUsed}</span>
        </p>
        <p className="text-container__description">
          {desc}
          <br />
          <br />
          {demoUrl != undefined ? (
            <>
              <a href={demoUrl}>Demo</a>
              <br />
            </>
          ) : (
            <></>
          )}
          <a href={sourceCodeUrl}>Source Code</a>
        </p>
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
        demoUrl={'https://voltorb.netlify.app/'}
        sourceCodeUrl={'https://github.com/landaverdend/supervoltorbflip'}
        backgroundColor={'#a2b8ff'}
        techUsed={'React, Redux, NodeJS'}
        desc={
          'ReactJS recreation of the Voltorb Flip minigame from Pokemon HeartGold/SoulSilver with some slight difficulty alterations.'
        }
      />
      {/* <ProjectCard
        title={'Isle Advance'}
        src={isleAdvanceGIF}
        sourceCodeUrl={'https://github.com/landaverdend/Procgen-GBA'}
        backgroundColor={'#a2ffba'}
        techUsed={'C, Make'}
        desc={'Gameboy Advance Homebrew project made alongside my friend for our Senior Year capstone project'}
      /> */}
      <ProjectCard
        title={'Tetris Galaxy'}
        src={tetrisGalaxy}
        demoUrl={'https://swansonmp.github.io/tetrisGalaxy/'}
        sourceCodeUrl={'https://github.com/landaverdend/tetrisGalaxy'}
        backgroundColor={'#ffe9a2'}
        techUsed={'Java, Java Swing'}
        desc={
          'Tetris spinoff where pieces fall from all 4 sides that was made at a university hackathon over one very long night alongside my 3 friends. '
        }
      />
    </div>
  );
}

export default ProjectContainer;
