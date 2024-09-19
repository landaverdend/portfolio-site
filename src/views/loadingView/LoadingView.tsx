import { ReactNode, useContext, useEffect, useState } from 'react';
import './loading-view.css';
import logo from '@assets/images/logo.png';
import LoadingBar from '@components/loadingBar/LoadingBar';
import TriviaWidget from '@components/widgets/trivia/TriviaWidget';
import { GlobalStateContext } from '@/App';

interface LoadingViewProps {
  children: ReactNode;
}

type Animation = {
  start: string; // the position to start the animation at (in css)
  end: string; // the position to end the animation at (in css)
};

// The State of the Curtain (which class to render)
type CurtainState = {
  openAnim: string;
  closeAnim: string;
};

function LoadingView(props: LoadingViewProps) {
  const { children } = props;
  const { isLoading } = useContext(GlobalStateContext);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [animType, setAnimType] = useState<keyof CurtainState>('closeAnim');

  useEffect(() => {
    setIsAnimating(true);
  }, [isLoading]);
  const [lCurtainState, setLCurtainState] = useState<CurtainState>({
    openAnim: 'lc-open',
    closeAnim: 'lc-close',
  });

  const [rCurtainState, setRCurtainState] = useState<CurtainState>({
    openAnim: 'rc-open',
    closeAnim: 'rc-close',
  });

  return (
    <>
      {isLoading && (
        <div
          className={`curtain-container`}
          onAnimationEnd={() => {
            // This will get called twice, since both children are being animated.
            setAnimType('closeAnim');
            setIsAnimating(false);
          }}>
          <div className={`curtain curtain--left-gradient ${lCurtainState[animType]} `}>
            <div className="curtain__stripe-left"></div>
            <div className="curtain__stripe-left2"></div>
          </div>
          <div className={`curtain curtain--right-gradient ${rCurtainState[animType]} `}>
            <div className="curtain__stripe-right"></div>
          </div>
          <div className="curtain-content">
            <img className="curtain-content__image " src={logo} />
            <div className="curtain-content__trivia">
              <LoadingBar />
              <TriviaWidget />
            </div>
          </div>
        </div>
      )}
      {(!isLoading || isAnimating) && children}
    </>
  );
}

export default LoadingView;
