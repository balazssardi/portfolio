import { useContext } from 'react';
import { GlobalContext, type GlobalContextValue } from '../layout';

export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};