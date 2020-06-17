import styled from 'styled-components';

import diceImg from 'assets/sprites/dado.png';

interface PropType {
  number: number;
}

export const DivDice = styled.div<PropType>`
  width: 32px;
  height: 32px;

  background-image: url(${diceImg});
  background-size: 192px 32px;
  background-repeat: no-repeat;
  background-position-x: ${(props) => props.number * 32 * -1 + 32}px;
`;
