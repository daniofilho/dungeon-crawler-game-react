declare type UsePlayerDataStoreType = PlayerType;

declare type UsePlayerReducerStateType = PlayerType;

declare interface UsePlayerActionsType {
  setPlayer: (params: PlayerType) => void;
  updatePlayerAfterAttack: (params: UpdatePlayerAfterAttackProps) => void;
  setPosition: (params: PlayerPositionType) => void;
  setItems: (params: Array<InventoryItemType>) => void;
  setItem: (params: PlayerItemParam) => void;
  addItemQuantity: (params: PlayerItemQuantityParam) => void;
  subItemQuantity: (params: PlayerItemQuantityParam) => void;
  setAttributes: (params: PlayerAttributesType) => void;
  setAttribute: (params: PlayerAttributeParam) => void;
  setCoins: (params: number) => void;
  addCoins: (params: number) => void;
  subCoins: (params: number) => void;
}

declare interface UsePlayerContextData extends PlayerType, UsePlayerActionsType {
  clear: () => void;

  canWalk: boolean;
  canDiscover: boolean;
  canDrinkPotions: boolean;

  getPlayerExperienceToNextLevel: () => number;

  resetPlayerItems: () => void;
  getItem: (id: ItemIDType) => InventoryItemType;
  buyItem: (item: ItemType) => void;

  hurtPlayer: (amount: number) => void;

  drinkPotion: () => void;

  upgradePlayerAttribute: (attribute: PlayerAttributeStrings, newValue: number) => void;

  updatePositionBasedOnTile: (tile: TileType) => void;
}

declare type UsePlayerReducerType = {
  state: UsePlayerReducerStateType;
  actions: UsePlayerActionsType;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// Functions

declare type handlePlayerAfterAttackProps = {
  enemy: IEnemyInstance;
  enemyDead: boolean;
  swordDices: number;
  shieldDices: number;
};
