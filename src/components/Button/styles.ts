/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import { darken } from 'polished';

import { IButtonProps } from './types';

export const Button = styled.button<IButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme: { background } }) => background};
  color: ${({ theme: { front } }) => front};
  font-size: ${(props) => (props.size ? props.size : 1)}rem;
  padding: ${(props) => (props.big ? '1.5rem 2.1rem' : '0.9rem 1.8rem')};
  box-shadow: 0 5px 0 0 ${(props) => props.theme.border};

  border-radius: 2px;
  display: block;
  transition: 0.1s;
  border-width: 0;

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.background !== '#FFFFFF'
        ? darken(0.02, props.theme.background)
        : props.theme.background};

    border: ${(props) => props.theme.borderHover || props.theme.border};
    a {
      text-decoration: none;
    }
  }

  svg {
    margin: ${(props) =>
      props.iconOnly ? '0' : props.iconPosition === 'left' ? '0 0.7rem 0 0' : '0 0 0 0.7rem'};
    color: ${(props) => props.theme.icon};
  }
`;
