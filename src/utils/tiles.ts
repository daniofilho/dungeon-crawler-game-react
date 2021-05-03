import { tilesConfig } from 'game-definitions/config';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

import tile_hidden from 'assets/images/tiles/hidden.png';
import tile_floor from 'assets/images/tiles/floor.png';
import tile_initial_floor from 'assets/images/tiles/initial-floor.png';
import tile_stair from 'assets/images/tiles/stair.png';
import tile_stair_closed from 'assets/images/tiles/stair-closed.png';
import tile_nest from 'assets/images/tiles/nest.png';
import tile_trap from 'assets/images/tiles/trap.png';
import tile_objective from 'assets/images/tiles/objective.png';

export const getTileImageByType = (type: TileTypeType): any => {
  switch (type) {
    default:
    case 'hidden':
      return tile_hidden;
    case 'floor':
      return tile_floor;
    case 'trap':
      return tile_trap;
    case 'stair':
      return tile_stair;
    case 'stair-closed':
      return tile_stair_closed;
    case 'nest':
      return tile_nest;
    case 'objective':
      return tile_objective;
    case 'initial-floor':
      return tile_initial_floor;
  }
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

export const generateTileID = (x: number, y: number): TileIDType => `${x}:${y}`;

type AdjacentTilesType = {
  up: TileIDType;
  down: TileIDType;
  left: TileIDType;
  right: TileIDType;
};

export const getAdjacentTiles = (activeTileID: TileIDType): AdjacentTilesType => {
  let up;
  let down;
  let left;
  let right;

  const tile = activeTileID.split(':');
  const tileX = parseInt(tile[0], 10);
  const tileY = parseInt(tile[1], 10);

  if (tileY % 2) {
    up = generateTileID(tileX, tileY - 1);
    down = generateTileID(tileX - 1, tileY + 1);
    left = generateTileID(tileX - 1, tileY - 1);
    right = generateTileID(tileX, tileY + 1);
  } else {
    up = generateTileID(tileX + 1, tileY - 1);
    down = generateTileID(tileX, tileY + 1);
    left = generateTileID(tileX, tileY - 1);
    right = generateTileID(tileX + 1, tileY + 1);
  }

  return { up, down, left, right };
};

export const isTileWalkable = (tileType: TileTypeType): boolean => {
  switch (tileType) {
    case 'floor':
    case 'initial-floor':
    case 'nest':
    case 'objective':
    case 'trap':
    case 'stair':
      return true;

    case 'hidden':
    default:
      return false;
  }
};

export const getadjacentPosition = (
  tileID: TileIDType,
  adjacentTiles: AdjacentTilesType
): AdjacentPositionType => {
  if (tileID === adjacentTiles.up) return 'up';
  if (tileID === adjacentTiles.down) return 'down';
  if (tileID === adjacentTiles.left) return 'left';
  if (tileID === adjacentTiles.right) return 'right';
  return 'up';
};

type GenerateTileProps = Omit<TileType, 'size' | 'tall'>;

export const generateTile = ({
  type,
  id,
  x,
  y,
  active,
  adjacent,
  adjacentPosition,
  discovered,
  walkable,
}: GenerateTileProps): TileType => {
  return {
    type,
    id,
    x,
    y,
    size: tilesConfig.size,
    tall: tilesConfig.tall,
    active,
    adjacent,
    adjacentPosition,
    discovered,
    walkable,
  };
};

export const generateInitialTiles = (initialActiveTileID: TileIDType): Array<TileType> => {
  const aux: Array<TileType> = [];

  const adjacentTiles = getAdjacentTiles(initialActiveTileID);

  const adjacentTilesArray = [
    adjacentTiles.up,
    adjacentTiles.down,
    adjacentTiles.left,
    adjacentTiles.right,
  ];

  let tileY = 0;

  new Array(tilesConfig.onY).fill('').map((_, y) => {
    new Array(tilesConfig.onX).fill('').map((_, x) => {
      const tileId = generateTileID(x, y);

      const isActive = initialActiveTileID === tileId;
      const isAdjacent = adjacentTilesArray.includes(tileId);

      const posX =
        y % 2
          ? x * tilesConfig.size.width
          : x * tilesConfig.size.width + tilesConfig.size.width / 2;

      const tileType = isActive ? 'initial-floor' : 'hidden';

      return aux.push(
        generateTile({
          type: tileType,
          id: tileId,
          x: posX,
          y: tileY,
          active: isActive,
          adjacent: isAdjacent,
          adjacentPosition: getadjacentPosition(tileId, adjacentTiles),
          discovered: isActive,
          walkable: isTileWalkable(tileType),
        })
      );
    });
    tileY += tilesConfig.size.height / 2 - tilesConfig.tall;
    return true;
  });

  return aux;
};

export const getTileByID = (tileID: TileIDType, tiles: Array<TileType>): TileType | null => {
  const tile = tiles.find((tile) => {
    return tile.id === tileID;
  });
  return tile ? tile : null;
};

export const getTileIndexByColumnAndRowIndex = (columnIndex: number, rowIndex: number): number => {
  return rowIndex * tilesConfig.onX + columnIndex;
};

// Create a 2D map to store tiles IDs in a normal grid array
export const generateInitial2DMapReference = (
  size: number,
  initialId: string
): Map2DReferenceType => {
  const map: Map2DReferenceType = [];
  const initial: number = Math.floor(size / 2);

  new Array(size).fill('').map((_, rowIndex) => {
    const line: Array<string> = [];

    new Array(size).fill('').map((_, lineIndex) => {
      line.push(rowIndex === initial && lineIndex === initial ? initialId : '0');
    });

    map.push(line);
  });

  return map;
};

// Create a 2D map to store tiles walkable tiles (used for enemy movement pathing)
export const generateInitial2DMapWalkable = (size: number): Map2DWalkableType => {
  const map: Map2DWalkableType = [];
  const initial: number = Math.floor(size / 2);

  new Array(size).fill('').map((_, rowIndex) => {
    const line: Array<number> = [];

    new Array(size).fill('').map((_, lineIndex) => {
      line.push(rowIndex === initial && lineIndex === initial ? 0 : 1);
    });

    map.push(line);
  });

  return map;
};

// Return tile index on 2D map array based on tile ID
export const get2DMapTileIndexByTileId = (
  tileID: TileIDType,
  map2DReference: Map2DReferenceType
): Array<number> => {
  let position: Array<number> = [-1, -1];

  map2DReference.map((row, rowIndex) => {
    const lineIndex = row.indexOf(tileID);
    if (lineIndex > -1) position = [rowIndex, lineIndex];
  });
  return position;
};

// return active tile from a level
export const getActiveTileFromLevel = (level: LevelType): TileType | null => {
  const lvl = level.tiles.find((tile) => {
    return tile.active;
  });
  return lvl ? lvl : null;
};
