import styled from 'styled-components';

import tile_adjacent from 'assets/images/tiles/adjacent.png';

import { getTileImageByType } from 'utils/tiles';

const getOpacity = (isActive: boolean, isAdjacent: boolean, isDiscovered: boolean): number => {
  if (isActive || isAdjacent || isDiscovered) return 1;

  return 0.1;
};

const getOpacityHover = (isActive: boolean, isAdjacent: boolean, isDiscovered: boolean): number => {
  if (isAdjacent || isActive || isDiscovered) return 1;

  return 0.6;
};

export const Container = styled.div.attrs((props: TileType) => ({
  style: {
    width: props.size.width,
    height: props.size.height,
    marginLeft: props.x,
    marginTop: props.y,
  },
}))<TileType>`
  image-rendering: pixelated;

  position: absolute;
  z-index: 10;
  transition: 0.5s;
  transition-timing-function: ease;

  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* Shape of tile */
  clip-path: polygon(45% 0, 55% 0, 100% 36%, 100% 64%, 56% 100%, 45% 100%, 0 63%, 0 36%);

  p {
    color: #fff;
    position: absolute;
    opacity: 0.3;
    pointer-events: none;
    display: none;
  }

  &:before {
    content: ' ';
    width: ${({ size }) => size.width}px;
    height: ${({ size }) => size.height}px;
    background-image: url(${({ type }) => getTileImageByType(type)});
    background-size: cover;
    background-repeat: no-repeat;

    image-rendering: pixelated;

    opacity: ${({ active, adjacent, discovered }) => getOpacity(active, adjacent, discovered)};
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;

    pointer-events: none;
  }

  @media (min-width: 991px) {
    &:hover {
      margin-top: ${({ y, tall }) => y - tall * 0.2}px !important;

      &:before {
        filter: brightness(110%);
        opacity: ${({ active, adjacent, discovered }) =>
          getOpacityHover(active, adjacent, discovered)};
      }
    }
  }
`;

export const Adjacent = styled.div.attrs((props: TileType) => ({
  style: {
    width: props.size.width,
    height: props.size.height,
  },
}))<TileType>`
  position: absolute;
  display: flex;
  z-index: 11;
  /* Shape of tile */
  clip-path: polygon(45% 0, 55% 0, 100% 36%, 100% 64%, 56% 100%, 45% 100%, 0 63%, 0 36%);

  top: 0;
  left: 0;

  background-image: url(${tile_adjacent});
  background-size: cover;
  background-repeat: no-repeat;

  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;

  opacity: 0.9;
`;
