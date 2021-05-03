import { generateTileID } from 'utils/tiles';
import { tilesConfig } from 'game-definitions/config';

const INITIAL_ACTIVE_X = Math.floor(tilesConfig.onX / 2);
const INITIAL_ACTIVE_Y = Math.floor(tilesConfig.onY / 2);
const INITIAL_ACTIVE_TILE_ID = generateTileID(INITIAL_ACTIVE_X, INITIAL_ACTIVE_Y);

const MAP2D_SIZE = tilesConfig.onX > tilesConfig.onY ? tilesConfig.onX : tilesConfig.onY;

export { MAP2D_SIZE, INITIAL_ACTIVE_X, INITIAL_ACTIVE_Y, INITIAL_ACTIVE_TILE_ID };
