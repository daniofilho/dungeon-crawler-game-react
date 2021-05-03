import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  useCallback,
} from 'react';

import { GameData_Initial } from '../../game-definitions/initial_state';

import * as GameReducer from './reducer';
import mapReducerActions from 'lib/mapReducerActions';

const storageKey = 'game';

const UseGameContext = createContext<UseGameContextData>({} as UseGameContextData);

const GameProvider: React.FC = ({ children }) => {
  // # Stores
  const storeData = useMemo(() => {
    const store = localStorage.getItem(storageKey);
    if (store) JSON.parse(store);
    return null;
  }, []);

  // # Reducer
  const initialData: GameType = storeData || GameData_Initial;
  const [state, dispatch] = useReducer(GameReducer.reducer, {
    ...initialData,
  });
  const actions: UseGameActionsType = useMemo(
    () => mapReducerActions(GameReducer.actions, dispatch),
    []
  );
  const reducer: UseGameReducerType = useMemo(() => ({ state, actions }), [actions, state]);

  // # When state changes, update store
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reducer.state));
  }, [storeData, reducer.state]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const clear = useCallback(() => {
    actions.setGame(GameData_Initial);
    localStorage.removeItem(storageKey);
  }, [actions]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <UseGameContext.Provider
      value={{
        ...reducer.state,
        ...reducer.actions,

        clear,
      }}
    >
      {children}
    </UseGameContext.Provider>
  );
};

const useGame = (): UseGameContextData => {
  const context = useContext(UseGameContext);
  if (!context) throw new Error('useGame must be used within an UseGameProvider');
  return context;
};

export { GameProvider, useGame };
