import React, { ReactNode } from 'react';

import { I18NProvider } from 'i18n';

import { SettingsProvider } from './useSettings';

import { GameProvider } from './useGame';

import { UsePlayerProvider } from './usePlayer';
import { UseScenarioProvider } from './useScenario';

import { UseScreenProvider } from './microHooks/useScreen';
import { UsePlayerCombatProvider } from './microHooks/usePlayerCombat';
import { UseTileProvider } from './microHooks/useTile';
import { UseTurnsProvider } from './microHooks/useTurns';
import { UseActionsPopupProvider } from './microHooks/useActionsPopup';
import { UseAttackWindowProvider } from './microHooks/useAttackWindow';
import { UseEnemiesProvider } from './microHooks/useEnemies';
import { UseDraftProvider } from './microHooks/useDraft';

type EngineProvider = {
  children: ReactNode;
};

const EngineProvider: React.FC = ({ children }) => (
  <SettingsProvider>
    <I18NProvider>
      <GameProvider>
        <UsePlayerProvider>
          <UseScenarioProvider>
            <UseScreenProvider>
              <UsePlayerCombatProvider>
                <UseEnemiesProvider>
                  <UseTileProvider>
                    <UseDraftProvider>
                      <UseTurnsProvider>
                        <UseActionsPopupProvider>
                          <UseAttackWindowProvider>{children}</UseAttackWindowProvider>
                        </UseActionsPopupProvider>
                      </UseTurnsProvider>
                    </UseDraftProvider>
                  </UseTileProvider>
                </UseEnemiesProvider>
              </UsePlayerCombatProvider>
            </UseScreenProvider>
          </UseScenarioProvider>
        </UsePlayerProvider>
      </GameProvider>
    </I18NProvider>
  </SettingsProvider>
);

export default EngineProvider;
