import { itemsConfig } from 'game-definitions/config';

export const getItemByID = (itemID: string): ItemType => {
  return itemsConfig.filter((item) => {
    return item.id === itemID;
  })[0];
};
