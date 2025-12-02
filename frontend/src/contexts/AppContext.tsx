'use client';

import React, { useState } from 'react';

interface State {
  isTransitionStartOpen: boolean;
  logoUrl: string | null;
}

interface Context extends State {
  setIsTransitionStartOpen: (open: boolean) => void;
  setLogoUrl: (url: string | null) => void;
}

const defaultState: State = {
  isTransitionStartOpen: false,
  logoUrl: null,
};

const AppContext = React.createContext<Context>({
  ...defaultState,
  setIsTransitionStartOpen: () => {
    throw new Error('AppContext.setIsTransitionStartOpen has not been set');
  },
  setLogoUrl: () => {
    throw new Error('AppContext.setLogoUrl has not been set');
  },
});

function useAppProvider() {
  const [isLoaded, setIsLoaded] = useState(defaultState.isTransitionStartOpen);
  const [logoUrl, setLogoUrl] = useState<string | null>(defaultState.logoUrl);
  return {
    isTransitionStartOpen: isLoaded,
    setIsTransitionStartOpen: setIsLoaded,
    logoUrl,
    setLogoUrl,
  };
}

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props): React.JSX.Element => {
  const context = useAppProvider();

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = (): Context => React.useContext(AppContext);
