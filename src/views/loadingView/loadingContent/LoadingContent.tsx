import LoadingBar from './loadingBar/LoadingBar';
import TriviaWidget from './trivia/TriviaWidget';
import logo from '@assets/images/logo.png';
import './logo-animations.css';
import './loading-content.css';
import { useAppState } from '@/state/appState';

function LoadingContent() {
  const { isLoading } = useAppState();
  return (
    <div className={`curtain-content `}>
      <img className={`curtain-content__logo ${isLoading ? 'logo-slide-and-bounce' : 'logo-slide-out'}`} src={logo} />
      <div className={`curtain-content__trivia ${isLoading ? 'fade-in' : 'fade-out'}`}>
        <LoadingBar />
        <TriviaWidget />
      </div>
    </div>
  );
}

export default LoadingContent;
