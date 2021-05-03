import React, { useEffect, useCallback, useState } from 'react';

import TurnBar from 'components/Game/TurnBar';
import Map from 'components/Game/Map';
import DraftNShop from 'components/Game/DraftNShop';

import IngameMenu from 'components/IngameMenu';
import AttackWindow from 'components/Game/AttackWindow';
import GameOverWindow from 'components/Game/GameOverWindow';
import GameWonWindow from 'components/Game/GameWonWindow';
import ActionsPopup from 'components/Game/ActionsPopup';

import { useGame } from 'engine/useGame';
import { useScreen } from 'engine/microHooks/useScreen';
import { useActionsPopup } from 'engine/microHooks/useActionsPopup';

import { Container } from './styles';
import { useScenario } from 'engine/useScenario';

const Game: React.FC = () => {
  const { turn, gameOver, gameWon } = useGame();
  const { centerScreenOnPlayer } = useScreen();
  const { actionPopUp } = useActionsPopup();
  const { activeLevel } = useScenario();

  // # Controls Ingame Menu when press ESQ
  const [ingameMenuOpen, setIngameMenuOpen] = useState<boolean>(false);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Key Event Listeners

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // # ESC - Toggle ingame menu
      const key = event.key || event.keyCode;
      if (key === 'Escape' || key === 27) {
        setIngameMenuOpen((oldState) => {
          return !oldState;
        });
      }
    },
    [setIngameMenuOpen]
  );

  useEffect(() => {
    centerScreenOnPlayer();

    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [centerScreenOnPlayer, handleKeyPress]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <Container activeLevel={activeLevel}>
      <ActionsPopup {...actionPopUp} />

      <Map />

      {turn === 'draft-and-shop' && <DraftNShop />}

      <TurnBar />

      <IngameMenu isOpen={ingameMenuOpen} setOpen={setIngameMenuOpen} />

      <AttackWindow />

      {gameOver && <GameOverWindow />}
      {gameWon && <GameWonWindow />}
    </Container>
  );
};

export default Game;
