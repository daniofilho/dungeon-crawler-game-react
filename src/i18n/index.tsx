import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';

import { getLocale } from './init';

import { useSettings } from 'engine/useSettings';

interface I18NContextData {
  t: I18NStrings;
  changeLocale(locale: availableLanguagesTypes): void;
}

const I18NContext = createContext<I18NContextData>({} as I18NContextData);

const I18NProvider: React.FC = ({ children }) => {
  const {
    data: { locale },
  } = useSettings();

  const [t, setT] = useState<I18NStrings>(getLocale(locale));

  // # Change a language
  const changeLocale = useCallback((newLocale: availableLanguagesTypes): void => {
    setT(getLocale(newLocale));
  }, []);

  // # Check if language has changed and change the Strings
  useEffect(() => {
    changeLocale(locale);
  }, [changeLocale, locale]);

  return <I18NContext.Provider value={{ t, changeLocale }}>{children}</I18NContext.Provider>;
};

const useI18N = (): I18NContextData => {
  const context = useContext(I18NContext);
  if (!context) throw new Error('useI18N must be used within an I18NProvider');
  return context;
};

export { I18NProvider, useI18N };
