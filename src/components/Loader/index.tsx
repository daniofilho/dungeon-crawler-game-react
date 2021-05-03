import React, { ReactElement, HtmlHTMLAttributes } from 'react';

import { BarLoader } from 'react-spinners';

import colors from 'styles/common/colors';

import { LoaderContainer } from './styles';

type LoaderType = {
  color?: string;
};

const Loader: React.FC<HtmlHTMLAttributes<HTMLDivElement> & LoaderType> = ({
  color,
  ...rest
}): ReactElement => {
  return (
    <LoaderContainer {...rest}>
      <BarLoader color={color || colors.white} loading />
    </LoaderContainer>
  );
};

export default Loader;
