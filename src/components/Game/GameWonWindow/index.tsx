import React from 'react';
import { Link } from 'react-router-dom';

import { useI18N } from 'i18n';

import Button from 'components/Button';

import { usePlayer } from 'engine/usePlayer';
import { useGame } from 'engine/useGame';

import { Container } from './styles';

const GameOverWindow: React.FC = () => {
  const { t } = useI18N();

  const player = usePlayer();
  const { round } = useGame();

  const statistics = {
    turns: t.GameWon.turns.replace('%%TURNS%%', String(round)),
    level: t.GameWon.finalLevel.replace('%%LEVEL%%', String(player.attributes.level)),
  };

  return (
    <Container>
      <h1>{t.GameWon.youWon}</h1>
      <p>{statistics.turns}</p>
      <p>{statistics.level}</p>
      <Link to="/main-menu">
        <Button theme="blue" type="button">
          {t.common.mainMenu}
        </Button>
      </Link>
    </Container>
  );
};

export default GameOverWindow;
