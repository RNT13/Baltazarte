import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const FilterBarContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const FilterBarContent = styled.div``

export const FilterBarButtons = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 4px;
  padding: 8px;
  border-radius: 16px;
  background-color: ${theme.colors.secondaryColor};

  button {
    padding: 4px 8px;
    border-radius: 100px;
    background-color: ${theme.colors.pinkColor};
    color: ${theme.colors.secondaryColor};
  }

  .active {
    padding: 4px 8px;
    border-radius: 100px;
    background-color: ${theme.colors.textColor3};
    color: ${theme.colors.fifthColor};
  }

  ${media.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`
