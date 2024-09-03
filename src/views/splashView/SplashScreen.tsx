import CardStack from '@/components/cardStack/CardStack';
import './splash-screen.css';
import '@styles/fonts.css';
import BackgroundCanvas from '@components/backgroundCanvas/BackgroundCanvas.tsx';

function SplashScreen() {
  return (
    <>
      <div className="splash-grid">
        <div className="grid-item">
          <h1 className="gothic-a1-bold">My Resume as a Service</h1>
          <p className="inter">
            Join the growing number of recruiters who use my groundbreaking{' '}
            <b>
              <i>Resume as a Service</i>
            </b>{' '}
            (RaaS) platform to gain access to my resume effortlessly. Streamline your hiring process and elevate your recruitment
            game with the first-ever site designed for seamless access to my resume.
          </p>
        </div>
        <div className="grid-item">
          <CardStack />
        </div>
      </div>
      <BackgroundCanvas />
    </>
  );
}

export default SplashScreen;
