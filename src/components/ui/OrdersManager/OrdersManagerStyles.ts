import { media } from '@/styles/theme'
import styled from 'styled-components'

export const ManagerContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const OrderCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: ${props => props.theme.colors.pinkColor};
  border-radius: 16px;

  ${media.tablet} {
    flex-direction: column;
    gap: 12px;
    padding: 8px;
    padding-top: 36px;
  }
`

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
  }

  h4 {
    margin: 0;
  }
`

export const OrderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  button {
    font-size: 20px;
  }

  ${media.tablet} {
    gap: 12px;
    flex-direction: column;
  }
`

export const StatusSelect = styled.select`
  padding: 12px;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.fifthColor};
  background-color: ${props => props.theme.colors.secondaryColor};
  color: ${props => props.theme.colors.textColor3};
  min-width: 150px;

  options {
    background-color: ${props => props.theme.colors.secondaryColor};
  }

  ${media.tablet} {
    min-width: 100px;
    padding: 8px;
  }
`

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.secondaryColor};
  padding: 12px;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.colors.pinkColor};
  width: 90%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${props => props.theme.colors.textColor3};

  ${media.tablet} {
    width: 90%;
    padding: 8px;
  }
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;

  h2 {
    margin: 0;
    color: ${props => props.theme.colors.pinkColor};
  }
`

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 60vh;
  overflow-y: auto;
  scrollbar-width: none;
`

export const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: ${props => props.theme.colors.primaryColor};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.fifthColor};
`

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3,
  h4 {
    margin: 0;
  }
`

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.secondaryColor};
  border: 1px solid ${props => props.theme.colors.pinkColor};

  img {
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.pinkColor};
  }

  div {
    flex-grow: 1;
  }

  p,
  h4 {
    margin: 0;
  }

  ${media.tablet} {
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.primaryColor};
`
