declare type UseTurnsContextData = {
  finishDraftNShopTurn: (draftedItems: DraftedItemsType) => void;
  startActionsTurn: () => void;
  starEnemyTurn: () => void;
};
