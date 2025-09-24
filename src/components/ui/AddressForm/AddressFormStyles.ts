import { styled } from 'styled-components'

export const AddressFormContainer = styled.div``

export const AddressFormContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`

export const AddressRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;

  div {
    width: 100%;
  }
`
