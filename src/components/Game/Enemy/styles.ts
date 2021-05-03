import styled from 'styled-components';

import { tilesConfig } from 'game-definitions/config';

export const Container = styled.div<IEnemyInstance>`
  position: absolute;
  display: flex;
  z-index: 12;
  /* Shape of tile */
  clip-path: polygon(45% 0, 55% 0, 100% 41%, 88% 52%, 50% 83%, 0% 42%, 0 36%, 0% 42%);

  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;

  width: ${tilesConfig.size.width}px;
  height: ${tilesConfig.size.height}px;

  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;

  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;

  opacity: 1;
`;
