import React from 'react';

import Loader from 'components/Loader';

import { Container } from './styles';

type LoadingProps = {
  show: boolean;
};

const Loading: React.FC<LoadingProps> = ({ show }) => {
  return (
    <Container
      animate={{
        opacity: show ? 1 : 0,
        zIndex: show ? 9999 : -1,
        transition: {
          duration: 1,
        },
      }}
    >
      <Loader />
    </Container>
  );
};

export default Loading;
