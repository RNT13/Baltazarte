import { transitions } from '@/styles/animations'
import { theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const NavMenuContainer = styled.nav``

export const NavMenuContent = styled.div``

export const NavMenuList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
`
export const NavMenuItem = styled.li`
  button {
    text-shadow: 3px 3px 0px ${theme.colors.fifthColor};
    color: ${theme.colors.textColor};
    &:hover {
      color: ${theme.colors.pinkColor2};
      transition: ${transitions.default};
      text-shadow: 0 0 10px ${theme.colors.pinkColor2};
    }
  }
`
