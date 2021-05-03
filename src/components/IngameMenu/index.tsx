import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useI18N } from 'i18n';
import { useActionsPopup } from 'engine/microHooks/useActionsPopup';

import Button from 'components/Button';

import { Container } from './styles';

type IngameMenuProps = {
  isOpen: boolean;
  setOpen(val: boolean): void;
};

const IngameMenu: React.FC<IngameMenuProps> = ({ isOpen, setOpen }) => {
  const { t } = useI18N();

  const { hideActionMenu } = useActionsPopup();

  useEffect(() => {
    if (isOpen) hideActionMenu();
  }, [hideActionMenu, isOpen]);

  return (
    <Container isOpen={isOpen}>
      <ul>
        <li>
          <Button
            theme="blue"
            type="button"
            onClick={() => {
              setOpen(false);
            }}
          >
            {t.common.continue}
          </Button>
        </li>
        <li>
          <Link to="/settings">
            <Button theme="blue" type="button">
              {t.common.settings}
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/main-menu">
            <Button theme="blue" type="button">
              {t.common.mainMenu}
            </Button>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default IngameMenu;
