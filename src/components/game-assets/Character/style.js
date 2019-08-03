import styled from 'styled-components';

export const DivChar = styled.div`
  
  position: absolute;
  left: ${ attr => attr.props.x }px;
  top: ${ attr => attr.props.y }px;
  background-image: url('${attr => attr.props.charImage }');
  background-repeat: no-repeat;

`;