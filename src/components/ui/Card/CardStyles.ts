import { transitions } from '@/styles/animations'
import { Dot, Line } from '@/styles/globalStyles'
import { theme } from '@/styles/theme'
import { styled } from 'styled-components'

export const Cardcontainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 200px;
  max-width: 300px;
  font-size: 22px;
`

export const CardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.fifthColor};
  box-shadow: 5px 5px 0px ${theme.colors.thirdColor};

  &:hover {
    scale: 1.03;
    transition: ${transitions.default};
  }
`

export const CardHeader = styled.div<{ $active: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0px 8px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    filter: ${({ $active }) => ($active ? 'none' : 'grayscale(100%)')};
  }
`

export const CardHeaderBar = styled.div`
  padding: 0px 16px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: ${theme.colors.fifthColor};

  ${Dot} {
    width: 10px;
    height: 10px;
    background-color: ${theme.colors.thirdColor};
  }

  ${Line} {
    background-color: ${theme.colors.thirdColor};
  }
`

export const CardBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
`

export const CardTitle = styled.div``

export const CardDescription = styled.div``

export const CardPrice = styled.div`
  display: flex;
  gap: 16px;
  font-family: var(--secondary-font);

  span:first-child {
    text-decoration: line-through;
    color: ${props => props.theme.colors.baseRed.base};
  }

  span:last-child {
    color: ${theme.colors.green};
  }
`

export const CardFooter = styled.div`
  width: 100%;
  gap: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button,
  a {
    width: 100%;
  }
`
