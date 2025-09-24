import { styled } from 'styled-components'

export const MessageResponseContainer = styled.div``

export const MessageResponseContent = styled.div`
  position: relative;
  width: fit-content;
  height: auto;
  border-radius: 16px;
  border: 3px solid ${props => props.theme.colors.fifthColor};
  padding: 12px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.secondaryColor};
  z-index: 100;
`

export const MessageResponseHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const MessageResponseBody = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const MessageResponseFooter = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`
