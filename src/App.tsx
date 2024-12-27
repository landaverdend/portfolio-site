import SplashView from '@views/splashView/SplashView';
import ResumeView from './views/resumeView/ResumeView';
import { useAppState } from './state/appState';
import LoadingView from './views/loadingView/LoadingView';
import SurveyView from './views/surveyView/SurveyView';
import CoverLetterGeneratorView from './views/coverLetterGeneratorView/CoverLetterGeneratorView';

function App() {
  const { componentToRender, isLoading } = useAppState();

  let renderMe = <></>;

  switch (componentToRender) {
    case 'ResumeView':
      renderMe = <ResumeView />;
      break;
    case 'SurveyView':
      renderMe = <SurveyView />;
      break;
    case 'SplashView':
      renderMe = <SplashView />;
      break;
    case 'CoverLetterGeneratorView':
      renderMe = <CoverLetterGeneratorView />;
      break;
  }

  return (
    <>
      {isLoading && <LoadingView />}
      {renderMe}
    </>
  );
}

export default App;
