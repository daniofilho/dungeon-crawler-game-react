declare type DraftedItemsType = Array<ItemType>;

declare type UseDraftContextData = {
  draftsLeft: number;
  draftedItems: DraftedItemsType;

  startDraftTurn: () => void;
  reDraft: (keepIndexes: Array<number>) => void;
};
