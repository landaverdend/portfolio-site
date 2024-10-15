import SplashView from '@views/splashView/SplashView';
import ResumeView from './views/resumeView/ResumeView';
import { useAppState } from './state/appState';
import SetupView from './views/setupView/SetupView';
import LoadingView from './views/loadingView/LoadingView';

function App() {
  const { componentToRender } = useAppState();

  let renderMe = <></>;

  switch (componentToRender) {
    case 'ResumeView':
      renderMe = <ResumeView />;
      break;
    case 'SetupView':
      renderMe = <SetupView />;
      break;
    case 'SplashView':
      renderMe = <SplashView />;
      break;
  }

  // TODO: stop rendering the 'renderMe' component when the loading view curtains have shut. Not super important but it is technically inefficient.
  return (
    <>
      <LoadingView />
      {renderMe}
    </>
  );
}

export default App;
