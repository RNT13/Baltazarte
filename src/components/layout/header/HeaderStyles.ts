import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(360deg, ${theme.colors.primaryColor}, ${theme.colors.secondaryColor});
  border-bottom: 5px solid ${theme.colors.thirdColor};
  position: sticky;
  top: 0;
  z-index: 100;

  ${media.tablet}, ${media.mobile} {
    height: 100%;
    padding: 8px 0;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet}, ${media.mobile} {
    flex-direction: column;
  }
`
