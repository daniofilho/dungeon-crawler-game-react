import {
  generateInitialTiles,
  generateInitial2DMapReference,
  generateInitial2DMapWalkable,
  getTileByID,
} from 'utils/tiles';

import { MAP2D_SIZE, INITIAL_ACTIVE_TILE_ID } from 'engine/constants';

// Enemies
import boss from 'game-definitions/enemies/boss';

const tiles = generateInitialTiles(INITIAL_ACTIVE_TILE_ID);

// Add the Boss tile next to initial
const bossTile = tiles.filter((o) => o.adjacent && o.adjacentPosition === 'right')[0];
bossTile.type = 'stair';
bossTile.discovered = true;

// Create the Boss enemy
const bossEnemy: IEnemyInstance = {
  ...boss,
  id: `boss`,
  position: {
    tileId: bossTile.id,
    x: bossTile.x,
    y: bossTile.y,
  },
};

// Generate map references
const map2DReference = generateInitial2DMapReference(MAP2D_SIZE, INITIAL_ACTIVE_TILE_ID);
const map2DWalkable = generateInitial2DMapWalkable(MAP2D_SIZE);

// Update pre defined tiles reference
map2DReference[9][10] = INITIAL_ACTIVE_TILE_ID;
map2DReference[9][10] = '4:10';

map2DWalkable[9][10] = 0;
map2DWalkable[9][10] = 0;

const initialTile = getTileByID(INITIAL_ACTIVE_TILE_ID, tiles);

const level: LevelType = {
  tiles: tiles,
  initialTile: initialTile || tiles[0],
  // All Tiles available
  deck: [],
  enemies: [bossEnemy],
  // All enemies on this level
  enemyDeck: [boss],
  map2DReference,
  map2DWalkable,
  objectives: {
    found: 0,
    total: 0,
  },
};

export default level;
