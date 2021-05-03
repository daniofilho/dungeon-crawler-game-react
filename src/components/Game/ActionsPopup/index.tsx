import React, { useCallback, useMemo } from 'react';

import bootsImage from 'assets/images/items/boots.png';
import eyeImage from 'assets/images/items/eye.png';
import swordImage from 'assets/images/items/sword.png';
import potionImage from 'assets/images/items/potion.png';

import { GiCloverSpiked } from 'react-icons/gi';

import { useI18N } from 'i18n';

import { usePlayer } from 'engine/usePlayer';
import { useScenario } from 'engine/useScenario';
import { useTile } from 'engine/microHooks/useTile';
import { useActionsPopup } from 'engine/microHooks/useActionsPopup';
import { useAttackWindow } from 'engine/microHooks/useAttackWindow';

import { Container, Li } from './styles';

const ActionsPopup: React.FC<ActionPopUpType> = ({
  triggeredBy,
  triggeredBy_ElementID,
  ...rest
}) => {
  const { t } = useI18N();

  const { setAttackWindow } = useAttackWindow();
  const { actionPopUp, hideActionMenu } = useActionsPopup();

  const { hasTilesToDiscover } = useScenario();
  const { walkToTile, discoverTile } = useTile();

  const player = usePlayer();
  const { canWalk, canDiscover, canDrinkPotions } = player;

  const { tile } = actionPopUp;

  // Walk
  const walkEnabled = useMemo(() => {
    if (triggeredBy !== 'tile') return false;
    if (!tile) return false;
    if (!tile.discovered) return false;

    return canWalk;
  }, [canWalk, tile, triggeredBy]);

  const doWalk = useCallback(() => {
    if (!tile) return;

    walkToTile(tile);
    return hideActionMenu();
  }, [hideActionMenu, tile, walkToTile]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Discover
  const discoverEnabled = useMemo(() => {
    if (triggeredBy !== 'tile') return false;
    if (!tile) return false;
    if (tile.discovered) return false;

    return canDiscover;
  }, [canDiscover, tile, triggeredBy]);

  const doDiscover = useCallback(() => {
    if (!tile) return;

    discoverTile(tile, player.position.tile);
    return hideActionMenu();
  }, [discoverTile, hideActionMenu, player.position.tile, tile]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Discover
  const attackEnabled = useMemo(() => {
    if (triggeredBy !== 'enemy') return false;

    return true;
  }, [triggeredBy]);

  const doAttack = useCallback(() => {
    setAttackWindow({
      open: true,
      enemyID: triggeredBy_ElementID,
    });
    return hideActionMenu();
  }, [hideActionMenu, setAttackWindow, triggeredBy_ElementID]);

  // Drink potion

  const doDrinkPotion = useCallback(() => {
    player.drinkPotion();
    hideActionMenu();
  }, [hideActionMenu, player]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <Container triggeredBy={triggeredBy} triggeredBy_ElementID={triggeredBy_ElementID} {...rest}>
      <ul>
        {triggeredBy === 'enemy' && (
          <Li enabled={attackEnabled}>
            <button type="button" onClick={() => doAttack()}>
              <img src={swordImage} />
              {t.common.attack}
            </button>
          </Li>
        )}

        {triggeredBy === 'tile' && (
          <>
            <Li enabled={walkEnabled}>
              <button type="button" onClick={() => doWalk()}>
                <img src={bootsImage} />
                {t.ActionsPopup.walk}
              </button>
            </Li>

            <Li enabled={discoverEnabled && hasTilesToDiscover}>
              <button type="button" onClick={() => doDiscover()}>
                <img src={eyeImage} />
                {t.ActionsPopup.discover}
              </button>
            </Li>
          </>
        )}

        {triggeredBy === 'player' && (
          <Li enabled={canDrinkPotions}>
            <button type="button" onClick={() => doDrinkPotion()}>
              <img src={potionImage} />
              {t.common.usePotion}
            </button>
          </Li>
        )}

        <li>
          <GiCloverSpiked color="#ffc34d" />
        </li>
      </ul>
    </Container>
  );
};

export default ActionsPopup;
