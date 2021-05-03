declare type GameViewType = {
  minimap?: any; // @TODO
  tiles: Array<TileType>;
  player: PlayerType;
  ingameMenuOpen: boolean;
  setIngameMenuOpen(val: boolean): void;
};
