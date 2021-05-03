import React from 'react';
import { useHistory } from 'react-router-dom';

import { useI18N } from 'i18n';
import { avaiableLocales } from 'i18n/init';

import { useSettings } from 'engine/useSettings';

import Button from 'components/Button';

import { Container, Panel } from './styles';

const MainMenu: React.FC = () => {
  const { t } = useI18N();
  const history = useHistory();

  const {
    data: { locale },
    updateSetting,
  } = useSettings();

  return (
    <Container>
      <h1>{t.common.settings}</h1>
      <Panel>
        <ul>
          <li>
            <label>{t.Settings.language}:</label>
            <div>
              <select value={locale} onChange={(e) => updateSetting('locale', e.target.value)}>
                {avaiableLocales.map((e) => {
                  return <option key={e}>{e}</option>;
                })}
              </select>
            </div>
          </li>
        </ul>
      </Panel>

      <Button theme="blue" type="button" onClick={() => history.goBack()}>
        {t.common.back}
      </Button>
    </Container>
  );
};

export default MainMenu;
