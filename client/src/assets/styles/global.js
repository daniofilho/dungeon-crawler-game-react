import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Press Start 2P";
    font-style: normal;
    font-weight: 400;
    src: local("Press Start 2P Regular"), local("PressStart2P-Regular"),
      url("../fonts/e3t4euO8T-267oIAQAu6jDQyK3nYivN04w.woff2") format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Press Start 2P";
    font-style: normal;
    font-weight: 400;
    src: local("Press Start 2P Regular"), local("PressStart2P-Regular"),
      url("../fonts/e3t4euO8T-267oIAQAu6jDQyK3nRivN04w.woff2") format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek */
  @font-face {
    font-family: "Press Start 2P";
    font-style: normal;
    font-weight: 400;
    src: local("Press Start 2P Regular"), local("PressStart2P-Regular"),
      url("../fonts/e3t4euO8T-267oIAQAu6jDQyK3nWivN04w.woff2") format("woff2");
    unicode-range: U+0370-03FF;
  }
  /* latin-ext */
  @font-face {
    font-family: "Press Start 2P";
    font-style: normal;
    font-weight: 400;
    src: local("Press Start 2P Regular"), local("PressStart2P-Regular"),
      url("../fonts/e3t4euO8T-267oIAQAu6jDQyK3nbivN04w.woff2") format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Press Start 2P";
    font-style: normal;
    font-weight: 400;
    src: local("Press Start 2P Regular"), local("PressStart2P-Regular"),
      url("../fonts/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2") format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
      U+FEFF, U+FFFD;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    overflow: hidden;
    background: #555;
    font-family: "Press Start 2P";

    /* Disable text selection and prevent bugs on drag an drop */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .hide {
    display: none;
  }
`;
