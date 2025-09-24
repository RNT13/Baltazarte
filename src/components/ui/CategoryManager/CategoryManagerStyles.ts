import { slideFromTop } from '@/styles/animations'
import { styled } from 'styled-components'

type Props = {
  $isOpen: boolean
}

export const CategoryManagerContainer = styled.div``

export const CategoryManagerContent = styled.div<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

export const CategoryManagerWindow = styled.div<Props>`
  width: 100%;
  height: ${props => (props.$isOpen ? '100%' : '0')};
  gap: 12px;
  padding: 6px;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.pinkColor};
  overflow: hidden;

  ${slideFromTop}

  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 8px;
  }
`
