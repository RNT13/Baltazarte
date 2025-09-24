import { media } from '@/styles/theme'
import { styled } from 'styled-components'

export const LogoContainer = styled.div`
  position: relative;
  width: 150px;
  height: 40px;

  ${media.tablet} {
    width: 120px;
    height: 30px;
  }

  ${media.mobile} {
    width: 100px;
    height: 20px;
  }
`
