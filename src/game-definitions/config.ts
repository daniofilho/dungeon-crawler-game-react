import bootsImage from 'assets/images/items/boots.png';
import potionImage from 'assets/images/items/potion.png';
import shieldImage from 'assets/images/items/shield.png';
import swordImage from 'assets/images/items/sword.png';
import eyeImage from 'assets/images/items/eye.png';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// # GAME

export const gameConfig = {
  maxTurnsToWin: 90,
  potionHealsLife: 2,
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// # DRAFTS

export const draftConfig = {
  maxDraft: 3,
  items: 6,
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// # TILES

const windowSizeMultiplier = 7;

export const tilesConfig = {
  onX: 9,
  onY: 19,
  size: {
    width: 32 * windowSizeMultiplier,
    height: 30 * windowSizeMultiplier,
  },
  tall: 16,
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// # ITEMS

export const itemsConfig: Array<ItemType> = [
  {
    id: 'boots',
    image: bootsImage,
    label: 'Boots', // @TODO traduzir
    price: 1,
  },
  {
    id: 'eye',
    image: eyeImage,
    label: 'Eye', // @TODO traduzir
    price: 1,
  },
  {
    id: 'potion',
    image: potionImage,
    label: 'Potion', // @TODO traduzir
    price: 2,
  },
  {
    id: 'shield',
    image: shieldImage,
    label: 'Shield', // @TODO traduzir
    price: 1,
  },
  {
    id: 'sword',
    image: swordImage,
    label: 'Sword', // @TODO traduzir
    price: 2,
  },
];

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// # PLAYER

export const playerConfig = {
  maxItems: 10,
  experienceDificultyMultiplier: 2,
};
