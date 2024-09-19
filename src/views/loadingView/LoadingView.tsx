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
  openAnim: Animation;
  closeAnim: Animation;
};

function LoadingView(props: LoadingViewProps) {
  const { children } = props;
  const { isLoading } = useContext(GlobalStateContext);

  const [animType, setAnimType] = useState<keyof CurtainState>('closeAnim');

  useEffect(() => {
    if (isLoading) {
      setAnimType('closeAnim');
    } else {
      setAnimType('openAnim');
    }
  }, [isLoading]);

  const [lCurtainState, setLCurtainState] = useState<CurtainState>({
    openAnim: {
      start: 'lc-closed-pos',
      end: 'lc-open',
    },
    closeAnim: {
      start: 'lc-open-pos',
      end: 'lc-close',
    },
  });

  const [rCurtainState, setRCurtainState] = useState<CurtainState>({
    openAnim: {
      start: 'rc-closed-pos',
      end: 'rc-open',
    },
    closeAnim: {
      start: 'rc-open-pos',
      end: 'rc-close',
    },
  });

  return (
    <>
      <div
        className={`curtain-container`}
        onAnimationEnd={() => {
          // This will get called twice, since both children are being animated.
          console.log('ended');
        }}
        onAnimationStart={() => {
          console.log('started');
        }}>
        <div className={`curtain curtain--left-gradient ${lCurtainState[animType].start} ${lCurtainState[animType].end}`}>
          {/* <div className="curtain__stripe-left"></div> */}
          {/* <div className="curtain__stripe-left2"></div> */}
        </div>
        <div className={`curtain curtain--right-gradient ${rCurtainState[animType].start} ${rCurtainState[animType].end} `}>
          {/* <div className="curtain__stripe-right"></div> */}
        </div>
      </div>
    </>
  );
}

export default LoadingView;
