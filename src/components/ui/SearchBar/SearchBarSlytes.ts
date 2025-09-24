import { theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const SearchBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SearchBarContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 400px;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.secondaryColor};
`

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  flex: 1;
  border: none;
  outline: none;
  color: ${theme.colors.textColor3};
  background: transparent;

  &::placeholder {
    color: ${theme.colors.textColor3};
  }
`

export const IconButton = styled.button`
  font-size: 1.1rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.fifthColor};

  &:hover {
    opacity: 0.8;
  }
`
