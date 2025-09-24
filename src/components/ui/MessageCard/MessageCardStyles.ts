import { media } from '@/styles/theme'
import { styled } from 'styled-components'

type MessageCardProps = {
  $isNew?: boolean
}

export const MessageCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
  color: ${props => props.theme.colors.fifthColor};
`

export const MessageCardContent = styled.div<MessageCardProps>`
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.$isNew ? props.theme.colors.baseRed.light02 : props.theme.colors.pinkColor)};
  border: ${props => (props.$isNew ? '2px solid red' : 'none')};
`

export const TagDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`

export const MessageCardHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    svg {
      color: ${props => props.theme.colors.fifthColor};
      font-size: 24px;
    }
  }
`

export const MessageCardBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 12px;
  }
`

export const MessageCardFooter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 12px;
  }
`

export const MessagesActions = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;

  button {
    svg {
      color: ${props => props.theme.colors.fifthColor};
      font-size: 20px;
    }
  }

  ${media.mobile} {
    flex-direction: column;
  }
`
