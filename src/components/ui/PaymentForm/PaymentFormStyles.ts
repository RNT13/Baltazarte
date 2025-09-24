import styled from 'styled-components'

export const PaymentFormContainer = styled.div`
  width: 100%;
`

export const PaymentFormContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const MethodOption = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid ${({ theme, $isSelected }) => ($isSelected ? theme.colors.fifthColor : theme.colors.gray)};
  background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.pinkColor : 'transparent')};
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.fifthColor : theme.colors.textColor3)};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.pinkColor};
  }

  svg {
    font-size: 24px;
    color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.fifthColor : theme.colors.textColor2)};
  }

  p {
    font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '400')};
  }
`

export const CardFormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  margin-top: 12px;

  > div {
    width: 100%;
    display: flex;
    gap: 4px;
  }
`

export const InfoBox = styled.div`
  display: flex;
  gap: 12px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};

  svg {
    font-size: 1.5rem;
    margin-top: 0.25rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 12px;
    font-weight: 400;

    line-height: 1.5;
    margin: 0;
  }
`
