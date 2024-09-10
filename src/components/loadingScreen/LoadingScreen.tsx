import { ReactNode, useState } from 'react';
import './loading-screen.css';

interface LoadingScreenProps {
  children: ReactNode;
  isLoading: boolean;
}

function LoadingScreen(props: LoadingScreenProps) {
  const { children, isLoading } = props;

  return (
    <>
      <div className={`curtain-container ${isLoading ? 'curtain-container--active' : ''}`}>
        <div className="curtain curtain--left" onAnimationEnd={() => console.log('done.')}></div>
        <div className="curtain curtain--right"></div>
      </div>
      <div>{children}</div>
    </>
  );
}

export default LoadingScreen;
