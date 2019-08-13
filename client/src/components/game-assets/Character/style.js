import styled from 'styled-components';

export const DivChar = styled.div`
  
  position: absolute;
  
  left: ${ attr => attr.props.x }px;
  top: ${ attr => attr.props.y }px;
  
  width: ${ attr => attr.props.width }px;
  height: ${ attr => attr.props.height }px;
  
  margin-left: -${ attr => attr.props.width / 2 }px;
  margin-top: -${ attr => attr.props.height / 2 }px;

  background-image: url('${attr => attr.props.charImage }');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  
`;