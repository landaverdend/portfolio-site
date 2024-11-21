import SplashView from '@views/splashView/SplashView';
import ResumeView from './views/resumeView/ResumeView';
import { useAppState } from './state/appState';
import LoadingView from './views/loadingView/LoadingView';
import PhysicsView from './views/SurveyView/PhysicsView';
import SurveyView from './views/SurveyView/SurveyView';

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
    case 'PhysicsView':
      renderMe = <PhysicsView />;
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
