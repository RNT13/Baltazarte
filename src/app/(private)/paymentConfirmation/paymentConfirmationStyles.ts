import { media } from '@/styles/theme'
import styled from 'styled-components'

export const PaymentConfirmationContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const PaymentConfirmationContent = styled.div`
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 250px;
    height: auto;
    object-fit: cover;
  }

  ${media.mobile} {
    padding: 12px 0px;
  }
`
