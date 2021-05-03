import React, { InputHTMLAttributes } from 'react';
import { DivInput } from './style';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  theme?: string;
};

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <DivInput>
      <input {...rest} />
    </DivInput>
  );
};

export default Input;
