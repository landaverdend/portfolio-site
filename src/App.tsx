import SplashView from '@views/splashView/SplashView';
import ResumeView from './views/resumeView/ResumeView';
import { useAppState } from './state/appState';
import SurveyView from './views/SurveyView/SurveyView';
import LoadingView from './views/loadingView/LoadingView';

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
  }

  // TODO: stop rendering the 'renderMe' component when the loading view curtains have shut. Not super important but it is technically inefficient.
  return (
    <>
      {isLoading && <LoadingView />}
      {renderMe}
    </>
  );
}

export default App;
