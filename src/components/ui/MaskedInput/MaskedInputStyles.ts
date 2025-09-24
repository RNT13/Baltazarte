import { theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const MaskedInputContainer = styled.div<{ $hasToggle?: boolean }>`
  width: 100%;
  position: relative;

  input,
  textarea,
  select,
  .imask-input {
    padding: 8px;
    width: 100%;
    border-radius: 8px;
    border: 2px solid ${theme.colors.baseBlue.light20};
    font-size: 1rem;
    color: ${theme.colors.baseBlack.base};
    background-color: ${theme.colors.baseBlue.light50};
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:focus {
      outline: none;
      border: 2px solid ${theme.colors.baseBlue.dark};
    }

    &.error {
      border: 2px solid ${theme.colors.baseRed.base};
      background-color: ${theme.colors.baseRed.light02};
    }

    &.error::placeholder {
      color: ${theme.colors.baseRed.light50};
    }

    ${({ $hasToggle }) => $hasToggle && `padding-right: 40px;`}
  }

  input,
  .imask-input {
    height: 40px;
  }

  textarea {
    min-height: 80px;
    resize: none;
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.baseBlue.base} ${theme.colors.baseBlue.light20};
  }

  select {
    height: 40px;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='%23000' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 32px;
    cursor: pointer;
  }
`

export const PasswordToggle = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${theme.colors.baseBlack.base};

  &:hover {
    color: ${theme.colors.baseBlue.dark};
  }
`
