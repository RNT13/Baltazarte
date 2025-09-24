import { styled } from 'styled-components'

export const EditItemContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

export const EditItemContent = styled.div`
  width: fit-content;
  height: auto;
  border-radius: 16px;
  border: 3px solid ${props => props.theme.colors.fifthColor};
  padding: 12px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.secondaryColor};
  z-index: 100;
`

export const EditItemHeader = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  gap: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div:last-child {
    background-color: ${props => props.theme.colors.fifthColor};
    padding: 2px;
  }

  button {
    color: ${props => props.theme.colors.secondaryColor};
  }
`

export const EditItemForm = styled.form``

export const EditItemBody = styled.div`
  width: 100%;
  height: 100%;
  gap: 12px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  svg {
    font-size: 24px;
    stroke-width: 1;
  }
`

export const SelectInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`

export const EditItemFooter = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  gap: 12px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
