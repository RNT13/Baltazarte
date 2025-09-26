import { slideFromLeft } from '@/styles/animations'
import { media } from '@/styles/theme'
import { styled } from 'styled-components'

type HamburgerMenuProps = {
  $isOpen?: boolean
}

export const HamburgerMenuContainer = styled.div`
  position: fixed;
  top: 99px;
  left: 30px;
  border-radius: 16px;
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.colors.pinkColor};
  color: ${props => props.theme.colors.fifthColor};
  border: 1px solid ${props => props.theme.colors.fifthColor};
  z-index: 101;

  ${media.pc} {
    display: flex;
  }

  ${media.tablet} {
    top: 140px;
    left: 3%;
  }

  ${media.mobile} {
    width: 35px;
    height: 35px;
    border-radius: 12px;
    top: 121px;
    left: 3%;
  }
`

export const HamburgerMenuContent = styled.div``

export const HamburgerMenuButton = styled.div`
  svg {
    font-size: 28px;
    color: ${props => props.theme.colors.fifthColor};
  }
`

export const HamburgerMenuWindowContainer = styled.div<HamburgerMenuProps>`
  position: fixed;
  overflow: hidden;
  top: 80px;
  left: 0px;
  width: ${props => (props.$isOpen ? '250px' : '0px')};
  height: 100%;
  padding: 12px;
  gap: 12px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.secondaryColor};
  border: 1px solid ${props => props.theme.colors.fifthColor};
  z-index: 101;
  ${slideFromLeft}

  ${media.pc} {
    display: flex;
  }

  ${media.tablet} {
    top: 125px;
  }

  ${media.mobile} {
    top: 105px;
  }
`

export const HamburgerMenuWindowHeader = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  h2 {
    padding: 8px;
    font-size: 28px;
    color: ${props => props.theme.colors.fifthColor};
    text-align: center;
    border-top: 1px solid ${props => props.theme.colors.fifthColor};
    border-bottom: 1px solid ${props => props.theme.colors.fifthColor};
  }
`

export const HamburgerMenuWindowBody = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 12px;
`
