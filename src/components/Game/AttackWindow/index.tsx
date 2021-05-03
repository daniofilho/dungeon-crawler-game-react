import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { Tooltip } from '@chakra-ui/react';

import { RiHeartPulseFill } from 'react-icons/ri';
import { GiDrippingSword, GiSlashedShield, GiBroadsword } from 'react-icons/gi';
import { BsShieldShaded } from 'react-icons/bs';

import heroeAvatar from 'assets/images/heroe-avatar.png';

import attackItemImage from 'assets/images/items/sword.png';
import defenseItemImage from 'assets/images/items/shield.png';

import Button from 'components/Button';

import { useI18N } from 'i18n';

import { usePlayer } from 'engine/usePlayer';
import { useScenario } from 'engine/useScenario';
import { usePlayerCombat } from 'engine/microHooks/usePlayerCombat';
import { useAttackWindow } from 'engine/microHooks/useAttackWindow';

import Box from './Box';

import { Container, Header, Content } from './styles';

const AttackWindow: React.FC = () => {
  const { t } = useI18N();

  const { attackWindow, setAttackWindow } = useAttackWindow();
  const { getEnemyByID } = useScenario();
  const { processAttack } = usePlayerCombat();

  const player = usePlayer();

  const [attackItems, setAttackItems] = useState<number>(0);
  const [defenseItems, setDefenseItems] = useState<number>(0);

  const [processingAttack, setProcessingAttack] = useState<boolean>(false);

  // # Reset values every time opens
  useEffect(() => {
    if (attackWindow.open) {
      setAttackItems(0);
      setDefenseItems(0);
    }
  }, [attackWindow.open]);

  // # Enemy instance
  const enemy = useMemo(() => {
    return getEnemyByID(attackWindow.enemyID);
  }, [attackWindow.enemyID, getEnemyByID]);

  // # Dices quantity
  const swordQuantity = useMemo(() => {
    const item = player.items.find((o) => o.id === 'sword');
    return item ? item.quantity : 0;
  }, [player.items]);

  const shieldQuantity = useMemo(() => {
    const item = player.items.find((o) => o.id === 'shield');
    return item ? item.quantity : 0;
  }, [player.items]);

  // # Max value of dices to use
  const maxSwordDices = useMemo(() => {
    if (!enemy || !player) return 0;

    const damageLeft = enemy.life - player.attributes.attack;
    // If damage will kill enemy, don't need to use dices
    if (damageLeft <= 0) return 0;

    return damageLeft > swordQuantity ? swordQuantity : damageLeft;
  }, [enemy, player, swordQuantity]);

  const maxShieldDices = useMemo(() => {
    if (!enemy || !player) return 0;

    const damageLeft = enemy.attack - player.attributes.defense;
    // If damage will kill player, don't need to use dices
    if (damageLeft <= 0) return 0;

    return damageLeft > shieldQuantity ? shieldQuantity : damageLeft;
  }, [enemy, player, shieldQuantity]);

  // # Total damage
  const attackValue = useMemo(() => {
    return attackItems + player.attributes.attack;
  }, [attackItems, player.attributes.attack]);

  const damageSufferedValue = useMemo(() => {
    if (!enemy || !player) return 0;
    return enemy.attack - player.attributes.defense - defenseItems;
  }, [defenseItems, enemy, player]);

  // # Handle Attack
  const handleAttack = useCallback(() => {
    setProcessingAttack(true);

    setTimeout(() => {
      if (!enemy) return;
      setProcessingAttack(false);
      setAttackWindow({
        enemyID: enemy.id,
        open: false,
      });

      processAttack(enemy, attackItems, defenseItems);
    }, 500);
  }, [attackItems, defenseItems, enemy, processAttack, setAttackWindow]);

  if (!enemy || !player) return <></>;

  if (!attackWindow.open) return <></>;

  return (
    <Container processingAttack={processingAttack}>
      <Header>
        <section>
          <img src={heroeAvatar} />
          <Tooltip label={t.AttackWindow.playerLife}>
            <p>
              <RiHeartPulseFill className="player-color" />
              <span>{player.attributes.life}</span>
            </p>
          </Tooltip>
        </section>

        <div></div>

        <section>
          <Tooltip label={enemy.name}>
            <img src={enemy.image} />
          </Tooltip>
          <Tooltip label={t.AttackWindow.enemyLife}>
            <p>
              <RiHeartPulseFill className="enemy-color" />
              <span>{enemy.life}</span>
            </p>
          </Tooltip>
        </section>
      </Header>

      <Content>
        <p className="text-center">{t.AttackWindow.combatSettings}</p>

        <ul>
          <li>
            <Box
              image={attackItemImage}
              onUpdate={(value) => setAttackItems(value)}
              maxValue={maxSwordDices}
            />
          </li>
          <li>
            <p>+</p>
          </li>
          <li>
            <Tooltip label={t.AttackWindow.playerAttack}>
              <p className="player-color">
                <GiBroadsword />
                {player.attributes.attack}
              </p>
            </Tooltip>
          </li>
          <li>
            <p>-</p>
          </li>
          <li>
            <Tooltip label={t.AttackWindow.enemyDefense}>
              <p className="enemy-color">
                <BsShieldShaded />
                {enemy.defense}
              </p>
            </Tooltip>
          </li>
          <li>
            <p>=</p>
          </li>
          <li>
            <Tooltip label={t.AttackWindow.damageDealt}>
              <p className="text-green">
                <GiDrippingSword />
                {attackValue}
              </p>
            </Tooltip>
          </li>
        </ul>

        <ul>
          <li>
            <Tooltip label={t.AttackWindow.enemyAttack}>
              <p className="enemy-color">
                <GiBroadsword />
                {enemy.attack}
              </p>
            </Tooltip>
          </li>
          <li>
            <p>-</p>
          </li>
          <li>
            <Box
              image={defenseItemImage}
              maxValue={maxShieldDices}
              onUpdate={(value) => setDefenseItems(value)}
            />
          </li>
          <li>
            <p>+</p>
          </li>
          <li>
            <Tooltip label={t.AttackWindow.playerDefense}>
              <p className="player-color">
                <BsShieldShaded />
                {player.attributes.defense}
              </p>
            </Tooltip>
          </li>

          <li>
            <p>=</p>
          </li>
          <li>
            <Tooltip label={t.AttackWindow.damageSuffered}>
              <p className="text-red">
                <GiSlashedShield />
                {damageSufferedValue}
              </p>
            </Tooltip>
          </li>
        </ul>

        <nav>
          <Button
            type="button"
            theme="red"
            onClick={() =>
              setAttackWindow({
                enemyID: enemy.id,
                open: false,
              })
            }
          >
            {t.common.cancel}
          </Button>

          <Button type="button" theme="blue" onClick={() => handleAttack()}>
            {t.common.attack}
          </Button>
        </nav>
      </Content>
    </Container>
  );
};

export default AttackWindow;
