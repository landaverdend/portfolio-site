import './project-container.css';

import voltorb from '@assets/videos/voltorbflip.mp4';
import tetrisGalaxy from '@assets/videos/tetrisgalaxy.mp4';
import isleadvance from '@assets/videos/isleadvance.mp4';
import trivia from '@assets/images/resume/trivia.png';

type PCProps = {
  src: string;
  type: 'video' | 'image';
  desc: string;
  techUsed: string;
  title: string;
  backgroundColor: string;
  demoUrl?: string;
  sourceCodeUrl: string;
};
function ProjectCard({ src, demoUrl, sourceCodeUrl, backgroundColor, desc, techUsed, title, type }: PCProps) {
  return (
    <div className="project-card">
      {type === 'video' ? (
        <video controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={src}></img>
      )}

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
        title={'Isle Advance'}
        src={isleadvance}
        sourceCodeUrl={'https://github.com/landaverdend/Procgen-GBA'}
        backgroundColor={'var(--panel-blue)'}
        techUsed={'C, Make'}
        type={'video'}
        desc={
          'This Homebrew project for the Gameboy Advance was my senior capstone project, developed in collaboration with a friend. My contributions focused on the procedural generation of the game world and the implementation of menu functionality'
        }
      />
      <ProjectCard
        title={'Voltorb Flip JS'}
        src={voltorb}
        type={'video'}
        demoUrl={'https://voltorb.landaverde.in/'}
        sourceCodeUrl={'https://github.com/landaverdend/supervoltorbflip'}
        backgroundColor={'var(--panel-green)'}
        techUsed={'React, Redux, NodeJS'}
        desc={
          'ReactJS recreation of the Voltorb Flip minigame from Pokemon HeartGold/SoulSilver with some slight difficulty alterations.'
        }
      />

      <ProjectCard
        title={'Tetris Galaxy'}
        src={tetrisGalaxy}
        demoUrl={'https://swansonmp.github.io/tetrisGalaxy/'}
        sourceCodeUrl={'https://github.com/landaverdend/tetrisGalaxy'}
        type={'video'}
        backgroundColor={'var(--panel-pink)'}
        techUsed={'Java, Java Swing'}
        desc={
          'Tetris spinoff where pieces fall from all 4 sides that was made at a university hackathon over one very long night alongside my 3 friends. '
        }
      />

      <ProjectCard
        title={'Trivia Generator'}
        src={trivia}
        demoUrl={'https://github.com/landaverdend/trivia-generator'}
        type={'image'}
        sourceCodeUrl={'https://github.com/landavderdend'}
        backgroundColor="var(--panel-blue)"
        techUsed={'Express, Typescript, React'}
        desc={'AI Powered trivia generator in a web browser...'}></ProjectCard>
    </div>
  );
}

export default ProjectContainer;
