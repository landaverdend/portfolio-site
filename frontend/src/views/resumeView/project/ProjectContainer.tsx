import trivia from '@assets/images/resume/trivia.png';
import bitcoinTools from '@assets/images/resume/btc-tools.png';
import isleadvance from '@assets/images/resume/isle_advance.png';
import battlesnakes from '@assets/images/resume/battle_snakes.png';
import voltorb from '@assets/images/resume/voltorb_flip.png';
import tetrisGalaxy from '@assets/images/resume/galaxy.png';

type PCProps = {
  src: string;
  desc: string;
  techUsed: string;
  title: string;
  backgroundColor: string;
  demoUrl?: string;
  sourceCodeUrl?: string;
};
function ProjectCard({ src, demoUrl, sourceCodeUrl, backgroundColor, desc, techUsed, title }: PCProps) {
  return (
    <div className="project-card flex justify-around items-center flex-wrap flex-row gap-[25px]">
      <img
        src={src}
        className="flex-5 w-[clamp(600px,100%,800px)] h-[clamp(400px,100%,600px)] object-cover rounded-md border border-indigo-500"></img>

      <div
        className="text-container flex flex-5 flex-col justify-center items-start text-left rounded-md p-[40px] border border-black min-w-[30%]"
        style={{ backgroundColor: backgroundColor, boxShadow: '10px 10px black' }}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-container__tech-used text-center">
          Technologies used: <span className="">{techUsed}</span>
        </p>
        <p className="text-container__description">
          {desc}
          <br />
          <br />
          {demoUrl != undefined ? (
            <>
              <a href={demoUrl} className="text-blue-800 underline">
                Demo
              </a>
              <br />
            </>
          ) : (
            <></>
          )}
          {sourceCodeUrl !== undefined && (
            <a href={sourceCodeUrl} className="text-blue-800 underline">
              Source Code
            </a>
          )}
        </p>
      </div>
    </div>
  );
}

function ProjectContainer() {
  return (
    <div id="projects" className="projects-container flex flex-col justify-center gap-[25px]">
      <ProjectCard
        title={'Bitcoin Browser Tools'}
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
        desc={
          'Homebrew Gameboy Advance game made in collaboration with a friend for a university capstone project. My contributions focused on the procedural generation of the game world and the implementation of menu functionality. '
        }
      />
      <ProjectCard
        title={'Voltorb Flip JS'}
        src={voltorb}
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
        sourceCodeUrl={'https://github.com/landaverdend/trivia-generator'}
        backgroundColor="var(--panel-blue)"
        techUsed={'Express, Typescript, React'}
        desc={'AI Wrapper for generating trivia questions and answers'}></ProjectCard>
    </div>
  );
}

export default ProjectContainer;
