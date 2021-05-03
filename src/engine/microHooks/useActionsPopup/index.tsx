import React, { createContext, useCallback, useContext, useState } from 'react';

const UseActionsPopupContext = createContext<UseActionsPopupContextData>(
  {} as UseActionsPopupContextData
);

const UseActionsPopupProvider: React.FC = ({ children }) => {
  const [actionPopUp, setActionPopUp] = useState<ActionPopUpType>({
    isOpen: false,
    x: 0,
    y: 0,
    triggeredBy: 'tile',
    triggeredBy_ElementID: '',
  });

  const hideActionMenu = useCallback((): void => {
    setActionPopUp({
      isOpen: false,
      x: 0,
      y: 0,
      triggeredBy: 'tile',
      triggeredBy_ElementID: '',
    });
  }, []);

  const showActionMenu = ({
    x,
    y,
    tile,
    triggeredBy,
    triggeredBy_ElementID,
  }: showActionMenuProps): void => {
    setActionPopUp({
      isOpen: true,
      x,
      y,
      tile,
      triggeredBy,
      triggeredBy_ElementID,
    });
  };

  return (
    <UseActionsPopupContext.Provider
      value={{
        actionPopUp,
        setActionPopUp,

        hideActionMenu,
        showActionMenu,
      }}
    >
      {children}
    </UseActionsPopupContext.Provider>
  );
};

const useActionsPopup = (): UseActionsPopupContextData => {
  const context = useContext(UseActionsPopupContext);
  if (!context) throw new Error('useActionsPopup must be used within an UseActionsPopupProvider');
  return context;
};

export { UseActionsPopupProvider, useActionsPopup };
