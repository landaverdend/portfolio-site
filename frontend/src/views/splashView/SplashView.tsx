import './splash-view.css';
import '@styles/fonts.css';
import { createPortal } from 'react-dom';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import Navbar, { Link } from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import MainSection from './mainSection/MainSection';
import CompanyDock from '@/components/companyDock/CompanyDock';
import ReccomendationDrawer from './reccomendationDrawer/ReccomendationDrawer';
import CoverLetterSection from './coverLetterSection/CoverLetterSection';
import BackgroundCanvas from '@/components/backgroundCanvas/BackgroundCanvas';

function SplashView() {
  const navbarLinks: Array<Link> = [
    {
      view: 'ResumeView',
      text: 'Portfolio',
      type: 'view',
    },
    { link: 'featured-section', text: 'Featured', type: 'link' },
    { link: 'tools-section', text: 'Tools', type: 'link' },
  ];
  return (
    <div id="splash" className="splash-container">
      <Navbar links={navbarLinks} showSignUp={true} />
      <div className="splash-flexbox">
        <section id="main-section">
          <MainSection />
        </section>

        <CompanyDock />

        <section id="featured-section">
          <ReccomendationDrawer />
        </section>

        <section id="tools-section">
          <CoverLetterSection />
        </section>
      </div>
      <Footer />
      {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
      <BackgroundCanvas position={'absolute'} />
    </div>
  );
}

export default SplashView;
