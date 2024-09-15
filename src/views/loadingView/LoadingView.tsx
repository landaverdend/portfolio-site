import { ReactNode, useState } from 'react';
import './loading-view.css';
import logo from '@assets/images/logo.png';
import LoadingBar from '@components/loadingBar/LoadingBar';
import TriviaWidget from '@components/widgets/trivia/TriviaWidget';

interface LoadingViewProps {
  children: ReactNode;
  isLoading: boolean;
}

function LoadingView(props: LoadingViewProps) {
  const { children, isLoading } = props;
  const [curtainAnimationDone, setCurtainAnimationDone] = useState(false);

  return (
    <>
      <div className={`curtain-container ${isLoading ? 'curtain-container--active' : ''}`}>
        <div
          className="curtain curtain--left"
          onAnimationEnd={() => {
            setCurtainAnimationDone(true);
          }}>
          <div className="curtain__stripe-left"></div>
          <div className="curtain__stripe-left2"></div>

        </div>
        <div
          className="curtain curtain--right"
          onAnimationEnd={() => {
            setCurtainAnimationDone(true);
          }}>
          <div className="curtain__stripe-right"></div>
        </div>
      </div>

      {!curtainAnimationDone ? (
        <>{children}</>
      ) : (
        <>
          <div className="curtain-content">
            <img className="curtain-content__image " src={logo} />
            <div className="curtain-content__trivia">
              <LoadingBar />
              <TriviaWidget />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoadingView;
