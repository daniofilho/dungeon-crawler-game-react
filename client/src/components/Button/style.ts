import styled from 'styled-components';

export const MyButton = styled.button`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  border: ${(props) => props.theme.border};
  text-shadow: ${(props) => props.theme.textShadow};
  box-shadow: ${(props) => props.theme.boxShadow};

  font-family: 'Press Start 2P';
  font-size: 14px;
  padding: 5px 15px;
  display: block;
  border-radius: 0px;
  line-height: 20px;

  cursor: pointer;
  width: 100%;
`;
