import React, { createContext, useContext, useState } from 'react';

const UseAttackWindowContext = createContext<UseAttackWindowContextData>(
  {} as UseAttackWindowContextData
);

const UseAttackWindowProvider: React.FC = ({ children }) => {
  const [attackWindow, setAttackWindow] = useState<AttackWindowType>({
    open: false,
    enemyID: '',
  });

  return (
    <UseAttackWindowContext.Provider
      value={{
        attackWindow,
        setAttackWindow,
      }}
    >
      {children}
    </UseAttackWindowContext.Provider>
  );
};

const useAttackWindow = (): UseAttackWindowContextData => {
  const context = useContext(UseAttackWindowContext);
  if (!context) throw new Error('useActionsPopup must be used within an UseAttackWindowProvider');
  return context;
};

export { UseAttackWindowProvider, useAttackWindow };
