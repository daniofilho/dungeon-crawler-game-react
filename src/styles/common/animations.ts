import { Keyframes, keyframes } from 'styled-components';

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const upDown = (amount: number): Keyframes => {
  return keyframes`
  from {
    transform: translateY(-${amount}px);
  }
  to {
    transform: translateY(${amount}px)
  }
`;
};

export { fade, shake, upDown };
