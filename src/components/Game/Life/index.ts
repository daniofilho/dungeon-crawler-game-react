import styled, { css } from 'styled-components';

const getLifePercent = (life: number, maxLife: number): number => {
  return (life * 100) / maxLife;
};

const getLifeBarPercent = (maxLife: number): number => {
  return 100 / maxLife;
};

type LifeProps = {
  value: number;
  max: number;
  x: number;
  y: number;
};
export const Life = styled.div<LifeProps>`
  display: block;
  position: absolute;
  z-index: 20;
  overflow: hidden;

  pointer-events: none;

  margin-left: ${({ x }) => x}px;
  margin-top: ${({ y }) => y}px;

  transform: translateX(50%);

  width: 6.2rem;
  height: 1.2rem;

  border-radius: 5px;
  border: 2px solid #333;
  background: linear-gradient(90deg, #851414, #e72525);
  box-shadow: inset 0px -4px 0px #851414;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${({ value, max }) => getLifePercent(value, max)}%;
    background: linear-gradient(90deg, #40be0b, #51e715);
    box-shadow: inset 0px -4px 0px #40be0b;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    ${({ max }) => {
      const lifeBarPercent = getLifeBarPercent(max);
      return css`
        background: repeating-linear-gradient(
          90deg,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0) ${lifeBarPercent}%,
          rgba(255, 255, 255, 0.3) ${lifeBarPercent}%,
          rgba(255, 255, 255, 0.3) ${lifeBarPercent * 2}%
        );
      `;
    }}
  }
`;
