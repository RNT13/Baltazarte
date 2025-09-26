'use client'

// 🎨 GLOBAL STYLES - Estilos globais com Styled Components

import styled, { createGlobalStyle } from 'styled-components';
import { media, theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.pinkColor} ${theme.colors.primaryColor};
  }

  body {
    background-color: ${theme.colors.primaryColor};
    background-image: url('/images/gridbg.png');
    background-size: contain;
    background-position: center;
    background-repeat: repeat;
    font-family: var( --primary-font);
    color: ${theme.colors.textColor3};

  }

  .container {
    max-width: 1300px;
    margin: 0 auto;
    width: 95%;

    ${media.pc}{
      width: 95%;
    }

    ${media.tablet}{
      width: 95%;
    }

    ${media.mobile}{
      width: 95%;
    }
  }

  .gradientBG {
    background-image: linear-gradient(180deg, ${theme.colors.forthColor} 0%, ${theme.colors.pinkColor} 100%);
  }
`;

export const OverlayBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 100;
  cursor: pointer;
`

export const OverlayDarck = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`

export const CloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: transparent;
  border: transparent;
  cursor: pointer;

  svg {
    font-size: 24px;
    color: ${theme.colors.fifthColor};
  }

  &:hover {
    svg {
      color: ${theme.colors.forthColor};
    }
  }
`

export const TitleH2 = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.fifthColor};
`

export const TitleH3 = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${theme.colors.baseBlue.dark30};

  > svg {
    margin-right: 8px;
  }
`

export const MinorTextH4 = styled.h4`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 8px;
  color: ${theme.colors.baseBlack.light08};
  font-weight: bold;
`

export const GradientTextH2 = styled.h2`
  color: ${theme.colors.textColor};
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(180deg, ${theme.colors.secondaryColor}, ${theme.colors.fifthColor});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

export const GradientSpan = styled.span`
  color: ${theme.colors.textColor};
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 4px;
  background: linear-gradient(180deg, ${theme.colors.secondaryColor}, ${theme.colors.fifthColor});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    background: linear-gradient(360deg, ${theme.colors.secondaryColor}, ${theme.colors.fifthColor});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

export const Line = styled.span.attrs({ 'aria-hidden': true })`
  width: 80px;
  height: 2px;
  background: currentColor;
  margin: 0 2px;
`

export const Dot = styled.span.attrs({ 'aria-hidden': true })`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  margin: 0 2px;
`
