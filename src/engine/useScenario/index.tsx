import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  useCallback,
} from 'react';

import produce from 'immer';

import { GameScenario_Initial } from '../../game-definitions/initial_state';

import * as GameReducer from './reducer';
import mapReducerActions from 'lib/mapReducerActions';
import { useGame } from '../useGame';

const storageKey = 'scenario';

const UseScenarioContext = createContext<UseScenarioContextData>({} as UseScenarioContextData);

const UseScenarioProvider: React.FC = ({ children }) => {
  const game = useGame();

  // # Stores
  const storeData = useMemo(() => {
    const store = localStorage.getItem(storageKey);
    if (store) JSON.parse(store);
    return null;
  }, []);

  // # Reducer
  const initialData: ScenarioType = storeData || GameScenario_Initial;
  const [state, dispatch] = useReducer(GameReducer.reducer, {
    ...initialData,
  });
  const actions: UseScenarioActionsType = useMemo(
    () => mapReducerActions(GameReducer.actions, dispatch),
    []
  );
  const reducer: UseScenarioReducerType = useMemo(() => ({ state, actions }), [actions, state]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const clear = useCallback(() => {
    actions.setScenario(GameScenario_Initial);
    localStorage.removeItem(storageKey);
  }, [actions]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # When state changes, update store
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reducer.state));
  }, [storeData, reducer.state]);

  // Constants

  const scenario = state;

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Flags

  const currentLevel = useMemo(() => {
    return scenario.levels[scenario.activeLevel];
  }, [scenario.activeLevel, scenario.levels]);

  // Are there new tiles to discover?
  const hasTilesToDiscover = useMemo(() => {
    const { deck } = currentLevel;
    if (deck.length <= 0) return false;
    return true;
  }, [currentLevel]);

  const isStairLocked = useMemo(() => {
    const { total, found } = scenario.levels[scenario.activeLevel].objectives;
    return found < total;
  }, [scenario.activeLevel, scenario.levels]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Enemy

  const getEnemyByID = useCallback(
    (id: EnemyIDType): IEnemyInstance | null => {
      const { enemies } = currentLevel;
      const enemy = enemies.find((o) => o.id === id);
      return enemy ? enemy : null;
    },
    [currentLevel]
  );

  const setEnemyLife = useCallback(
    (enemyId: string, newLife: number) => {
      let newEnemies: Array<IEnemyInstance> = [];

      // if dead, remove enemy
      if (newLife <= 0) {
        newEnemies = currentLevel.enemies.filter((enemy) => {
          if (enemy.id !== enemyId) return enemy;
        });
      } else {
        // not dead, only change life
        newEnemies = currentLevel.enemies.filter((enemy) => {
          if (enemy.id !== enemyId) return enemy;

          if (enemy.id === enemyId) {
            return produce(enemy, (draftEnemy) => {
              draftEnemy.life = newLife;
              return draftEnemy;
            });
          }
        });
      }

      actions.setActiveLevel_Enemies(newEnemies);
    },
    [actions, currentLevel.enemies]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # 2D Map

  const setMap2DReference = useCallback(
    (p0: number, p1: number, tileID: TileIDType) => {
      const newMap2DReference = produce(currentLevel.map2DReference, (draftState) => {
        draftState[p0][p1] = tileID;
      });

      reducer.actions.setActiveLevel_Map2DReference(newMap2DReference);
    },
    [currentLevel.map2DReference, reducer.actions]
  );

  const setMap2DWalkable = useCallback(
    (p0: number, p1: number, walkable: boolean) => {
      const newMap2DWalkable = produce(currentLevel.map2DWalkable, (draftState) => {
        draftState[p0][p1] = walkable ? 0 : 1;
      });

      reducer.actions.setActiveLevel_Map2DWalkable(newMap2DWalkable);
    },
    [currentLevel.map2DWalkable, reducer.actions]
  );

  const updateCurrentMap2D = useCallback(
    (p0: number, p1: number, tileID: TileIDType, walkable: boolean) => {
      setMap2DReference(p0, p1, tileID);
      setMap2DWalkable(p0, p1, walkable);
    },
    [setMap2DReference, setMap2DWalkable]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Find an objective on an scenario
  const findAnObjective = useCallback(() => {
    reducer.actions.setActiveLevel_ObjectivesFound(currentLevel.objectives.found + 1);
  }, [currentLevel.objectives.found, reducer.actions]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Change Scenario Leve

  const goToNextLevel = useCallback((): TileType | null => {
    if (scenario.activeLevel === scenario.levels.length - 1) {
      game.setGameWon(true);
      return null;
    }

    // Change the level
    reducer.actions.setActiveLevel(scenario.activeLevel + 1);

    // Return the initial tile so other functions can handle it (like setting the player position)
    return reducer.state.levels[reducer.state.activeLevel].initialTile;
  }, [
    game,
    reducer.actions,
    reducer.state.activeLevel,
    reducer.state.levels,
    scenario.activeLevel,
    scenario.levels.length,
  ]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <UseScenarioContext.Provider
      value={{
        ...reducer.state,
        ...reducer.actions,

        clear,

        currentLevel,
        hasTilesToDiscover,
        isStairLocked,

        setEnemyLife,
        getEnemyByID,

        updateCurrentMap2D,

        findAnObjective,

        goToNextLevel,
      }}
    >
      {children}
    </UseScenarioContext.Provider>
  );
};

const useScenario = (): UseScenarioContextData => {
  const context = useContext(UseScenarioContext);
  if (!context) throw new Error('useGame must be used within an UseScenarioProvider');
  return context;
};

export { UseScenarioProvider, useScenario };
