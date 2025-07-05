import './project-container.css';

import voltorb from '@assets/videos/voltorbflip.mp4';
import tetrisGalaxy from '@assets/videos/tetrisgalaxy.mp4';
import isleadvance from '@assets/videos/isleadvance.mp4';
import trivia from '@assets/images/resume/trivia.png';
import battlesnakes from '@assets/videos/battlesnakes.mp4';
import bitcoinTools from '@assets/images/resume/btc-tools.png';

type PCProps = {
  src: string;
  type: 'video' | 'image';
  desc: string;
  techUsed: string;
  title: string;
  backgroundColor: string;
  demoUrl?: string;
  sourceCodeUrl?: string;
};
function ProjectCard({ src, demoUrl, sourceCodeUrl, backgroundColor, desc, techUsed, title, type }: PCProps) {
  return (
    <div className="project-card">
      {type === 'video' ? (
        <video controls preload="metadata">
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
          {sourceCodeUrl !== undefined && <a href={sourceCodeUrl}>Source Code</a>}
        </p>
      </div>
    </div>
  );
}

function ProjectContainer() {
  return (
    <div id="projects" className="projects-container">
      <ProjectCard
        title={'Bitcoin Browser Tools'}
        type={'image'}
        src={bitcoinTools}
        backgroundColor={'var(--panel-blue)'}
        techUsed={'Typescript, React, Node'}
        desc={
          'A collection of tools that allow you to write and debug bitcoin scripts in the browser. Includes a debugger and transaction parser, alongside support for legacy and segwit transactions.'
        }
        demoUrl={'https://bitcointools.landaverde.io/'}
        sourceCodeUrl={'https://github.com/landaverdend/btc-web-tools'}
      />

      <ProjectCard
        title={'Battle Snakes'}
        type={'video'}
        src={battlesnakes}
        sourceCodeUrl={'https://github.com/landaverdend/battle-snakes'}
        backgroundColor={'var(--panel-pink)'}
        techUsed={'sockets.io, Typescript, React'}
        desc={
          'A multiplayer, round-based snake game where you can battle other players online in real time. Built with websockets and a lot of help from my good friend, Cursor. Heavily inspired by slither.io and skribbl.io'
        }
        demoUrl={'https://battlesnakes.io/'}
      />

      <ProjectCard
        title={'Isle Advance'}
        src={isleadvance}
        sourceCodeUrl={'https://github.com/landaverdend/Procgen-GBA'}
        backgroundColor={'var(--panel-blue)'}
        techUsed={'C, Make'}
        type={'video'}
        desc={
          'Homebrew Gameboy Advance game made in collaboration with a friend for a university capstone project. My contributions focused on the procedural generation of the game world and the implementation of menu functionality. '
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
        demoUrl={'https://trivia.landaverde.in/'}
        type={'image'}
        sourceCodeUrl={'https://github.com/landaverdend/trivia-generator'}
        backgroundColor="var(--panel-blue)"
        techUsed={'Express, Typescript, React'}
        desc={'AI Wrapper for generating trivia questions and answers'}></ProjectCard>
    </div>
  );
}

export default ProjectContainer;
