import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

interface AddressCardProps {
  $isSelected: boolean
  $isLoading?: boolean
}

export const CheckoutContainer = styled.div`
  height: 100%;
  padding: 24px 0px;
`

export const CheckoutContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;

  h3 {
    margin-bottom: 0;
  }

  ${media.tablet} {
    flex-direction: column;
  }
`

export const CheckoutColumn = styled.div`
  position: sticky;
  top: calc(80px + 12px);
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.tablet} {
    width: 100%;
    position: static;
  }

  ${media.mobile} {
    padding: 0px;
  }
`

export const ItemsList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const ItemDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${theme.colors.pinkColor};
  border-radius: 8px;
  padding: 4px;

  h3 {
    font-size: 14px;
  }

  h4 {
    margin-bottom: 0px;
    font-size: 12px;
  }

  img {
    border-radius: 8px;
    object-fit: cover;
    max-width: 60px;
    max-height: 50px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`

export const CheckoutSummary = styled.div`
  position: sticky;
  top: calc(80px + 12px);
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.tablet} {
    width: 100%;
    position: static;
  }

  ${media.mobile} {
    padding: 0px;
  }
`

export const CheckoutRow = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 12px;
`

export const AddressCard = styled.div<AddressCardProps>`
  width: fit-content;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 8px;
  background-color: ${({ $isSelected }) => ($isSelected ? theme.colors.pinkColor : theme.colors.thirdColor)};
  color: ${({ theme }) => theme.colors.fifthColor};
  border: ${({ $isSelected }) => ($isSelected ? `2px solid ${theme.colors.pinkColor3}` : '2px solid transparent')};
  cursor: ${({ $isSelected, $isLoading }) => {
    if ($isLoading) return 'wait'
    if ($isSelected) return 'default'
    return 'pointer'
  }};
  opacity: ${({ $isLoading }) => ($isLoading ? 0.6 : 1)};
  pointer-events: ${({ $isLoading }) => ($isLoading ? 'none' : 'auto')};
  transition: all 0.2s ease;

  &:hover {
    border: 2px solid ${({ theme, $isSelected }) => ($isSelected ? theme.colors.pinkColor3 : theme.colors.pinkColor3)};
  }
`
