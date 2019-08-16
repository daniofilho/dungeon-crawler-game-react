import styled from "styled-components";

export const DivInput = styled.div`
  input {
    background: #efefef;
    color: #333;
    width: 100%;
    height: 34px;
    border: 5px solid #111;
    padding: 20px;
    margin: 10px 0;
    &:read-only {
      background: rgba(0, 0, 0, 0.1);
      font-weight: bold;
      color: #fff;
      text-align: center;
      font-size: 20px;
    }
  }
`;
