import React, { useState, useCallback } from 'react';

import { Container } from './styles';

type BoxProps = {
  image: string;
  maxValue: number;
  onUpdate(newValue: number): void;
};

const Box: React.FC<BoxProps> = ({ image, maxValue, onUpdate }) => {
  const [value, setValue] = useState<number>(0);

  const add = useCallback(() => {
    let newValue = value + 1;

    if (newValue > maxValue) newValue = maxValue;

    setValue(newValue);
    onUpdate(newValue);
  }, [maxValue, onUpdate, value]);

  const sub = useCallback(() => {
    let newValue = value - 1;

    if (newValue < 0) newValue = 0;

    setValue(newValue);
    onUpdate(newValue);
  }, [onUpdate, value]);

  return (
    <Container>
      <img src={image} />
      <ul>
        <li>
          <button onClick={() => sub()}>-</button>
        </li>
        <li>
          <p>{value}</p>
        </li>
        <li>
          <button onClick={() => add()}>+</button>
        </li>
      </ul>
    </Container>
  );
};

export default Box;
