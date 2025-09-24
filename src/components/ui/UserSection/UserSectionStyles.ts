import { slideFromTop } from '@/styles/animations'
import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

type UserSectionProps = {
  $isOpen: boolean
}

export const UserSectionContainer = styled.div`
  position: relative;
`

export const UserSectionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const UserSectionWindow = styled.div<UserSectionProps>`
  position: absolute;
  right: 0px;
  bottom: -60px;
  padding: 4px;
  border-radius: 16px 0px 16px 16px;
  background-color: ${theme.colors.secondaryColor};
  border: 1px solid ${theme.colors.fifthColor};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  ${slideFromTop}

  button {
    color: ${theme.colors.pinkColor};
  }
`

export const UserSectionAvatar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    color: ${theme.colors.pinkColor};

    ${media.mobile} {
      font-size: 14px;
    }
  }

  svg {
    font-size: 34px;
    color: ${theme.colors.pinkColor};

    ${media.mobile} {
      font-size: 28px;
    }
  }

  ${media.tablet}, ${media.mobile} {
    font-size: 14px;
    flex-direction: row;
  }
`

export const UserSectionButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    ${media.mobile} {
      font-size: 14px;
    }
  }
`
