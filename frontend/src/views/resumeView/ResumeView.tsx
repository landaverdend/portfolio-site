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
    { link: 'contact', text: 'Contact', type: 'link' },
    { view: 'splash', text: 'Laughs', type: 'view' },
  ];
  return (
    <>
      <Navbar links={navbarLinks} showSignUp={true} />
      <div className="resume-container">
        <section id="about">
          <AboutContainer />
        </section>

        <BackgroundBubbles />

        <section id="projects" className="flex flex-col justify-center items-center ">
          <SubHeader>
            <h1 className="text-2xl font-semibold">Projects</h1>
          </SubHeader>
          <ProjectContainer />
        </section>

        <section id="contact" className="flex flex-col justify-center items-center">
          <ContactContainer />
        </section>
      </div>
      <Footer />
      {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
    </>
  );
}

export default ResumeView;
