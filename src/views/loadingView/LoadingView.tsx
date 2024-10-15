import { useEffect, useRef, useState } from 'react';
import './loading-view.css';
import LoadingContent from './loadingContent/LoadingContent';
import { useAppState } from '@/state/appState';

// The State of the Curtain (which class to render)
export type CurtainState = {
  openAnim: string;
  closeAnim: string;
};

const lCurtainState: CurtainState = {
  openAnim: 'lc-open',
  closeAnim: 'lc-close',
};

const rCurtainState: CurtainState = {
  openAnim: 'rc-open',
  closeAnim: 'rc-close',
};

function LoadingView() {
  const { isLoading } = useAppState();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animType, setAnimType] = useState<keyof CurtainState>('closeAnim');

  const hasRenderedOnce = useRef(false);

  useEffect(() => {
    // Skip effect on initial render
    if (!hasRenderedOnce.current) {
      hasRenderedOnce.current = true;
      return;
    }

    setIsAnimating(true);

    // Set the animation type depending on the loading state.
    const animType: keyof CurtainState = isLoading ? 'closeAnim' : 'openAnim';
    setAnimType(animType);
  }, [isLoading]);

  return (
    <>
      {(isLoading || isAnimating) && (
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
    </>
  );
}

export default LoadingView;
