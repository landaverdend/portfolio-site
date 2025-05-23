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
  const { isLoadingBarDone, setIsLoading } = useAppState();
  const animType = isLoadingBarDone ? 'openAnim' : 'closeAnim';

  return (
    <>
      {
        <div className={`curtain-container`}>
          <div
            onAnimationEnd={() => {
              // the Loading state is finally considered 'done' when the curtain animation is over.
              window.scrollTo({ top: 0, behavior: 'smooth' });

              if (isLoadingBarDone) {
                setIsLoading(false);
              }
            }}
            className={`curtain curtain--left-gradient ${lCurtainState[animType]} `}>
            <div className="curtain-stripe curtain-stripe-left"></div>
            <div className="curtain-stripe curtain-stripe-left2"></div>
          </div>
          <div className={`curtain curtain--right-gradient ${rCurtainState[animType]} `}>
            <div className="curtain-stripe curtain-stripe-right"></div>
          </div>
          <LoadingContent />
        </div>
      }
    </>
  );
}

export default LoadingView;
