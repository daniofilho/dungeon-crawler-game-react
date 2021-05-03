import styled from 'styled-components';

import colors from 'styles/common/colors';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: ${colors.black};
  color: #fff;

  img {
    max-height: 25rem;
  }
`;
