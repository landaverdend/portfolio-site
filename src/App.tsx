import LoadingView from '@views/loadingView/LoadingView';
import SplashView from '@views/splashView/SplashView';
import ResumeView from './views/resumeView/ResumeView';
import { useAppState } from './state/appState';
import SetupView from './views/setupView/SetupView';

function App() {
  const { componentToRender } = useAppState();

  let childView = <></>;

  switch (componentToRender) {
    case 'ResumeView':
      childView = <ResumeView />;
      break;
    case 'SetupView':
      childView = <SetupView />;
      break;
    case 'SplashView':
      childView = <SplashView />;
      break;
  }

  // Loading view is basically a router that wraps whatever child...
  return <LoadingView>{childView}</LoadingView>;
}

export default App;
