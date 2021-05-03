import React, { createContext, useContext, useCallback } from 'react';

import { findKey } from 'lodash';
import uniqid from 'uniqid';

import { usePlayer } from 'engine/usePlayer';
import { useScenario } from 'engine/useScenario';

const UseEnemiesContext = createContext<UseEnemiesContextData>({} as UseEnemiesContextData);

const UseEnemiesProvider: React.FC = ({ children }) => {
  const player = usePlayer();
  const scenario = useScenario();

  const respawnAnEnemy = useCallback(
    ({ tileId, x, y }: respawnAnEnemyProps) => {
      const { enemyDeck, enemies } = scenario.currentLevel;

      // Drawn an enemy from enemy deck
      const maxLenght = enemyDeck.length - 1;
      const randomIndex = Math.floor(Math.random() * maxLenght) + 0;
      const randomEnemy = enemyDeck[randomIndex];

      // Create Enemy instance
      const newEnemy: IEnemyInstance = {
        ...randomEnemy,
        id: `${randomEnemy.type}_${uniqid()}`,
        position: {
          tileId,
          x,
          y,
        },
      };

      const newEnemyArray = enemies.concat(newEnemy);
      scenario.setActiveLevel_Enemies(newEnemyArray);
    },
    [scenario]
  );

  const respawnEnemies = useCallback(async (): Promise<void> => {
    // Get all players and enemies tiles
    const ocuppiedTiles: Array<TileIDType> = [];
    ocuppiedTiles.push(player.position.tile.id);
    scenario.currentLevel.enemies.map((e) => {
      return ocuppiedTiles.push(e.position.tileId);
    });

    // Get all tiles that are nest and are not ocuppied
    const nestTiles = scenario.currentLevel.tiles.filter((t) => {
      return t.type === 'nest' && !ocuppiedTiles.includes(t.id);
    });

    // Respawn an enemy in each empty nest tile
    nestTiles.map((nest) => {
      return respawnAnEnemy({
        tileId: nest.id,
        x: nest.x,
        y: nest.y,
      });
    });
  }, [
    player.position.tile.id,
    respawnAnEnemy,
    scenario.currentLevel.enemies,
    scenario.currentLevel.tiles,
  ]);

  const hasEnemyOnPosition = useCallback(
    (newPosition: string, enemiesPosition: Array<EnemyPositionCheckType>): boolean => {
      const has = findKey(enemiesPosition, { position: newPosition });
      return has ? true : false;
    },
    []
  );

  return (
    <UseEnemiesContext.Provider value={{ hasEnemyOnPosition, respawnAnEnemy, respawnEnemies }}>
      {children}
    </UseEnemiesContext.Provider>
  );
};

const useEnemies = (): UseEnemiesContextData => {
  const context = useContext(UseEnemiesContext);
  if (!context) throw new Error('useUseEnemies must be used within an UseEnemiesProvider');
  return context;
};

export { UseEnemiesProvider, useEnemies };
