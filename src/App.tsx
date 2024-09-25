import LoadingView from '@views/loadingView/LoadingView';
import SplashView from '@views/splashView/SplashView';
import { createContext, useState } from 'react';

// Initial State.
export const GlobalStateContext = createContext<AppState>({
  component: <SplashView />,
  isLoading: false,
  setView: () => {},
  setIsLoading: () => {},
});

// lol
type AppState = {
  component: React.ReactNode;
  isLoading: boolean;

  setView: Function;
  setIsLoading: Function;
};

function App() {
  const [view, setView] = useState<React.ReactNode>(<SplashView />);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <GlobalStateContext.Provider
      value={{
        component: view,
        isLoading: isLoading,
        setView: (next: React.ReactNode) => setView(next),
        setIsLoading: (val: boolean) => setIsLoading(val),
      }}>
      <LoadingView>{view}</LoadingView>
    </GlobalStateContext.Provider>
  );
}

export default App;
