import React, { useState, useEffect } from 'react';
import { DivChar } from './styles';

const char01_avatar = 'images/char01-avatar.png';
const char02_avatar = 'images/char02-avatar.png';

interface CharacterProps {
  charType?: string;
  x: number;
  y: number;
  tileSize: number;
}

const Character: React.FC<CharacterProps> = ({ ...rest }) => {
  console.log({ rest });

  const [charImage, setCharImage] = useState(char01_avatar);

  // Set character image
  const defineCharImage = (type: string) => {
    switch (type) {
      default:
      case 'char01':
        return char01_avatar;
      case 'char02':
        return char02_avatar;
    }
  };

  // When load, set char image
  useEffect(() => {
    setCharImage(defineCharImage('ss'));
  }, []);

  return <DivChar {...rest} image={charImage} />;
};

export default Character;
