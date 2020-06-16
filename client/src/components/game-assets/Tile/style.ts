import styled from 'styled-components';
import tile_closed from 'assets/sprites/tile-closed.jpg';
import tile_open from 'assets/sprites/tile-open.jpg';

interface PropType {
  x: number;
  y: number;
  width: number;
  height: number;
  isInitial: boolean;
}

export const DivTile = styled.div<PropType>`

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;

  position: absolute;
  border: 1px solid rgba(0,0,0,0.2);
  background-image: url('${(props) =>
    props.isInitial ? tile_open : tile_closed}');
  transition: 0.2s;

  &:hover {
    border: 1px solid rgba(255,255,255,0.2);
  }

  span {
    color: #FFF;
    font-size: 9px;
  }

`;
