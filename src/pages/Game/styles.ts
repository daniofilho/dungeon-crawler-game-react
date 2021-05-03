import { adjustHue } from 'polished';
import styled from 'styled-components';

import colors from 'styles/common/colors';

type ContainerProps = {
  activeLevel: number;
};

export const Container = styled.main<ContainerProps>`
  background-color: ${({ activeLevel }) => adjustHue(activeLevel * 30, colors.purpleDark)};
  flex: 1;
  height: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
