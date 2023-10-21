import {createContext} from 'react';

interface IAuthContext {
  user?: {
    username: string;
    password: string;
  };
  setUser: Function;
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  chekingAuthentication: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: undefined,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  chekingAuthentication: true,
});

export default AuthContext;
