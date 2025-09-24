import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

interface AddressCardStyleProps {
  $isSelected: boolean
}

export const ManagerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const AddressListContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

export const AddressCardBox = styled.div<AddressCardStyleProps>`
  position: relative;
  width: 220px;
  height: auto;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ $isSelected }) => ($isSelected ? theme.colors.pinkColor : theme.colors.thirdColor)};
  border: ${({ $isSelected }) => ($isSelected ? `2px solid ${theme.colors.pinkColor3}` : '2px solid transparent')};
  cursor: ${({ $isSelected }) => ($isSelected ? 'default' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.pinkColor3};
  }

  p {
    font-size: 14px;
    margin: 0;
    line-height: 1.4;
  }

  ${media.mobile} {
    padding: 0px;
  }
`

export const AddressCardTitle = styled.div`
  display: flex;
  gap: 4px;
`

export const AddressCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.fifthColor};
`

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  border-radius: 6px;
  z-index: 10;
  cursor: wait;
`
