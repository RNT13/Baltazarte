import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

type Props = {
  $image?: 'small' | 'medium' | 'large'
  $direction?: 'row' | 'column'
}

export const CartItemContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: 12px;
  background-color: ${theme.colors.pinkColor};
  user-select: none;
`

export const CartItemContent = styled.div<Props>`
  width: 100%;
  height: 100%;
  display: flex;

  ${media.mobile} {
    flex-direction: ${props => props.$direction};
  }
`

export const CartItemImg = styled.div<Props>`
  width: ${props => {
    switch (props.$image) {
      case 'small':
        return '200px'
      case 'medium':
        return '300px'
      case 'large':
        return '400px'
      default:
        return '100px'
    }
  }};
  height: ${props => {
    switch (props.$image) {
      case 'small':
        return '100px'
      case 'medium':
        return '200px'
      case 'large':
        return '400px'
      default:
        return '100px'
    }
  }};
  max-width: auto;
  max-height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.mobile} {
    width: 100%;
    height: 150px;
  }
`

export const CartItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 12px;
  padding-right: 32px;
`

export const CartItemActions = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;

  > div {
    width: 90px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: ${theme.colors.textColor3};
    color: ${theme.colors.fifthColor};
    user-select: none;
  }

  svg {
    cursor: pointer;
    margin: 0 4px;

    &:hover {
      scale: 1.1;
      transition: all 0.2s ease-in-out;
    }
  }
`
