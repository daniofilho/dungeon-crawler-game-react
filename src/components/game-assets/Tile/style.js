import styled from 'styled-components';
import tile_closed from '../../../assets/sprites/tile-closed.jpg';
import tile_open from '../../../assets/sprites/tile-open.jpg';

export const DivTile = styled.div`
  
  position: absolute;
  border: 1px solid rgba(0,0,0,0.2);
  background-image: url('${attr => (attr.props.isInitial) ? tile_open : tile_closed }');
  background-repeat: repeat;
  transition: 0.2s;

  &:hover {
    border: 1px solid rgba(255,255,255,0.2);
  }

  span {
    color: #FFF;
    font-size: 9px;
  }

`;