import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const LoginContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginWindow = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 24px;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  background: linear-gradient(180deg, ${theme.colors.primaryColor}, ${theme.colors.fifthColor});
  box-shadow: 5px 5px 0px ${props => props.theme.colors.thirdColor};
`

export const LoginWindowHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.thirdColor};
  padding-bottom: 12px;
`

export const LoginWindowBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginWindowFooter = styled.div`
  width: 100%;
  height: 100%;
  gap: 12px;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    justify-content: center;
    gap: 4px;

    ${media.mobile} {
      flex-direction: column;
    }

    button {
      color: ${theme.colors.pinkColor};
    }
  }
`

export const LoginForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`
