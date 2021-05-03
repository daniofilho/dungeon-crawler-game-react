declare type afterDiscoverNestProps = {
  tile: TileType;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

declare type UseTileContextData = {
  discoverTile: (tile: TileType, originTile: TileType) => void;
  walkToTile: (tile: TileType) => void;
  drawTileFromDeck: () => TileTypeType;
};
