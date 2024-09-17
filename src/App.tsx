import LoadingView from '@views/loadingView/LoadingView';
import SplashView from '@views/splashView/SplashView';
import { createContext, useState } from 'react';

// Initial State.
export const GlobalStateContext = createContext<AppState>({
  component: <SplashView />,
  isLoading: false,
  setNext: () => {},
  setIsLoading: () => {},
});

// lol
type AppState = {
  component: React.ReactNode;
  isLoading: boolean;

  setNext: Function;
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
        setNext: (next: React.ReactNode) => setView(next),
        setIsLoading: (val: boolean) => setIsLoading(val),
      }}>
      <LoadingView isLoading={isLoading}>{view}</LoadingView>
    </GlobalStateContext.Provider>
  );
}

export default App;
