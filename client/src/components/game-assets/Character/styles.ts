import styled from 'styled-components';

interface PropType {
  x: number;
  y: number;
  tileSize: number;
  image: string;
}

export const DivChar = styled.div<PropType>`
  position: absolute;

  background-image: url('${(props) => props.image}');

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;

  width: ${(props) => props.tileSize * 0.5}px;
  height: ${(props) => props.tileSize * 0.5}px;

  margin-left: -${(props) => (props.tileSize * 0.5) / 2}px;
  margin-top: -${(props) => (props.tileSize * 0.5) / 2}px;
`;
