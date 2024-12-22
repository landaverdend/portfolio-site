import './splash-view.css';
import '@styles/fonts.css';
import BackgroundCanvas from '@components/backgroundCanvas/BackgroundCanvas.tsx';
import { createPortal } from 'react-dom';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import MainSection from './mainSection/MainSection';
import CompanyDock from '@/components/companyDock/CompanyDock';

function SplashView() {
  const navbarLinks = [
    { link: '#main-section', text: 'About' },
    { link: '#featuerd-section', text: 'Features' },
  ];
  return (
    <div id="splash" className="splash-container">
      <Navbar links={navbarLinks} />
      <div className="splash-flexbox">
        <section id="main-section">
          <MainSection />
        </section>

        <section id="featured-section">
          <CompanyDock />
          {/* <ReccomendationDrawer /> */}
        </section>

      </div>
      <Footer />
      {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
      <BackgroundCanvas position={'absolute'} />
    </div>
  );
}

export default SplashView;
