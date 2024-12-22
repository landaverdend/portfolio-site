import CardStack from '@components/cardStack/CardStack';
import './splash-view.css';
import '@styles/fonts.css';
import BackgroundCanvas from '@components/backgroundCanvas/BackgroundCanvas.tsx';
import { createPortal } from 'react-dom';
import ChatBubble from '@/components/chatBubble/ChatBubble';
import { useAppState } from '@/state/appState';
import { useState } from 'react';
import FakeCaptchaContainer from '@/components/fakeCaptcha/FakeCaptchaContainer';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import CompanyDock from '@/components/companyDock/CompanyDock';
import ReccomendationDrawer from './reccomendationDrawer/ReccomendationDrawer';

function SplashView() {
  const { setIsLoading, setNextView } = useAppState();
  const [displayFakeCaptcha, setDisplayFakeCaptcha] = useState(false);

  const navbarLinks = [
    { link: '#splash', text: 'About' },
    { link: '#featured', text: 'Features' },
  ];
  return (
    <div id="splash" className="splash-container">
      <Navbar links={navbarLinks} />
      <div className="splash-grid">
        <div>
          <div className="splash-grid__text-container">
            <h1 className="splash-header">My Resume as a Service</h1>
            <p>
              Join the growing number of recruiters who use my groundbreaking{' '}
              <b>
                <i>Resume as a Service</i>
              </b>{' '}
              (RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your
              recruitment game with the first-ever site designed for seamless access to my resume.
            </p>

            <div className="splash-grid__button-container">
              <span
                className="start__button"
                onClick={() => {
                  setNextView('SurveyView');
                  setIsLoading(true);
                }}>
                Get started <i className="fa-solid fa-arrow-right"></i>
              </span>
              <span className="splash-grid__subscribed-button">
                {displayFakeCaptcha ? (
                  <FakeCaptchaContainer />
                ) : (
                  <u
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setDisplayFakeCaptcha(true);
                    }}>
                    I'm already subscribed...
                  </u>
                )}
              </span>
            </div>
          </div>
        </div>
        <div>
          <CardStack />
        </div>

        {/* Featured websites and stuff. More ABOUT */}
        <CompanyDock />
        <div className="reccomendation-drawer-container">
          <ReccomendationDrawer />
        </div>
      </div>
      <Footer />
      {createPortal(<ChatBubble />, document.getElementById('root') as HTMLElement)}
      <BackgroundCanvas position={'absolute'}/>
    </div>
  );
}

export default SplashView;
