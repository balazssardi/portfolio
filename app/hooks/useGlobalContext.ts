// hooks/useGlobalContext.ts (or wherever you prefer to keep your hooks)
import { useContext } from 'react';
import { GlobalContext, type GlobalContextValue } from '../layout'; // Adjust the import path

export const useGlobalContext = (): GlobalContextValue => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};