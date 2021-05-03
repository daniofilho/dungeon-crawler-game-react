declare type setActiveLevel_TileTypeProps = {
  tileID: TileIDType;
  newTileType: TileTypeType;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

declare type UseScenarioDataStoreType = ScenarioType;

declare type UseScenarioReducerStateType = ScenarioType;

declare interface UseScenarioActionsType {
  setScenario: (params: ScenarioType) => void;
  setActiveLevel: (params: number) => void;
  setActiveLevel_Deck: (params: LevelDeckType) => void;
  setActiveLevel_Tiles: (params: Array<TileType>) => void;
  setActiveLevel_TileType: (params: setActiveLevel_TileTypeProps) => void;
  setActiveLevel_Enemies: (params: Array<IEnemyInstance>) => void;
  setActiveLevel_Map2DWalkable: (params: Map2DWalkableType) => void;
  setActiveLevel_Map2DReference: (params: Map2DReferenceType) => void;
  setActiveLevel_ObjectivesFound: (params: number) => void;
}

interface UseScenarioContextData extends ScenarioType, UseScenarioActionsType {
  clear: () => void;

  hasTilesToDiscover: boolean;
  isStairLocked: boolean;
  currentLevel: LevelType;

  getEnemyByID: (id: EnemyIDType) => IEnemyInstance | null;
  setEnemyLife: (enemyId: string, newLife: number) => void;

  updateCurrentMap2D: (p0: number, p1: number, tileID: TileIDType, walkable: boolean) => void;

  findAnObjective: () => void;

  goToNextLevel: () => TileType | null;
}

declare type UseScenarioReducerType = {
  state: UseScenarioReducerStateType;
  actions: UseScenarioActionsType;
};
