import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';

import settings_initial from './initial_state';

interface SettingsContextData {
  data: SettingsType;
  updateSetting(key: string, value: any): void;
}

const storageKey = 'settings';

const SettingsContext = createContext<SettingsContextData>({} as SettingsContextData);

const SettingsProvider: React.FC = ({ children }) => {
  const storeData = useMemo(() => {
    const store = localStorage.getItem(storageKey);
    if (store) JSON.parse(store);
    return null;
  }, []);

  const [data, setData] = useState<SettingsType>(storeData || settings_initial);

  // Update an specific settings
  const updateSetting = (key: string, value: any): void => {
    setData((oldState: SettingsType) => {
      const newData = {
        ...oldState,
        [key]: value,
      };
      return newData;
    });
  };

  // When state changes, update store
  useEffect(() => {
    localStorage.removeItem(storageKey);
  }, [data]);

  return (
    <SettingsContext.Provider value={{ data, updateSetting }}>{children}</SettingsContext.Provider>
  );
};

const useSettings = (): SettingsContextData => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within an SettingsProvider');
  return context;
};

export { SettingsProvider, useSettings };
