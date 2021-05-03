import {
  generateInitialTiles,
  generateInitial2DMapReference,
  generateInitial2DMapWalkable,
  getTileByID,
} from 'utils/tiles';

import { INITIAL_ACTIVE_TILE_ID, MAP2D_SIZE } from 'engine/constants';

// Enemies
import goblin from 'game-definitions/enemies/goblin';

const tiles = generateInitialTiles(INITIAL_ACTIVE_TILE_ID);

const initialTile = getTileByID(INITIAL_ACTIVE_TILE_ID, tiles);

const level: LevelType = {
  tiles: tiles,
  initialTile: initialTile || tiles[0],
  // All Tiles available
  deck: [
    // Stair
    'stair',
    // Objective
    'objective',
    // Floors
    'floor',
    'floor',
    'floor',
    'floor', // 6 chests / 2 teleports / "will floor still be here when we have chests and teleports?"
    // Nest
    'nest',
    // Trap
    'trap',
  ],
  enemies: [],
  // All enemies on this level
  enemyDeck: [goblin],
  map2DReference: generateInitial2DMapReference(MAP2D_SIZE, INITIAL_ACTIVE_TILE_ID),
  map2DWalkable: generateInitial2DMapWalkable(MAP2D_SIZE),
  objectives: {
    found: 0,
    total: 1,
  },
};

export default level;
