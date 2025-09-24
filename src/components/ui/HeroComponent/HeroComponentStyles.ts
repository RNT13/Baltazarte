import { media, theme, themeConfig } from '@/styles/theme'
import { styled } from 'styled-components'

export const HeroComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const HeroComponentContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70vw;
  height: 60vh;
  background-color: ${theme.colors.secondaryColor};
  border-radius: 8px;
  border: 1px solid ${theme.colors.thirdColor};
  overflow: hidden;
  z-index: 1;

  ${media.tablet}, ${media.mobile} {
    width: 90vw;
    height: 50vh;
  }
`

export const HeroComponentImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  margin: 10px 16px 0 16px;
  border-radius: 8px;
  background-color: ${theme.colors.forthColor};
  background-image: url('/images/gridbg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border: 1px solid ${theme.colors.thirdColor};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const HeroButtons = styled.div`
  height: 5%;
  display: flex;
  margin: 10px 16px;
  justify-content: end;
  align-items: center;
  gap: 8px;
`

export const SpanButton1 = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid ${theme.colors.thirdColor};
`

export const SpanButton2 = styled.span`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${theme.colors.red};
  border: 1px solid ${theme.colors.secondaryColor};

  animation: pulse 1s ease-in-out infinite;

  @keyframes pulse {
    0% {
      background-color: ${themeConfig.dark.colors.neon.green2};
    }
    50% {
      background-color: #fff;
    }
    100% {
      background-color: ${themeConfig.dark.colors.neon.green2};
    }
  }
`

export const Span3 = styled.span`
  position: relative;
  width: 100px;
  height: 70px;
  background-color: ${theme.colors.secondaryColor};
  border: 1px solid ${theme.colors.thirdColor};
  z-index: 1;

  ${media.tablet}, ${media.mobile} {
    display: none;
  }
`

export const Span4 = styled.span`
  position: relative;
  top: -30px;
  width: 350px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.thirdColor};
  background-color: ${theme.colors.secondaryColor};

  ${media.tablet}, ${media.mobile} {
    display: none;
  }
`
