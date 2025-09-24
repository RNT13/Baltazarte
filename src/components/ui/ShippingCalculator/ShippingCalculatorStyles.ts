import styled from 'styled-components'

export const CalculatorContainer = styled.div`
  padding: 8px;
  border: 1px solid ${props => props.theme.colors.pinkColor};
  border-radius: 12px;
  background-color: ${props => props.theme.colors.primaryColor};
  color: ${props => props.theme.colors.textColor3};
  display: flex;
  flex-direction: column;
  gap: 12px;

  h4 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const ResultContainer = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed ${props => props.theme.colors.pinkColor};
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  strong {
    font-weight: bold;
    color: ${props => props.theme.colors.pinkColor};
  }
`
