import React, { ButtonHTMLAttributes } from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from './themes';

import { MyButton } from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme: string;
};

const Button: React.FC<ButtonProps> = ({ children, theme, ...rest }) => {
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <MyButton type="button" {...rest}>
        {children}
      </MyButton>
    </ThemeProvider>
  );
};

export default Button;
