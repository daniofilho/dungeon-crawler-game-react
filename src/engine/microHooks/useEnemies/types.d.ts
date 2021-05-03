declare type respawnAnEnemyProps = {
  tileId: TileIDType;
  x: number;
  y: number;
};

declare type UseEnemiesContextData = {
  hasEnemyOnPosition: (newPosition: string, enemiesPosition: Array<EnemyPositionCheckType>) => void;
  respawnAnEnemy: (props: respawnAnEnemyProps) => void;
  respawnEnemies: () => Promise<void>;
};
