import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SplashView from '@views/splashView/SplashView';
import ResumeView from './views/resumeView/ResumeView';
import { useAppState } from './state/appState';
import LoadingView from './views/loadingView/LoadingView';
import CoverLetterGeneratorView from './views/coverLetterGeneratorView/CoverLetterGeneratorView';
import { establishHandshake } from './api/backend';

function App() {
  const { componentToRender, isLoading, setSessionToken, setView } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  // Map components to paths
  const componentMap: Record<string, JSX.Element> = {
    resume: <ResumeView />,
    splash: <SplashView />,
    cover_letter: <CoverLetterGeneratorView />,
  };

  // Navigate to the correct route dynamically when `componentToRender` changes
  useEffect(() => {
    if (componentToRender && location.pathname !== `/${componentToRender}`) {
      navigate(`/${componentToRender}`);
    }
  }, [componentToRender, navigate, location.pathname]);

  useEffect(() => {
    switch (location.pathname) {
      case '/splash':
        setView('splash');
        break;
      case '/cover_letter':
        setView('cover_letter');
        break;
      case '/resume':
        setView('resume');
        break;
      default:
        setView('resume');
        break;
    }

  }, []);

  // Determine the component to render based on the current path
  const currentComponent = componentMap[location.pathname.slice(1)] || <ResumeView />;

  // Establish handshake with the backend.
  useEffect(() => {
    establishHandshake()
      .then((response) => {
        setSessionToken(response.sessionToken);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {isLoading && <LoadingView />}
      {currentComponent}
    </>
  );
}

export default App;
