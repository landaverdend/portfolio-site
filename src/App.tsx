import LoadingView from '@views/loadingView/LoadingView';
import SplashView from '@views/splashView/SplashView';
import { createContext, useState } from 'react';
import ResumeView from './views/resumeView/ResumeView';

// Initial State.
export const GlobalStateContext = createContext<AppState>({
  component: <SplashView />,
  nextComponent: <></>,
  isLoading: false,
  setView: () => {},
  setIsLoading: () => {},
  setNextView: () => {},
});

// lol
type AppState = {
  component: React.ReactNode;
  nextComponent: React.ReactNode;
  isLoading: boolean;

  setView: Function;
  setIsLoading: Function;
  setNextView: Function;
};

function App() {
  const [view, setView] = useState<React.ReactNode>(<SplashView />);
  // const [view, setView] = useState<React.ReactNode>(<ResumeView />);

  const [nextView, setNextView] = useState<React.ReactNode>(<></>);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <GlobalStateContext.Provider
      value={{
        component: view,
        isLoading: isLoading,
        nextComponent: nextView,
        setView: (view: React.ReactNode) => setView(view),
        setIsLoading: (val: boolean) => setIsLoading(val),
        setNextView: (next: React.ReactNode) => setNextView(next),
      }}>
      <LoadingView>{view}</LoadingView>
    </GlobalStateContext.Provider>
  );
}

export default App;
