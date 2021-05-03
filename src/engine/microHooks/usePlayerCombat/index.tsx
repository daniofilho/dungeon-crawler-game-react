import React, { createContext, useContext, useCallback } from 'react';

import { usePlayer } from 'engine/usePlayer';
import { useScenario } from 'engine/useScenario';
import { useI18N } from 'i18n';
import { toastSuccessMessage } from 'lib/alerts';

const UsePlayerCombatContext = createContext<UsePlayerCombatContextData>(
  {} as UsePlayerCombatContextData
);

const UsePlayerCombatProvider: React.FC = ({ children }) => {
  const player = usePlayer();
  const scenario = useScenario();

  const { t } = useI18N();

  // # Player dead

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # After Attack

  const handlePlayerAfterAttack = useCallback(
    ({ enemy, enemyDead, swordDices, shieldDices }: handlePlayerAfterAttackProps) => {
      const { experience, experienceToNextLevel, pointsToSpend, level } = player.attributes;

      // Player experience
      let newPlayerExperience = enemyDead ? experience + enemy.experience : experience;

      let newExperienceToNextLevel = experienceToNextLevel;
      let newPointsToSpend = pointsToSpend;
      let newLevel = level;

      // Warn player if enemy died
      if (enemyDead) {
        const enemyDeadMessage = t.combat.enemyKilled.replace('%%ENEMY%%', enemy.id);
        toastSuccessMessage(enemyDeadMessage);

        // Check if found coins
        const foundLoot = Math.floor(Math.random() * enemy.lootChance);
        if (foundLoot === 0) {
          const coinWord = enemy.coins === 1 ? t.elements.coin : t.elements.coins;
          let foundCoinMessage = t.combat.coinsEarned;

          foundCoinMessage = foundCoinMessage.replace('%%COINS%%', String(enemy.coins));
          foundCoinMessage = foundCoinMessage.replace('%%STRING%%', coinWord);

          toastSuccessMessage(foundCoinMessage);

          player.addCoins(enemy.coins);
        }

        // Warn player about XP earned
        const wordExperience =
          experience === 1 ? t.elements.experiencePoint : t.elements.experiencePoints;
        let experienceEarnedMessage = t.combat.experienceEarned;
        experienceEarnedMessage = experienceEarnedMessage.replace(
          '%%XP%%',
          String(enemy.experience)
        );
        experienceEarnedMessage = experienceEarnedMessage.replace('%%STRING%%', wordExperience);

        toastSuccessMessage(experienceEarnedMessage);
      }

      //Check if player has leveled up
      if (newPlayerExperience >= experienceToNextLevel) {
        newPlayerExperience = newPlayerExperience - experienceToNextLevel;

        newExperienceToNextLevel = player.getPlayerExperienceToNextLevel();
        newPointsToSpend = pointsToSpend + 1;
        newLevel = level + 1;

        toastSuccessMessage(t.alerts.leveledUp);
      }

      // Remove itens used on Attack
      player.subItemQuantity({
        itemId: 'sword',
        quantity: swordDices,
      });
      player.subItemQuantity({
        itemId: 'shield',
        quantity: shieldDices,
      });

      // Update other player props
      return player.updatePlayerAfterAttack({
        experience: newPlayerExperience,
        experienceToNextLevel: newExperienceToNextLevel,
        pointsToSpend: newPointsToSpend,
        level: newLevel,
      });
    },
    [
      player,
      t.alerts.leveledUp,
      t.combat.coinsEarned,
      t.combat.enemyKilled,
      t.combat.experienceEarned,
      t.elements.coin,
      t.elements.coins,
      t.elements.experiencePoint,
      t.elements.experiencePoints,
    ]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Handle Attack
  const processAttack = useCallback(
    (enemy: IEnemyInstance, swordDices: number, shieldDices: number): void => {
      const damageDealt = swordDices + player.attributes.attack;
      const newEnemyLife = enemy.life - damageDealt;
      const enemyDead = newEnemyLife <= 0 ? true : false;

      const damageSuffered = enemy.attack - player.attributes.defense - shieldDices;
      player.hurtPlayer(damageSuffered);

      // Handle Player level up
      handlePlayerAfterAttack({ enemy, enemyDead, swordDices, shieldDices });

      // Update Scenario Enemies
      scenario.setEnemyLife(enemy.id, newEnemyLife);
    },
    [handlePlayerAfterAttack, player, scenario]
  );

  return (
    <UsePlayerCombatContext.Provider value={{ processAttack }}>
      {children}
    </UsePlayerCombatContext.Provider>
  );
};

const usePlayerCombat = (): UsePlayerCombatContextData => {
  const context = useContext(UsePlayerCombatContext);
  if (!context)
    throw new Error('useUsePlayerCombat must be used within an UsePlayerCombatProvider');
  return context;
};

export { UsePlayerCombatProvider, usePlayerCombat };
