import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

type ProductIDProps = {
  $isActive: boolean
}

export const ProductsIDContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;

  > div > button {
    margin-bottom: 16px;
  }
`

export const ProductsIDContent = styled.div`
  height: 100%;
  display: flex;
  background-color: ${theme.colors.gray};
  border-radius: 16px;

  ${media.tablet}, ${media.mobile} {
    flex-direction: column;
  }
`

export const ProductsIDLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 12px;
  padding: 8px;

  img {
    width: 100%;
    height: 70%;
    object-fit: cover;
    border-radius: 16px;
  }
`

export const ProductIDRight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 12px;
  padding: 8px;
  color: ${theme.colors.fifthColor};

  ${media.tablet}, ${media.mobile} {
    button {
      width: 100%;
    }
  }
`

export const ProductIDHeader = styled.div`
  width: 100%;
  gap: 8px;
  display: flex;
  justify-content: start;
  align-items: start;
`

export const ProductIDPrice = styled.div`
  width: 100%;
  height: 35px;
  gap: 8px;
  display: flex;
  justify-content: start;
  align-items: center;

  > p {
    opacity: 0.6;
    > span {
      color: ${theme.colors.red};
      text-decoration: line-through;
    }
  }

  > h2 {
    > span {
      color: ${theme.colors.green};
    }
  }
`

export const ProductIDAction = styled.div`
  width: 110px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${theme.colors.textColor3};
  user-select: none;

  span {
    padding: 0 8px;
    background-color: ${theme.colors.textColor3};
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

export const ProductIDGallery = styled.div`
  display: flex;
  gap: 8px;
`

export const ProductIDGalleryItem = styled.div<ProductIDProps>`
  width: 80px;
  height: 80px;
  gap: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    cursor: pointer;
    border: ${props => (props.$isActive ? `3px solid ${props.theme.colors.blue2}` : 'transparent')};

    &:hover {
      border: 3px solid ${props => props.theme.colors.blue2};
      scale: 1.1;
      transition: all 0.2s ease-in-out;
    }
  }
`
