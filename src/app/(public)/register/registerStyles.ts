import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const RegisterContent = styled.div`
  width: 300px;
  height: auto;
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

export const RegisterHeader = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.thirdColor};
  padding-bottom: 12px;

  svg {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 34px;
    cursor: pointer;
    color: ${theme.colors.pinkColor};
  }
`

export const RegisterForm = styled.form`
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

export const RegisterFooter = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 12px;

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
