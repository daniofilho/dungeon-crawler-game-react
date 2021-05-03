import React, { useMemo } from 'react';

import { gameConfig } from 'game-definitions/config';

import { useGame } from 'engine/useGame';
import { useScenario } from 'engine/useScenario';
import { useI18N } from 'i18n';

import { Container } from './styles';

const TurnBar: React.FC = () => {
  const { t } = useI18N();

  const { turn, round } = useGame();
  const {
    currentLevel: {
      objectives: { total, found },
    },
  } = useScenario();

  const turnsRemaining = useMemo(() => {
    return gameConfig.maxTurnsToWin - round;
  }, [round]);

  const objectivesRemaining = useMemo(() => {
    return total - found;
  }, [found, total]);

  return (
    <Container>
      <ul>
        <li>{`${t.elements.turnsRemaining} ${turnsRemaining}`}</li>
        <li>{`${t.elements.objectsRemaining} ${objectivesRemaining}`}</li>
      </ul>
      <ul>
        <li className={`${turn === 'draft-and-shop' ? 'active' : ''}`}>{t.common.turns.shop}</li>
        <li className={`${turn === 'actions' ? 'active' : ''}`}>{t.common.turns.actions}</li>
        <li className={`${turn === 'enemy' ? 'active' : ''}`}>{t.common.turns.enemy}</li>
      </ul>
    </Container>
  );
};

export default TurnBar;
