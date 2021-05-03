import styled from 'styled-components';
import { motion } from 'framer-motion';
import colors from 'styles/common/colors';

export const Container = styled(motion.div)`
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: ${colors.purple};

  display: flex;
  justify-content: center;
  align-items: center;
`;
