declare type ItemIDType = 'boots' | 'potion' | 'shield' | 'sword' | 'eye';
declare type ItemType = {
  id: ItemIDType;
  label: string;
  image: string;
  price: number;
};

declare type InventoryItemType = {
  id: ItemIDType;
  quantity: number;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

declare type PlayerAttributeStrings =
  | 'attack'
  | 'defense'
  | 'maxLife'
  | 'life'
  | 'experience'
  | 'experienceToNextLevel'
  | 'pointsToSpend';

declare type PlayerAttributesType = {
  maxLife: number;
  life: number;
  attack: number;
  defense: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  pointsToSpend: number;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

declare type PlayerPositionType = {
  coordinates: CoordinateType;
  tile: TileType;
};

declare type PlayerType = {
  attributes: PlayerAttributesType;
  coins: number;
  items: Array<InventoryItemType>;
  position: PlayerPositionType;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// Functions

declare type PlayerAttributeParam = {
  attribute: PlayerAttributeStrings;
  value: number;
};

declare type PlayerItemParam = {
  itemId: ItemIDType;
  itemProps: InventoryItemType;
};

declare type PlayerItemQuantityParam = {
  itemId: ItemIDType;
  quantity: number;
};

declare type UpdatePlayerAfterAttackProps = {
  experience: number;
  experienceToNextLevel: number;
  pointsToSpend: number;
  level: number;
};
