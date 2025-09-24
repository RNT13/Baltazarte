import { Dot, Line } from '@/styles/globalStyles'
import { theme } from '@/styles/theme'
import { styled } from 'styled-components'

type SectionProps = {
  $active?: boolean
  $titleColor?: string
}

export const SectionContainer = styled.section<SectionProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SectionContent = styled.div<SectionProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  background-color: ${theme.colors.gray};

  h2 {
    font-size: 28px;
    color: ${props => props.$titleColor || theme.colors.fifthColor};
  }
`

export const SectionDiv = styled.div<SectionProps>`
  display: ${props => (props.$active ? 'flex' : 'none')};
  align-items: center;
  gap: 12px;

  ${Dot} {
    width: 8px;
    height: 8px;
    color: ${theme.colors.secondaryColor};
  }

  ${Line} {
    color: ${theme.colors.secondaryColor};
  }
`
