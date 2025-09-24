import { theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const CartContainer = styled.div``

export const CartContent = styled.div`
  position: relative;

  > button {
    svg {
      font-size: 24px;
      filter: drop-shadow(3px 3px 0px ${theme.colors.fifthColor});
      color: ${theme.colors.textColor};
    }
  }
`

export const CartCount = styled.div`
  position: absolute;
  top: 0px;
  right: 8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${theme.colors.pinkColor2};
  border: 1px solid ${theme.colors.primaryColor};
  color: ${theme.colors.fifthColor};
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`
