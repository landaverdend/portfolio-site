import Navbar from './navbar/Navbar';
import './resume-view.css';

import Footer from './footer/Footer';
import AboutContainer from './about/AboutContainer';
import ProjectContainer from './project/ProjectContainer';

function ResumeView() {
  return (
    <>
      <Navbar />
      <div className="resume-container">
        <AboutContainer />
        <div className="bubble b1"></div>
        <div className="bubble b2"></div>
        <div className="bubble b3"></div>
        <div className="bubble b4"></div>
        <div className="bubble b5"></div>
        <div className="bubble b6"></div>
        
        <ProjectContainer />
      </div>
      <Footer />
    </>
  );
}

export default ResumeView;
