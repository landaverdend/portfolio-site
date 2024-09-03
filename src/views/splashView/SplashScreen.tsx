import './splash-screen.css';
import '@styles/fonts.css';
import blurredResume from '@assets/images/blurred-resume.png';
import BackgroundCanvas from '@components/BackgroundCanvas/BackgroundCanvas.tsx';

function SplashScreen() {
  return (
    <>
      <BackgroundCanvas />
      <div className="splash-grid">
        <div className="grid-item">
          <h1 className="gothic-a1-bold">My Resume as a service</h1>
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
          <div className="img-array">
            <img id="resume" src={blurredResume} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SplashScreen;
