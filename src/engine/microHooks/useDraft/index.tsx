import React, { createContext, useContext, useState, useCallback } from 'react';

import { draftConfig, itemsConfig } from 'game-definitions/config';

const UseDraftContext = createContext<UseDraftContextData>({} as UseDraftContextData);

const UseDraftProvider: React.FC = ({ children }) => {
  const [draftsLeft, setDraftsLeft] = useState(draftConfig.maxDraft);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Items

  const draftItem = (): ItemType => {
    const rng = Math.floor(Math.random() * itemsConfig.length);
    return itemsConfig[rng];
  };

  const draft = useCallback(
    (draftedItems: DraftedItemsType, keepIndexes: Array<number>): DraftedItemsType => {
      const newDraft: DraftedItemsType = [];

      // Loop items and decide if will keep or make a new draft
      new Array(itemsConfig.length).fill('').forEach((_, index) => {
        // Keep this index?
        if (keepIndexes.length > 0 && draftedItems.length > 0 && keepIndexes.includes(index)) {
          return newDraft.push(draftedItems[index]);
        }

        return newDraft.push(draftItem());
      });

      return newDraft;
    },
    []
  );

  const [draftedItems, setDraftedItems] = useState<DraftedItemsType>(draft([], []));

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Start the Draft Turn
  const startDraftTurn = useCallback((): void => {
    setDraftedItems(draft(draftedItems, []));
    return setDraftsLeft(draftConfig.maxDraft);
  }, [draft, draftedItems]);

  // Draft new itens
  const reDraft = useCallback(
    (keepIndexes: Array<number>): void => {
      // Block if there is no attempt left
      if (draftsLeft <= 0) return;

      // Subtract one attempt
      setDraftsLeft((oldState) => {
        return oldState - 1;
      });

      //Generate the the new draft
      const newDraft = draft(draftedItems, keepIndexes);
      return setDraftedItems(newDraft);
    },
    [draft, draftedItems, draftsLeft]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <UseDraftContext.Provider value={{ draftsLeft, draftedItems, startDraftTurn, reDraft }}>
      {children}
    </UseDraftContext.Provider>
  );
};

const useDraft = (): UseDraftContextData => {
  const context = useContext(UseDraftContext);
  if (!context) throw new Error('useUseDraft must be used within an UseDraftProvider');
  return context;
};

export { UseDraftProvider, useDraft };
