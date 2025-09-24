import { media } from '@/styles/theme'
import { styled } from 'styled-components'

type Props = {
  $stock: 'low' | 'medium' | 'high'
}

export const ProductCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-bottom: 12px;
`

export const ProductCardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 12px;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.pinkColor};

  span {
    color: ${props => props.theme.colors.fifthColor};
  }
`

export const ProductCardBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${media.mobile} {
    flex-direction: column;
  }
`

export const ProductCardImage = styled.div`
  width: 200px;
  height: 100%;
  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px 0px 0px 12px;

    ${media.mobile} {
      border-radius: 12px;
    }
  }

  ${media.tablet} {
    width: 250px;
  }
`

export const ProductCardInfo = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  h3 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    button {
      color: ${props => props.theme.colors.fifthColor};
      font-size: 20px;
    }
  }

  ${media.tablet} {
    grid-template-columns: repeat(3, 2fr);
  }
`

export const StockColor = styled.span<Props>`
  padding: 8px;
  border-radius: 100%;
  background-color: ${props => {
    switch (props.$stock) {
      case 'low':
        return props.theme.colors.baseRed.base
      case 'medium':
        return props.theme.colors.yellow
      case 'high':
        return props.theme.colors.green
    }
  }};
`
