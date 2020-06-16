import styled from 'styled-components';

import closed from 'assets/sprites/tile-closed.jpg';
import open from 'assets/sprites/tile-open.jpg';

interface PropType {
  width: number;
  height: number;
  isInitial: boolean;
}

export const DivTile = styled.div<PropType>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-image: url(${(props) => (props.isInitial ? open : closed)});
  transition: 0.2s;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  span {
    color: #fff;
    font-size: 9px;
  }
`;
