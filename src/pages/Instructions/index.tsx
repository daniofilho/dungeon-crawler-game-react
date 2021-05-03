import React from 'react';
import { useHistory } from 'react-router-dom';

import { useI18N } from 'i18n';

import Button from 'components/Button';

import { Container } from './styles';

const Instructions: React.FC = () => {
  const { t } = useI18N();

  const history = useHistory();

  return (
    <Container>
      <h1>{t.Instructions.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: t.Instructions.description }} />

      <ul>
        <li>
          <Button theme="blue" type="button" onClick={() => history.push('/main-menu')}>
            {t.common.mainMenu}
          </Button>
        </li>
      </ul>
    </Container>
  );
};

export default Instructions;
