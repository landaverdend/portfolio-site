import './splash-view.css';
import '@styles/fonts.css';
import BackgroundCanvas from '@components/backgroundCanvas/BackgroundCanvas.tsx';
import { createPortal } from 'react-dom';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import MainSection from './mainSection/MainSection';
import CompanyDock from '@/components/companyDock/CompanyDock';
import ReccomendationDrawer from './reccomendationDrawer/ReccomendationDrawer';
import CoverLetterSection from './coverLetterSection/CoverLetterSection';
import { useAppState, View } from '@/state/appState';

export function SplashPageButton({ nextView, displayText }: { nextView: View; displayText: string }) {
  const { triggerLoadingSequence } = useAppState();

  return (
    <span
      className="start__button"
      onClick={() => {
        triggerLoadingSequence(nextView);
      }}>
      {displayText}
      <i className="fa-solid fa-arrow-right"></i>
    </span>
  );
}

function SplashView() {
  const navbarLinks = [
    { link: '#main-section', text: 'About' },
    { link: '#featured-section', text: 'Features' },
    { link: '#utilities-section', text: 'Utilities' },
  ];
  return (
    <div id="splash" className="splash-container">
      <Navbar links={navbarLinks} />
      <div className="splash-flexbox">
        <section id="main-section">
          <MainSection />
        </section>
        <CompanyDock />

        <section id="featured-section">
          <ReccomendationDrawer />
        </section>

        <section id="utilities-section">
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
