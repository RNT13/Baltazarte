import { styled } from 'styled-components'

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const OrderCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryColor};
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.primaryColor};
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px dashed ${props => props.theme.colors.pinkColor};
`

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  strong {
    color: ${props => props.theme.colors.textColor};
  }
`
