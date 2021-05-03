import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useI18N } from 'i18n';

import { useGame } from 'engine/useGame';
import { usePlayer } from 'engine/usePlayer';
import { useScenario } from 'engine/useScenario';
import { useDraft } from 'engine/microHooks/useDraft';

import Button from 'components/Button';

import { Container } from './styles';

const MainMenu: React.FC = () => {
  const { t } = useI18N();

  const game = useGame();
  const player = usePlayer();
  const scenario = useScenario();
  const draft = useDraft();

  const history = useHistory();

  const newGame = useCallback(() => {
    game.clear();
    player.clear();
    scenario.clear();

    draft.startDraftTurn();

    history.push('/game');
  }, [draft, game, history, player, scenario]);

  return (
    <Container>
      <ul>
        {!game.gameOver && !game.gameWon && (
          <li>
            <Link to="/game">
              <Button theme="blue" type="button">
                {t.common.continue}
              </Button>
            </Link>
          </li>
        )}

        <li>
          <Button theme="blue" type="button" onClick={() => newGame()}>
            {t.common.newGame}
          </Button>
        </li>
        <li>
          <Link to="/instructions">
            <Button theme="blue" type="button">
              {t.common.instructions}
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <Button theme="blue" type="button">
              {t.common.settings}
            </Button>
          </Link>
        </li>
        <li>
          <Button theme="blue" type="button" onClick={() => window.close()}>
            {t.common.quit}
          </Button>
        </li>
      </ul>
    </Container>
  );
};

export default MainMenu;
