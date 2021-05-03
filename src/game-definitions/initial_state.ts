import { getTileByID } from 'utils/tiles';
import { itemsConfig } from 'game-definitions/config';

import { INITIAL_ACTIVE_TILE_ID } from '../engine/constants';

import level1 from 'game-definitions/scenarios/level1';
import boss from 'game-definitions/scenarios/boss';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// # Main Game State

const levels = [level1, level1, boss];
const inital_tile = getTileByID(INITIAL_ACTIVE_TILE_ID, levels[0].tiles);

const setupInitialItems = (): Array<InventoryItemType> => {
  return itemsConfig.map((item) => {
    return {
      id: item.id,
      quantity: 0,
    };
  });
};

export const GameData_Initial: GameType = {
  turn: 'draft-and-shop',
  round: 0,
  gameOver: false,
  gameWon: false,
};

export const GamePlayer_Initial: PlayerType = {
  attributes: {
    life: 6,
    maxLife: 6,
    //
    attack: 2,
    defense: 1,
    //
    level: 1,
    experience: 0,
    experienceToNextLevel: 10,
    pointsToSpend: 0,
  },
  coins: 0,
  items: setupInitialItems(),
  position: {
    tile: inital_tile || levels[0].tiles[0],
    coordinates: {
      x: inital_tile?.x ?? levels[0].tiles[0].x,
      y: inital_tile?.y ?? levels[0].tiles[0].x,
    },
  },
};

export const GameScenario_Initial: ScenarioType = {
  activeLevel: 0,
  levels,
};
