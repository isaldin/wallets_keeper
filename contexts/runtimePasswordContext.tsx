import React, { createContext, useEffect, useState } from 'react';

import CreatePassword from '../components/CreatePassword';
import EnterPassword from '../components/EnterPassword';
import { useDataSource } from '../hooks/useDataSource';
import { Nullable, Optional } from '../types';
import decryptStringWithPassword from '../utils/crypto/decryptStringWithPassword';
import encryptStringWithPassword from '../utils/crypto/encryptStringWithPassword';

const PASSWORD_TAG_STRING = 'success';

type RuntimePasswordContextType = {
  encryptString: (inputString: string) => string;
  decryptString: (inputString: string, password: string) => Nullable<string>;
};

// @ts-ignore
export const RuntimePasswordContext = createContext<RuntimePasswordContextType>();

export const RuntimePasswordContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [password, setPassword] = useState<Nullable<string>>(null);
  const [shouldCreatePassword, setShouldCreatePassword] = useState<boolean>(false);
  const { dataSource, setDataSource } = useDataSource();
  const [loginErrorMessage, setLoginErrorMessage] = useState<Optional<string>>();

  useEffect(() => {
    setShouldCreatePassword(!dataSource.passwordTag);
  }, [dataSource]);

  const handleCreatedPassword = (password: string) => {
    const passwordTag = encryptStringWithPassword(PASSWORD_TAG_STRING, password);
    setDataSource({ passwordTag });

    setPassword(password);
  };

  const handleLogin = (password: string) => {
    const decryptedTag = decryptStringWithPassword(dataSource.passwordTag || '', password);
    if (decryptedTag === PASSWORD_TAG_STRING) {
      setPassword(password);
    } else {
      setLoginErrorMessage('Incorrect password');
    }
  };

  if (shouldCreatePassword) {
    return <CreatePassword onPasswordEnter={handleCreatedPassword} />;
  }

  if (!password) {
    return <EnterPassword onPasswordEnter={handleLogin} errorMessage={loginErrorMessage} />;
  }

  return (
    <RuntimePasswordContext.Provider
      value={{
        encryptString: (inputString: string) => {
          return encryptStringWithPassword(inputString, password);
        },
        decryptString: decryptStringWithPassword,
      }}
    >
      {props.children}
    </RuntimePasswordContext.Provider>
  );
};
