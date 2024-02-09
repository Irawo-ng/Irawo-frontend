/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [messageState, setMessageState] = useState({
    categories: '',
    scenario: '',
    roles: '',
  });

  return (
    <AppContext.Provider value={{ messageState, setMessageState }}>
      {children}
    </AppContext.Provider>
  );
};
