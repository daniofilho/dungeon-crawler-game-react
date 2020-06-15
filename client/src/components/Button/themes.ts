import colors from 'assets/styles/colors';

const blue = {
  color: '#FFFFFF',
  backgroundColor: colors.lightBlue,
  border: `5px solid ${colors.blue}`,
  textShadow: '2px 2px #000',
  boxShadow: '1px 1px 1px 0px #000',
};

const purple = {
  color: '#FFFFFF',
  backgroundColor: colors.lightPurple,
  border: `5px solid ${colors.purple}`,
  textShadow: '2px 2px #000',
  boxShadow: '1px 1px 1px 0px #000',
};

const green = {
  color: '#FFFFFF',
  backgroundColor: colors.green,
  border: `5px solid ${colors.lightGreen}`,
  textShadow: '2px 2px #000',
  boxShadow: '1px 1px 1px 0px #000',
};

// - - - - - - -

export const getTheme = (key: string) => {
  switch (key) {
    default:
    case 'default':
    case 'blue':
      return blue;
    case 'purple':
      return purple;
    case 'green':
      return green;
  }
};
