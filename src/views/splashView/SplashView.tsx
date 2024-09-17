import CardStack from '@components/cardStack/CardStack';
import './splash-view.css';
import '@styles/fonts.css';
import BackgroundCanvas from '@components/backgroundCanvas/BackgroundCanvas.tsx';
import { useContext } from 'react';
import { GlobalStateContext } from '@/App';

function SplashView() {
  const stateContext = useContext(GlobalStateContext);

  const handleTransition = () => {
    stateContext.setIsLoading(true);
  };

  return (
    <>
      <div className="splash-grid inter">
        <div className="griditem">
          <div className="splashtext__container">
            <h1 className="gothic-a1-bold">My Resume as a Service</h1>
            <p className="inter">
              Join the growing number of recruiters who use my groundbreaking
              <b>
                <i>Resume as a Service</i>
              </b>
              (RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your
              recruitment game with the first-ever site designed for seamless access to my resume.
            </p>

            <span className="start__button" onClick={handleTransition}>
              Get started <i className="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </div>
        <div className="griditem">
          <CardStack />
        </div>
      </div>
      <BackgroundCanvas />
    </>
  );
}

export default SplashView;
