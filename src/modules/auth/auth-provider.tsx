import React, {ReactNode, useState} from 'react';
import AuthContext from './auth-context';
import {useDidMount} from 'rooks';
import EncryptedStorage from 'react-native-encrypted-storage';
import {timeout} from '@utils/timeout';

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chekingAuthentication, setChekingAuthentication] = useState(true);

  useDidMount(async () => {
    await timeout(3000);
    const saveduser = await EncryptedStorage.getItem('user');
    if (saveduser) {
      setUser(JSON.parse(saveduser));
      const authenticated = await EncryptedStorage.getItem('authenticated');
      if (authenticated && JSON.parse(authenticated)) {
        setIsAuthenticated(true);
      }
    }
    setChekingAuthentication(false);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        chekingAuthentication,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
