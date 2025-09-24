import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const ProductsContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const ProductsContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 12px 0px;
`

export const ProductsHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;

  h3 > span > svg {
    font-size: 24px;
    font-weight: 600;
    margin-left: 8px;
    color: ${theme.colors.baseRed.light20};
  }

  h2 {
    font-size: 44px;
    font-weight: 600;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: ${props => props.theme.colors.baseBlue.light50};

    ${media.mobile} {
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    ${media.tablet}, ${media.mobile} {
      flex-direction: column;
    }
  }
`

export const ProductsGrid = styled.div`
  width: auto;
  height: 100%;
  padding: 12px 0px;
  display: grid;
  align-self: center;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);

  ${media.pc} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`
