import colors from 'styles/common/colors';

import { lighten } from 'polished';

import { ITheme } from './types';

const defaultStyle = {
  background: colors.gray,
  front: colors.black,
  border: colors.grayLight,
};

const blue = {
  background: colors.blue,
  front: '#FFF',
  border: lighten(0.2, colors.blue),
};

const lightGreen = {
  background: colors.lightGreen,
  front: colors.black,
  border: lighten(0.2, colors.lightGreen),
};

const red = {
  background: colors.red,
  front: '#FFF',
  border: lighten(0.2, colors.red),
};

// - - - - - - -

export const getTheme = (key: string): ITheme => {
  switch (key) {
    default:
    case 'default':
      return defaultStyle;
    case 'blue':
      return blue;
    case 'lightGreen':
      return lightGreen;
    case 'red':
      return red;
  }
};
