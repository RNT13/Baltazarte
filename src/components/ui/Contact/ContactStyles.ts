import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContactContent = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  ${media.pc} {
    width: 70%;
  }

  ${media.tablet} {
    width: 100%;
  }

  ${media.mobile} {
    width: 100%;
  }
`

export const ContactTop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  ${media.mobile} {
  }
`

export const ContactForm = styled.div`
  width: fit-content;
  height: 650px;
  gap: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

export const FormContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.fifthColor};

  svg {
    font-size: 20px;
    color: ${theme.colors.fifthColor};
    stroke-width: 1.5px;
  }

  ${media.tablet} {
    gap: 12px;
    padding: 8px;
  }
`

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 4px;
  padding: 8px;
  background-color: ${theme.colors.textColor3};
  border: 1px solid ${theme.colors.secondaryColor};
  border-radius: 8px;

  select {
    width: 100%;
    padding: 8px;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 2px solid ${theme.colors.baseBlue.light20};

    &:focus {
      outline: none;
      border: 2px solid ${theme.colors.baseBlue.dark};
    }

    &.error {
      border: 2px solid ${theme.colors.baseRed.base};
      background-color: ${theme.colors.baseRed.light02};
    }
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 8px;
    border-radius: 8px;
    border: 2px solid ${theme.colors.baseBlue.light20};
    resize: none;
  }
`

export const FormHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  background-color: transparent;
`

export const ContactForm1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 3px solid ${theme.colors.secondaryColor};
  border-style: dotted;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ContactForm2 = styled.form`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContactQuestions = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${theme.colors.secondaryColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 12px;
  }
`

export const Questions = styled.div`
  width: 100%;
  height: 100%;
  gap: 12px;
  padding: 12px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.fifthColor};

  svg {
    font-size: 20px;
    color: ${theme.colors.fifthColor};
    stroke-width: 1.5px;
  }

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background-color: ${theme.colors.textColor3};
    border-radius: 8px;

    p {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
