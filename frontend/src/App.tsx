import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SplashView from '@views/splashView/SplashView';
import ResumeView from './views/resumeView/ResumeView';
import { useAppState } from './state/appState';
import LoadingView from './views/loadingView/LoadingView';
import CoverLetterGeneratorView from './views/coverLetterGeneratorView/CoverLetterGeneratorView';

function App() {
  const { componentToRender, isLoading, setView } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  // Map components to paths
  const componentMap: Record<string, JSX.Element> = {
    ResumeView: <ResumeView />,
    SplashView: <SplashView />,
    CoverLetterGeneratorView: <CoverLetterGeneratorView />,
  };

  // Navigate to the correct route dynamically when `componentToRender` changes
  useEffect(() => {
    if (componentToRender && location.pathname !== `/${componentToRender}`) {
      navigate(`/${componentToRender}`);
    }
  }, [componentToRender, navigate, location.pathname]);

  // Determine the component to render based on the current path
  const currentComponent = componentMap[location.pathname.slice(1)] || <SplashView />;

  // Override browser's back button globally
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault(); // Prevent default browser behavior
      navigate('/SplashView'); // Redirect to the main page
      setView('SplashView');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingView />}
      {currentComponent}
    </>
  );
}

export default App;
