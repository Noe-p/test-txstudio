import { strapiApi } from '@/services/strapi/api';
import { HttpService } from '@/services/strapi/httpService';
import { User } from '@/types/strapi/auth';
import React, { useEffect, useState } from 'react';

interface State {
  currentUser: User | undefined;
  token: string;
  isLoaded: boolean;
}

interface Context extends State {
  setToken: (token: string) => void;
  removeToken: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: () => boolean;
}

const defaultState: State = {
  currentUser: undefined,
  token: '',
  isLoaded: false,
};

const AuthContext = React.createContext<Context>({
  ...defaultState,
  setToken: () => {
    throw new Error('AuthContext.setToken has not been set');
  },
  removeToken: () => {
    throw new Error('AuthContext.removeToken has not been set');
  },
  refreshUser: () => {
    throw new Error('AuthContext.refreshUser has not been set');
  },
  isAuthenticated: () => {
    throw new Error('AuthContext.isAuthenticated has not been set');
  },
});

function useAuthProvider() {
  const [token, setStateToken] = useState('');
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoaded, setIsLoaded] = useState(false);

  async function refreshUser() {
    if (token === '') {
      setCurrentUser(undefined);
      return;
    }
    try {
      const user = await strapiApi.auth.me();
      setCurrentUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      console.error('[AuthContext] Error fetching user:', e);
      const user = window.localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user) as User);
      } else {
        setCurrentUser(undefined);
      }
    }
  }

  function setToken(newToken: string) {
    setStateToken(newToken);
    window.localStorage?.setItem('jwt', newToken);
    HttpService.setToken(newToken);
  }

  function isAuthenticated(): boolean {
    return token !== '';
  }

  async function removeToken() {
    localStorage.clear();
    setToken('');
  }

  // Charger le token au démarrage
  useEffect(() => {
    const storedToken = window.localStorage?.getItem('jwt') ?? '';
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    currentUser,
    token,
    setToken,
    removeToken,
    refreshUser,
    isAuthenticated,
    isLoaded,
  };
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props): React.JSX.Element => {
  const context: Context = useAuthProvider();

  return (
    <AuthContext.Provider value={context}>
      {context.isLoaded ? children : <></>}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): Context => React.useContext(AuthContext);
