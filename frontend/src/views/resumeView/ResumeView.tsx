import './resume-view.css';

import AboutContainer from './about/AboutContainer';
import ProjectContainer from './project/ProjectContainer';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import { createPortal } from 'react-dom';
import Navbar, { Link } from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ContactContainer from './contact/ContactContainer';
import SubHeader from '@/components/subHeader/SubHeader';
import BackgroundBubbles from '@/components/backgroundBubbles/BackgroundBubbles';

function ResumeView() {
  const navbarLinks: Array<Link> = [
    {
      link: 'about',
      text: 'About',
      type: 'link',
    },
    { link: 'projects', text: 'Projects', type: 'link' },
    // { link: 'skills', text: 'Skills', type: 'link' },
    { link: 'contact', text: 'Contact', type: 'link' },
    { view: 'SplashView', text: 'Laughs', type: 'view' },
  ];
  return (
    <>
      <Navbar links={navbarLinks} showSignUp={true} />
      <div className="resume-container">
        <section id="about">
          <AboutContainer />
        </section>

        <BackgroundBubbles />

        <section id="projects" className="flex-column">
          <SubHeader>
            <h1>Projects</h1>
          </SubHeader>
          <ProjectContainer />
        </section>

        {/* <section id="skills">
          <SkillsContainer />
        </section> */}

        <section id="contact" className="flex-column">
          <ContactContainer />
        </section>
      </div>
      <Footer />
      {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
    </>
  );
}

export default ResumeView;
