import React, { useMemo } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { usePlayer } from 'engine/usePlayer';
import { useI18N } from 'i18n';

import heroeAvatar from 'assets/images/heroe-avatar.png';

import {
  Avatar,
  Side,
  PlayerAttribute,
  ExperienceBar,
  PlayerLevel,
  DrawerFooterContainer,
} from './styles';

type AttributesWindowProps = {
  sideOpen: boolean;
  setSideOpen(bol: boolean): void;
};

const AttributesWindow: React.FC<AttributesWindowProps> = ({ sideOpen, setSideOpen }) => {
  const { t } = useI18N();

  const {
    attributes: {
      attack,
      defense,
      experience,
      experienceToNextLevel,
      level,
      maxLife,
      pointsToSpend,
    },
    upgradePlayerAttribute,
  } = usePlayer();

  const currentExperiencePercent = useMemo(
    () => Math.round((experience * 100) / experienceToNextLevel),
    [experience, experienceToNextLevel]
  );

  return (
    <Drawer isOpen={sideOpen} placement="left" onClose={() => setSideOpen(false)}>
      <DrawerOverlay>
        <Side>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Avatar>
                <img src={heroeAvatar} />
              </Avatar>
            </DrawerHeader>

            <DrawerBody>
              <PlayerAttribute>
                <span>{t.Player.life}</span>
                <span>{maxLife}</span>
                <button
                  type="button"
                  disabled={pointsToSpend < 1}
                  onClick={() => upgradePlayerAttribute('maxLife', maxLife + 1)}
                >
                  +
                </button>
              </PlayerAttribute>

              <PlayerAttribute>
                <span>{t.Player.attack}</span>
                <span>{attack}</span>
                <button
                  type="button"
                  disabled={pointsToSpend < 1}
                  onClick={() => upgradePlayerAttribute('attack', attack + 1)}
                >
                  +
                </button>
              </PlayerAttribute>

              <PlayerAttribute>
                <span>{t.Player.defense}</span>
                <span>{defense}</span>
                <button
                  type="button"
                  disabled={pointsToSpend < 1}
                  onClick={() => upgradePlayerAttribute('defense', defense + 1)}
                >
                  +
                </button>
              </PlayerAttribute>
            </DrawerBody>

            <DrawerFooter>
              <DrawerFooterContainer>
                <PlayerLevel>{`${t.common.level}:${level}`}</PlayerLevel>

                <ExperienceBar currentExperiencePercent={currentExperiencePercent}>
                  <span>{`${experience} / ${experienceToNextLevel}`}</span>
                </ExperienceBar>
              </DrawerFooterContainer>
            </DrawerFooter>
          </DrawerContent>
        </Side>
      </DrawerOverlay>
    </Drawer>
  );
};

export default AttributesWindow;
