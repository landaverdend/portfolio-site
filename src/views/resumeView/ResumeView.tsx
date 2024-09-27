import Navbar from '@/components/navbar/Navbar';
import './resume-view.css';
import me from '@assets/images/me.jpeg';

function ProjectContainer() {
  return (
    <div id="projects" className="projects-container">
      projects
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
      about
      <img src={me} />
    </div>
  );
}

function ResumeView() {
  return (
    <div className="resume-container">
      <Navbar />
      <AboutContainer />
      <PricingContainer />
      <ProjectContainer />
    </div>
  );
}

export default ResumeView;
