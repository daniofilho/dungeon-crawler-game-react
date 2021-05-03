import React, { useState, useCallback } from 'react';

import { FaAngleDoubleUp } from 'react-icons/fa';

import pin from 'assets/images/pin.png';
import heroeAvatar from 'assets/images/heroe-avatar.png';
import coin from 'assets/images/coin.png';

import { useGame } from 'engine/useGame';
import { usePlayer } from 'engine/usePlayer';
import { useTurns } from 'engine/microHooks/useTurns';
import { useActionsPopup } from 'engine/microHooks/useActionsPopup';
import { useI18N } from 'i18n';

import { getItemByID } from 'utils/shop';

import { Life } from 'components/Game/Life';

import AttributesWindow from './AttributesWindow';

import { Meeple, Bar, Avatar, Coins, Items, LevelUpNotification } from './styles';

const Player: React.FC<PlayerType> = () => {
  const { t } = useI18N();

  const { turn } = useGame();
  const {
    coins,
    items,
    attributes: { life, maxLife, pointsToSpend },
    position,
  } = usePlayer();
  const { starEnemyTurn } = useTurns();
  const { showActionMenu } = useActionsPopup();

  const [sideOpen, setSideOpen] = useState<boolean>(false);

  // Open action menu for player
  const handleMeepleClick = useCallback(
    (e: any): void => {
      return showActionMenu({
        x: e.pageX,
        y: e.pageY,
        triggeredBy: 'player',
        triggeredBy_ElementID: 'player',
      });
    },
    [showActionMenu]
  );

  return (
    <section id="player-container">
      <Meeple
        transition={{ duration: 0.5, ease: 'backInOut' }}
        animate={{
          x: position.coordinates.x,
          y: position.coordinates.y,
        }}
        id="player"
      >
        <Life value={life} max={maxLife} x={position.coordinates.x} y={position.coordinates.y} />
        <button type="button" onClick={handleMeepleClick}>
          <img src={pin} alt="Player" />
        </button>
      </Meeple>

      <Bar>
        <Avatar>
          <button type="button" onClick={() => setSideOpen(true)}>
            <img src={heroeAvatar} />
          </button>

          {pointsToSpend > 0 && (
            <LevelUpNotification>
              <FaAngleDoubleUp />
            </LevelUpNotification>
          )}
        </Avatar>

        <Coins>
          <img src={coin} />
          <span>x{coins}</span>
        </Coins>

        <Items>
          <p>{t.Player.items}</p>
          {items.length > 0 && (
            <ul>
              {items.map((item, index) => {
                const itemProps = getItemByID(item.id);
                if (item.quantity <= 0) return <React.Fragment key={index} />;
                return (
                  <li key={`${item.id}_${index}`}>
                    <button type="button">
                      <img src={itemProps.image} />
                      <span>x{item.quantity}</span>
                    </button>
                  </li>
                );
              })}

              {turn === 'actions' && (
                <li>
                  <button type="button" onClick={() => starEnemyTurn()} className="button">
                    <span>{t.Player.finishTurn}</span>
                  </button>
                </li>
              )}
            </ul>
          )}
        </Items>

        <AttributesWindow sideOpen={sideOpen} setSideOpen={setSideOpen} />
      </Bar>
    </section>
  );
};

export default Player;
