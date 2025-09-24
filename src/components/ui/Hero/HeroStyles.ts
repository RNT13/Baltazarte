import { bounce, jumpRotate } from '@/styles/animations'
import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const HeroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 48px 0;
  overflow: hidden;

  background: linear-gradient(120deg, ${theme.colors.pinkColor} 0%, ${theme.colors.pinkColor2} 100%);
  color: ${props => props.theme.colors.textColor2};
`

export const HeroContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

export const HeroImg = styled.div`
  width: 70%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const HeroProductImg = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  top: 203px;
  left: 405px;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  img {
    width: 411px;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
  }
`

export const SpanMessage1 = styled.span`
  position: absolute;
  padding: 8px;
  bottom: 50px;
  left: 0px;
  width: 100px;
  height: 100px;
  border: 1px solid ${theme.colors.thirdColor};
  background-color: ${theme.colors.sixthColor};
  rotate: 10deg;
  font-weight: 600;
  display: flex;
  justify-content: start;
  align-items: start;
  font-size: 14px;
  z-index: 1;
  animation: ${jumpRotate} 4s infinite steps(1, end);
  animation-delay: ${() => `${Math.random() * 2}s`};
  box-shadow: 5px 5px 0px ${theme.colors.thirdColor};

  ${media.tablet}, ${media.mobile} {
    width: 60px;
    height: 60px;
    font-size: 10px;
    bottom: 0px;
  }
`

export const SpanMessage2 = styled.span`
  position: absolute;
  top: 120px;
  right: 0px;
  padding: 8px;
  width: 100px;
  height: 100px;
  border: 1px solid ${theme.colors.thirdColor};
  background-color: ${theme.colors.sixthColor};
  rotate: -20deg;
  font-weight: 600;
  display: flex;
  justify-content: start;
  align-items: start;
  font-size: 14px;
  z-index: 1;
  animation: ${jumpRotate} 4s infinite steps(1, end);
  animation-delay: ${() => `${Math.random() * 2}s`};
  box-shadow: 5px 5px 0px ${theme.colors.thirdColor};

  ${media.tablet}, ${media.mobile} {
    width: 60px;
    height: 60px;
    font-size: 10px;
    top: -10px;
    right: 0px;
  }
`

export const SpanMessage3 = styled.span`
  position: absolute;
  padding: 4px;
  top: 0px;
  left: 30px;
  width: 70px;
  height: 70px;
  border: 1px solid ${theme.colors.thirdColor};
  background-color: ${theme.colors.sixthColor};
  rotate: -10deg;
  font-weight: 600;
  font-size: 12px;
  z-index: 1;
  animation: ${jumpRotate} 4s infinite steps(1, end);
  animation-delay: ${() => `${Math.random() * 2}s`};
  box-shadow: 5px 5px 0px ${theme.colors.thirdColor};

  svg {
    color: ${theme.colors.red};
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  ${media.tablet}, ${media.mobile} {
    width: 60px;
    height: 60px;
    font-size: 10px;
    top: -30px;
    left: 0px;
  }
`

export const SpanMessage4 = styled.span`
  position: absolute;
  padding: 4px;
  bottom: 0px;
  right: 30px;
  width: 70px;
  height: 70px;
  border: 1px solid ${theme.colors.thirdColor};
  background-color: ${theme.colors.sixthColor};
  rotate: 10deg;
  font-weight: 600;
  font-size: 12px;
  z-index: 1;
  animation: ${jumpRotate} 4s infinite steps(1, end);
  animation-delay: ${() => `${Math.random() * 2}s`};
  box-shadow: 5px 5px 0px ${theme.colors.thirdColor};

  svg {
    color: ${theme.colors.red};
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  ${media.tablet}, ${media.mobile} {
    width: 60px;
    height: 60px;
    font-size: 10px;
    right: 130px;
    bottom: -30px;
  }
`

export const SpanDot1 = styled.span`
  position: absolute;
  top: 200px;
  right: -60px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${theme.colors.sixthColor};
  font-weight: 600;
  background-image: linear-gradient(120deg, ${theme.colors.forthColor} 0%, ${theme.colors.secondaryColor} 100%);
  animation: ${bounce} 2s infinite;
  animation-delay: ${() => `${Math.random() * 2}s`};
  opacity: 0.5;

  ${media.tablet}, ${media.mobile} {
    width: 70px;
    height: 70px;
    right: 50px;
    top: -50px;
  }
`

export const SpanDot2 = styled.span`
  position: absolute;
  bottom: 0px;
  left: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${theme.colors.sixthColor};
  font-weight: 600;
  background-image: linear-gradient(120deg, ${theme.colors.secondaryColor} 0%, ${theme.colors.forthColor} 100%);
  animation: ${bounce} 2s infinite;
  animation-delay: ${() => `${Math.random() * 2}s`};
  opacity: 0.5;

  ${media.tablet}, ${media.mobile} {
    width: 70px;
    height: 70px;
    top: -50px;
    left: 200px;
  }
`

export const SpanDot3 = styled.span`
  position: absolute;
  top: 50px;
  left: -30px;
  width: 60px;
  height: 60px;
  font-size: 10px;
  border-radius: 50%;
  background-color: ${theme.colors.sixthColor};
  font-weight: 600;
  background-image: linear-gradient(120deg, ${theme.colors.forthColor} 0%, ${theme.colors.secondaryColor} 100%);
  animation: ${bounce} 2s infinite;
  animation-delay: ${() => `${Math.random() * 2}s`};
  opacity: 0.5;

  ${media.tablet}, ${media.mobile} {
    width: 50px;
    height: 50px;
    left: 0px;
    top: 120px;
  }
`

export const SpanDot4 = styled.span`
  position: absolute;
  bottom: 0px;
  right: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${theme.colors.sixthColor};
  font-weight: 600;
  background-image: linear-gradient(120deg, ${theme.colors.secondaryColor} 0%, ${theme.colors.forthColor} 100%);
  animation: ${bounce} 2s infinite;
  animation-delay: ${() => `${Math.random() * 2}s`};
  opacity: 0.5;

  ${media.tablet}, ${media.mobile} {
    width: 70px;
    height: 70px;
    bottom: -40px;
    right: 00px;
  }
`

export const SpanDot5 = styled.span`
  position: absolute;
  top: 250px;
  left: 130px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.sixthColor};
  font-weight: 600;
  background-image: linear-gradient(120deg, ${theme.colors.secondaryColor} 0%, ${theme.colors.forthColor} 100%);
  animation: ${bounce} 2s infinite;
  animation-delay: ${() => `${Math.random() * 2}s`};
  opacity: 0.5;

  ${media.tablet}, ${media.mobile} {
    width: 40px;
    height: 40px;
    left: 0px;
    bottom: 0px;
  }
`

export const SpanDot6 = styled.span`
  position: absolute;
  top: 50px;
  right: 130px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.sixthColor};
  font-weight: 600;
  background-image: linear-gradient(120deg, ${theme.colors.secondaryColor} 0%, ${theme.colors.forthColor} 100%);
  animation: ${bounce} 2s infinite;
  animation-delay: ${() => `${Math.random() * 2}s`};
  opacity: 0.5;

  ${media.tablet}, ${media.mobile} {
    width: 100px;
    height: 100px;
    top: 390px;
    right: 400px;
  }
`
