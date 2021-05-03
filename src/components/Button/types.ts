import { ButtonHTMLAttributes } from 'react';

export interface ITheme {
  front: string;
  border: string;
}

export interface IButtonProps {
  size?: number;
  theme: ITheme;
  big: boolean;
  iconOnly?: boolean;
  iconPosition?: 'right' | 'left';
}

export interface IButtonDefaultProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'default' | 'blue' | 'red' | 'lightGreen';
  children?: any;
  icon?: any;
  iconPosition?: 'left' | 'right';
  big?: boolean;
  size?: number;
  loading?: boolean;
}
