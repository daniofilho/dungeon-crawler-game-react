import React from 'react';
import { ThemeProvider } from 'styled-components';

import Loader from 'components/Loader';

import { Button } from './styles';
import { IButtonDefaultProps } from './types';

import { getTheme } from './themes';

const ButtonDefault: React.FC<IButtonDefaultProps> = ({
  theme = '',
  type = 'button',
  children,
  icon,
  iconPosition = 'left',
  big = false,
  size = undefined,
  loading = false,
  ...rest
}) => {
  const themeProps = getTheme(theme);

  return (
    <ThemeProvider theme={themeProps}>
      <Button
        type={type}
        big={big}
        size={size}
        iconOnly={children === undefined}
        iconPosition={iconPosition}
        {...rest}
      >
        {loading ? (
          <Loader color={themeProps.front} />
        ) : (
          <>
            {iconPosition === 'left' && icon && icon}
            {children}
            {iconPosition === 'right' && icon && icon}
          </>
        )}
      </Button>
    </ThemeProvider>
  );
};

export default ButtonDefault;
