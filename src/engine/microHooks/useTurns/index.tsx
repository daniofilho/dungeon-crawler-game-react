import React, { createContext, useContext, useCallback } from 'react';

import produce from 'immer';
import { findKey } from 'lodash';
import PF from 'pathfinding';
import gsap from 'gsap';

import { gameConfig } from 'game-definitions/config';

import { usePlayer } from 'engine/usePlayer';
import { useScenario } from 'engine/useScenario';
import { useGame } from 'engine/useGame';

import { useScreen } from 'engine/microHooks/useScreen';
import { useEnemies } from 'engine/microHooks/useEnemies';
import { useDraft } from 'engine/microHooks/useDraft';

import { get2DMapTileIndexByTileId, getTileByID } from 'utils/tiles';

const UseTurnsContext = createContext<UseTurnsContextData>({} as UseTurnsContextData);

const UseTurnsProvider: React.FC = ({ children }) => {
  const player = usePlayer();
  const scenario = useScenario();
  const game = useGame();
  const draft = useDraft();
  const screen = useScreen();
  const enemies = useEnemies();

  // DraftNShop
  const handleDraftNShopTurn = useCallback(() => {
    draft.startDraftTurn();
  }, [draft]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Actions

  const handleActionsTurn = useCallback(() => {}, []);

  const startActionsTurn = useCallback(() => {
    game.setTurn('actions');

    handleActionsTurn();
  }, [game, handleActionsTurn]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Enemy

  const finishEnemyTurn = useCallback(() => {
    enemies.respawnEnemies().then(() => {
      const newRound = game.round + 1;
      game.setRound(newRound);
      game.setTurn('draft-and-shop');

      // Check if game is over based on turns quantity
      if (newRound > gameConfig.maxTurnsToWin) return game.setGameOver(true);

      player.resetPlayerItems();

      handleDraftNShopTurn();
    });
  }, [enemies, game, player, handleDraftNShopTurn]);

  const hasEnemyOnPosition = useCallback(
    (newPosition: string, enemiesPosition: Array<EnemyPositionCheckType>): boolean => {
      const has = findKey(enemiesPosition, { position: newPosition });
      return has ? true : false;
    },
    []
  );

  const handleEnemyTurn = useCallback(async () => {
    // Get player position on reference 2d map
    const playerTileId = player.position.tile.id;
    const playerPosition = get2DMapTileIndexByTileId(
      playerTileId,
      scenario.currentLevel.map2DReference
    );
    const p0 = playerPosition[0];
    const p1 = playerPosition[1];

    let hasEnemyAnimation = false;

    // Discover pathing for each enemy
    const mapEnemies = async (enemies: Array<IEnemyInstance>): Promise<Array<IEnemyInstance>> => {
      // faz um promise normal

      const newEnemies: Array<IEnemyInstance> = [];

      // create aux array to check enemies position and prevent them to be on same tile at same time
      let enemiesPosition: Array<EnemyPositionCheckType> = enemies.map((e) => {
        return {
          id: e.id,
          position: e.position.tileId,
        };
      });

      const tl = gsap.timeline();

      enemies.map(async (enemy: IEnemyInstance) => {
        // Get enemy position on reference 2d map
        const enemyPosition = get2DMapTileIndexByTileId(
          enemy.position.tileId,
          scenario.currentLevel.map2DReference
        );
        const e0 = enemyPosition[0];
        const e1 = enemyPosition[1];

        // find possible path
        const grid = new PF.Grid(scenario.currentLevel.map2DWalkable);
        const finder = new PF.AStarFinder();
        const path = finder.findPath(e1, e0, p1, p0, grid); // y, x, y, x, grid

        // If don't find a path, keep on position
        if (!path || path.length === 0) {
          newEnemies.push(enemy);
          return enemy;
        }

        // get new position info
        const pathIndex = enemy.speed < path.length ? enemy.speed : 0; // move based on enemy speed
        const newPosition = path[pathIndex];

        const newTileId = scenario.currentLevel.map2DReference[newPosition[1]][newPosition[0]]; // y, x
        const newTile = getTileByID(newTileId, scenario.currentLevel.tiles);

        // If next position is the player position, don't move
        if (newPosition[0] === p1 && newPosition[1] === p0) {
          newEnemies.push(enemy);
          return enemy;
        }

        // If next position is other enemy position, don't move
        if (hasEnemyOnPosition(newTileId, enemiesPosition)) {
          newEnemies.push(enemy);
          return enemy;
        }

        // update enemy props
        enemy = produce(enemy, (draftEnemy) => {
          return {
            ...draftEnemy,
            position: {
              x: newTile?.x ?? 0,
              y: newTile?.y ?? 0,
              tileId: newTileId,
            },
          };
        });

        // update enemy position os array check
        enemiesPosition = produce(
          enemiesPosition,
          (draftEnemiesPosition: Array<EnemyPositionCheckType>) => {
            const index = findKey(draftEnemiesPosition, { id: enemy.id });
            if (index) draftEnemiesPosition[Number(index)].position = newTileId;

            return draftEnemiesPosition;
          }
        );

        // Add enemy info
        newEnemies.push(enemy);

        // # Animaiton
        hasEnemyAnimation = true;

        // ## Center screen enemy
        // @TODO
        /*tl.to(`#map`, {
          scrollTo: {
            x: newTile.x,
            y: newTile.y,
          },
          duration: 1,
          ease: 'Back.easeInOut',
        });*/

        // ## animate enemy
        if (newTile && newTile.x && newTile.y) {
          tl.to(`#${enemy.id}`, {
            left: newTile.x,
            top: newTile.y,
            duration: 2,
            ease: 'Back.easeInOut',
          });
        }
      });

      if (hasEnemyAnimation) await tl.play();

      return newEnemies;
    };

    mapEnemies(scenario.currentLevel.enemies).then((newEnemies: Array<IEnemyInstance>) => {
      scenario.setActiveLevel_Enemies(newEnemies);

      // recenter screen on player
      screen.centerScreenOnPlayer();

      // End turn - but first await center screen animation
      return setTimeout(
        () => {
          finishEnemyTurn();
        },
        hasEnemyAnimation ? 1000 : 100
      );
    });
  }, [player.position.tile.id, scenario, hasEnemyOnPosition, screen, finishEnemyTurn]);

  const starEnemyTurn = useCallback(() => {
    game.setTurn('enemy');
    handleEnemyTurn();
  }, [game, handleEnemyTurn]);

  const finishDraftNShopTurn = useCallback(
    (draftedItems: DraftedItemsType) => {
      // Give items to player
      draftedItems.map((item) => {
        return player.addItemQuantity({
          itemId: item.id,
          quantity: 1,
        });
      });

      // Start next turn
      startActionsTurn();
    },
    [player, startActionsTurn]
  );

  return (
    <UseTurnsContext.Provider value={{ startActionsTurn, starEnemyTurn, finishDraftNShopTurn }}>
      {children}
    </UseTurnsContext.Provider>
  );
};

const useTurns = (): UseTurnsContextData => {
  const context = useContext(UseTurnsContext);
  if (!context) throw new Error('useUseTurns must be used within an UseTurnsProvider');
  return context;
};

export { UseTurnsProvider, useTurns };
