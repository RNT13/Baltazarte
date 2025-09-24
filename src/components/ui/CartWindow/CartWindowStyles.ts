import { media, theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const CartWindowContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const CartWindowContent = styled.div`
  position: relative;
  width: 400px;
  height: 100%;
  gap: 12px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.primaryColor};
  z-index: 100;

  ${media.mobile} {
    width: 295px;
  }
`

export const CartWindowHeader = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid ${theme.colors.fifthColor};
`

export const CartWindowBody = styled.div`
  width: 100%;
  height: 70%;
  overflow-y: auto;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 12px;

  p {
    color: ${theme.colors.fifthColor};
    font-size: 22px;
  }

  > img {
    width: 60%;
    height: 60%;
    object-fit: cover;
  }
`

export const CartWindowFooter = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: auto;
  padding-top: 12px;
  border-top: 2px solid ${theme.colors.fifthColor};
`
