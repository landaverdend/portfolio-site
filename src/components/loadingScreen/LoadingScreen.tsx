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
      {
        <div className={'loading__container ' + (!isLoading ? 'loading__container--inactive' : 'loading__container--active')}>
          Loading...
        </div>
      }
      <div>{children}</div>
    </>
  );
}

export default LoadingScreen;
