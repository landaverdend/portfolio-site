import { ReactNode, useState } from 'react';
import './loading-screen.css';
import logo from '@assets/images/logo.png';

interface LoadingScreenProps {
  children: ReactNode;
  isLoading: boolean;
}

function LoadingScreen(props: LoadingScreenProps) {
  const { children, isLoading } = props;
  const [curtainAnimationDone, setCurtainAnimationDone] = useState(false);

  return (
    <>
      <div className={`curtain-container ${isLoading ? 'curtain-container--active' : ''}`}>
        <div
          className="curtain curtain--left"
          onAnimationEnd={() => {
            setCurtainAnimationDone(true);
          }}></div>
        <div
          className="curtain curtain--right"
          onAnimationEnd={() => {
            setCurtainAnimationDone(true);
          }}></div>
      </div>

      {!curtainAnimationDone ? (
        <div>{children}</div> // render the children
      ) : (
        <div className="curtain-content">
          <img className="curtain-content__image" src={logo} />
        </div>
      )}
    </>
  );
}

export default LoadingScreen;
