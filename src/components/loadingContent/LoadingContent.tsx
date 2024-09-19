import LoadingBar from './loadingBar/LoadingBar';
import TriviaWidget from './trivia/TriviaWidget';
import logo from '@assets/images/logo.png';
import './logo-animations.css';
import './loading-content.css';

function LoadingContent() {
  return (
    <div className="curtain-content">
      <img className="curtain-content__image" src={logo} />
      <div className="curtain-content__trivia">
        <LoadingBar />
        <TriviaWidget />
      </div>
    </div>
  );
}

export default LoadingContent;
