import React, { useContext } from 'react';
import { DivGameScene } from './style';
import { GameContext } from 'engine/GameProvider';

interface ContextType {
  state: {
    renderItems: Array<Object>;
  };
}

const GameScenes: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const { renderItems } = context.state;

  return (
    <DivGameScene>
      {renderItems.map((item, index: number) => {
        return <div key={index}>{item}</div>;
      })}
    </DivGameScene>
  );
};

export default GameScenes;
