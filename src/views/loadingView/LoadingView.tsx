import { ReactNode, useContext, useEffect, useState } from 'react';
import './loading-view.css';
import logo from '@assets/images/logo.png';
import LoadingBar from '@components/loadingBar/LoadingBar';
import TriviaWidget from '@components/widgets/trivia/TriviaWidget';
import { GlobalStateContext } from '@/App';

interface LoadingViewProps {
  children: ReactNode;
}

type AnimationState = 'idle' | 'running' | 'done';

function LoadingView(props: LoadingViewProps) {
  const { children } = props;
  const { isLoading } = useContext(GlobalStateContext);

  // NOTE: The 'closing' state is when the curtains close, so it should be initiated when isLoading
  const [openAnimationState, setOpenAnimationState] = useState<AnimationState>('idle');
  const [closeAnimationState, setCloseAnimationState] = useState<AnimationState>('idle');

  useEffect(() => {
    // The start animation will
    if (isLoading) {
      setCloseAnimationState('running');
      console.log(isLoading);
    }
  }, [isLoading]);

  let animationClass = '';

  if (closeAnimationState === 'running' || closeAnimationState === 'done') animationClass = 'close';
  if (openAnimationState === 'running') animationClass = 'open';

  return (
    <>
      <div
        className={`curtain-container ${!isLoading ? 'hidden' : ''}`}
        onAnimationEnd={() => {
          // This will get called twice, since both children are being animated. This shouldn't be an issue.
          setCloseAnimationState('done');
        }}>
        <div className={`curtain curtain--left ${animationClass}-left`}>
          {/* <div className="curtain__stripe-left"></div> */}
          {/* <div className="curtain__stripe-left2"></div> */}
        </div>
        <div className={`curtain curtain--right ${animationClass}-right`}>
          {/* <div className="curtain__stripe-right"></div> */}
        </div>
      </div>

      {/* Control whether or not to render children during the animation. */}
      {(closeAnimationState === 'running' || closeAnimationState === 'idle') && children}

      {/* Controls for the trivia/loading bar. */}
      {closeAnimationState === 'done' && (
        <div className="curtain-content">
          <img className="curtain-content__image " src={logo} />
          <div className="curtain-content__trivia">
            <LoadingBar />
            <TriviaWidget />
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingView;
