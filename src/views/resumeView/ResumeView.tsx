import './resume-view.css';

import AboutContainer from './about/AboutContainer';
import ProjectContainer from './project/ProjectContainer';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import { createPortal } from 'react-dom';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

function ResumeView() {
  const navbarLinks = [
    {
      link: '#about',
      text: 'About',
    },
    { link: '#projects', text: 'Projects' },
    { link: '#resume', text: 'Resume' },
  ];

  return (
    <>
      <Navbar links={navbarLinks} />
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
      {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
    </>
  );
}

export default ResumeView;
