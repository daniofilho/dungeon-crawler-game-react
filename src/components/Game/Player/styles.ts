import styled from 'styled-components';
import { motion } from 'framer-motion';

import { upDown } from 'styles/common/animations';

import colors from 'styles/common/colors';

import { tilesConfig } from 'game-definitions/config';

export const Meeple = styled(motion.div)`
  position: absolute;
  z-index: 15;

  pointer-events: none;

  width: ${tilesConfig.size.width}px;
  height: ${tilesConfig.size.height}px;

  & > div {
    position: relative;
    margin: -1.2rem auto 0 auto;
    transform: translateX(0);
  }

  & > button {
    background: transparent;
    border-width: 0;

    pointer-events: all;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    /* Shape of tile */
    clip-path: polygon(45% 0, 55% 0, 100% 41%, 88% 52%, 50% 83%, 0% 42%, 0 36%, 0% 42%);

    img {
      max-width: unset;
      margin-top: -4rem;
    }
  }
`;

export const Bar = styled.div`
  position: fixed;
  z-index: 40;
  left: 0;
  top: 0;
  width: 6.25rem;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.6rem;
`;

export const Avatar = styled.div`
  margin-bottom: 1.25rem;
  position: relative;

  img {
    max-width: 90%;
    background-color: #000;
    border-radius: 50%;
  }
`;

export const Coins = styled.div`
  color: #fff;
  text-align: right;
  img {
    width: 1.8rem;
    display: block;
    margin: 0 auto;
  }
  span {
    font-size: 0.6rem;
  }
`;

export const Items = styled.div`
  p {
    color: #fff;
    font-size: 0.6rem;
    margin: 1.25rem 0;
    text-align: center;
  }
  li {
    color: #fff;
    text-align: center;
    margin-bottom: 0.6rem;
    img {
      width: 2.5rem;
      display: block;
      margin: 0 auto;
    }
    span {
      font-size: 0.6rem;
    }
  }

  button {
    background-color: transparent;
    span {
      color: #fff;
      font-size: 0.5rem;
    }
  }

  .button {
    background-color: ${colors.lightGreen};
    padding: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: ${colors.black};
    }
  }
`;

export const Side = styled.div`
  .chakra-modal__close-btn {
    top: 1.25rem;
    color: #fff;
  }
  .chakra-modal__content {
    padding-top: 1.25rem;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);

    p {
      color: #fff;
    }
  }
`;

export const PlayerAttribute = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: #fff;
  margin-bottom: 1.25rem;

  span {
    padding: 0.9rem;
  }

  & > span:nth-of-type(1) {
    background-color: ${colors.purple};
    flex: 1;
  }

  & > span:nth-of-type(2) {
    background-color: ${colors.grayDark};
  }

  button {
    background-color: ${colors.green};

    width: 1.8rem;
    height: 1.8rem;
    border-radius: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 0.6rem 0 0.9rem;

    &:disabled {
      opacity: 0.3;
    }
  }
`;

export const DrawerFooterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const PlayerLevel = styled.p`
  display: block;
  width: 100%;
  text-align: left;
  font-size: 0.6rem;
  color: ${colors.green};
  padding: 0.6rem 0.3rem;
`;

type ExperienceBarProps = {
  currentExperiencePercent: number;
};

export const ExperienceBar = styled.div<ExperienceBarProps>`
  background-color: ${colors.grayLight};
  position: relative;

  height: 1.25rem;
  width: 100%;

  border-radius: 3px;

  &:before {
    content: '';
    position: absolute;
    z-index: 10;

    width: ${({ currentExperiencePercent }) => currentExperiencePercent}%;
    height: 100%;

    background-color: ${colors.green};
    border-radius: 3px;
  }

  span {
    display: block;
    line-height: 1.25rem;
    width: 100%;
    position: absolute;
    z-index: 11;

    color: #fff;
    text-align: center;
    font-size: 0.6rem;
    opacity: 0.3;

    transition: 0.3s;
  }

  &:hover {
    span {
      opacity: 1;
    }
  }
`;

export const LevelUpNotification = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  animation: ${upDown(3)} 0.5s ease-in-out infinite alternate-reverse;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${colors.yellow} !important;
  }
`;
