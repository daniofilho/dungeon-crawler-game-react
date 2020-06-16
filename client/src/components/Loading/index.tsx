import React, { useContext } from 'react';
import { GameContext } from 'engine/GameProvider';
import { DivLoading } from './style';

import { ContextType } from 'interfaces/context';

const Loading: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const { isLoading } = context.state;

  return (
    <DivLoading id="loading" className={isLoading ? 'show' : ''}>
      <p>Loading</p>
    </DivLoading>
  );
};

export default Loading;
