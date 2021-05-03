import { css } from 'styled-components';

const fontEOT = 'fonts/press-start-2p-v9-latin-regular.eot';
const fontWOFF = 'fonts/press-start-2p-v9-latin-regular.woff';
const fontWOFF2 = 'fonts/press-start-2p-v9-latin-regular.woff2';
const fontTTF = 'fonts/press-start-2p-v9-latin-regular.ttf';
const fontSVG = 'fonts/press-start-2p-v9-latin-regular.svg';

export default css`
  /* press-start-2p-regular - latin */
  @font-face {
    font-family: 'Press Start 2P';
    font-style: normal;
    font-weight: 400;
    src: url('${fontEOT}');
    src: local('Press Start 2P Regular'), local('PressStart2P-Regular'),
      url('${fontEOT}?#iefix') format('embedded-opentype'), url('${fontWOFF2}') format('woff2'),
      url('${fontWOFF}') format('woff'), url('${fontTTF}') format('truetype'),
      url('${fontSVG}#PressStart2P') format('svg');
  }
`;
