// # Enemy

type EnemyIDType = string;

declare interface IEnemy {
  type: string;
  name: string;
  maxLife: number;
  life: number;
  attack: number;
  defense: number;
  speed: number;
  experience: number;
  coins: number;
  image: any; // @TODO set image correct type
  lootChance: number; // Change of getting coin loot ( 0 to X, where 0 is the number to get the loot)
}

declare interface IEnemyInstance extends IEnemy {
  id: EnemyIDType;
  position: {
    tileId: TileIDType;
    x: number;
    y: number;
  };
}

declare type EnemyPositionCheckType = {
  id: EnemyIDType;
  position: TileIDType;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// # Tile

declare type Map2DReferenceType = Array<Array<string>>;
declare type Map2DWalkableType = Array<Array<number>>;

declare type TileIDType = string;

declare type TileTypeType =
  | 'hidden'
  | 'initial-floor'
  | 'floor'
  | 'nest'
  | 'trap'
  | 'objective'
  | 'stair-closed'
  | 'stair';

declare type LevelDeckType = Array<TileTypeType>;

declare type LevelType = {
  tiles: Array<TileType>;
  initialTile: TileType;
  deck: LevelDeckType;
  enemies: Array<IEnemyInstance>;
  enemyDeck: Array<IEnemy>;
  map2DReference: Map2DReferenceType;
  map2DWalkable: Map2DWalkableType;
  objectives: {
    found: number;
    total: number;
  };
};

declare type ScenarioType = {
  activeLevel: number;
  levels: Array<LevelType>;
};
