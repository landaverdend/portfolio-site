import { ReactNode, useContext, useEffect, useState } from 'react';
import './loading-view.css';
import { GlobalStateContext } from '@/App';
import LoadingContent from '@/components/loadingContent/LoadingContent';

interface LoadingViewProps {
  children: ReactNode;
}

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
          <LoadingContent />
        </div>
      )}
      {(!isLoading || isAnimating) && children}
    </>
  );
}

export default LoadingView;
