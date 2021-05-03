import React from 'react';
import { Link } from 'react-router-dom';

import { useI18N } from 'i18n';

import Button from 'components/Button';

import { gameConfig } from 'game-definitions/config';

import { usePlayer } from 'engine/usePlayer';
import { useGame } from 'engine/useGame';

import { Container } from './styles';

const GameOverWindow: React.FC = () => {
  const { t } = useI18N();
  const player = usePlayer();
  const { round } = useGame();

  return (
    <Container>
      <h1>{t.GameOver.gameOver}</h1>

      {player.attributes.life <= 0 && <p>{t.GameOver.youDied}</p>}
      {round >= gameConfig.maxTurnsToWin && <p>{t.GameOver.turnsOver}</p>}

      <Link to="/main-menu">
        <Button theme="blue" type="button">
          {t.common.mainMenu}
        </Button>
      </Link>
    </Container>
  );
};

export default GameOverWindow;
