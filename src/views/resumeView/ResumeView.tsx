import Navbar from '@/components/navbar/Navbar';
import './resume-view.css';
import me from '@assets/images/me.png';
import voltorb from '@assets/images/trimmedVoltorb.gif';

type PCProps = {
  src: string;
  desc: string;
};
function ProjectCard({ src, desc }: PCProps) {
  return (
    <div className="project-card">
      <img src={src} height={500} width={700} />
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
    </div>
  );
}

function PricingContainer() {
  return (
    <div id="pricing" className="pricing-container">
      pricing
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
      <PricingContainer />
    </div>
  );
}

export default ResumeView;
