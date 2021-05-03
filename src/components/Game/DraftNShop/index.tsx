import React, { useState } from 'react';

import produce from 'immer';

import { useI18N } from 'i18n';

import Button from 'components/Button';

import { usePlayer } from 'engine/usePlayer';
import { useTurns } from 'engine/microHooks/useTurns';
import { useDraft } from 'engine/microHooks/useDraft';

import coinImage from 'assets/images/coin.png';

import { itemsConfig } from 'game-definitions/config';

import { Container, Item, Draft, Store } from './styles';

const DraftNShop: React.FC = () => {
  const { t } = useI18N();

  const { coins, buyItem } = usePlayer();
  const { finishDraftNShopTurn } = useTurns();
  const { draftsLeft, draftedItems, reDraft } = useDraft();

  const [screen, setScreen] = useState<'draft' | 'store'>('draft');

  const [lockedItems, setLockedItems] = useState<Array<number>>([]);

  const toggleLockItem = (index: number): void => {
    setLockedItems((oldState) => {
      return produce(oldState, (newState) => {
        if (newState.includes(index)) {
          newState = newState.filter((o) => o !== index);
        } else {
          newState.push(index);
        }
        return newState;
      });
    });
  };

  return (
    <Container>
      <section>
        {screen === 'draft' && (
          <>
            <Draft>
              <h1>{t.Draft.title}</h1>
              <p>{t.Draft.description}</p>

              <ul>
                {draftedItems.length > 0 &&
                  draftedItems.map((item, index) => {
                    return (
                      <Item key={index} active={!lockedItems.includes(index)}>
                        <img src={item.image} />
                        <span>{item.label}</span>
                        <button type="button" onClick={() => toggleLockItem(index)}>
                          {t.Draft.lock}
                        </button>
                      </Item>
                    );
                  })}
              </ul>

              <Button theme="blue" onClick={() => reDraft(lockedItems)} disabled={draftsLeft <= 0}>
                {t.Draft.reRoll}
                <small>{`(${t.Draft.remaining} ${draftsLeft})`}</small>
              </Button>
            </Draft>

            <footer>
              <Button theme="lightGreen" onClick={() => setScreen('store')}>
                {t.Draft.visitStore}
              </Button>

              <Button theme="blue" onClick={() => finishDraftNShopTurn(draftedItems)}>
                {t.Draft.endTurn}
              </Button>
            </footer>
          </>
        )}

        {screen === 'store' && (
          <>
            <Store>
              <h1>{t.Store.title}</h1>
              <p>{t.Store.description}</p>

              <ul>
                {itemsConfig.map((item) => {
                  return (
                    <Item key={item.id} active={coins >= item.price}>
                      <img src={item.image} />
                      <span>{item.label}</span>
                      <button type="button" onClick={() => buyItem(item)}>
                        <img src={coinImage} />
                        <span>{item.price}</span>
                      </button>
                    </Item>
                  );
                })}
              </ul>
            </Store>

            <footer>
              <Button theme="blue" onClick={() => setScreen('draft')}>
                {t.Store.back}
              </Button>
            </footer>
          </>
        )}
      </section>
    </Container>
  );
};

export default DraftNShop;
